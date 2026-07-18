# Approved — Cadence landing page

**Approved by the customer:** the whole single screen, exactly as rendered on the canvas, plus the one post-check accessibility fix noted below.

## What this is
A responsive, mobile-first marketing landing page for **Cadence**, a focus-timer app. One screen:

1. **Nav** — sticky, blurred warm-paper bar: Cadence wordmark (clock mark), minimal links, a light/dark toggle, and a small "Start a session" CTA.
2. **Hero** — editorial, left-aligned. Newsreader serif display headline "Find your *cadence*." (italic clay accent on the product word), a one-line subheading, a primary "Start a session" CTA plus a quiet ghost "See how it works" secondary, and a low-key "free to start" note. To the side, a calm "focus ring" timer motif (clay arc + 25:00 / Deep work) that breathes slowly.
3. **Features** — three cards on a raised paper band, each a numbered title + one line: "Sessions, not stopwatches", "Breaks you'll actually take", "A record of quiet hours". Deliberately anti-gamification tone.
4. **Footer** — minimal: wordmark, four links, copyright.

## Brand & system
Anchored to the committed **Marginalia** brand library (`docs/design/brand/`): OKLCH clay accent (one accent, ~10% weight), warm paper/ink neutrals (no pure black/white), Newsreader (serif display) + Cabin (humanist sans), the shared spacing/radius scale. Tokens are carried into the mockup as CSS custom properties. Light theme primary; a real dark theme is wired via `[data-mode="dark"]` and an in-page toggle. Live-tweak hooks (`--accent`, `--scale`, `--density`, `--motion-mult`, `data-mode`) are real properties the CSS reads.

**Note for downstream:** Marginalia is named for the customer's bookshop reading app; it was inherited here because it is the one committed visual foundation and its calm, unhurried personality fits Cadence's "calm, focused, confident, polished-indie" brief. The customer accepted this inheritance. If a distinct Cadence identity is wanted later, that is a separate brand decision.

## Quality read (advisory)
Independent design-quality jury: **PASSED-WITH-FINDINGS** — clarity 5, hierarchy 5, consistency 5, accessibility 4; renders cleanly at mobile / tablet / desktop; no AI-slop (fonts, palette, copy all clear the anti-slop registry). See `quality.json`.

- **Fixed after the read:** the light/dark toggle and the small nav CTA were ~38px on phones (under the 44px comfortable tap-target size). Both now hit 44px on touch devices (`@media (pointer: coarse)`), with no change to the desktop appearance the customer approved. This closes the one real finding.
- **Left as-is (customer-approved, low severity, flagged):** em-dash recurs three times in close succession in the copy; the hero ring breathes on a gentle loop (transform/opacity only, disabled under `prefers-reduced-motion`, on-concept for a timer). Both are polish notes, not shortfalls; the copy is exactly as approved.

## Viewport verification
Checked across the width range (served render + per-width CSS analysis + the jury's cross-viewport read). Phone band (320/375/390): the nav row was tightened at ≤480px so it does not crowd at 320px — now holds. Tablet band (768/1024) and desktop band (1280/1440/1920): reflow cleanly, content capped at 74rem and centred so the widest desktop has no stranded full-bleed column. No horizontal overflow at any width.

## Interactive states
No forms or async data surfaces on this brief, so the five-state checklist reduces to interactive-control states: the CTAs, nav/footer links, theme toggle, and feature cards all carry resting / hover / focus-visible / active states, with a visible 2px focus ring on every control. If a sign-up form or a live-session preview is added later, it will need the full empty / loading / error / success / disabled set.

## Platform
Responsive web, mobile-first. Build for the same target and hold the per-viewport behaviour above.
