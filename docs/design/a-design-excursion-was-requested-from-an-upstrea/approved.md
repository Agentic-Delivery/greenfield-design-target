# Approved — Marginalia landing hero

**Approved by the customer** exactly as rendered on the canvas, as one whole screen.
**Ships as its own screen at `/marginalia/`.**
**Brand:** inherits the committed **Tessera** brand library at `docs/design/brand/` (tokens, type, dark
slot-alias carried verbatim — not forked).

## What was approved, and why

- **Headline — "Keep your place, not your streak."** Leads on the one claim that makes Marginalia calm:
  it holds your page, not a daily goal. Set in Spectral (the brand display serif).
- **One supporting line** — plain language, states the value directly (no daily nudges, no guilt).
- **One primary action — "Start your shelf"** — with a single quiet "see how it works" text link beside
  it; nothing competes with the primary.
- **"Currently reading" list leads on its honest empty state** — "Your shelf is empty for now" with a
  gentle add prompt. This is what a brand-new reader actually sees, so it is the hero's focal point.
- **All five states of the list are designed** — empty (hero), success/populated + loading skeleton +
  sync-error-with-Retry (the "a shelf, once it fills" band), and the reason-shown add control. Verified by
  the design jury.
- **Light theme by default; the brand dark palette wired to the header toggle.**
- **Responsive**, verified at phone / tablet / desktop.

## Quality read (advisory — customer approved as-is)

- Design jury verdict: **PASSED-WITH-FINDINGS**. Clarity 5 · Hierarchy 5 · Accessibility (WCAG 2.2 AA) 5 ·
  Consistency 5. All five states covered; all three viewports hold; no anti-slop hits. Accessibility floor
  clear.
- **One optional, non-blocking finding surfaced to the customer (UX-2):** on phones the top nav collapses
  to just the theme toggle, dropping the two section anchors. The customer chose to ship as-is; recorded
  here as an acceptance note for the build.
- Optional future palette headroom: muted text and error-on-tint sit just above AA (~4.4–4.7:1); comfortable
  but could gain separation if the Tessera palette is tuned later. Not a change to this screen.

## For the build

- Build to the inherited Tessera `tokens.json` — every colour/size/radius/space reads a `var(--token)`;
  do not hardcode literals.
- The live-tweak knobs (`--accent`/`--scale`/`--density`/`--motion-mult`/`data-mode`) are real custom
  properties; keep them as the theming seam.
- `prefers-reduced-motion` must disable the skeleton shimmer and transitions.
