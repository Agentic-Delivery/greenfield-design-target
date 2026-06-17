# Approved design — Foxglove Books storefront

**Approved by the customer** against the running storefront on the canvas, as the
approved design for Foxglove Books. Greenfield, single screen, responsive web
(phone-first → desktop), light theme.

## What was approved

A warm, literary, unhurried storefront in the **"The Reading Room"** direction —
the customer confirmed it as "exactly right." One scrolling page covering the
full brief:

- **Masthead** — shop name in Cormorant with a line-drawn foxglove mark, primary
  nav (desktop), and a basket button that shows a live count.
- **"This week we're reading" hero** — an unhurried welcome beside a featured
  cover, with a botanical foxglove motif drawn down the side.
- **New & Notable** — the featured-titles shelf: hand-typeset generative covers
  (no stock imagery — drawn in the brand's own type and paper tones) with title,
  author and price.
- **What the booksellers love** — the staff-picks shelf, each pick paired with an
  italic hand-written note signed by a named bookseller. This is where the
  warm/literary/unhurried personality lives.
- **This week's book** — a focused detail panel with cover, blurb, price and a
  working **Add to basket** (default → success), plus an "out of print" title that
  demonstrates the disabled state.
- **Monthly letter sign-up + footer** with the shop's hours and address.

## Why this direction

Personality captured as three concrete words — **warm, literary, unhurried** —
and grounded in the editorial / independent-bookshop print tradition: large serif
mastheads, warm paper palette, generous whitespace. Distinctive choices made on
purpose to avoid the generic AI look:

- **Typography:** Cormorant (display) + Spectral (body) — a literary serif
  pairing, deliberately not a framework/AI default font.
- **Colour:** warm cream paper, deep warm ink (never pure black/white), and a
  single **foxglove-rose** accent — a low-chroma botanical pink-mauve at hue ~5,
  chosen specifically to avoid the high-chroma blue/violet "AI-lila" accent.
  Neutrals tinted warm; 60-30-10 emphasis (paper / ink / rose).
- **Layout:** asymmetric editorial grids and a distinct staff-pick layout, not a
  grid of identical cards.

## Design system

See `design-system.md` (committed alongside this design): OKLCH 4-role colour
system, the full type scale, spacing/radius tokens, the five UI states, and the
live CSS custom properties (`--accent`, `--scale`, `--density`, `--motion-mult`,
`data-mode`) the design reads.

## Quality read (advisory — PASSED-WITH-FINDINGS)

An independent design-quality read passed the design and confirmed it clears the
AI-slop test. The customer reviewed the findings and chose to lock in the design
as-is. The following are **not blockers** — they are the punch list the worker
carries into the live build (full machine-readable read in `quality.json`):

1. **Accessibility — keyboard focus (do this in the build):** add a visible
   `:focus-visible` indicator (≥ 2px, ≥ 3:1 contrast) to every interactive
   element, and stop removing the newsletter email input's focus outline. This is
   the one AA gap on the primary path.
2. **Complete the async states a static mockup skipped:** give the newsletter
   form a success message and invalid-email feedback, and give the basket /
   add-to-basket an error path (e.g. remove-item, out-of-stock-at-checkout).
3. **Mobile tap targets:** nudge the smallest controls — the basket close button
   and the nav links — up to a 44px touch area on phones.
4. **Minor consistency:** render the add-to-basket success check as the same
   inline SVG used in the stock indicator, rather than a literal `✓` glyph.

## Platform / verification notes

Built mobile-first with real breakpoints at 700px (tablet) and 1040px (desktop);
content measure capped at 1120px. The independent quality read confirmed the
layout holds at mobile / tablet / desktop from the fully-specified source. The
worker should re-verify the rendered result across the standard width set
(320 / 375 / 390 / 768 / 1024 / 1280 / 1440 / 1920) when building the live frontend.

## Customer tweaks

None recorded — the customer kept the design defaults (no `tweaks.json`).
