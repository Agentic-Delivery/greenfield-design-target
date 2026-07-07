# Design system — Marginalia (tide·now landing)

This screen extends the existing **Marginalia** brand already committed to the
tide·now landing page. Nothing about the brand was changed; the two new sections
were built to it. This record captures the system the below-fold sections inherit,
so the worker builds them to the same contract.

## Feel
Warm, editorial, calm — a print-magazine restraint. Hierarchy comes from type and
whitespace, not from boxes or chrome. One clay accent, carried lightly.

## Colour (OKLCH, scoped to the landing screen only)
Tokens are declared on `.mg-landing` and `.mg-hero` (never `:root`) so the clay
accent never leaks into the tide app, which owns its own amber `--accent` in
`tokens.css`. Light values:

- `--accent` / `--color-accent`: `oklch(0.55 0.106 41)` — clay, the single accent (< 80% chroma).
- `--color-accent-strong`: `oklch(0.470 0.094 40)` (clay-700) — the CTA fill.
- `--color-accent-soft`: `oklch(0.922 0.024 45)` (clay-100) — the decorative quote mark.
- `--color-bg`: `oklch(0.987 0.006 60)` (paper-50) — page ground.
- `--color-surface`: `oklch(0.968 0.008 58)` (paper-100).
- `--text-heading`: `oklch(0.240 0.014 42)` (ink-900).
- `--text-body`: `oklch(0.400 0.014 46)` (ink-700).
- `--text-muted`: `oklch(0.500 0.013 48)` (ink-600) — eyebrows, footnote, step role.
- `--border`: `oklch(0.884 0.010 54)` (paper-300) — the thin step rules.
- `--focus-ring`: `oklch(0.550 0.106 41)` (clay-600).

Neutrals are warm-tinted toward the clay hue (no pure grey, no pure black/white).
A full **dark** slot-alias re-points surface **and** text together under
`html[data-mode="dark"] .mg-landing` / `.mg-hero`, so dark mode clears AA on its own
surfaces.

## Type
- Display: **Newsreader** (serif) — masthead, headline, section titles, step titles, quote.
- Body: **Cabin** (sans) — support copy, eyebrows, step body, attribution.
- Modular scale ≥ 1.25: headline `clamp(...calc(--step-5 * --scale))` → section title
  `clamp(1.7rem, 4.5vw, 2.25rem)` → step title 1.3rem → body 1rem → 0.8rem eyebrow.

## Spacing / radius
Token steps `--space-3..6`, `--radius-md: 9px`. Sections use logical properties
(`padding-inline`, `border-block-start`, `margin-inline`) and measure guards
(stage 34rem, steps 64rem, quote 46rem, body 32ch).

## Components on this screen
- **Hero** (`.mg-hero`) — unchanged: masthead, eyebrow, single h1 headline with a
  clay italic accent on "lets you", one support line, one primary CTA (48px target,
  visible focus, ease-out motion with a `prefers-reduced-motion` fallback), footnote.
  Fills the first screen (`min-height: 100dvh`).
- **How it works** (`.mg-steps`) — a labelled section (`aria-labelledby` an h2),
  an `<ol>` of three steps; each step a clay Newsreader numeral (01/02/03,
  `aria-hidden`), an h3 title, one body line, under a thin `--border` top rule
  (editorial columns, **not** boxed cards). 3-col grid → 1 column at ≤ 640px.
- **Testimonial** (`.mg-quote`) — a `<figure>` with a soft-clay decorative quote
  mark, a Newsreader-italic `<blockquote>`, and a `<figcaption>` attributing a named
  local ferry captain. Centred, single column, `max-width: 46rem`.

## Target platform
Responsive web, mobile-first. Verified holding at mobile (~390px), tablet (~834px),
and desktop by the independent design-quality read.

## Heading order
Single `h1` (hero headline) → `h2` ("How it works") → `h3` (each step title). The
testimonial is a figure/figcaption and needs no heading.
