# Marginalia — Brand System

**For:** an independent bookshop's reading app. **Personality:** literary, warm, unhurried. **Platform:** web. **Theme:** light (a dark slot-alias is provided so the fourth token layer is real). **Colour space:** OKLCH throughout.

## Atmosphere

Marginalia should feel like the bookshop itself at the quiet end of the afternoon — a lamp on, a worn armchair, paper that has warmed slightly in the light. It is not a storefront shouting for a sale; it is a place that trusts you to take your time. The surfaces are warm paper rather than clinical white, the ink is a soft near-black rather than a hard `#000`, and the one note of colour — a clay terracotta, the colour of a flowerpot or a brick in evening sun — appears sparingly, the way a single bookmark ribbon shows against a page. Headings are set in a literary serif so the product reads like something printed and considered; the interface itself speaks in a calm humanist sans. Nothing hurries. The whole system is built so that a reader settling in for a long session feels held, not hustled.

## Colour roles

One accent family (clay), carried at roughly **10%** of the visual weight in the 60-30-10 split: paper neutrals are the 60% ground, ink text is the 30%, clay is the 10% that marks the one thing that matters on a view. Neutrals are tinted toward the clay hue (~42–60) at near-zero chroma, so the greys read warm rather than cold. State colours are **signal-only** — always paired with an icon and a word, never carrying meaning on colour alone.

| Role | Token | OKLCH | Rationale |
|------|-------|-------|-----------|
| Page background | `--color-bg` → paper-50 | `0.987 0.006 60` | Warm paper white, not `#fff` — the page should feel like a leaf of stock. |
| Surface | `--color-surface` → paper-100 | `0.968 0.008 58` | Cards and the nav lift a half-step off the page. |
| Surface (raised/hover) | `--color-surface-2` → paper-200 | `0.936 0.009 56` | Hover and selected washes, table header. |
| Accent | `--color-accent` → clay-600 | `0.550 0.106 41` | The brand clay; chroma 0.106 is well under 80% saturation — muted, never neon. |
| Accent (action) | `--color-accent-strong` → clay-700 | `0.470 0.094 40` | Deeper clay for solid buttons & links so paper-white text clears AA (~7:1). |
| Accent (soft) | `--color-accent-soft` → clay-100 | `0.922 0.024 45` | Tag backgrounds, focus glow, selected-row wash. |
| Heading text | `--text-heading` → ink-900 | `0.240 0.014 42` | Soft near-black, warm-tinted; ~14:1 on paper. |
| Body text | `--text-body` → ink-700 | `0.400 0.014 46` | ~10:1 on paper — comfortable for long reading. |
| Muted text | `--text-muted` → ink-600 | `0.500 0.013 48` | Authors, metadata; ~6.8:1 — still AA for normal text. |
| Text on accent | `--text-on-accent` → paper-50 | `0.987 0.006 60` | Paper-white on clay-700 ≈ 7:1. |
| Divider border | `--border` → paper-300 | `0.884 0.010 54` | Hairline section rules (decorative, low-contrast by intent). |
| Control border | `--border-strong` → ink-500 | `0.620 0.012 50` | Inputs/selects — ≥3:1 against paper so the field boundary is perceivable. |
| Link | `--link` → clay-700 | `0.470 0.094 40` | Clay, AA on paper. |
| Focus ring | `--focus-ring` → clay-600 | `0.550 0.106 41` | 2px ring + soft glow, ≥3:1. |
| Success signal | `--signal-success` | `0.520 0.072 145` | Muted olive — used with ✓ + label only. |
| Warning signal | `--signal-warning` | `0.500 0.100 68` | Deep amber-ochre — clears AA (≈5.3:1) as label text on the soft warning chip; used with ● + label only. |
| Error signal | `--signal-error` | `0.510 0.140 28` | Deep brick red, pushed redder/higher-chroma than the clay accent so the two never read alike — used with ✕ + label only. |

## Type scale

Display & headings: **Newsreader** (an editorial serif drawn for on-screen reading — warm, literary, with a fine italic). Interface & body: **Cabin** (a humanist sans in the Johnston/Gill lineage — warm, rounded, unhurried). Modular scale, ratio **1.25**. Body weight ≥ 400; reading measure capped at **66ch**.

| Role | Family | Size (rem) | Weight | Line-height | Tracking |
|------|--------|-----------|--------|-------------|----------|
| Display | Newsreader | 3.052 | 500 | 1.18 | -0.01em |
| Heading 1 | Newsreader | 2.441 | 500 | 1.18 | normal |
| Heading 2 | Newsreader | 1.953 | 500 | 1.25 | normal |
| Heading 3 | Newsreader | 1.563 | 500 | 1.30 | normal |
| Subhead | Newsreader | 1.25 | 600 | 1.30 | normal |
| Body | Cabin | 1.0 | 400 | 1.65 | normal |
| Small / meta | Cabin | 0.833 | 400–600 | 1.40 | 0.04em |
| Reading specimen | Newsreader | 1.563 | 400 (roman + italic accent) | 1.50 | normal |

## Component inventory & states

Ten reviewable components, each its own full-width section in the gallery. Interactive surfaces carry the five states (empty / loading / error / success / disabled) where they apply.

| Component | States shown |
|-----------|--------------|
| Colour palette | accent ramp, paper/ink neutrals, state signals |
| Typography | full scale specimen + reading specimen |
| Button | primary / secondary / ghost / loading / success / disabled |
| Input | empty / filled / error / disabled |
| Select | default / focused / disabled |
| Card (book) | filled / loading (skeleton) / empty shelf |
| Navigation | resting with current-page marker |
| Badge | accent / neutral / success / warning / error |
| Table row | default / hover / selected |
| Modal | dialogue over scrim, one primary action |

## Token model

Four real layers: **identity** (raw OKLCH ramps + raw scale — the only literals), **structure** (semantic roles referencing identity), **with-fallback** (component tokens each with a CSS fallback), **slot-alias** (light/dark re-pointing the structure layer). The gallery reads every value through `var(--token)`, so editing one token live-repaints every component that uses it — the preview *is* the contract. Live-tunable hooks: `--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode`.

## Motion & accessibility

Transitions animate `transform`/`opacity` and `background`/`border` only, on a custom ease-out, 140–240ms, scaled by `--motion-mult`; every animation (button spinner, card hover, card skeleton shimmer) is disabled under `prefers-reduced-motion`. Targets ≥ 44px; visible 2px focus ring on every control; status never on colour alone.
