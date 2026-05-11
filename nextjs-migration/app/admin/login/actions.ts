'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, ADMIN_COOKIE_OPTIONS, signAdminToken } from '@/lib/admin-auth';

export type AdminLoginState = { error?: string };

export async function adminLoginAction(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || '';

  if (!expectedEmail || !expectedPassword) {
    return { error: 'Admin credentials are not configured on the server.' };
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return { error: 'Invalid email or password.' };
  }

  const token = signAdminToken(email);
  cookies().set(ADMIN_COOKIE, token, ADMIN_COOKIE_OPTIONS);
  redirect('/admin');
}

export async function adminLogoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect('/admin/login');
}
