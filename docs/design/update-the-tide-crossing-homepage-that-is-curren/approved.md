# Approved — tide·now homepage: added "How it works" + ferry-captain testimonial

**What the customer approved:** the whole landing screen, exactly as rendered on the
canvas — the existing hero kept unchanged, plus two new sections added below it in the
same Marginalia brand. This is an in-place update to the existing homepage — no new
product, no separate page.

## Brownfield live-edit
The running React + Vite landing page was edited in place. The approved deliverable is
the diff of those source edits, captured in `approved.patch`. Files touched:
- `web/src/components/LandingHero.jsx`
- `web/src/styles/marginalia.css`

## What was added (below the untouched hero)
1. **How it works** — a small "How it works" eyebrow, the line *"Read the water in
   three steps."*, then three editorial step columns under thin clay-numbered rules
   (not boxed cards):
   - **01 · Check the window** — see today's safe crossing times, read live from the causeway tide feed.
   - **02 · Set off with margin** — cross while the road is dry, with time before the tide turns.
   - **03 · Get home dry** — know your last safe return, so the sea never sets your schedule.
2. **Ferry-captain testimonial** — a large clay-marked pull-quote:
   *"Thirty years I've watched folk gamble on the tide. This is the first thing I'd put
   in a visitor's hand — it tells you the one thing that matters: when the road is yours,
   and when it belongs to the sea."* — attributed to **Eddie Douglas, Ferryman, Holy
   Island crossing**. (A placeholder name/quote — the customer can swap in a real captain
   they have in mind.)

## Decisions made at the canvas
- The hero is byte-for-byte unchanged: same headline, same single CTA, still fills the
  first screen. The new sections flow beneath it (below the fold).
- The new sections are built to the committed Marginalia brand — same clay accent, same
  Newsreader/Cabin type, the hero's exact eyebrow hairline — so they read as one product.
- Steps use thin top rules and clay numerals rather than repeated cards, keeping the
  editorial, whitespace-driven feel.
- Both sections work in light and dark and collapse to a single column on phones.
- All Marginalia tokens stay scoped to the landing screen, so nothing leaks into the
  tide app itself.

## Quality read (advisory, independent)
`design-quality-gate` returned **PASSED** — 5/5 clarity, visual hierarchy, accessibility
(WCAG 2.2 AA, light + dark), and consistency; zero anti-slop findings; cross-viewport
holds at mobile / tablet / desktop. Full machine-readable verdict in `quality.json`.

## Build / test convergence
- Build: `npm run build` (vite build) — exit 0.
- Tests: `npx vitest run` (vitest's default `NODE_ENV=test`) — **115/115 pass**, including
  the hero's single-h1, single-CTA, and Marginalia token-scoping (#35) guards.
- Note for the build team: the two token scopes (`.mg-landing`, `.mg-hero`) are written
  as two single-selector rules with identical bodies rather than one comma list. This is
  deliberate — the test DOM engine mis-cascades a comma list of these class selectors onto
  `:root`, tripping the #35 scoping guard. Keep the two blocks in sync.
