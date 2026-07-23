# Approved design — Expense tracker, main screen

**Approved by the customer:** the whole screen, exactly as seen on the canvas.
**Platform:** mobile-first responsive web.
**Brand:** inherits the committed **Marginalia** brand verbatim (clay accent, warm
paper neutrals, Newsreader + Cabin type, OKLCH). No new brand tokens introduced.

## What was approved
The home screen of a personal expense tracker:
1. **Running monthly total** — an editorial serif hero figure ("Spent this month"),
   with a quiet budget line and "$X of $Y left" context.
2. **Add an expense** — a large currency-prefixed amount field, five single-select
   category chips (Groceries / Dining / Transport / Home / Other), and one primary
   "Add expense" button. Single column, labels above fields, submit disabled until a
   valid amount is entered.
3. **Recent** — expenses grouped by day (Today / Yesterday), each row a category
   monogram + name + category·time + amount.

Empty state ("Nothing logged yet"), disabled-button state, and the add→success
interaction are all designed and present.

## Quality read (advisory)
design-quality-gate verdict: **PASSED-WITH-FINDINGS**. Scores: clarity 5, visual
hierarchy 5, accessibility 4, consistency 5. Holds up at mobile / tablet / desktop.
Distinctive, on-brand, not generic.

## Follow-up work captured (deferred by customer, ship-as-is)
The customer approved the screen exactly as-is; these two findings are captured as
build follow-up (they do not change the approved screen):
1. **Readability nudge** — darken the small grey captions (uppercase daylines,
   "Category · time" subtitles, period, meta) one shade so small text clears the
   4.5:1 contrast floor. Suggest shifting those specific captions from `--text-muted`
   toward `--ink-700`, preserving the muted tier for larger secondary text.
2. **Async states for a live data layer** — the mockup is synchronous; a shipped
   tracker persists and fetches, so design (a) a gentle loading state on the recent
   list, (b) a loading/pending affordance on the add action, and (c) an inline error
   + recovery path when an amount is rejected.

## Live tweak knobs
`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` (light/dark) all
read through, so the design responds to the tweaks panel and ships with a working dark
mode via Marginalia's `[data-mode=dark]` overrides.
