# Reproduce the 30-Lesson DanceSport Plan

This guide recreates the tracker from its source files and a fresh Supabase project.

## What is required

- The complete source folder from a tagged release.
- A Supabase project with Anonymous Sign-Ins enabled.
- A static web host. The production app is currently hosted through ChatGPT Sites.

## Recreate the database

1. Create a Supabase project.
2. In **Authentication → Sign In / Providers**, enable **Anonymous Sign-Ins**.
3. Open **SQL Editor** and run the migration files in `supabase/migrations/` in filename order.
4. Copy the project URL and publishable key into the shared configuration in `supabase-anon.js`.

The publishable key is intended for browser use. Never place a Supabase service-role key in this project or in a public website.

## Recreate the website

1. Keep `index.html`, its JavaScript files, `styles.css`, and `assets/` together.
2. Publish the `dist/` folder as a static website.
3. Verify that the passcode screen appears, then confirm that a test task-status change saves and reloads.

## Restore progress data

The lesson plan content is contained in the app source. Team progress is stored in Supabase in `progress_entries` and `task_statuses`.

Before any major schema or app change, export both tables from the Supabase Table Editor. To restore a historical snapshot, import the exported data into the matching schema version.

## Release checklist

1. Update `CHANGELOG.md`.
2. Create or update a numbered migration for every database schema change.
3. Verify the app locally with the same Supabase project or a test project.
4. Commit the source, create a version tag, and publish that exact commit.
5. Export a backup of the two progress tables before a major release.
