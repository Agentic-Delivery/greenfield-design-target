# Design system — MoatProof landing

**Anchored to the committed Marginalia brand** (`docs/design/brand/`). This screen inherits, and does
not fork, that system. Values below are carried as CSS custom properties in `web/src/moatproof/moatproof.css`
so the live tweaks panel (`--accent` / `--scale` / `--density` / `--motion-mult` / `data-mode`) works.

**Platform:** responsive web, mobile-first. **Theme:** light (with the Marginalia `[data-mode=dark]`
overrides carried for the light/dark toggle). **Colour space:** OKLCH.

## Tokens used (subset of Marginalia)

| Role | Token | Value |
|------|-------|-------|
| Accent (clay) | `--accent` | `oklch(0.55 0.106 41)` |
| Accent action (button) | `--color-accent-strong` → clay-700 | `oklch(0.470 0.094 40)` |
| Accent hover | `--color-accent-hover` → clay-800 | `oklch(0.390 0.075 39)` |
| Page background | `--color-bg` → paper-50 | `oklch(0.987 0.006 60)` |
| Heading text | `--text-heading` → ink-900 | `oklch(0.240 0.014 42)` |
| Muted text (subtitle) | `--text-muted` → ink-600 | `oklch(0.500 0.013 48)` |
| Text on accent | `--text-on-accent` → paper-50 | `oklch(0.987 0.006 60)` |
| Focus ring | `--focus-ring` → clay-600 | `oklch(0.550 0.106 41)` |

## Type

- **Display / headline:** Newsreader (Marginalia display serif), weight 500, `clamp(2rem, 8vw, 3.052rem)`.
- **Body / subtitle / button:** Cabin (Marginalia humanist sans), weight 400–600.
- Modular scale 1.25 (Marginalia `--step-*`). Headline uses `text-wrap: balance`; subtitle capped at 32ch.

## Component & states

Single centered hero + one primary CTA. The button carries hover / active / `:focus-visible` states;
the five async states (empty / loading / error / success / disabled) are N/A — a static navigational
CTA that triggers no request and is never conditionally unavailable.

## Motion & accessibility

Button transitions animate `background` / `transform` only, scaled by `--motion-mult`, disabled under
`prefers-reduced-motion`. 48px target, visible 3px focus ring at 3px offset, contrast clears WCAG 2.2 AA.
