-- TICKORA — Supabase setup
-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query -> paste all -> Run

-- ---------- profiles (extends auth.users) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security-definer helper so RLS policies don't recursively query profiles
create function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create a profile row whenever someone signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- events (site analytics) ----------
create table public.events (
  id bigserial primary key,
  event_type text not null check (event_type in ('page_view','product_view','add_to_cart','quotation_click')),
  product_id int,
  product_name text,
  session_id text not null,
  user_id uuid references auth.users(id),
  user_email text,
  page text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

-- anyone (including logged-out visitors) can log an event
create policy "Anyone can insert events"
  on public.events for insert
  with check (true);

-- only admins can read the analytics
create policy "Admins can view all events"
  on public.events for select
  using (public.is_admin());

create index events_created_at_idx on public.events (created_at desc);
create index events_type_idx on public.events (event_type);

-- ---------- after running this once ----------
-- 1. Go sign up on the live site (account.html) with the email you want as admin.
-- 2. Come back here and run, replacing the email:
--    update public.profiles set is_admin = true where email = 'you@example.com';


-- ==========================================================
-- MIGRATION: newsletter subscribers
-- If you already ran everything above, just run this part on its own
-- (SQL Editor -> New query -> paste only what's below -> Run).
-- ==========================================================

create table public.subscribers (
  id bigserial primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- anyone can subscribe (the public newsletter form uses the anon key)
create policy "Anyone can subscribe"
  on public.subscribers for insert
  with check (true);

-- only admins can see the list
create policy "Admins can view subscribers"
  on public.subscribers for select
  using (public.is_admin());


-- ==========================================================
-- MIGRATION: customers can read their own activity
-- Needed for the "My Account" page (order/quotation history).
-- Run this on its own if you already ran everything above.
-- ==========================================================

create policy "Users can view own events"
  on public.events for select
  using (auth.uid() = user_id);
