# Design system — Expense tracker (main screen)

**Anchored to the committed brand: Marginalia.** This screen inherits Marginalia's
token contract verbatim (clay/terracotta accent under 80% saturation, warm paper
neutrals tinted to the clay hue, Newsreader display + Cabin body, OKLCH colour).
No new brand tokens were introduced.

## Target platform
Mobile-first responsive web. Designed at phone width (~390px) first, expands to a
520px reading column on tablet/desktop. Touch targets ≥ 44px (chips, add button).

## What it is
The home screen of a personal expense tracker:
1. **Running total** — the month's spend as an editorial serif hero number, with a
   quiet budget line and "of $X left" context.
2. **Add an expense** — amount field (large, serif, currency-prefixed) + category
   chips (single-select) + one primary "Add expense" button. Single column, labels
   above fields, one primary CTA. Submit is disabled until a valid amount is entered.
3. **Recent** — expenses grouped by day (Today / Yesterday), each a row with a
   category monogram, name, category+time, and amount.

## Tokens carried (from Marginalia)
- Accent: `--accent` clay `oklch(0.55 0.106 41)`, used at ~10% weight (button, chip
  selection, budget bar). 60-30-10: paper surfaces / ink text / clay accent.
- Neutrals: paper-50/100/200/300 backgrounds & borders; ink-600/700/900 text.
- Type: Newsreader (display — the total, headings, amounts, avatars) / Cabin (body,
  labels, chips). Modular scale.
- Category signal colours reuse the brand signal hues (success/error/warning + accent
  + neutral) as calm category dots/monograms — never colour as the ONLY signal (each
  category is also labelled in text).

## Live tweak knobs wired
`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` (light/dark) all
read through to the design, so the canvas tweaks panel moves them live. Dark mode uses
Marginalia's `[data-mode=dark]` slot-alias overrides.

## States
- **Populated** (default): total + recent list.
- **Empty**: "Nothing logged yet" with a dashed monogram, shown when count reaches 0.
- **Disabled**: Add button disabled until a valid amount.
- **Success/interaction**: adding an expense inserts a row under Today and updates the
  total + budget bar.
- `prefers-reduced-motion` honoured (all transitions removed).
