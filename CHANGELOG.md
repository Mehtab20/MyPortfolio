# Changelog

All notable changes to the Mehtab Akbar Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-07-14

### Added
- **AI Memory System**: Created [AI_CONTEXT.md](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/AI_CONTEXT.md) in the project root to serve as the persistent single source of truth for design patterns, database architecture, technology stack, component inventory, and technical tasks.
- **Supabase Client Setup**: Created and initialized [frontend/src/supabase.js](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/supabase.js) using Vite client-side environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Changelog Tracker**: Initialized [CHANGELOG.md](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/CHANGELOG.md) to record development phases and system changes chronologically.

### Changed
- **Unified Contacts Schema**: Replaced the mismatched `messages` table with the `contacts` table across database architectures:
  - Updated PostgreSQL [database/schema.sql](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/database/schema.sql) columns to `id`, `full_name`, `email`, `subject`, `message`, `created_at`.
  - Updated SQLite [database/sqlite_schema.sql](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/database/sqlite_schema.sql) to mirror the new PostgreSQL table definitions.
  - Refactored [backend/controllers/messageController.js](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/backend/controllers/messageController.js) to insert contact requests into the `contacts` table.
- **Implemented Supabase client queries**:
  - Rewrote [frontend/src/api/index.js](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/api/index.js) fetching logic for `fetchCV()`, `fetchProjects()`, and `submitContactMessage()` to pull and send data directly from/to the Supabase client.
- **Dynamic Projects Grid**: Connected [frontend/src/components/Projects.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Projects.jsx) to `fetchProjects()`.
  - Implemented dynamic fallback list if the database is unpopulated or fetch fails.
  - Added smart screenshot helper mapping database project titles to local static asset icons (`project-complaint.png`, `project-food.png`, `project-library.png`).
