-- DRAAGHET. Makers Studio database upgrade (review before executing)
-- Run once in Supabase SQL Editor. Existing data is preserved.
begin;
alter table public.ideas
 add column if not exists terms_version text,
 add column if not exists terms_accepted_at timestamptz;
-- Existing ideas may have been created before consent was recorded.
-- Require consent for all future inserts, without modifying historical rows.
alter table public.ideas drop constraint if exists ideas_terms_version_valid;
alter table public.ideas add constraint ideas_terms_version_valid
 check (terms_version is null or terms_version = '1.0');
alter table public.ideas drop constraint if exists ideas_terms_pair_valid;
alter table public.ideas add constraint ideas_terms_pair_valid
 check ((terms_version is null and terms_accepted_at is null) or (terms_version is not null and terms_accepted_at is not null));
-- The database sets the acceptance timestamp, never the browser.
create or replace function public.ideas_set_consent()
returns trigger language plpgsql set search_path = ''
as $$
begin
 if new.terms_version is distinct from '1.0' then
   raise exception 'Accepted terms version 1.0 is required';
 end if;
 new.terms_accepted_at := now();
 return new;
end;
$$;
drop trigger if exists ideas_consent_before_insert on public.ideas;
create trigger ideas_consent_before_insert
before insert on public.ideas
for each row execute function public.ideas_set_consent();
revoke insert on public.ideas from authenticated;
grant insert (user_id,title,description,terms_version) on public.ideas to authenticated;
-- Confirm RLS stays enabled
alter table public.ideas enable row level security;
commit;
-- After running: verify grants, trigger, RLS and run two-user isolation tests.
