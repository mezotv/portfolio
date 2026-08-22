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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
