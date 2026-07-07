# Approved design — tide·now homepage update

**Approved:** 2026-07-07
**Source design id:** 84b188f5-6e3c-430f-842a-bd952751e4fa
**Parent design:** tide-now-landing-hero (the Marginalia landing hero shipped in #35)

## What the customer approved
The whole tide·now landing screen as an **in-place update** to the existing homepage — the
previously-approved hero is kept byte-for-byte unchanged, and two new below-the-fold sections
were added in the same Marginalia brand:
1. **How it works** — an editorial three-step row ("Check the window" / "Set off with margin" /
   "Get home dry") under thin clay-numbered rules, not boxed cards.
2. **Ferry-captain testimonial** — a large clay-marked pull-quote (placeholder attribution the
   customer can swap for a real captain).

Both sections work in light and dark, collapse to a single column on phones, and keep all
Marginalia tokens scoped to the landing screen so nothing leaks into the tide app.

## Build target (brownfield)
This is a **brownfield** design (`mode: brownfield`, `targetFramework: vite`). The build target is
the source diff in **`approved.patch`**, applied onto the real React + Vite frontend — there is no
standalone `index.html` to build from. Files the patch touches:
- `web/src/components/LandingHero.jsx`
- `web/src/styles/marginalia.css`

See `approved.md` for the full canvas decisions, the quality read, and the build/test note (the two
deliberately-separate token-scope blocks). The independent design-quality read returned **PASSED**
(full verdict in `quality.json`); provenance/lineage is in `lineage.json`.
