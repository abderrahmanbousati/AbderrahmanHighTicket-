/**
 * =====================================================================
 * LEAD DELIVERY LAYER
 * =====================================================================
 * Delivers a qualified-lead payload to whichever integrations are
 * configured via environment variables. Every integration is OPT-IN:
 * if its env vars are missing, it is skipped. If NOTHING is configured,
 * the lead is logged to the server console (development fallback) and the
 * submission still succeeds so the UX is never broken.
 *
 * Add a new destination by writing one more `deliverTo*` function and
 * calling it in `deliverLead`.
 */

export type LeadPayload = Record<string, unknown> & {
  fullName?: string;
  email?: string;
  companyName?: string;
  locale?: string;
};

async function deliverToWebhook(lead: LeadPayload): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'highsystem-contact', ...lead }),
  });
}

async function deliverToGoogleSheets(lead: LeadPayload): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
}

async function deliverToNotion(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_LEADS_DATABASE_ID;
  if (!apiKey || !dbId) return;

  const title = String(lead.companyName ?? lead.fullName ?? 'New lead');
  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: title } }] },
      },
      children: [
        {
          object: 'block',
          type: 'code',
          code: {
            language: 'json',
            rich_text: [{ text: { content: JSON.stringify(lead, null, 2).slice(0, 1800) } }],
          },
        },
      ],
    }),
  });
}

async function deliverToHubSpot(lead: LeadPayload): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return;
  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: {
        email: lead.email ?? '',
        firstname: lead.fullName ?? '',
        company: lead.companyName ?? '',
      },
    }),
  });
}

export async function deliverLead(lead: LeadPayload): Promise<{ delivered: boolean }> {
  const tasks = [
    deliverToWebhook,
    deliverToGoogleSheets,
    deliverToNotion,
    deliverToHubSpot,
  ].map((fn) => fn(lead).catch((e) => console.error(`[leads] ${fn.name} failed:`, e)));

  const anyConfigured =
    process.env.CONTACT_WEBHOOK_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.NOTION_API_KEY ||
    process.env.HUBSPOT_ACCESS_TOKEN;

  await Promise.all(tasks);

  if (!anyConfigured) {
    // Development fallback — configure an integration in .env.local for production.
    console.info('[leads] New lead (no integration configured):', JSON.stringify(lead, null, 2));
  }

  return { delivered: Boolean(anyConfigured) };
}
