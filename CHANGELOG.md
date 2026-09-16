# Change log

This file records stable versions of the 30-Lesson DanceSport Plan.

## v3.0.5 — 2026-09-16

- Added a lesson-level Status field to the Lesson Notes register.

## v3.0.4 — 2026-09-16

- Renamed the lesson action to Add Note.
- Consolidated Lesson Notes into one row per lesson while retaining the full note and video log.
- Simplified Detailed Plan note history to key takeaways and video links only.

## v3.0.3 — 2026-09-16

- Retained shared lesson dates and instructors after refresh on desktop, laptop, and mobile.
- Restored Lesson Note history in the mobile Detailed Plan view.

## v3.0.2 — 2026-09-16

- Automatically renew anonymous access before loading shared tracker records, preserving shared Lesson Notes in both Detailed Plan and Lesson Notes.

## v3.0.1 — 2026-09-16

- Kept the 30-Lesson DanceSport Plan title on one line for desktop and laptop screens, while retaining the mobile-friendly layout.

## v3.0.0 — 2026-09-16

Stable cross-device release.

- Working version for desktop, laptop, and mobile.
- Includes shared progress tracking, instructor notes, and synchronized Lesson Notes for the team.

## v2.0.5 — 2026-09-16

- Restored the current shared Lesson Notes within each expanded Detailed Plan lesson.

## v2.0.4 — 2026-09-16

- Keeps the latest Lesson Note from each anonymous instructor session and hides overwritten note versions.
- Removes the accidental “anonymous instructor” placeholder from Lesson Notes.

## v2.0.3 — 2026-09-16

- Preserves every saved Lesson Note as a separate shared entry, including notes added from other anonymous instructor sessions.
- Shows the complete shared note history for every lesson in Lesson Notes.

## v2.0.2 — 2026-09-16

- Fixed Lesson Notes for shared lessons: an instructor can now add a note even when another instructor created the earlier lesson record.
- Applied the repair to the published app files used by every lesson.

## v2.0.0 — 2026-09-14

Stable cross-device release.

- Preserves the polished desktop and laptop Detailed Plan experience.
- Adds a dedicated readable mobile Detailed Plan, including compact shared lesson controls and task summaries.
- Synchronizes task status, lesson date, instructor, notes, and named video links through the shared database.
- Keeps Lesson Notes to one meaningful entry per lesson and prevents date-only duplicate entries.
- Uses the shared `julia` app passcode.

## v1.1.11 — 2026-09-14

- Made lesson details display the newest shared team record rather than a device-specific record.
- Added automatic shared-data refreshes while the tracker remains open.

## v1.1.9 — 2026-09-14

- Placed compact phone Lesson Date and Instructor fields on one line with left-aligned date text.

## v1.1.8 — 2026-09-14

- Made the phone Lesson Date and Instructor controls compact, equal-width, and left-aligned.

## v1.1.7 — 2026-09-14

- Restored the untouched desktop Detailed Plan table by hiding mobile-only task summaries outside phone layouts.

## v1.1.6 — 2026-09-14

- Replaced phone Detailed Plan field-label cards with concise, readable task summaries.
- Added mobile cache-versioned assets so updated layouts load reliably on phones.
- Stacked lesson date and instructor fields vertically on small screens.

## v1.1.5 — 2026-09-14

- Redesigned phone Detailed Plan activity cards around concise Item number, duration, and block headers.
- Moved the compact task-status selector into each item header.
- Stacked mobile lesson date and instructor controls for reliable, readable use.

## v1.1.4 — 2026-09-14

- Rebuilt the phone Detailed Plan activity presentation into compact, clearly separated cards.
- Fixed the lesson date and instructor layout with hard mobile width constraints.
- Reduced the visual weight of the task-status selector.

## v1.1.3 — 2026-09-14

- Reworked the phone Lesson Notes view into compact, wrapping records.
- Kept every field visible while preventing long lesson notes and video names from running off-screen.

## v1.1.2 — 2026-09-14

- Fixed the phone Detailed Plan controls so lesson date and instructor fields do not overlap.
- Reduced the phone lesson-header and activity spacing while keeping task details legible.

## v1.1.1 — 2026-09-14

- Condensed the phone Detailed Plan so each activity uses substantially less vertical space.
- Reduced Lesson Notes typography on phones while preserving its labeled table structure.
- Kept the phone Lesson Summary and Phase Map layouts unchanged.

## v1.1.0 — 2026-09-14

- Added a phone-first responsive layout while preserving the laptop and desktop presentation.
- Detailed Plan activities now become labeled, stacked cards on small screens.
- Lesson Notes entries now become labeled, stacked cards on small screens.
- Improved mobile touch targets, filters, lesson controls, notes dialog, summary cards, and phase cards.

## v1.0.0 — 2026-09-14

First published release.

- Public web app hosted through ChatGPT Sites.
- Shared instructor progress stored in Supabase using anonymous sign-in.
- Four synchronized views: Detailed Plan, Lesson Summary, Phase Map, and Lesson Notes.
- Task-level statuses, lesson dates, instructor selection, lesson notes, and named video links.
- Lesson status, activity counts, colors, filters, and summaries derived from the shared records.
- Passcode entry screen for the team.

## Versioning policy

- Increase the first number for a major redesign or a database change that requires special migration care.
- Increase the second number when adding a feature without changing existing behavior.
- Increase the third number for a focused fix or visual adjustment.
