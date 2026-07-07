# Design handoff — Collision test screen

**Status:** approved by the customer exactly as rendered on the canvas; the
independent design-quality jury PASSED (top score on clarity / hierarchy /
accessibility WCAG 2.2 AA / consistency, zero anti-slop hits — full read in
`quality.json`). Saved here automatically the moment the customer approved it.

## What this is
The approved home screen of **tide-now**, a mobile-first tide & safe-crossing
app for outdoor coastal walkers. A single phone screen: a huge tabular current
tide-height reading with a "Rising" trend badge, a "next safe crossing" card,
and a saved-walks list. Rugged / legible / high-contrast utilitarian, light
warm-paper theme for bright-daylight outdoor readability, one hi-vis
safety-orange accent. See `approved.md` for the full rationale and
`design-system.md` for the binding visual contract.

## Build target (greenfield)
- **Mode:** greenfield (`artifact.json` → `mode: greenfield`).
- **Primary artifact:** `current/index.html` — the approved mockup.
- **Binding visual contract:** `design-system.md` (tokens, type, spacing).
- **Worker reads first:** `DESIGN-HANDOFF.md` and `DESIGN-MANIFEST.json` (the
  machine-readable build target — one screen with per-viewport references at
  320/375/390/768/1024/1280/1440/1920 px). Pin `design_sha` over the approved
  deliverable; the delivery verifier attests each (screen, viewport).

## Known follow-up states (must be designed before this goes live)
The approved screen is the populated "all good" success view. Three states it
does not yet cover — build must add them so a failed data fetch can never
silently show stale safety information: **Loading**, **Error / stale-feed**,
and **Empty** (zero saved walks). See `approved.md`.

## Provenance
- Source design (deliverable): `aaaaaaaa-0000-4000-8000-000000000001`
- Approved at: 2026-06-17T07:39:12Z
- Parent design SHA: `ddff104c8cde8b05923ac2d995b2b89af4d70c8b8984ddfec1c5e0a90b98d5ac`
- Lineage thread: `lineage.json`
