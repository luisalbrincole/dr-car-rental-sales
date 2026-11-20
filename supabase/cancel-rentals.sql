begin;

alter table public.rental_requests
  drop constraint rental_requests_status_check,
  add constraint rental_requests_status_check
    check (status in ('pending', 'approved', 'declined', 'canceled'));

create function public.cancel_rental_request(request_id uuid) returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_fleet_staff() then
    raise insufficient_privilege;
  end if;

  update public.rental_requests
  set status = 'canceled'
  where id = request_id and status = 'approved';
  return found;
end;
$$;

revoke all on function public.cancel_rental_request(uuid) from public, anon;
grant execute on function public.cancel_rental_request(uuid) to authenticated;

commit;
