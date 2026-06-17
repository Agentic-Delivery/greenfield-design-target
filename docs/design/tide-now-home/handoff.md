# Design handoff — tide-now home screen

**Status:** approved by the customer exactly as rendered; independent design-quality
jury PASSED (clarity / hierarchy / accessibility WCAG 2.2 AA / consistency all top
score, zero anti-slop hits — full read in `quality.json`).

## What this is
The approved home screen of **tide-now**, a mobile-first tide & safe-crossing app
for outdoor coastal walkers. A single phone screen: a huge tabular current
tide-height reading with a "Rising" trend badge, a "next safe crossing" card, and
a saved-walks list. Rugged / legible / high-contrast utilitarian, light warm-paper
theme chosen for bright-daylight outdoor readability, one hi-vis safety-orange
accent. See `approved.md` for the full rationale.

## Build target (greenfield)
- **Mode:** greenfield (`artifact.json` → `mode: greenfield`).
- **Primary artifact:** `index.html` (`current/index.html`) — the approved mockup.
- **Binding visual contract:** `design-system.md` (tokens, type, spacing) — wire
  these consistently before building. There is no machine-readable token contract
  (`DESIGN-MANIFEST.json` → `tokenContract: null`); build to `design-system.md`.
- **Framework:** not pinned. The worker chooses the stack at build time (LAW 5);
  the design system + the per-viewport references are the contract, not the source
  shape.
- **Worker reads first:** `DESIGN-HANDOFF.md` (token-extraction-first, screen-file
  routing) and `DESIGN-MANIFEST.json` (the machine-readable build target: one
  screen `index.html` with per-viewport references at 320/375/390/768/1024/1280/
  1440/1920 px). Pin `design_sha` over the approved deliverable; the delivery
  verifier attests the deployed build against each (screen, viewport).

## Known follow-up states (must be designed before this goes live — see `approved.md`)
The approved screen is the populated "all good" success view. Three states it does
NOT yet cover, which the build must add so a failed data fetch can never silently
show stale safety information:
- **Loading** — the live tide feed while fetching (the header says "Live").
- **Error / stale-feed** — when tide data is unreachable or out of date.
- **Empty** — saved-walks list with zero saved walks.

## Provenance
- Source design session: `3147f000-7021-4813-b89a-b89c47a1e123`
- Approved at: 2026-06-17T07:39:12Z
- Parent design SHA: `ddff104c8cde8b05923ac2d995b2b89af4d70c8b8984ddfec1c5e0a90b98d5ac`
- Lineage thread: `lineage.json` (export targets: intake-handoff, worker-build, export-bundle)
