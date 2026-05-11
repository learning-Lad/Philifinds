-- PhiliFinds Supabase schema + RLS policies
-- Run this in the Supabase SQL editor.

-- =========================================================
-- ITINERARIES
-- =========================================================
create table if not exists public.itineraries (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  destination   text not null,
  budget        numeric not null,
  duration      text not null,
  group_size    text not null,
  travel_style  text not null,
  daily_plan    jsonb not null default '[]'::jsonb,
  status        text not null default 'draft'
                check (status in ('draft','in-progress','completed')),
  is_public     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists itineraries_user_id_idx on public.itineraries(user_id);
create index if not exists itineraries_is_public_idx on public.itineraries(is_public);

alter table public.itineraries enable row level security;

-- Owners can fully manage their own rows
drop policy if exists "itineraries_owner_all" on public.itineraries;
create policy "itineraries_owner_all"
  on public.itineraries
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Anyone can read public itineraries (shared trip view)
drop policy if exists "itineraries_public_read" on public.itineraries;
create policy "itineraries_public_read"
  on public.itineraries
  for select
  using (is_public = true);

-- =========================================================
-- EMERGENCY TICKETS
-- =========================================================
create table if not exists public.emergency_tickets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  location    text not null,
  type        text not null,
  status      text not null default 'pending'
              check (status in ('urgent','pending','resolved')),
  message     text not null,
  contact     text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists emergency_tickets_user_id_idx on public.emergency_tickets(user_id);
create index if not exists emergency_tickets_status_idx on public.emergency_tickets(status);

alter table public.emergency_tickets enable row level security;

-- Users can insert and read their own tickets
drop policy if exists "emergency_owner_select" on public.emergency_tickets;
create policy "emergency_owner_select"
  on public.emergency_tickets
  for select
  using (auth.uid() = user_id);

drop policy if exists "emergency_owner_insert" on public.emergency_tickets;
create policy "emergency_owner_insert"
  on public.emergency_tickets
  for insert
  with check (auth.uid() = user_id);

-- Admin updates flow through the service role key, which bypasses RLS.

-- =========================================================
-- updated_at trigger
-- =========================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists itineraries_set_updated_at on public.itineraries;
create trigger itineraries_set_updated_at
  before update on public.itineraries
  for each row execute function public.set_updated_at();

drop trigger if exists emergency_set_updated_at on public.emergency_tickets;
create trigger emergency_set_updated_at
  before update on public.emergency_tickets
  for each row execute function public.set_updated_at();
