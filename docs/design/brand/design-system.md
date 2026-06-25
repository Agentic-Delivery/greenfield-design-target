# Tessera — Brand Library

**For:** data and platform engineers using Tessera, a B2B knowledge-graph platform.
**Personality:** precise · grounded · quietly confident.
**Theme:** light (a dark slot-alias is defined for later).
**Platform:** responsive web, desktop-first (dense data work happens at desk width; the system reflows to tablet and phone).

## Atmosphere

Tessera is the small tile that, set beside thousands of others, becomes a mosaic — which is exactly what a knowledge graph is: discrete, exact pieces that only mean something in relation. The brand is built to feel like a precision instrument an engineer trusts, not a consumer app that performs at them. It is quiet on purpose. The page is a warm-cool off-white rather than a glaring white; the ink is a near-black tinted with the brand's green so nothing on the page is truly neutral — everything belongs to the same family. The one accent is a deep, low-chroma pine — the colour of something grounded and grown, used sparingly so that when it appears (a primary action, a live status, a selected node) it *means* something. There are no gradients, no glows, no decoration competing with the data. Confidence here is shown by restraint: generous structure, a real type hierarchy, and colour that earns its place.

## Colour system

One accent family (pine, hue 168) carried at roughly **60-30-10** visual weight: ~60% surfaces/paper, ~30% ink for text and structure, ~10% pine accent for action and emphasis. Neutrals are *not* a grey ramp — they are the accent hue at near-zero chroma, so the whole surface reads as one grounded family. Nothing is pure `#000` or `#fff`. Functional state colours (success / warning / error) are deliberately distinct from the brand accent, kept low-chroma, and **always paired with an icon and a text label** so colour is never the only signal.

### Brand & neutral roles

| Role token | OKLCH value | Rationale |
|---|---|---|
| `--color-accent` → pine-700 | `oklch(0.45 0.066 168)` | The primary action / emphasis colour. Deep, low-chroma pine — grounded, never neon; passes AA with white text (~5.2:1). |
| `--color-accent-hover` → pine-800 | `oklch(0.38 0.055 168)` | Darker pressed/hover state, keeps white text legible. |
| `--color-accent-strong` → pine-900 | `oklch(0.30 0.040 168)` | Deepest pine — badge text on soft tint, high-emphasis labels. |
| `--color-accent-soft` → pine-100 | `oklch(0.95 0.020 168)` | The 10% accent at low weight — tints, selected rows, badge backgrounds. |
| `--color-page` → paper | `oklch(0.98 0.004 168)` | Warm-cool off-white page. Tinted toward the brand hue; never `#fff`. |
| `--color-surface` → surface | `oklch(0.995 0.002 168)` | Card / panel surface, a shade above the page so panels lift without shadow excess. |
| `--text-body` → ink-950 | `oklch(0.21 0.010 168)` | Primary text. Near-black tinted with pine; ~14:1 on paper. |
| `--text-muted` → ink-600 | `oklch(0.46 0.008 168)` | Secondary / supporting text; holds AA (~4.7:1) on paper. |
| `--border` → ink-200 | `oklch(0.88 0.005 168)` | Subtle dividers and card edges. |
| `--border-strong` → ink-500 | `oklch(0.55 0.010 168)` | Input/control borders — meets the 3:1 UI-component contrast floor. |
| `--focus-ring` → pine-600 | `oklch(0.53 0.072 168)` | 2px focus ring + offset; ≥3:1 against adjacent surfaces. |

### Functional state roles (not brand accents — always with icon + label)

| Role token | OKLCH value | Use |
|---|---|---|
| `--state-success` | `oklch(0.44 0.085 150)` | Success text; on `--state-success-bg` `oklch(0.95 0.025 150)`. |
| `--state-warning` | `oklch(0.46 0.095 70)` | Warning text; on `--state-warning-bg` `oklch(0.95 0.035 70)`. |
| `--state-error` | `oklch(0.44 0.120 28)` | Error text; on `--state-error-bg` `oklch(0.95 0.030 28)`. |

## Type system

A considered three-voice pairing — none of them framework/AI reflex fonts:

- **Spectral** (display / headings) — a serif engineered for screens. Reads grounded and considered; gives the brand an editorial confidence most dev tools (which default to a grotesque) do not have.
- **Hanken Grotesk** (body / UI) — a refined humanist grotesque, highly legible at small sizes for dense interfaces.
- **JetBrains Mono** (data / code / IDs) — a code-native monospace, the right voice for graph IDs, queries, and tabular data the audience lives in.

Modular scale, ratio ≈ **1.25** (major third), 16px base. Fewer sizes, more contrast.

| Role | Token | Size | Font | Weight | Line-height | Tracking |
|---|---|---|---|---|---|---|
| Display | `--size-display` | 39px / 2.441rem | Spectral | 600 | 1.2 | -0.01em |
| H1 | `--size-h1` | 31px / 1.953rem | Spectral | 600 | 1.2 | -0.01em |
| H2 | `--size-h2` | 25px / 1.5625rem | Spectral | 600 | 1.25 | -0.01em |
| H3 | `--size-h3` | 20px / 1.25rem | Hanken Grotesk | 600 | 1.3 | normal |
| Body-lg | `--size-lg` | 18px / 1.125rem | Hanken Grotesk | 400 | 1.6 | normal |
| Body | `--size-body` | 16px / 1rem | Hanken Grotesk | 400 | 1.6 | normal |
| Small | `--size-small` | 14px / 0.875rem | Hanken Grotesk | 400/500 | 1.5 | normal |
| Caption / data | `--size-caption` | 12px / 0.75rem | JetBrains Mono | 400/500 | 1.4 | normal |

Body measure is capped at `--measure` (68ch). Body weight is never below 400.

## The four-layer token contract (`tokens.json`)

The contract is a real four-layer model, not a flat dump — and the gallery reads `var(--token)` for every colour, size, radius, and space, so editing a token live-repaints every component (preview *is* the contract):

1. **identity** — the only place a literal OKLCH value or raw size appears (the pine ramp, the ink ramp, the state hues, the scale).
2. **structure** — semantic roles that *reference* identity (`--color-accent: var(--brand-pine-700)`), the type scale, spacing, radius.
3. **with-fallback** — component/usage tokens carrying a CSS fallback so a missing token degrades gracefully (`--button-bg: var(--color-accent, oklch(...))`).
4. **slot-alias** — a `[data-mode="dark"]` block that re-points the structure layer for the dark theme without forking a parallel palette.

## Component inventory & states

| Component | States shown |
|---|---|
| Colour system | role swatches with OKLCH values |
| Typography | full scale specimen in the three voices |
| Button | primary / secondary / ghost / danger · default · disabled · loading |
| Text input | default · focus · filled · error (inline message) · success · disabled |
| Select | default · open-style · disabled |
| Choice controls | checkbox + radio · selected · unselected · disabled |
| Badge | accent · success · warning · error · neutral (icon + label) |
| Card | standard · selected · with-actions |
| Data table | populated · empty · loading (skeleton) · row error |
| Navigation | top bar + sidebar with active / hover / current item |
| Modal | dialog with scrim, title, body, primary + secondary actions |

The five interactive states (empty / loading / error / success / disabled) are covered across the input, table, and button components.
