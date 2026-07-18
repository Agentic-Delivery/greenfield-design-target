# Cadence — Pricing page design system

**Target platform:** responsive web, mobile-first.
**Anchor:** the committed **Marginalia** brand system at `docs/design/brand/` (tokens at `docs/design/brand/tokens.json`), as expressed in the existing Cadence landing page `web/cadence/index.html`. This pricing page carries the brand's tokens inline, byte-identical to the landing page, so the two read as one product.

## Tokens carried (inline, from the committed brand)
- **Type:** display `Newsreader` (literary serif), body `Cabin` (humanist sans); modular scale ratio 1.25 (`--step--1` … `--step-6`).
- **Colour (OKLCH):** one clay-terracotta accent family (`--clay-600/700/800`, chroma ≤ 0.106 — muted, never neon); warm paper neutrals tinted to the clay hue (`--paper-50…300`); soft ink text (`--ink-600/700/900`, never pure `#000`). 60-30-10: paper ground, ink text, clay as the single accent.
- **Dark mode:** full `[data-mode="dark"]` slot-alias re-points surface + text together (contrast holds in both modes).
- **Spacing/radius/motion:** `--space-*`, `--radius-sm/md/lg`, `--ease-out` cubic-bezier, `--dur` motion budget. Live-tweak hooks: `--accent`, `--scale`, `--density`, `--motion-mult`.

## Screen structure
Sticky nav (identical to landing) → editorial pricing hero + working monthly/annual billing toggle → three tiers (Free / Focus "Our pick" / Team) → honest FAQ strip → footer (identical to landing).

## States designed
- Billing toggle: selected (`aria-checked`) + focus-visible; keyboard arrow-key operable (`role=radiogroup`).
- Buttons: hover / active / focus-visible / disabled.
- Tap targets ≥ 44px on coarse pointers (nav controls + billing toggle).

## Voice
Calm, honest, unhurried. No fake urgency, no countdowns, no confirmshaming. Prices are honest placeholders ($6 Focus / $9 Team, ~2 months saved annually) for the customer's real numbers.
