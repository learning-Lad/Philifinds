import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'philifinds_admin_session';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'philifinds-dev-secret-change-me';
}

export function signAdminToken(email: string): string {
  const payload = `${email}.${Date.now()}`;
  const sig = createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('.');
    if (parts.length !== 3) return false;
    const [email, ts, sig] = parts;
    const expected = createHmac('sha256', getSecret()).update(`${email}.${ts}`).digest('hex');
    const a = Buffer.from(sig, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    // Expire after MAX_AGE
    const age = (Date.now() - Number(ts)) / 1000;
    if (age > MAX_AGE) return false;
    return email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(token);
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
};
