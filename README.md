# HighSysteme — Website

> **We build growth systems for ambitious businesses.** — _Build. Scale. Dominate._

A premium, multilingual (French / English / Arabic, with full RTL) marketing
and business-transformation website for **HighSysteme**, plus a complete,
opt-in **payment architecture** (Stripe, PayPal, Moroccan bank transfer,
Cash Plus, manual verification, invoices, and a client-portal scaffold).

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, **React Hook Form**, **Zod**, and **next-intl**.

---

## Table of contents

1. [Quick start](#quick-start)
2. [Project structure](#project-structure)
3. [Where to edit things](#where-to-edit-things) ← _texts, colors, contact info, case studies, articles_
4. [Languages & translations](#languages--translations)
5. [SEO](#seo)
6. [Contact / lead form](#contact--lead-form)
7. [Payment system](#payment-system)
8. [Deployment (Vercel / Netlify)](#deployment)
9. [Scripts](#scripts)
10. [Important legal note](#important-legal-note)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local
#    (fill in values — see comments in .env.example)

# 3. Run the dev server
npm run dev
#    → http://localhost:3000  (redirects to /fr)

# 4. Production build
npm run build && npm run start
```

**Requirements:** Node.js 18.18+ (Node 20+ recommended).

The site works out of the box with **no environment variables** — payment
providers and integrations are all opt-in and stay disabled until you add
their keys.

---

## Project structure

```
messages/                     # Translations (one file per language)
  fr.json  en.json  ar.json
src/
  app/
    [locale]/                 # All localized pages (App Router)
      layout.tsx              # <html lang/dir>, header/footer, fonts
      page.tsx                # Home
      highsystem-90/          # HighSysteme 90 program page
      solutions/  method/  industries/  about/
      insights/               # Blog list + [slug] article pages
      contact/                # Strategy-call qualification form
      payment/                # Private payment page + success/cancel
      portal/                 # Client portal (gated scaffold)
      privacy/  terms/        # Legal pages
      not-found.tsx
    api/
      contact/                # Lead delivery endpoint
      payment/session/        # Server-side Stripe/PayPal session creation
      payment/stripe/webhook/ # Stripe webhook (source of truth)
      payment/manual/         # Manual payment confirmation + upload
      admin/payments/         # Protected admin API (invoices, links, verify)
    icon.svg                  # Favicon (HS monogram)
    opengraph-image.tsx       # Auto-generated social share image
    sitemap.ts  robots.ts
  components/                 # Reusable UI (Header, Footer, cards, diagrams…)
    payment/                  # Payment-specific components
  config/
    site.ts                   # ★ Business info, contact, social, brand
    payments.ts               # Payment types/statuses + env-based config
  content/
    industries.ts             # Industry list (copy lives in messages)
    solutions.ts              # Solution categories
    blog.ts                   # ★ Articles (trilingual)
    case-studies.ts           # ★ Case studies (ships empty on purpose)
  i18n/                       # next-intl routing & request config
  lib/                        # seo, validation, payments, store, leads…
  middleware.ts               # Locale routing
tailwind.config.ts            # ★ Colors / design tokens
```

★ = the files you will most often edit.

---

## Where to edit things

### ✏️ Text & copy
Almost all visible text lives in **`messages/fr.json`**, **`messages/en.json`**,
and **`messages/ar.json`**. The three files share the **exact same key
structure** — when you change a sentence, update it in all three.

- Home page copy → `home.*`
- Program page → `program.*`
- Solutions / Method / Industries / About → `solutions.*`, `method.*`, `industries.*`, `about.*`
- Navigation & buttons → `nav.*`, `cta.*`, `common.*`
- Footer → `footer.*`
- Legal pages → `legal.privacy.*`, `legal.terms.*`

> Tip: run `npm run build` after editing — if a key is missing in one
> language the build still succeeds, but keeping the three files in sync is
> strongly recommended.

### 🎨 Colors & design
- **Colors:** `tailwind.config.ts` → `theme.extend.colors` (navy, accent,
  ink, line). These mirror the brand palette. A couple of raw hex values also
  live in `src/app/globals.css` and `src/app/opengraph-image.tsx`.
- **Fonts:** `src/app/fonts.ts` — self-hosted woff2 in `src/app/fonts/files/`
  (Latin: Space Grotesk, Arabic: IBM Plex Sans Arabic). No build-time network
  fetch, so the build is reliable on any host.
- **Global styles / component classes:** `src/app/globals.css`.

### 📇 Contact info, social links, brand
Edit **`src/config/site.ts`**:
- `contact.email`, `contact.phone`, `contact.whatsapp` (digits only),
  `contact.location`
- `social.*` (leave blank to hide a link)
- `founder`, `tagline`, `domain`, `url`

> Do **not** put banking or payment secrets here — those go in `.env.local`.

### 📝 Blog articles (Insights)
Edit **`src/content/blog.ts`**. Copy an existing entry in the `articles`
array, give it a unique `slug`, set `published: true`, and fill in `title`,
`excerpt`, and `body` for **all three languages**. Body blocks support
paragraphs (`p`), section headings (`h2`), and bullet lists (`ul`).

### 📊 Case studies
Edit **`src/content/case-studies.ts`**. It **ships empty on purpose** — never
invent results. Copy the `exampleTemplate` shape into the `caseStudies` array,
fill every language, and set `published: true`.

### 🏭 Industries & solutions
- Which industries appear + their icons: `src/content/industries.ts`
- Solution categories + icons: `src/content/solutions.ts`
- All their **text** (names, descriptions, challenges, KPIs…) lives in
  `messages/*.json` under `industries.items.<slug>` and
  `solutions.categories.<key>`.

### ❓ FAQs
`messages/*.json` → `program.faq.items`.

---

## Languages & translations

- Locales: **`fr`** (default), **`en`**, **`ar`**. Routes are prefixed:
  `/fr`, `/en`, `/ar`.
- The **language switcher** (in the header) preserves the current page when
  switching.
- **Arabic is fully RTL** — the `<html dir="rtl">` attribute is set
  automatically and the Arabic font stack is applied.
- To add a language: add it to `src/i18n/routing.ts` (`locales`, and
  `rtlLocales` if RTL), create `messages/<locale>.json`, and add its label in
  `src/components/LanguageSwitcher.tsx`.

---

## SEO

- Unique `title` + `description` per page **per language** →
  `messages/*.json` under `seo.*`.
- Canonical URLs + `hreflang` alternates, Open Graph & Twitter cards →
  `src/lib/seo.ts`.
- `ProfessionalService` structured data (JSON-LD) is injected in the locale
  layout; `Article` JSON-LD on blog posts. No fake address/data is included —
  it uses editable values from `src/config/site.ts`.
- `sitemap.xml` and `robots.txt` are generated automatically
  (`src/app/sitemap.ts`, `src/app/robots.ts`). Payment/portal pages are
  `noindex`.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical/OG URLs are absolute.

---

## Contact / lead form

The strategy-call form posts to **`/api/contact`**. Validation is done with
Zod (`src/lib/validation.ts`) and includes a honeypot + rate limiting.

Delivery is handled in **`src/lib/leads.ts`** and is **opt-in** per
integration (set the matching env vars in `.env.local`):

| Destination      | Env vars |
| ---------------- | -------- |
| Generic webhook (Make.com, Zapier, n8n…) | `CONTACT_WEBHOOK_URL` |
| Google Sheets (Apps Script webhook)      | `GOOGLE_SHEETS_WEBHOOK_URL` |
| Notion database  | `NOTION_API_KEY`, `NOTION_LEADS_DATABASE_ID` |
| HubSpot          | `HUBSPOT_ACCESS_TOKEN` |

If **nothing** is configured, submissions are logged to the server console
(development fallback) and the form still shows the success screen. For email
delivery, point `CONTACT_WEBHOOK_URL` at an automation that sends the email,
or extend `src/lib/leads.ts` with your SMTP provider.

---

## Payment system

> **Premium-by-design:** the public site never lets a random visitor buy the
> program. Payment happens only **after qualification + an approved
> proposal**, via a **private signed payment link** issued by you.

### How it works (flow)

1. Prospect completes the qualification form (`/contact`).
2. You review & approve, then create an invoice + **private payment link**
   through the admin API (below).
3. You send the client their secure link: `/{locale}/payment?token=…`.
4. The client picks a method (card / PayPal / bank transfer / Cash Plus).
5. Online payments are confirmed by **webhook**; manual payments are marked
   **“Pending verification”** until **you** verify them.
6. Success/cancel pages + status tracking; onboarding starts after payment is
   confirmed/verified.

The **amount and currency are stored inside a signed token** (HMAC), so they
**cannot be changed in the browser**. Sessions are always created
server-side. Requires `PAYMENT_LINK_SECRET` (a long random string).

### Creating a private payment link (admin API)

Protect the admin API with `ADMIN_API_TOKEN`, then:

```bash
curl -X POST "$SITE/api/admin/payments" \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "ref": "INV-001",
    "client": "Acme SARL",
    "offer": "HighSysteme 90 — Initial deposit",
    "amountMinor": 3000000,      // 30,000.00 in minor units (centimes)
    "currency": "MAD",
    "type": "deposit"            // full | deposit | first_monthly | three_month_subscription | custom_installment
  }'
# → returns a signed token + ready-to-send links for fr / en / ar
```

Other admin actions:
- `verify_manual` — mark a manual (bank/Cash Plus) payment as paid after you
  check the receipt: `{"action":"verify_manual","ref":"INV-001"}`
- `update_status` — set any status:
  `{"action":"update_status","ref":"INV-001","status":"refunded"}`
- `GET /api/admin/payments` — list all payments + audit log (export).

> **Data storage:** payments/audit are stored via `src/lib/store.ts` (a
> simple JSON file store) for development. Serverless platforms have an
> ephemeral/read-only filesystem — **for production, replace `store.ts` with a
> real database** (Postgres/Supabase/PlanetScale/Notion). Everything is
> isolated in that one file. Receipt uploads should likewise go to object
> storage (S3/R2) in production (see `src/app/api/payment/manual/route.ts`).

### Activating Stripe

1. Create a Stripe account and get your keys.
2. In `.env.local` (use **test** keys first):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Add a webhook endpoint in Stripe pointing to
   `https://yourdomain.com/api/payment/stripe/webhook` and subscribe to
   `checkout.session.completed`, `checkout.session.expired`,
   `payment_intent.payment_failed`.
4. The “Card” method activates automatically once `STRIPE_SECRET_KEY` is set.
   Card details are **never** collected on our server — Stripe’s hosted
   Checkout is used. The webhook (signature-verified) is the source of truth.

### Activating PayPal

1. Create a PayPal app (Sandbox first) and get client ID/secret.
2. In `.env.local`:
   ```
   PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   PAYPAL_ENVIRONMENT=sandbox    # switch to "live" for production
   ```
3. The “PayPal” method activates automatically once both are set.

### Editing bank-transfer information

Set in `.env.local` (shown on the payment page, never hardcoded):
```
BANK_NAME=
BANK_ACCOUNT_HOLDER=
BANK_RIB=
BANK_IBAN=
BANK_SWIFT=
```

### Editing Cash Plus information

```
CASHPLUS_RECIPIENT_NAME=
PAYMENT_SUPPORT_EMAIL=
PAYMENT_SUPPORT_WHATSAPP=
```

### Verifying manual payments

Bank-transfer / Cash Plus clients submit a confirmation (with an optional
receipt: PNG/JPG/PDF, ≤ 5 MB) on the payment page. These are recorded as
**“Pending verification”** and are **never auto-completed**. Verify each one
with the admin `verify_manual` action after checking the receipt.

### Changing currencies

Supported: **MAD**, **EUR**, **USD**. Default via `PAYMENT_CURRENCY`. The
actual amount/currency come from each approved invoice/token (set `currency`
when creating the link). No automatic FX conversion is performed.

### Testing payments before production

- Use **Stripe test mode** (`sk_test_…`) and Stripe’s test cards
  (e.g. `4242 4242 4242 4242`).
- Use **PayPal Sandbox** accounts.
- Full local flow to try: create a link (admin API) → open
  `/{locale}/payment?token=…` → pay (test) → success page; cancel flow →
  cancel page; submit a manual payment → “Pending verification” → verify via
  admin API. The Arabic payment page (`/ar/payment?token=…`) is fully RTL.

### Payment security summary

Server-side session creation · signed/tamper-proof amounts · Stripe webhook
signature verification · Zod validation · upload type/size validation · rate
limiting · duplicate-payment prevention · audit log · no card data stored ·
no secrets in frontend code.

---

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub and import it in Vercel.
2. Add your environment variables (from `.env.example`) in
   **Project → Settings → Environment Variables**. At minimum set
   `NEXT_PUBLIC_SITE_URL`.
3. Deploy. No extra config needed (Next.js is auto-detected).
4. Add the Stripe webhook URL (above) once your domain is live.

### Netlify
1. Import the repo; Netlify detects Next.js (uses the Next runtime).
2. Build command `npm run build`, add env vars in **Site settings →
   Environment variables**.
3. Deploy.

> Remember: for production payments, swap the JSON store for a database and
> receipts to object storage (see the payment section).

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript (tsc --noEmit)
```

---

## Important legal note

The privacy policy, terms & conditions, and **payment terms** included in
this project are **editable placeholders**, not final legal advice. Before
launch, you (the owner) and a **qualified professional** must review and
complete: payment schedule, minimum engagement, deposits, late payments,
refund/cancellation rules, tax information, service activation, governing law,
and all company registration details.

Payment accounts must be opened and operated by an eligible legal business
owner, in accordance with each payment provider’s terms and local law. No
company address, registration, tax, or financial data is fabricated anywhere
in this project — fill in real values in `src/config/site.ts` and your
environment variables when ready.
```
