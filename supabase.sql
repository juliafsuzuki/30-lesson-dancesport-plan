-- Run this once in the Supabase SQL Editor before connecting the app.
create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  lesson_id integer not null check (lesson_id between 1 and 30),
  task_index integer not null check (task_index >= 0),
  instructor text not null check (instructor in ('Davit','Filemon','Jed')),
  status text not null check (status in ('not-started','in-progress','completed')) default 'not-started',
  session_date date not null default current_date,
  notes text,
  video_urls text[] default '{}',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Safe migration lines if you ran an earlier version of this schema.
alter table public.progress_entries add column if not exists task_index integer;
alter table public.progress_entries add column if not exists video_urls text[] default '{}';
alter table public.progress_entries drop constraint if exists progress_entries_status_check;
update public.progress_entries
  set task_index = coalesce(task_index, 0),
      status = case status
        when 'mastered' then 'completed'
        when 'confident' then 'completed'
        when 'done' then 'completed'
        when 'needs-review' then 'in-progress'
        when 'practiced' then 'in-progress'
        else status
      end;
alter table public.progress_entries add constraint progress_entries_status_check check (status in ('not-started','in-progress','completed'));

create table if not exists public.task_statuses (
  lesson_id integer not null check (lesson_id between 1 and 30),
  task_index integer not null check (task_index >= 0),
  status text not null check (status in ('not-started','in-progress','completed')),
  updated_at timestamptz not null default now(),
  primary key (lesson_id, task_index)
);
alter table public.task_statuses enable row level security;
create policy "Authenticated team members can view shared task statuses" on public.task_statuses for select to authenticated using (true);
create policy "Authenticated team members can update shared task statuses" on public.task_statuses for all to authenticated using (true) with check (true);

alter table public.progress_entries enable row level security;

-- Allow anonymous signed-in tracker users to reach these tables. Row Level
-- Security policies below still govern what they may do.
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.progress_entries to authenticated;
grant select, insert, update, delete on table public.task_statuses to authenticated;

create policy "Authenticated team members can view shared progress"
  on public.progress_entries for select to authenticated using (true);
create policy "Authenticated team members can log shared progress"
  on public.progress_entries for insert to authenticated with check (auth.uid() = created_by);
create policy "Authors can update their own progress"
  on public.progress_entries for update to authenticated using (auth.uid() = created_by) with check (auth.uid() = created_by);
create policy "Authors can delete their own progress"
  on public.progress_entries for delete to authenticated using (auth.uid() = created_by);

-- This tracker uses Supabase Anonymous Sign-Ins so instructors do not need email
-- addresses. Enable "Anonymous sign-ins" in Authentication > Providers before use.
-- Anonymous users are authenticated users, so the policies above apply to them.
