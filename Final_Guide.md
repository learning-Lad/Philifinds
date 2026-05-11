# PhiliFinds — Final Deployment Guide

End-to-end steps to run the Next.js 14 app locally and deploy it to Vercel
with zero surprises. Follow top to bottom.

---

## 0. What you're deploying

- **Path:** `nextjs-migration/`
- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Supabase ·
  Google Gemini · Leaflet/OpenStreetMap · Recharts
- **Routes:**
  - `/login`, `/register`, `/dashboard`, `/itinerary/builder`, `/itinerary/[id]`
  - `/admin/login` → `/admin`, `/admin/analytics`, `/admin/emergency` (cookie-protected by `middleware.ts`)
  - `/api/ai/generate` (Gemini), `/api/emergency` (OSM-backed)

---

## 1. Prerequisites

Install these once:

| Tool | Version | Check |
|---|---|---|
| Node.js | 18.x or 20.x LTS | `node -v` |
| pnpm | 9.x | `pnpm -v` (install: `npm i -g pnpm`) |
| Git | any recent | `git --version` |
| Vercel CLI *(optional)* | latest | `npm i -g vercel` |

You also need accounts on:
- **Supabase** — https://app.supabase.com (free tier)
- **Google AI Studio** — https://aistudio.google.com/app/apikey (free Gemini key)
- **Vercel** — https://vercel.com (free hobby tier)
- **GitHub** — for the repo Vercel deploys from

---

## 2. Get the code

```bash
git clone <your-repo-url> philifinds
cd philifinds/nextjs-migration
pnpm install
```

If `pnpm install` fails on `@google/generative-ai`, run:
```bash
pnpm add @google/generative-ai
pnpm remove openai   # only if it's still listed
```

---

## 3. Create the Supabase project

1. Go to https://app.supabase.com → **New project**.
2. Once it's ready, open **SQL Editor** → **New query**.
3. Paste the entire contents of `nextjs-migration/supabase/schema.sql` → **Run**.
   - Creates `itineraries` + `emergency_tickets` tables, RLS policies, and an `updated_at` trigger.
4. Open **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(server-only, never expose)*
5. Open **Authentication → Providers → Email** and enable email/password.

---

## 4. Get the Gemini API key (free)

1. Visit https://aistudio.google.com/app/apikey.
2. Click **Create API key** → copy it.
3. Save it as `GEMINI_API_KEY`.

---

## 5. Fill in `.env`

Open `nextjs-migration/.env` and replace every placeholder:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Gemini
GEMINI_API_KEY=AIza...

# Admin portal (login at /admin/login)
ADMIN_EMAIL=admin@philifinds.ph
ADMIN_PASSWORD=PickAStrongPassword#123
ADMIN_SESSION_SECRET=run `openssl rand -hex 32` and paste the output

# OSM identifier (for Nominatim rate-limit politeness)
NEXT_PUBLIC_APP_NAME=PhiliFinds
NEXT_PUBLIC_APP_EMAIL=you@example.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate a strong session secret:
```bash
openssl rand -hex 32
```

> ⚠️ `.env` is currently NOT gitignored (you asked for it so testing is easy).
> Before deploying to a **public** repo, edit `nextjs-migration/.gitignore` and
> un-comment the `.env*` lines, then `git rm --cached .env`.

---

## 6. Run locally

```bash
cd nextjs-migration
pnpm dev
```

Open http://localhost:3000.

Smoke test:
1. **Home → Register** a normal user, then log in.
2. Go to `/itinerary/builder` and run the 4-step flow → confirm Gemini returns an itinerary.
3. Open `/admin/login` in an **incognito** window:
   - Wrong creds → "Invalid email or password."
   - Correct creds → redirected to `/admin` with stats cards.
4. Visit `/admin/analytics` and `/admin/emergency` — should render charts and a tickets table (demo rows if the table is empty).
5. Click **Sign out** on the admin page → cookie cleared, back to `/admin/login`.

---

## 7. Type-check and lint before pushing

```bash
pnpm type-check
pnpm lint
```

Fix any errors. **Do not** run `pnpm build` inside the Figma Make environment
(the Vite root would interfere); Vercel will build automatically.

---

## 8. Push to GitHub

From the repo root (not `nextjs-migration/`):

```bash
git add .
git commit -m "PhiliFinds: Gemini + admin portal + Supabase schema"
git push origin master
```

---

## 9. Deploy to Vercel

### Option A — Vercel dashboard (recommended)

1. Go to https://vercel.com/new → **Import** your GitHub repo.
2. **Root Directory:** click **Edit** → select `nextjs-migration`.
3. **Framework Preset:** Next.js (auto-detected).
4. **Build & Output Settings:** leave defaults.
5. **Environment Variables:** add EVERY key from your `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `NEXT_PUBLIC_APP_NAME`
   - `NEXT_PUBLIC_APP_EMAIL`
   - `NEXT_PUBLIC_APP_URL` → set to your final domain (e.g. `https://philifinds.vercel.app`)
6. Click **Deploy**.

### Option B — Vercel CLI

```bash
cd nextjs-migration
vercel login
vercel link
vercel env add GEMINI_API_KEY    # repeat for every variable
vercel --prod
```

---

## 10. Post-deploy checklist

After Vercel finishes:

- [ ] Visit `https://your-app.vercel.app` → home loads.
- [ ] Register a user → confirm they appear in Supabase → **Authentication → Users**.
- [ ] Generate an itinerary → confirm a row in `public.itineraries`.
- [ ] `https://your-app.vercel.app/admin/login` → log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- [ ] Visit `/admin/analytics` → charts render.
- [ ] Visit `/admin/emergency` → table renders.
- [ ] Open DevTools → Application → Cookies → confirm `philifinds_admin_session` is `HttpOnly` and `Secure`.
- [ ] In Supabase → **Settings → API → URL Configuration**, add your Vercel URL to **Site URL** and **Redirect URLs** so auth emails point to production.

---

## 11. Hardening before going public

1. **Re-enable `.env` ignore:**
   ```bash
   # edit nextjs-migration/.gitignore — un-comment the .env lines
   git rm --cached nextjs-migration/.env nextjs-migration/.env.local 2>/dev/null
   git commit -m "Stop tracking env files"
   git push
   ```
2. **Rotate every secret that was ever committed** — Supabase service-role key,
   Gemini key, and the admin password. Git history retains them otherwise.
3. **Pick a strong `ADMIN_PASSWORD`** (16+ chars, mixed) and a fresh
   `ADMIN_SESSION_SECRET` (`openssl rand -hex 32`). Update both in Vercel env.
4. **Restrict the Gemini key** in Google Cloud Console → API key → Application
   restrictions → HTTP referrers → add your Vercel domain.
5. **Verify RLS** in Supabase:
   - Try to read another user's row with the anon key — should return zero rows.
   - `itineraries` rows with `is_public = true` should be readable while signed out.

---

## 12. Common errors and fixes

| Symptom | Fix |
|---|---|
| `Missing env.NEXT_PUBLIC_SUPABASE_URL` at boot | Variable not set in Vercel; redeploy after adding. |
| `/api/ai/generate` returns 500 with "API key not valid" | `GEMINI_API_KEY` is wrong or restricted to a different domain. |
| Admin login accepts credentials but loops back to `/admin/login` | `ADMIN_SESSION_SECRET` differs between build and runtime, or cookie is being stripped. Set the same secret in Vercel and redeploy. |
| Leaflet tiles missing on production | Make sure `leaflet/dist/leaflet.css` is imported in `app/globals.css` or the layout. |
| `Row violates RLS policy` when inserting itinerary | User isn't authenticated, or `user_id` doesn't match `auth.uid()`. |
| Vercel build fails on `next-env.d.ts` | Don't commit it — Next regenerates it. It's already in `.gitignore`. |
| Service role key works locally but not on Vercel | Make sure you added `SUPABASE_SERVICE_ROLE_KEY` to **all** environments (Production + Preview), not just Development. |

---

## 13. Rollback

If a deploy goes wrong:
1. Vercel → **Deployments** → previous green build → **Promote to Production**.
2. If a Supabase migration broke things, restore from **Database → Backups**.

---

You're done. Ping me if any step fails and paste the exact error.
