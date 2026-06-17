# Approved — tide-now home screen

**Approved by the customer** exactly as rendered on the canvas (the whole screen),
after an independent quality check passed cleanly.

## What was approved
A single mobile (phone) home screen, **rugged / legible / high-contrast
utilitarian**, light theme chosen for bright-daylight outdoor readability:

- **Tide-height hero** — one huge tabular `2.4 m` reading, a "Rising" trend badge
  (up-arrow + word), and change-in-last-hour + high-water time.
- **Next safe crossing** — chunky bordered card, "Safe to cross now" status
  (icon + word + colour), open window with a closing countdown, and the next window.
- **Saved walks** — short list, each row carrying its own crossing status
  (Safe / Closing / Closed), each as an icon + word + colour, never colour alone.
- **Add a walk** affordance.

## Why these decisions
- **Light, warm-paper theme** — a dark theme washes out in direct sun; dark ink on
  high-luminance warm off-white maximises contrast in glare.
- **One hi-vis safety-orange accent** — the most sun-legible accent and the
  deliberate opposite of the AI blue/purple; carried at ~10% weight (60-30-10).
- **Saira (display/numerals) + Barlow (body)** — a marine-instrument numeral face
  paired with transit-signage body type; both considered, non-reflex choices.
- **Status is never colour-only** — every status pairs an icon/shape + a text word.

## Quality read (advisory) — PASSED
Independent design jury: PASSED, top score on clarity / hierarchy / accessibility
(WCAG 2.2 AA) / consistency, zero anti-slop hits. Full read in `quality.json`.

## Known follow-up for the build (not defects in this approved look)
This is the populated "all good" view. Before it becomes a live app, design the
states this first look does not yet cover, so a failed data fetch can never
silently show stale safety information:
- **Loading** state for the live tide feed (the header says "Live").
- **Error / stale-feed** state when the tide data is unreachable or out of date.
- **Empty** state for saved walks (zero saved → what "Add a walk" leads with).
