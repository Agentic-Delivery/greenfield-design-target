# Cadence — landing page design system

**Anchored to:** the committed **Marginalia** brand library (`docs/design/brand/`). Every colour, type, spacing, and radius token below is carried from that system — Cadence's landing page inherits it rather than inventing a parallel look. If Cadence is later given its own distinct identity, this becomes the fork point.

**Target platform:** responsive web (mobile-first). Verified at phone / tablet / desktop widths.
**Theme:** light primary; dark provided via `[data-mode="dark"]` and wired to an in-page toggle so the dark tokens are real, not decorative.
**Colour space:** OKLCH throughout.

## Tokens carried from Marginalia

- **Accent (clay):** `--accent` `oklch(0.55 0.106 41)` — one muted terracotta, ~10% of visual weight (60-30-10). Solid CTAs use `--color-accent-strong` (clay-700, `oklch(0.47 0.094 40)`) so paper-white text clears AA (~7:1).
- **Neutrals (paper / ink):** warm paper grounds (`--paper-50…300`) and soft warm-tinted ink text (`--ink-600…900`) — no pure `#fff` / `#000`. Heading ~14:1, body ~10:1, muted ~6.8:1 on paper.
- **Type:** display/headings **Newsreader** (editorial serif, with italic accent on the hero word); interface/body **Cabin** (humanist sans). Modular scale, ratio 1.25.
- **Radius / spacing:** `--radius-sm/md/lg`, `--space-1…7`.

## Live-tweak hooks (canvas tweaks panel)

`--accent`, `--scale` (type), `--density` (spacing), `--motion-mult`, and `data-mode` (light/dark) are real custom properties the CSS reads, so the tweaks panel repaints the design live.

## Landing structure

1. **Nav** — sticky, blurred paper; Cadence wordmark + minimal links + light/dark toggle + small "Start a session" CTA.
2. **Hero** — editorial, left-aligned. Newsreader display headline ("Find your *cadence*."), one-line subheading, primary CTA + a quiet ghost secondary. Right: a calm "focus ring" timer motif (clay arc on paper) that breathes slowly (disabled under `prefers-reduced-motion`).
3. **Features** — three cards on a raised paper band, each a numbered title + one line. Distinct content, not a repeated identical grid; anti-gamification tone by intent.
4. **Footer** — minimal: wordmark, four links, copyright.

## Motion & accessibility

Transitions animate `transform`/`opacity`/`colour` only, custom ease-out, ~200ms scaled by `--motion-mult`. Every motion (button lift, card lift, ring breathe) is disabled under `prefers-reduced-motion`. Visible 2px focus ring on every interactive control; the hero ring is `aria-hidden` decoration; no meaning carried on colour alone. Tap targets ≥ 44px.

## Interactive states

A marketing landing has no forms or async data surfaces in this brief, so the five-state checklist reduces to the interactive-control states: the CTA and links carry resting / hover / focus-visible / active states. If a sign-up form or a live session preview is added later, it will need the full empty / loading / error / success / disabled set.
