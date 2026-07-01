# Marginalia — landing hero (design system anchor)

**Anchor:** the committed **Tessera** brand library at `docs/design/brand/` (precedence case 1).
This screen carries Tessera's tokens verbatim — it does not stand up a new system.

- **Colour:** one accent family, pine (hue 168), at ~60-30-10 weight; neutrals are the accent hue at
  near-zero chroma (never a grey ramp); nothing pure `#000`/`#fff`. All values OKLCH, inlined from
  `tokens.json`. Functional states (success/warning/error) distinct from the accent, always icon + label.
- **Type:** Spectral (display/headings), Hanken Grotesk (body/UI), JetBrains Mono (data/IDs). Modular
  scale ≈ 1.25, 16px base. Body ≥ 400 weight, measure ≤ ~60ch.
- **Radius / spacing / shadow:** Tessera tokens (`--radius-*`, `--space-*`, `--shadow-*`).
- **Dark:** the brand's `[data-mode="dark"]` slot-alias, wired to the header toggle; default light.

## Target platform

**Responsive web, mobile-first verified.** Ships as its own screen at `/marginalia/`. Verified at the
phone / tablet / desktop bands before approval.

## This screen's decisions

- **Hero:** asymmetric two-column (copy left, live "currently reading" panel right); stacks to one column
  ≤ 860px. Not a repeated card grid, not centered-everything (STRUCT floor clear).
- **Headline:** "Keep your place, not your streak." — the one claim that matters (calm, no gamification).
- **Supporting line:** one sentence, plain language, no AI vocabulary (COPY floor clear).
- **Primary CTA:** single — "Start your shelf". One quiet secondary text link beside it.
- **"Currently reading" list — five states designed:** empty (the hero's honest first-run focal point),
  populated/success, error (sync failed + Retry), loading (skeleton row), disabled (add control). Empty and
  populated shown in the two panels; loading + error shown as designed rows in the "a shelf, once it fills"
  band.
- **Live tweak knobs wired:** `--accent`, `--scale`, `--density`, `--motion-mult`, `data-mode` are real
  custom properties the CSS reads, so the canvas tweaks panel moves them live.
- **Motion:** `prefers-reduced-motion` disables the skeleton shimmer and transitions.

## Attention / ethics note

A calm reading tracker by design — no streaks, no daily-goal pressure, no fake-urgency or FOMO patterns.
The single primary action is unambiguous; emphasis follows 60-30-10.
