'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lock } from 'lucide-react';
import { adminLoginAction, AdminLoginState } from './actions';

const initialState: AdminLoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#2D4C2D] py-3 text-white shadow-sm transition hover:bg-[#1f361f] disabled:opacity-60"
    >
      {pending ? 'Signing in…' : 'Sign in to Admin'}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(adminLoginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#D9EAD3] bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9EAD3]">
            <Lock className="h-5 w-5 text-[#2D4C2D]" />
          </div>
          <h1 className="text-xl text-[#1A1A1A]">PhiliFinds Admin</h1>
          <p className="text-sm text-[#7AA082]">Restricted portal · staff only</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-[#1A1A1A]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-[#D9EAD3] bg-[#FAF9F6] px-4 py-3 outline-none focus:border-[#7AA082]"
              placeholder="admin@philifinds.ph"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-[#1A1A1A]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-2xl border border-[#D9EAD3] bg-[#FAF9F6] px-4 py-3 outline-none focus:border-[#7AA082]"
              placeholder="••••••••"
            />
          </div>

          {state.error ? (
            <p className="rounded-2xl bg-[#FDECEC] px-4 py-2 text-sm text-[#8B2E2E]">
              {state.error}
            </p>
          ) : null}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
