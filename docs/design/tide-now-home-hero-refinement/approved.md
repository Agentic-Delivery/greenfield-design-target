# Approved — tide-now home screen (hero refinement)

**What was approved:** the refined tide-now home screen, running live in the
canvas. This was a brownfield refinement of the already-shipped screen — the
deliverable is the diff in `approved.patch`, applied to the real Vite + React
frontend in `web/`.

**Platform:** mobile-first phone screen, used outdoors in glare. Personality:
rugged, legible, instrument-grade. Light theme (derived from the sunlight
viewing context). Type and component system unchanged (Saira / Barlow).

## The decisions made at the canvas

1. **More generous vertical rhythm in the hero.** Hero card padding opened up
   (top `22px → 30px`, added a `26px` bottom), the "Current tide height" eyebrow
   now has clear air above the big number (`10px` margin), and the trend pill
   (`8px → 16px`) and the change / high-water row (`16/14px → 24/18px`) each got
   more breathing room. The giant reading no longer feels crammed.

2. **Clearer place → reading → times hierarchy.** The location label was stepped
   down a tier so the tide reading is the unmistakable headline: `19px/700 ink`
   → `17px/600 ink-soft`, with the pin marker tinted in the accent so it still
   reads instantly as "you are here" without competing with the number. The
   reading order now lands as **where → the big number → the supporting times.**
   (Interpretation confirmed with the customer: "the place vs. the big reading",
   not the high-water time row.)

3. **Calmer accent.** The hi-vis safety orange `oklch(0.70 0.18 50)` → a warmer,
   calmer amber `oklch(0.71 0.135 62)` — chroma down ~25% (~56% sat), hue nudged
   warmer. Same glare legibility, much less shout. Still one accent, OKLCH, well
   under 80% saturation, neutrals stay tinted — anti-slop colour floor held.

## Verification at handoff

- **Build:** `vite build` — green (exit 0).
- **Tests:** `vitest run` — all 80 tests green (incl. the 10 TideHero tests).
  Note: the sandbox defaulted `NODE_ENV=production`, which forces React into
  production mode and makes every render-based test throw
  `act(...) is not supported`; running with `NODE_ENV=test` is green. This is an
  environment artifact, not a code or test problem — the worker's CI runs tests
  with the correct env.
- **Advisory design jury:** could not run this session — the subagent service
  returned 529 (overloaded) on three attempts. The read is advisory and never
  blocks; the customer approved the running artifact directly.
- **Viewports:** not independently rendered by the design session (no browser
  tooling reachable from the session shell). The layout is single-column,
  max-width 480px (540px ≥1024px); the edits were vertical spacing, a smaller
  location size, and an accent value — none change reflow or introduce
  horizontal overflow. The customer viewed and approved on the live canvas.

## Build acceptance criteria

- Apply `approved.patch` (touches only `web/src/styles/tokens.css` and
  `web/src/styles/app.css`) — no component logic changes.
- CI must run the test suite with `NODE_ENV=test` (not `production`).
