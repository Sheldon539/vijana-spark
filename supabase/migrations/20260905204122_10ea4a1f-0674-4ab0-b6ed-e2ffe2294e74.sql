create or replace function public.claim_first_admin()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    return 'not_signed_in';
  end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    if exists (select 1 from public.user_roles where role = 'admin' and user_id = uid) then
      return 'already_admin';
    end if;
    return 'admin_exists';
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin')
  on conflict (user_id, role) do nothing;
  return 'granted';
end;
$$;

revoke all on function public.claim_first_admin() from public;
grant execute on function public.claim_first_admin() to authenticated;