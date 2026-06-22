# Handoff — tide-now home screen, hero refinement (brownfield)

**What was approved:** a customer-approved refinement of the already-shipped
tide-now home screen, approved live on the design canvas on 2026-06-22.

**Build mode:** brownfield. The build target is the diff in
[`approved.patch`](./approved.patch), applied onto the real Vite + React
frontend in `web/`. There is **no** standalone mockup (`index.html`) — this is a
change against the existing app, not a fresh screen. `artifact.json` records
`mode: brownfield`, `primaryArtifact: approved.patch`, `targetFramework: vite`.

The patch touches only two files and changes no component logic:

- `web/src/styles/tokens.css` — the brand accent token (hi-vis orange →
  calmer warm amber).
- `web/src/styles/app.css` — hero vertical rhythm + the location-label tier.

## The approved decisions

See [`approved.md`](./approved.md) for the full rationale. In short:

1. More generous vertical rhythm in the tide hero (padding, eyebrow air, trend
   pill, change/high-water row).
2. A clearer **place → reading → times** hierarchy — the location label stepped
   down a tier so the big tide reading is the unmistakable headline, the pin
   marker tinted in the accent.
3. A calmer accent — the hi-vis safety orange `oklch(0.70 0.18 50)` refined to a
   warmer, calmer amber `oklch(0.71 0.135 62)` (~25% less chroma). Still one
   accent, OKLCH, well under 80% saturation, neutrals stay tinted.

## Relationship to the base design

This refinement layers **onto** the base design bundle at
`docs/design/tide-now-home/`, which remains the structural reference for the
whole screen (layout, components, per-viewport references, and the loading /
error / empty states). Where they disagree, this refinement is authoritative for
the **hero spacing and the accent token** (`--hue`, `--accent`, `--accent-ink`)
and its [`design-system.md`](./design-system.md) supersedes the accent + hero
rationale in the base bundle's design-system.md.

## Provenance

- Source design handoff: `iterate-on-the-existing-tide-now-home-screen-alr-d04c2fb5`
- Approved at: 2026-06-22T08:19:47Z
- Parent design: `tide-now-home` (see [`lineage.json`](./lineage.json))
- Governing requirement: `REQ-web-tide-home` (v1.1)

## Build acceptance criteria (from the design session)

- Apply `approved.patch` — touches only the two CSS files above, no logic.
- CI must run the test suite with `NODE_ENV=test` (not `production`): the
  React-DOM test renderer throws `act(...) is not supported` under
  `NODE_ENV=production`. The design session confirmed all 80 tests green
  (including the 10 TideHero tests) and `vite build` green under the correct env.
