# Handoff — tide·now landing hero (Marginalia brand)

The customer approved a clean single-screen landing hero for the tide·now app, styled with the
committed **Marginalia** brand library. It introduces the app before the live tide view: a quiet
`tide·now` masthead, the headline *"Cross when the tide lets you."*, one supporting line, and a
single primary action ("Check today's crossing") that enters the existing live tide app. Nothing in
the tide app is removed — the hero mounts ahead of it.

## Build target (brownfield)

This is a **brownfield** design: the build target is the patch in this folder, not a standalone page.

- **Apply:** `approved.patch` onto the real frontend (`targetFramework: vite`, the app at `web/`).
- **Files the patch realises:** `web/src/components/LandingHero.jsx`, `web/src/styles/marginalia.css`,
  `web/src/main.jsx`, `web/index.html` (see `design-system.md` for the full mapping).
- There is **no `index.html`** in this bundle — the primary artifact is `approved.patch`.

## Brand

Inherits the committed Marginalia library at `docs/design/brand/` (it does not define a new system).
One muted clay accent used once for emphasis, warm-paper ground, Newsreader (display) + Cabin (body),
OKLCH throughout. Live-tunable tokens are mirrored into `web/src/styles/marginalia.css`.

## Independent quality read (advisory)

Jury verdict **PASSED-WITH-FINDINGS** (clarity 5 · hierarchy 5 · accessibility 5 · consistency 4,
zero anti-slop flags). The customer chose to lock in as-is. Recommended (not required) polish is
recorded in `approved.md` and `quality.json`: put the eyebrow/footnote/headline sizes on the type
scale, drop the unused Saira/Barlow font links left over from the tide app, and remove a ~40px
background sliver below the hero.

## Provenance

- Source design id: `design-a-clean-landing-hero-for-this-app-using-t-904df6b7`
- Deliverable / session: `904df6b7-eeb3-41fc-8ca1-a6719f58fee4`
- Parent: `brief.json` — first design, derived from the captured turn-1 brief (see `lineage.json`).
- Approved at: 2026-07-06T00:05:54Z
