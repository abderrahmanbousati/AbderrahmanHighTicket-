import fs from 'fs';
import path from 'path';
import type { PaymentStatus, PaymentMethod, PaymentType, Currency } from '@/config/payments';

/**
 * =====================================================================
 * LIGHTWEIGHT JSON STORE (development / prototype)
 * =====================================================================
 * This is a simple file-backed store for payments, manual-payment
 * confirmations, leads and an audit log. It is intended for local
 * development and as a clear integration point.
 *
 * IMPORTANT (production): serverless platforms (Vercel/Netlify) have an
 * ephemeral, often read-only filesystem. Replace these functions with a
 * real database (Postgres, PlanetScale, Supabase, Notion, etc.). Every
 * function is isolated here so you only change this one file.
 */

const DATA_DIR = path.join(process.cwd(), 'data');

export type PaymentRecord = {
  ref: string;
  client: string;
  offer: string;
  amountMinor: number;
  currency: Currency;
  type: PaymentType;
  status: PaymentStatus;
  method?: PaymentMethod;
  providerRef?: string; // e.g. Stripe session id / PayPal order id
  createdAt: string;
  updatedAt: string;
};

export type AuditEntry = {
  at: string;
  action: string;
  ref?: string;
  detail?: Record<string, unknown>;
};

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch {
    /* read-only fs (serverless) — callers handle gracefully */
  }
}

function readJson<T>(file: string, fallback: T): T {
  try {
    const p = path.join(DATA_DIR, file);
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown): boolean {
  try {
    ensureDir();
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

const PAYMENTS_FILE = 'payments.local.json';
const AUDIT_FILE = 'audit.local.json';

export function getPayment(ref: string): PaymentRecord | undefined {
  const all = readJson<PaymentRecord[]>(PAYMENTS_FILE, []);
  return all.find((p) => p.ref === ref);
}

export function listPayments(): PaymentRecord[] {
  return readJson<PaymentRecord[]>(PAYMENTS_FILE, []);
}

export function upsertPayment(record: PaymentRecord): PaymentRecord {
  const all = readJson<PaymentRecord[]>(PAYMENTS_FILE, []);
  const idx = all.findIndex((p) => p.ref === record.ref);
  const now = new Date().toISOString();
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...record, updatedAt: now };
  } else {
    all.push({ ...record, createdAt: record.createdAt || now, updatedAt: now });
  }
  writeJson(PAYMENTS_FILE, all);
  return record;
}

export function recordAudit(entry: Omit<AuditEntry, 'at'>): void {
  const all = readJson<AuditEntry[]>(AUDIT_FILE, []);
  all.push({ at: new Date().toISOString(), ...entry });
  writeJson(AUDIT_FILE, all);
}

export function listAudit(): AuditEntry[] {
  return readJson<AuditEntry[]>(AUDIT_FILE, []);
}
