# Tessera landing — design system (anchored to the committed Tessera brand)

This landing screen does **not** introduce a new design system — it inherits the
committed **Tessera brand library** (`docs/design/brand/`) and applies it. The
brand's spec and four-layer token contract are the canonical source; this file
records how the landing uses them and the few screen-level decisions made at the
canvas.

**Personality:** calm · precise · trustworthy (the brand voice: precise · grounded · quietly confident).
**Theme:** light (a complete `[data-mode="dark"]` slot-alias is wired so the light/dark tweak has an honest place to go).
**Platform:** responsive web, mobile-first, holds desktop-first density at desk width.

## Tokens applied (from the committed brand)

All colour, type, spacing, radius, and motion read from CSS custom properties so
the canvas tweak knobs (`--accent` / `--scale` / `--density` / `--motion-mult` /
`data-mode`) repaint live. Values inherited verbatim from the brand:

- **Accent (one family, pine hue 168):** `--accent` `oklch(0.45 0.066 168)`, `--accent-hover` `oklch(0.38 0.055 168)`, `--accent-strong` `oklch(0.30 0.040 168)`, `--accent-soft` `oklch(0.95 0.020 168)`. Carried at ~10% visual weight (the action, one emphasised phrase, one mosaic tile).
- **Neutrals (accent hue at near-zero chroma — never grey, never `#000`/`#fff`):** `--page` `oklch(0.98 0.004 168)`, `--surface` `oklch(0.995 0.002 168)`, `--ink` `oklch(0.21 0.010 168)`, `--muted` `oklch(0.46 0.008 168)`, `--border` / `--border-strong`, `--focus` `oklch(0.53 0.072 168)`.
- **Type (three brand voices, none reflex/AI-default):** Spectral (display — headline + wordmark), Hanken Grotesk (body — subline, CTA), JetBrains Mono (data — eyebrow, reassurance line). Modular scale ≈ 1.25.

## Screen composition (the one hero)

| Element | Token / role | Note |
|---|---|---|
| Masthead | Spectral wordmark + 4-tile mosaic mark | identity only; one pine tile |
| Eyebrow | JetBrains Mono, `--muted`, uppercase | "Knowledge-graph platform" |
| Headline | Spectral 600, `clamp(2rem, …, 2.9rem)`, `--ink` | one phrase in `--accent` italic |
| Subline | Hanken Grotesk 18px, `--muted`, ≤ `--measure` (60ch) | one line |
| Primary CTA | `--accent` bg, `--on-accent` text, min-height 46px, 2px `--focus` ring | the single action |
| Reassurance | JetBrains Mono, `--muted` | one quiet trust line |

## States & accessibility

- The only interactive surface is a **navigational CTA link** (resting / hover / active / focus-visible designed). No form, async fetch, or disable condition exists on this screen, so the five interactive states (empty / loading / error / success / disabled) are not-applicable here. When the CTA later links to a real form or flow, that surface inherits the brand's full five-state component spec.
- WCAG 2.2 AA verified in both light and dark modes: ink-on-page ~16.7:1, muted text ~6.7:1, CTA text on pine ~7:1, focus ring ≥ 3:1, CTA target ≥ 46px. Motion is opacity/transform-only with a `prefers-reduced-motion` opt-out.

## Build / handoff shape

Built as its **own product entry** (the established repo pattern — mirrors the
Saltmarsh hero): `web/tessera.html` → `web/src/tessera/main.jsx` →
`<TesseraLanding />`, styled by `web/src/tessera/tessera.css`, with a dedicated
`web/vite.tessera.config.js` for its own Pages subpath (`/tessera/`). tide-now,
Foxglove, and Saltmarsh are untouched.
