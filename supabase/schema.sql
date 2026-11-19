begin;

create extension if not exists btree_gist with schema extensions;

create table public.staff_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner', 'staff'))
);
create unique index staff_accounts_single_owner on public.staff_accounts (role) where role = 'owner';
alter table public.staff_accounts enable row level security;
revoke all on public.staff_accounts from anon, authenticated;
grant select on public.staff_accounts to authenticated;
create policy "Staff can check their own access" on public.staff_accounts
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_fleet_staff() returns boolean
language sql stable set search_path = ''
as $$
  select exists (
    select 1 from public.staff_accounts where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_fleet_staff() from public, anon;
grant execute on function public.is_fleet_staff() to authenticated;


create function public.list_fleet_staff() returns table (user_id uuid, email text, role text)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.staff_accounts s where s.user_id = auth.uid() and s.role = 'owner') then
    raise insufficient_privilege;
  end if;
  return query
    select s.user_id, u.email::text, s.role from public.staff_accounts s
    join auth.users u on u.id = s.user_id order by s.role, u.email;
end;
$$;

create function public.grant_fleet_staff(staff_email text) returns boolean
language plpgsql security definer set search_path = ''
as $$
declare
  staff_id uuid;
begin
  if not exists (select 1 from public.staff_accounts s where s.user_id = auth.uid() and s.role = 'owner') then
    raise insufficient_privilege;
  end if;

  select u.id into staff_id from auth.users u
  where lower(u.email) = lower(trim(staff_email)) and u.email_confirmed_at is not null
    and exists (
      select 1 from auth.identities i where i.user_id = u.id and i.provider = 'google'
        and lower(i.identity_data->>'email') = lower(u.email)
        and i.identity_data->>'email_verified' = 'true'
    );
  if staff_id is null then
    return false;
  end if;
  insert into public.staff_accounts (user_id) values (staff_id) on conflict do nothing;
  return true;
end;
$$;

create function public.revoke_fleet_staff(staff_id uuid) returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.staff_accounts s where s.user_id = auth.uid() and s.role = 'owner') then
    raise insufficient_privilege;
  end if;
  delete from public.staff_accounts where user_id = staff_id and role = 'staff';
  return found;
end;
$$;

revoke all on function public.list_fleet_staff(), public.grant_fleet_staff(text),
  public.revoke_fleet_staff(uuid) from public, anon;
grant execute on function public.list_fleet_staff(), public.grant_fleet_staff(text),
  public.revoke_fleet_staff(uuid) to authenticated;

create table public.fleet (
  id text primary key,
  details jsonb not null,
  created_at timestamptz not null default now(),
  version uuid not null default gen_random_uuid()
);
alter table public.fleet enable row level security;
revoke all on public.fleet from anon, authenticated;
grant select on public.fleet to anon, authenticated;
grant insert (id, details), update (details, version) on public.fleet to authenticated;
create policy "Public inventory" on public.fleet for select to anon, authenticated using (true);
create policy "Staff add inventory" on public.fleet for insert to authenticated
  with check ((select public.is_fleet_staff()));
create policy "Staff edit inventory" on public.fleet for update to authenticated
  using ((select public.is_fleet_staff())) with check ((select public.is_fleet_staff()));

create table public.rental_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null default auth.uid() references auth.users(id),
  contact_email text not null default (auth.jwt()->>'email'),
  vehicle_id text not null references public.fleet(id),
  pickup date not null,
  return_date date not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  check (return_date > pickup),
  exclude using gist (vehicle_id with =, daterange(pickup, return_date, '[)') with &&)
    where (status = 'approved')
);
create unique index rental_requests_one_pending_per_trip
  on public.rental_requests (customer_id, vehicle_id, pickup, return_date)
  where status = 'pending';
alter table public.rental_requests enable row level security;
revoke all on public.rental_requests from anon, authenticated;
grant select on public.rental_requests to authenticated;
grant insert (vehicle_id, pickup, return_date), update (status) on public.rental_requests to authenticated;
create policy "Customers see their own requests and staff see all" on public.rental_requests
  for select to authenticated using (customer_id = (select auth.uid()) or (select public.is_fleet_staff()));
create policy "Customers request available rentals" on public.rental_requests
  for insert to authenticated with check (
    customer_id = (select auth.uid()) and status = 'pending'
    and pickup >= (now() at time zone 'America/Santo_Domingo')::date
    and exists (
      select 1 from public.fleet
      where id = vehicle_id and details->>'type' = 'rental' and details->>'available' = 'true'
    )
  );
create policy "Staff review pending requests" on public.rental_requests
  for update to authenticated using (status = 'pending' and (select public.is_fleet_staff()))
  with check ((select public.is_fleet_staff()) and (
    status = 'declined' or (status = 'approved'
      and pickup >= (now() at time zone 'America/Santo_Domingo')::date
      and exists (select 1 from public.fleet where id = vehicle_id
        and details->>'type' = 'rental' and details->>'available' = 'true'))
  ));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vehicle-photos', 'vehicle-photos', true, 3145728, array['image/jpeg', 'image/png', 'image/webp']);
create policy "Staff upload vehicle photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'vehicle-photos' and (select public.is_fleet_staff()));
create policy "Staff manage vehicle photos" on storage.objects for select to authenticated
  using (bucket_id = 'vehicle-photos' and (select public.is_fleet_staff()));
create policy "Staff remove vehicle photos" on storage.objects for delete to authenticated
  using (bucket_id = 'vehicle-photos' and (select public.is_fleet_staff()));

insert into public.fleet (id, details)
select id, details from jsonb_to_recordset($fleet$[
{"id":"hyundai-tucson-2023","details":{"title":"Hyundai Tucson 2023","brand":"Hyundai","model":"Tucson","year":2023,"type":"rental","pricePerDay":68,"salePrice":null,"transmission":"Automatic","seats":5,"fuelType":"Gasoline","mileage":18500,"location":"Santo Domingo","description":"Comfortable SUV with strong air conditioning, roomy luggage space, and airport delivery available.","available":true,"imageUrl":"https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80"}},
{"id":"kia-picanto-2022","details":{"title":"Kia Picanto 2022","brand":"Kia","model":"Picanto","year":2022,"type":"rental","pricePerDay":38,"salePrice":null,"transmission":"Automatic","seats":5,"fuelType":"Gasoline","mileage":24100,"location":"Punta Cana","description":"Easy city car for visitors who want simple parking, great fuel economy, and quick pickup near hotels.","available":true,"imageUrl":"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"}},
{"id":"toyota-rav4-2021","details":{"title":"Toyota RAV4 2021","brand":"Toyota","model":"RAV4","year":2021,"type":"rental","pricePerDay":74,"salePrice":null,"transmission":"Automatic","seats":5,"fuelType":"Hybrid","mileage":32600,"location":"Las Americas Airport","description":"Reliable hybrid SUV for long drives across the island, from Santo Domingo to Samana or Puerto Plata.","available":false,"imageUrl":"https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80"}},
{"id":"honda-civic-2020","details":{"title":"Honda Civic 2020","brand":"Honda","model":"Civic","year":2020,"type":"sale","pricePerDay":null,"salePrice":18900,"transmission":"Automatic","seats":5,"fuelType":"Gasoline","mileage":51200,"location":"Santiago","description":"Clean sedan with service history, smooth drive, and paperwork ready for serious buyers.","available":true,"imageUrl":"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"}},
{"id":"ford-ranger-2019","details":{"title":"Ford Ranger 2019","brand":"Ford","model":"Ranger","year":2019,"type":"sale","pricePerDay":null,"salePrice":27500,"transmission":"Automatic","seats":5,"fuelType":"Diesel","mileage":68400,"location":"La Romana","description":"Durable pickup for business, family, or countryside travel with excellent ground clearance.","available":true,"imageUrl":"https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=80"}},
{"id":"nissan-frontier-2021","details":{"title":"Nissan Frontier 2021","brand":"Nissan","model":"Frontier","year":2021,"type":"sale","pricePerDay":null,"salePrice":31900,"transmission":"Automatic","seats":5,"fuelType":"Diesel","mileage":44350,"location":"Santo Domingo Este","description":"Strong pickup in excellent condition, ideal for construction teams, farms, and weekend trips.","available":true,"imageUrl":"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"}}
]$fleet$::jsonb) as seed(id text, details jsonb);


commit;
