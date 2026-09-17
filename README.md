# 30-Lesson DanceSport Plan

Current release: **v4.0.0**

The tracker is a public web app with a shared Supabase database. Version 4.0.0 is the stable shared release for desktop, laptop, and mobile use. Its four synchronized views are Detailed Plan, Lesson Summary, Phase Map, and Lesson Notes.

## Solution Overview

<img width="1672" height="941" alt="architecture" src="https://github.com/user-attachments/assets/3c483fb5-dc8d-473f-b229-eca70cc2f94e" />


## Project Documentation

- [Solution documentation](./docs/GITHUB-SOLUTION.md) — scope, success criteria, architecture, implementation, release history, development resources, and future AI capability.
- [Change log](./CHANGELOG.md) — stable release history.
- [Reproduction guide](./REPRODUCE.md) — how to rebuild the app and its database.
- [`supabase/migrations/`](./supabase/migrations/) — database schema history.
- [`supabase.sql`](./supabase.sql) — current complete schema, retained as a convenient reference.

The live app uses anonymous Supabase sign-in, so instructors do not need individual email accounts. Progress is stored in `progress_entries` and `task_statuses`; the app’s lesson summaries and phase progress are derived from those shared records.
