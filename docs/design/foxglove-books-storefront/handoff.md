# Design handoff — Foxglove Books storefront

**Status:** approved by the customer exactly as rendered ("exactly right"), in the
**"The Reading Room"** direction. An independent design-quality read PASSED-WITH-FINDINGS
(cleared the AI-slop test); the customer reviewed the findings and locked the design
in as-is. The findings are a build-time punch list, not blockers — full machine-readable
read in `quality.json`.

## What this is

The approved storefront home screen of **Foxglove Books**, a small independent
neighbourhood bookshop. One warm, literary, unhurried scrolling page — light
theme, phone-first responsive web — covering: a masthead with a line-drawn foxglove
mark and a live basket count; a "This week we're reading" hero; a "New & Notable"
featured-titles shelf (hand-typeset generative covers, no stock imagery); a "What
the booksellers love" staff-picks shelf with signed hand-written notes; a focused
"This week's book" detail panel with a working Add-to-basket (default → success)
and an out-of-print title that demonstrates the disabled state; and a monthly-letter
sign-up + footer. See `approved.md` for the full rationale.

## Build target (greenfield)

- **Mode:** greenfield (`artifact.json` → `mode: greenfield`).
- **Primary artifact:** `current/index.html` — the approved mockup
  (`artifact.json` → `primaryArtifact: "current/index.html"`).
- **Binding visual contract:** `design-system.md` (OKLCH colour roles, the
  Cormorant + Spectral type pairing, spacing/radius tokens, the five UI states,
  and the live CSS custom properties `--accent` / `--scale` / `--density` /
  `--motion-mult` / `data-mode`). There is no machine-readable token contract
  (`DESIGN-MANIFEST.json` → `tokenContract: null`); build to `design-system.md`.
- **Framework:** not pinned (`targetFramework: null`). The worker chooses the
  stack at build time (LAW 5); the design system + the per-viewport references
  are the contract, not the source shape.
- **Worker reads first:** `DESIGN-HANDOFF.md` (token-extraction-first, screen-file
  routing) and `DESIGN-MANIFEST.json` (the machine-readable build target: one
  screen `index.html` with per-viewport reference PNGs at
  `current/viewports/index.html/<px>.png` for 320/375/390/768/1024/1280/1440/1920 px).
  Pin `design_sha` over the approved deliverable; the delivery verifier attests the
  deployed build against each (screen, viewport).

## Build-time punch list (advisory — from the design-quality read, see `quality.json`)

The static mockup was approved as the populated success view. These are carried
into the live build (none is a blocker):

1. **Accessibility — keyboard focus.** Add a visible `:focus-visible` indicator
   (≥ 2px, ≥ 3:1 contrast) to every interactive element, and stop removing the
   newsletter email input's focus outline. This is the one AA gap on the primary path.
2. **Complete the async states a static mockup skipped.** Give the newsletter form
   a success message and invalid-email feedback; give the basket / add-to-basket
   an error path (e.g. remove-item, out-of-stock-at-checkout).
3. **Mobile tap targets.** Nudge the smallest controls (the basket close button,
   the nav links) up to a 44px touch area on phones.
4. **Minor consistency.** Render the add-to-basket success check as the same inline
   SVG used in the stock indicator, not a literal `✓` glyph.

## Provenance

- Source design deliverable / session: `fa76aeee-813c-48d3-958c-0dbba7dfed21`
- Handoff id: `design-a-greenfield-web-app-called-foxglove-book-fa76aeee`
- Approved at: 2026-06-16T17:03:52Z
- Parent design SHA: `26d4506792876bdb405970862328e3c6e1ad6968a14e7cdd032b255be424f6bd`
- Lineage thread: `lineage.json` (parent `brief.json`; export targets:
  intake-handoff, worker-build, export-bundle)
- Relocated into the repo by intake on 2026-06-17 (standalone approved design,
  not a fan-in to the current session's deliverable thread).
