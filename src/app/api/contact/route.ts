import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { deliverLead } from '@/lib/leads';
import { rateLimit, clientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot: if filled, silently accept (do not deliver) to fool bots.
  if (parsed.data.company_website_hp) {
    return NextResponse.json({ ok: true });
  }

  const { company_website_hp: _hp, ...lead } = parsed.data;
  const locale =
    typeof (body as { locale?: unknown }).locale === 'string'
      ? (body as { locale: string }).locale
      : 'fr';

  try {
    await deliverLead({ ...lead, locale, submittedAt: new Date().toISOString() });
  } catch (e) {
    console.error('[contact] delivery error', e);
    // Still return ok — we do not want to lose a lead over a downstream error;
    // the console fallback captures it.
  }

  return NextResponse.json({ ok: true });
}
