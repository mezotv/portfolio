# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single Next.js 16 (App Router) portfolio site. The package manager is **Bun** (see `bun.lock`); always use `bun`, not npm/pnpm.

### Services
- **Web app** (only service): Next.js dev server on `http://localhost:3000`.

### Commands
- Run dev: `bun run dev` (Turbopack). Standard scripts are in `package.json` (`dev`, `build`, `start`).
- Lint/format: this project uses **Biome via Ultracite**, not ESLint. Use `bun x ultracite check` (lint) and `bun x ultracite fix` (autofix). The `lint` npm script (`eslint`) is vestigial — there is no ESLint config. Note: `bun x ultracite check` reports pre-existing diagnostics in the repo and still exits 0.
- Build: `bun run build`.

### Non-obvious caveats
- External data sources (MarbleCMS via `MARBLE_API_KEY`, GitHub sponsors via `GITHUB_TOKEN`) are optional. Without keys, `lib/marble/*` and `lib/github/sponsors.ts` catch errors and return empty results, so dev/build still succeed. During `bun run build` you will see logged MarbleCMS fetch failures — these are expected without `MARBLE_API_KEY` and do not fail the build.
- Copy `.env.example` to `.env` only if you need live blog/sponsor content; it is not required to run, build, or test the site.
- `afterFileEdit` hook (`.cursor/hooks.json`) runs `bun x ultracite fix` automatically after edits.
