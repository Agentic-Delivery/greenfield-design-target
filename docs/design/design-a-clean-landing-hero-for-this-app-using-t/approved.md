# Approved — tide·now landing hero (Marginalia brand)

**Approved:** the whole single landing-hero screen, exactly as reviewed on the canvas.
**Brand:** the committed **Marginalia** library (inherited, not re-invented).
**Mode:** brownfield live-edit — the real vite/React frontend at `web/` was edited; the running app the customer approved is those edits applied.

## What was approved

A calm, single-screen landing hero that introduces tide·now before the live app:

- **Masthead:** quiet `tide·now` wordmark (Newsreader, the `·` in clay).
- **Eyebrow:** "Holy Island Causeway" with a short clay rule.
- **Headline:** *"Cross when the tide lets you."* — Newsreader serif; the italic "lets you" is the single clay accent note.
- **Supporting line (one):** "Live tide readings for the Holy Island crossing, so you set off at the right hour and get home dry."
- **Single primary CTA:** "Check today's crossing" → enters the existing live tide app (`<App/>`).
- **Quiet footnote:** "Updated from the live tide feed" with a small clay wave glyph.

## Decisions made at the canvas

- **One screen, centred, breathing** — the middle band is given entirely to the hero (`min-height: 100dvh`, three-row grid: masthead / stage / footnote).
- **Brand fidelity** — warm paper ground, soft near-black ink, one muted clay accent used exactly once for emphasis; Newsreader (display) + Cabin (body); all colour/space via `var(--token)`, OKLCH throughout. No pure black/white, no reflex fonts, no AI-lila.
- **Single primary action** — deliberately no secondary button (the footnote is informational, not a second CTA).
- **The tide app is preserved** — the hero mounts ahead of `<App/>` via `main.jsx`; the CTA enters it. Nothing in the tide app was removed.

## Independent quality read (advisory)

- Jury verdict: **PASSED-WITH-FINDINGS**. Clarity 5 · Hierarchy 5 · Accessibility 5 · Consistency 4. Zero anti-slop flags.
- Accessibility: heading ~14:1, body ~10:1 on paper; paper-white on clay-700 CTA ~7:1; visible 2px focus ring; 48px target; semantic `<main>/<h1>/<button>`; no colour-only signal. Dark slot-alias re-points surface and text together (stays legible).
- **Recommended (not required) follow-ups** — surfaced to the customer, who chose to lock in as-is:
  1. Bring the eyebrow / footnote / mobile-headline-floor sizes onto the `--step-*` type scale (small consistency drift).
  2. Drop the unused Saira/Barlow font `<link>` from the landing screen (leftover from the tide app; the hero uses only Newsreader/Cabin).
  3. Remove a possible ~40px sliver of the older `--paper` body background below the hero (zero the body bottom-padding on the landing route, or let the hero own the full body background).

## Verification

- **Build:** `vite build` — green.
- **Tests:** `vitest run` — 104/104 green (must run with `NODE_ENV=test`; the review sandbox had `NODE_ENV=production` exported, which forces React's production build and breaks React Testing Library's `act()` on every render test — an environment artifact, not a code defect; CI runs in test mode).
- **Viewports:** design is fully fluid (no fixed-width elements; `clamp()` headline; stage capped at 34rem, measure at 40ch; logical properties); jury cross-viewport read holds at mobile/tablet/desktop with no breaks. Not independently driven across all 8 widths this session (no headless browser available to the design agent); customer reviewed and approved on the canvas.
