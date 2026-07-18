# Approved — Cadence pricing page

The customer approved the whole pricing page exactly as rendered on the canvas.

## What was approved
A single responsive-web pricing page for **Cadence** (focus-timer app), built to match the existing Cadence landing page (`web/cadence/index.html`) exactly — same committed Marginalia brand tokens, nav, footer, fonts (Newsreader serif + Cabin), warm-paper background, and clay-terracotta accent. It reads as the same product.

Contents:
- **Editorial pricing hero** — eyebrow "Pricing", serif headline *"Pricing that keeps time **with you**."* (clay italic echoing the landing hero), calm honest sub-line.
- **Working monthly / annual billing toggle** — a `role=radiogroup` segmented control that swaps every tier's price and note; annual honestly shows the saving (Focus $5/mo, "$60 billed yearly — two months on us"), with the promise "the price you choose is the price you keep."
- **Three tiers** — Free ($0 forever), Focus ("Our pick", $6/mo), Team ($9/person/mo), each with a feature list and one CTA. Focus is elevated with the clay border + solid primary button; Free and Team use ghost buttons — one focal point, no dark patterns.
- **Honest FAQ strip** — no trial to run out, cancel any time (history stays yours), price never quietly climbs.
- Full light/dark, keyboard-operable controls, 44px tap targets.

## Decisions made at the canvas
- Prices are **honest placeholders** ($6 Focus / $9 Team; annual ≈ two months saved) — to be replaced with the customer's real numbers at build.
- "Our pick" on Focus is kept as an **honest maker's recommendation** (not false social proof).
- The small clay eyebrow is left **identical to the landing page's eyebrow** to match the brand exactly (it sits at the AA contrast line; consistency with the shipped landing page took precedence).

## Quality
Design jury verdict: **PASSED-WITH-FINDINGS** (clarity 5 / hierarchy 5 / accessibility 4 / consistency 5). The one hard flag — billing-toggle buttons under the 44px mobile touch target — was **fixed before handoff**. Remaining note (the "Our pick" badge) is optional and honest; the customer accepted it. See `quality.json`.

## Build acceptance notes for the worker
- Replace placeholder prices with real numbers; keep the monthly/annual toggle behaviour and the honest annual-saving copy.
- Preserve token-identical match to `web/cadence/index.html` (nav, footer, fonts, clay accent, warm paper).
- Keep the anti-manipulation voice: no fake urgency, no countdowns, no confirmshaming.
