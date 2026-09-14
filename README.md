# 30-Lesson DanceSport Plan

Current release: **v1.1.4**

The tracker is a public web app with a shared Supabase database. Its four synchronized views are Detailed Plan, Lesson Summary, Phase Map, and Lesson Notes.

## Project records

- [Change log](./CHANGELOG.md) — stable release history.
- [Reproduction guide](./REPRODUCE.md) — how to rebuild the app and its database.
- [`supabase/migrations/`](./supabase/migrations/) — database schema history.
- [`supabase.sql`](./supabase.sql) — current complete schema, retained as a convenient reference.

The live app uses anonymous Supabase sign-in, so instructors do not need individual email accounts. Progress is stored in `progress_entries` and `task_statuses`; the app’s lesson summaries and phase progress are derived from those shared records.
