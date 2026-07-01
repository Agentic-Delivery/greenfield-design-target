# Worker-fidelity handoff — build the approved design as a CONTRACT, not from a guess

Read this BEFORE writing any build code. It routes the build in a fixed order so the committed brand is consumed (not glanced at) and every approved screen is built from its own reference (none guessed or skipped). `DESIGN-MANIFEST.json` (beside this file) is the machine-readable build target.

## 1. Token-extraction-first

This design carries no machine-readable token contract; build to the tokens/type/spacing in `design-system.md`. Wire the design-system values consistently before building any screen.

## 2. Screen-file-first routing (manifest order, index first)

Build each named screen from its OWN approved screen file, in this order — do not guess a screen and do not skip one:

- `index.html` (Index)

## 3. Match across the viewport set

Build each screen to MATCH its approved per-viewport references at: 320, 375, 390, 768, 1024, 1280, 1440, 1920 px (the full responsive set). The deployed build is later compared to each reference, screen by screen and viewport by viewport — a structural + token match (layout, tokens, type, spacing, the five states), not a pixel copy and not a source-shape check. A per-viewport divergence is CONTESTED and blocks issue close.
