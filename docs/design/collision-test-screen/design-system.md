# tide-now — design foundation (fresh, greenfield)

No committed brand existed, so this is a fresh foundation stood up for the
session. Direction: **rugged, legible, high-contrast utilitarian** — built for a
phone held outdoors in bright daylight, where readability in glare wins over
everything else.

**Target platform:** mobile (phone), mobile-first. Large touch targets (≥ 44px),
signage-grade legibility, single column.

**Theme:** light — derived from the viewing context. A phone in direct sun reads
best as very dark ink on a high-luminance pale "paper", giving maximum contrast
in glare. (A dark theme washes out in sunlight.)

## Colour (OKLCH, tinted neutrals, one accent at 60-30-10)

| Role | Token | Value | Rationale |
|------|-------|-------|-----------|
| Ink (primary text) | `--ink` | `oklch(0.20 0.012 55)` | Near-black, warmed toward the accent hue — not pure `#000`. Carries ~60% of the weight. |
| Ink soft | `--ink-soft` | `oklch(0.42 0.012 55)` | Secondary labels, still AA on paper. |
| Paper (background) | `--paper` | `oklch(0.965 0.008 80)` | Warm off-white, never pure `#fff`. The ~30% surface. |
| Surface (cards) | `--surface` | `oklch(0.995 0.004 80)` | Slightly brighter than paper for chunky cards. |
| Line | `--line` | `oklch(0.30 0.012 55)` | Heavy 2–3px rules and borders — the rugged, instrument feel. |
| **Accent** | `--accent` | `oklch(0.70 0.18 50)` | **Hi-vis safety orange**, ~73% sat — the single brand accent, the most sun-legible accent there is. Carries the ~10%. Not the AI blue/purple. |
| Safe (state) | `--safe` | `oklch(0.55 0.13 150)` | Functional status only — "safe to cross". Always paired with an icon + text label, never colour alone. |
| Danger (state) | `--danger` | `oklch(0.52 0.19 28)` | Functional status only — "do not cross". Always paired with icon + label. |

60-30-10: ink + paper dominate; the safety-orange accent is reserved for the
trend and interactive emphasis; safe/danger are semantic state colours (paired
with shape + label), not decorative accents.

## Type (considered pairing, not a reflex font)

- **Display + numerals — "Saira"** (600–800, tabular figures). A technical,
  sturdy grotesque with excellent tabular numerals — reads like a marine
  instrument. Used for the big tide reading and section labels.
- **Body + labels + lists — "Barlow"** (400–600). Derived from transit/signage
  type; exceptionally legible at distance and in glare. Utilitarian heritage.
- Neither is a reflex/AI-default font. Modular scale ≥ 1.25; section labels are
  uppercase + tracked (instrument-panel convention); body ≥ 17px for outdoor use.

## Components in this screen

- **Status header** — location + live reading time.
- **Tide-height hero** — one huge tabular reading, a trend arrow, rising/falling
  label, and time-to-next-turn.
- **Next safe crossing** — a chunky bordered card with a status badge (icon +
  label + colour) and the window times, plus the following window.
- **Saved walks** — a short list, each row carrying its own crossing status
  (icon + label + colour) and next window.

## Tokens are live CSS custom properties

`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` drive the
preview, so the canvas tweak knobs move the real design.
