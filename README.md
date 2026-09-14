# DanceSport 30 Training Tracker

Open `index.html` in a browser for the complete lesson plan and a local persistent draft. Local draft entries survive browser restarts on that device.

For the shared, multi-user tracker:

1. Create a Supabase project and enable **Anonymous Sign-Ins** in Authentication → Providers. This means instructors do not need individual email accounts.
2. Run [`supabase.sql`](./supabase.sql) in its SQL Editor.
3. Open the app. The shared project connection is preconfigured, and each device receives private anonymous access automatically.
4. All progress entries and task statuses are then saved in the shared database and load automatically whenever the app opens.

The shared plan includes three views: granular lesson blocks, lesson summaries, and a phase/principle map. In the Detailed plan, each task has its own status and log. Progress entries retain the date, instructor, status, note, and any number of video links.
