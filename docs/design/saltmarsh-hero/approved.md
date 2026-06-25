# Approved design — Saltmarsh landing-page hero

**Approved by the customer on the running canvas** (brownfield live-edit; the customer
approved the hero rendered live, not a description). Single screen, responsive web,
light theme. Personality: warm · crafted · calm.

## What was approved
A landing-page hero for the Saltmarsh small-batch coffee roaster:
- **Slim masthead** with the "Saltmarsh" wordmark + a clay dot.
- **Copy column, presented as a warm cream card** (rounded 20px, hairline border, generous padding):
  - clay eyebrow — "Small-batch coffee roasters"
  - serif headline — *"Coffee roasted slowly, by the marsh."* ("by the marsh" in warm italic), large and confident
  - short, calm subhead
  - **one** primary call-to-action — **"Buy now"** (placeholder `href="#shop"`)
  - a quiet reassurance line — "Roasted to order · free UK shipping over £30"
- **Product image area** — an illustrated kraft coffee bag (inline SVG, theme-aware) on a
  warm radial panel, with a "Roasted this week" tag chip.

## Key decisions made at the canvas
1. Warm cream paper, espresso ink, one clay accent at ~10% weight (60-30-10); OKLCH tokens.
2. Type: **Spectral** (display serif) + **Hanken Grotesk** (body) — considered, non-reflex choices.
3. Headline made noticeably larger and more confident (heavier weight, tighter spacing) and the
   background warmed for a cosier feel, per customer direction.
4. Primary CTA label iterated "Shop the coffee" → "Order now" → **"Buy now"** (final, customer's choice).
5. Copy column restyled into a warm cream card (customer direct-edit on the canvas), expressed as the
   theme-aware `--copy-card` token (≈ #f0e9dd) rather than a raw hex.

## Quality read (advisory)
Design jury verdict: **PASSED-WITH-FINDINGS** (clarity 5, hierarchy 5, accessibility 4, consistency 5;
no anti-slop hits; mobile/tablet/desktop all hold). Two raised items were addressed before sign-off:
- Muted text token darkened oklch(0.41 → 0.38) for comfortable AA margin on the cream card.
- Design record aligned to the "Buy now" label.

## Build acceptance notes for the build team
- **Routing:** the design preview points `web/src/main.jsx` at `SaltmarshHero` so the canvas could
  render it live. **The tide-now app (`web/src/App.jsx` + its components) is untouched on disk.**
  Wire Saltmarsh behind proper routing (or its own entry) rather than replacing the shared mount —
  do **not** ship the main.jsx mount swap as-is.
- **Primary CTA destination:** "Buy now" uses placeholder `href="#shop"` — wire it to the real
  order/shop destination.
- **Product image:** currently an inline SVG illustration (always renders, no network dependency).
  If a real bean/bag photo is wanted later, swap the figure's SVG for an `<img>` with proper alt.
- **Snapshot:** `.preview/snapshot.png` is a 1x1 placeholder — capture a real render so the next
  review can confirm rendered contrast/spacing visually.

## Convergence (brownfield)
- **Build:** green — `vite build` compiles the edited frontend.
- **Tests:** green — all 80 tests pass under `vitest run` when run in the correct test environment
  (`NODE_ENV=test`, as CI uses). The sandbox shell had `NODE_ENV=production` leaking in, which forces
  React's production build and breaks the test library's `act()`; that is an environment artifact of
  this session, not breakage from the Saltmarsh change and not a stale design-pin.

## Files
- `web/src/saltmarsh/SaltmarshHero.jsx` — the hero component (+ inline SVG product illustration)
- `web/src/saltmarsh/saltmarsh.css` — tokens + styles (OKLCH; --accent/--scale/--density/--motion-mult/data-mode)
- `web/src/main.jsx` — preview mount pointed at Saltmarsh (see routing note above)
- `.preview/design-system.md` — the design foundation
- `.preview/approved.patch` — the diff a worker applies and productionises
