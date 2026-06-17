# Foxglove Books — Design System ("The Reading Room")

A warm, literary, unhurried storefront for a small independent neighbourhood
bookshop. Light theme. Target platforms: **responsive web — phone-first,
expanding to desktop.** Verified at mobile (~390px), tablet (~834px), desktop.

## Atmosphere

It should feel like a well-made book in the hand, or a literary journal left
open on a reading-room table: warm paper, deep ink, generous margins, nothing
hurried. The foxglove — a tall woodland flower with drooping pink-mauve bells —
is the shop's signal: it appears as a quiet line-drawn motif, and its dusty rose
becomes the single accent. The mood is bookish and welcoming, never corporate,
never the centred-card-on-gradient "AI look."

## Colour roles (OKLCH — perceptually uniform, light theme)

| Token | Value | Role |
|---|---|---|
| `--paper` | `oklch(0.972 0.012 85)` | Page background — warm cream, the "paper" |
| `--paper-2` | `oklch(0.948 0.016 82)` | Deeper panel / alternating section ground |
| `--card` | `oklch(0.992 0.008 90)` | Raised surface (cards, detail panel) |
| `--ink` | `oklch(0.27 0.020 55)` | Primary text — warm brown-black, never pure #000 |
| `--ink-soft` | `oklch(0.46 0.020 58)` | Secondary / muted text |
| `--line` | `oklch(0.86 0.018 80)` | Hairline borders / rules — warm tan |
| `--accent` | `oklch(0.55 0.12 5)` | **Foxglove rose** — dusty pink-mauve, the single accent (~10% weight) |
| `--accent-ink` | `oklch(0.42 0.13 8)` | Rose for text/links on paper (AA contrast) |
| `--accent-soft` | `oklch(0.93 0.030 5)` | Rose tint background (badges, hovers) |
| `--sage` | `oklch(0.52 0.045 150)` | Botanical green — staff-pick notes, secondary tags |
| `--sage-soft` | `oklch(0.93 0.025 150)` | Sage tint background |

Neutrals are tinted warm (hue ~80) toward the paper, never a pure-grey ramp.
The accent is a low-chroma botanical rose (hue ~5, pink-red), deliberately NOT
the high-chroma blue/violet AI-lila. Emphasis follows **60-30-10**: cream paper
60, ink 30, foxglove rose 10. Dark mode tokens are defined under `[data-mode="dark"]`
so the canvas light/dark toggle works, but light is the default and the brief.

## Type

Literary serif pairing — neither is a framework/AI reflex default.

| Role | Face | Size / weight / leading |
|---|---|---|
| Display (masthead, hero) | **Cormorant** | clamp 2.4–4.2rem · 500 · 1.04 · -0.01em |
| Section headings | **Cormorant** | 1.6–2.1rem · 600 |
| Book titles | **Cormorant** | 1.15–1.35rem · 600 |
| Body / blurbs | **Spectral** | 1rem · 400 · 1.62 |
| UI labels / nav / prices | **Spectral** | 0.86rem · 500 · small-caps tracking on labels |
| Staff notes | **Spectral italic** | 0.95rem · 400i — hand-written feel |

Type scales with `--scale` (`calc(... * var(--scale))`) so the canvas type-scale
knob works.

## Spacing / shape

- Spacing scales with `--density`; section padding `calc(... * var(--density))`.
- Radius: soft, small — `--radius: 4px` (cards) / `8px` (panels). Bookish, not bubbly.
- Max content width 1120px, generous gutters; asymmetric editorial layouts, not a grid of identical cards.

## Motion

Disciplined: only `transform` / `opacity` animate, custom ease-out
`cubic-bezier(.2,.7,.2,1)`, all durations multiplied by `--motion-mult` (canvas
motion knob). Purposeful only — hover lift on covers (affordance), add-to-basket
confirmation (feedback). Full `prefers-reduced-motion` fallback removes transforms.

## Components & states

- **Masthead / nav** — shop name + foxglove mark, links, basket button with count badge.
- **Basket** — flyout panel. *Empty state:* "Your basket is empty — go find something lovely." *Filled state:* line items + count badge + subtotal.
- **Book cover** — generative (no image assets): paper-toned card, typeset title/author, botanical rule. Hover lift.
- **Featured shelf** — "Just arrived" row of covers + title/author/price.
- **Staff-picks shelf** — covers each paired with an italic hand-written note signed by a bookseller.
- **Book detail** — focused panel: cover, title, author, blurb, price, **Add to basket** (the single primary action). *Default → success* states: button becomes "In your basket ✓", basket count bumps, toast confirms. *Disabled* state shown for an out-of-print title.
- **Newsletter / footer** — "A letter from the shop, once a month" + hours/address.

Five states covered on interactive surfaces: empty (basket), default & success
(add-to-basket), disabled (out-of-print title), and loading (cover shimmer
placeholder demonstrated in the detail panel).

## CSS custom properties the canvas tweaks panel drives

`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` (light/dark)
are all real properties the CSS reads, so the live knobs move the design.
