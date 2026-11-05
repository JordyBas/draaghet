-- DRAAGHET Makers Studio v2. REVIEW AND RUN IN SUPABASE SQL EDITOR.
-- This migration is NOT automatically applied by publishing GitHub.
begin;
alter table public.ideas add column if not exists terms_version text;
alter table public.ideas add column if not exists terms_accepted_at timestamptz;
alter table public.ideas add column if not exists adult_declared_at timestamptz;
alter table public.ideas add column if not exists published_at timestamptz;
alter table public.ideas add column if not exists expires_at timestamptz;
alter table public.ideas drop constraint if exists ideas_terms_version_valid;
alter table public.ideas add constraint ideas_terms_version_valid check (terms_version is null or terms_version = '0.4');
create or replace function public.ideas_before_insert_guard()
returns trigger language plpgsql security definer set search_path = '' as $
begin
 if auth.uid() is null or new.user_id is distinct from auth.uid() then
   raise exception 'Authentication required';
 end if;
 if (select email_confirmed_at from auth.users where id = auth.uid()) is null then
   raise exception 'Confirmed email required';
 end if;
 if new.terms_version is distinct from '0.4' then
   raise exception 'Current terms acceptance required';
 end if;
 if length(btrim(new.title)) not between 1 and 120 or length(btrim(new.description)) not between 1 and 5000 then
   raise exception 'Invalid idea length';
 end if;
 new.terms_accepted_at := now();
 new.adult_declared_at := now();
 new.status := 'received';
 new.published_at := null;
 new.expires_at := null;
 return new;
end; $$;
drop trigger if exists ideas_consent_before_insert on public.ideas;
drop trigger if exists ideas_before_insert_guard on public.ideas;
create trigger ideas_before_insert_guard before insert on public.ideas
for each row execute function public.ideas_before_insert_guard();
alter table public.ideas enable row level security;
revoke insert, update, delete on public.ideas from anon, authenticated;
grant insert (user_id,title,description,terms_version) on public.ideas to authenticated;
-- Existing own-row SELECT and INSERT RLS policies must be verified before release.
-- Only trusted back-office service may set published_at / expires_at.
create table if not exists public.idea_files (
 id uuid primary key default gen_random_uuid(),
 idea_id uuid not null references public.ideas(id) on delete cascade,
 user_id uuid not null references auth.users(id),
 storage_path text not null unique,
 original_name text not null,
 mime_type text not null,
 byte_size integer not null check (byte_size > 0 and byte_size <= 10485760),
 scan_status text not null default 'pending' check (scan_status in ('pending','clean','blocked')),
 created_at timestamptz not null default now()
);
alter table public.idea_files enable row level security;
revoke all on public.idea_files from anon, authenticated;
grant select on public.idea_files to authenticated;
drop policy if exists idea_files_owner_select on public.idea_files;
create policy idea_files_owner_select on public.idea_files for select to authenticated
using (user_id = (select auth.uid()) and exists
 (select 1 from public.ideas i where i.id=idea_id and i.user_id=(select auth.uid())));
-- Uploads must use an authenticated server/Edge Function with file signature checks,
-- malware scanning, quotas and cleanup. No direct browser Storage write policy.
insert into storage.buckets (id,name,public,file_size_limit)
values ('maker-ideas','maker-ideas',false,10485760)
on conflict (id) do update set public=false,file_size_limit=10485760;
-- No storage.objects policies are added here: private by default.
commit;
