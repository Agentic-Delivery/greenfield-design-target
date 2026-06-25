# Saltmarsh — design foundation (landing-page hero)

**Personality:** warm · crafted · calm — deliberately *not* corporate.
**Target platform:** responsive web (mobile-first; single column on phones, two columns from 860px).
**Theme:** light — a warm cream paper, derived from the brand's warm/calm/crafted feel.
**Mode this session:** polished first look (a considered hero to react to).

## Atmosphere
Saltmarsh should feel like a paper coffee bag in your hands on a quiet morning: warm
kraft tones, generous whitespace, an unhurried serif headline, and one calm, confident
call to action. Nothing shouts. The single clay accent is used sparingly so the page
reads as considered, not loud.

## Colour roles (OKLCH — one warm accent, 60-30-10)
- `--paper` `oklch(0.96 0.014 78)` — warm cream page background (the 60).
- `--surface` `oklch(0.985 0.008 82)` — lifted warm white (label panel, tag chip).
- `--ink` `oklch(0.26 0.03 50)` — deep espresso text + primary button (the 30; never #000).
- `--ink-soft` `oklch(0.38 0.022 52)` — muted espresso for body/subhead, AA on cream. (Darkened from 0.41 → 0.38 at design sign-off for a comfortable AA margin on the cream copy-card — the value the approved patch ships; see quality.json TARGET-CONTRAST.)
- `--accent` `oklch(0.58 0.11 42)` — clay; decorative only (rule, dot, roast dots, frame). Chroma 0.11 ≈ well under 80% saturation, never the AI-lila.
- `--accent-ink` `oklch(0.43 0.12 44)` — clay tuned dark enough for text (eyebrow, emphasis word) to clear AA on cream.
- `--line-soft` `oklch(0.87 0.012 70)` — hairlines, tinted warm.
- `--cream` `oklch(0.975 0.012 82)` — button text on espresso.
- A warm `[data-mode="dark"]` slot-alias re-points paper/ink/surface/accent so the light/dark tweak has an honest place to go.

Neutrals are tinted to the brand hue (~50–80), never a pure-grey ramp, never pure black/white.

## Type scale (modular, ratio ≥ 1.25)
| Role | Font | Size | Weight | Line-height | Tracking |
|------|------|------|--------|-------------|----------|
| Display / h1 | Spectral (serif) | clamp(2.5–4.1rem) | 500 | 1.04 | -0.014em |
| Eyebrow | Hanken Grotesk | 0.78rem | 600 | — | 0.18em, uppercase |
| Subhead / body | Hanken Grotesk | clamp(1.02–1.2rem) | 400 | 1.65 | — (≤46ch measure) |
| Button | Hanken Grotesk | 1rem | 600 | — | — |
| Reassurance | Hanken Grotesk | 0.9rem | 400/600 | — | — |

**Typeface rationale:** Spectral is a warm literary serif (a considered display choice, not a reflex
default like Playfair/Fraunces) — it carries the "crafted, calm" feel. Hanken Grotesk is a refined
humanist sans for body and UI, warm but quiet. Neither is in the framework/AI reflex set.

## Components & states (this hero)
- **Primary CTA** ("Buy now") — the one primary action; placeholder `href="#shop"`, wired by the build team to the real order/shop destination. States: rest, hover (lift + warm shift + arrow nudge), active, and a visible focus ring (`outline: 3px var(--accent)`, AA). Loading/empty/error states are not applicable to a static marketing hero.
- **Product image area** — an illustrated kraft coffee bag (inline SVG, theme-aware fills) on a warm radial panel, with a small "Roasted this week" tag chip. No network image dependency.

## Motion
First-load reveal only: a brief staggered fade-up (transform + opacity, ease-out
`cubic-bezier(0.16,1,0.3,1)`, ~440ms, 40–250ms stagger). CTA micro-interactions ~170ms ease-out.
Full `prefers-reduced-motion: reduce` branch (instant, no transform). No idle/looping motion.

## Live tweak knobs
`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` are real custom properties the
hero reads, so the canvas tweaks panel adjusts accent, type scale, density, motion and light/dark live.

## Where it lives (brownfield)
New source: `web/src/saltmarsh/SaltmarshHero.jsx` + `web/src/saltmarsh/saltmarsh.css`.
The live preview's mount (`web/src/main.jsx`) is pointed at `SaltmarshHero` for the design session;
the tide-now app (`web/src/App.jsx` and its components) is untouched on disk. At handoff the worker
wires Saltmarsh behind proper routing rather than replacing the mount.
