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


-- ==========================================================
-- MIGRATION: admin-managed product catalog
-- Moves products out of code and into the database so the admin
-- dashboard can add/edit/delete watches and update stock directly.
-- Run this on its own if you already ran everything above.
-- ==========================================================

create table public.products (
  id bigserial primary key,
  name_en text not null,
  name_ar text not null,
  desc_en text not null,
  desc_ar text not null,
  tag_en text default '',
  tag_ar text default '',
  price numeric not null,
  stock text not null default 'in' check (stock in ('in','low','out')),
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- anyone can browse the catalog
create policy "Anyone can view products"
  on public.products for select
  using (true);

-- only admins can add/edit/delete
create policy "Admins can insert products"
  on public.products for insert
  with check (public.is_admin());
create policy "Admins can update products"
  on public.products for update
  using (public.is_admin());
create policy "Admins can delete products"
  on public.products for delete
  using (public.is_admin());

-- storage bucket for admin-uploaded product photos
insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view product photos"
  on storage.objects for select
  using (bucket_id = 'product-photos');

create policy "Admins can upload product photos"
  on storage.objects for insert
  with check (bucket_id = 'product-photos' and public.is_admin());

create policy "Admins can update product photos"
  on storage.objects for update
  using (bucket_id = 'product-photos' and public.is_admin());

create policy "Admins can delete product photos"
  on storage.objects for delete
  using (bucket_id = 'product-photos' and public.is_admin());

-- seed the 6 existing watches (their photos come across as the same
-- embedded images already in the site, so nothing looks different)
insert into public.products (name_en, name_ar, desc_en, desc_ar, tag_en, tag_ar, price, stock, photo_url, sort_order) values
('Emerald Openheart', 'زمردية القلب المفتوح', 'Green sunburst dial, open-heart movement, cognac leather.', 'قرص أخضر متوهج، حركة القلب المفتوح، جلد كونياك.', 'Best Seller', 'الأكثر مبيعًا', 349, 'in', 'assets/web/product-1.jpg', 1),
('Twilight Moonphase', 'توايلايت مونفيز', 'Two-tone case, moonphase complication, navy alligator strap.', 'هيكل ثنائي اللون، ميزة طور القمر، سوار تمساح كحلي.', '', '', 389, 'in', 'assets/web/product-2.jpg', 2),
('Sapphire Moonphase', 'سفاير مونفيز', 'Steel-and-gold case, deep blue dial, moonphase sub-dial.', 'هيكل ستيل وذهبي، قرص أزرق داكن، لوحة فرعية لطور القمر.', 'New', 'جديد', 389, 'in', 'assets/web/product-3.jpg', 3),
('Emerald Moonphase', 'إيميرالد مونفيز', 'Rose gold case, green dial, moonphase, brown leather.', 'هيكل ذهبي وردي، قرص أخضر، طور القمر، جلد بني.', '', '', 399, 'in', 'assets/web/product-4.jpg', 4),
('Ocean Moonphase', 'أوشن مونفيز', 'Rose gold case, blue dial, moonphase, textured leather strap.', 'هيكل ذهبي وردي، قرص أزرق، طور القمر، سوار جلد منقوش.', 'Limited', 'إصدار محدود', 399, 'low', 'assets/web/product-5.jpg', 5),
('Ivory Classic', 'آيفوري كلاسيك', 'Roman numeral dial, gold hands, brown leather, dress-watch build.', 'قرص بأرقام رومانية، عقارب ذهبية، جلد بني، تصميم ساعة رسمية.', '', '', 299, 'in', 'assets/web/product-6.jpg', 6);


-- ==========================================================
-- MIGRATION: numeric stock quantity + atomic decrement on add-to-cart
-- Admins now type an actual count instead of picking in/low/out; the
-- badge status (in/low/out) is derived from that number automatically.
-- Run this on its own if you already ran everything above.
-- ==========================================================

alter table public.products add column if not exists stock_qty integer not null default 0;

-- backfill existing rows from their current badge status (only touches
-- rows still at the default 0, so re-running this is safe)
update public.products set stock_qty = case stock
  when 'out' then 0
  when 'low' then 3
  else 20
end
where stock_qty = 0;

-- atomically take one unit off the shelf; runs as the table owner so a
-- plain customer can call it without needing broad update rights on
-- the products table, and the WHERE guard stops it going negative
create or replace function public.decrement_stock(p_product_id bigint)
returns void
language sql
security definer
set search_path = public
as $$
  update public.products
  set stock_qty = stock_qty - 1,
      stock = case
        when stock_qty - 1 <= 0 then 'out'
        when stock_qty - 1 <= 3 then 'low'
        else 'in'
      end
  where id = p_product_id and stock_qty > 0;
$$;

grant execute on function public.decrement_stock(bigint) to anon, authenticated;
