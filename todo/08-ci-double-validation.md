# 08 — CI validates twice

**Status:** open
**Risk:** wasted CI time, no functional impact
**Area:** `.github/workflows/deploy-pages.yml`, `scripts/build.mjs`

## Problem

Every CI run executes content validation twice: once as an explicit CI step and
again inside the build script.

## Evidence

- `.github/workflows/deploy-pages.yml:35` runs `npm run validate`.
- `scripts/build.mjs:9` runs `npm run validate` before the Astro build.

## Proposed action

Pick one:

1. Remove the standalone CI step and rely on the build script (keeps local
   `npm run build` semantics).
2. Add a `--skip-validate` flag to `build.mjs` and pass it from CI.

Option 1 is a two-line change and keeps behavior identical.

## Verification

- Push to a branch/PR and confirm the Pages workflow still fails on a
  deliberately invalid content change.
- Local `npm run build` still validates.
