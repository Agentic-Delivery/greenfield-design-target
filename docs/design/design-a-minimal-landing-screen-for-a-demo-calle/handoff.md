# Handoff — MoatProof landing screen

The customer approved this screen on the live design canvas on **2026-07-05**, exactly as shown.
This note is the plain-language record of that approval and where the approved design now lives in the
project. It was saved here automatically the moment the customer approved it — no one had to copy it
across by hand.

## What was approved

A single, minimal landing screen for the **MoatProof** versioning-test demo: a small "MoatProof"
eyebrow mark, an editorial serif headline ("MoatProof versioning-test 2026-07-05"), a one-line
subtitle, and one primary "Get started" button — on a warm-paper background with a single muted clay
accent. Centered hero, mobile-first and responsive, nothing else on the page (intentionally minimal).
It inherits the customer's committed Marginalia brand rather than a generic template.

An independent design-quality read (advisory) passed on every dimension — clarity, visual hierarchy,
accessibility (WCAG 2.2 AA), and consistency — with no anti-slop flags, and holds up at mobile, tablet,
and desktop.

## Build target (brownfield)

This is a **brownfield** design: the build target is the diff **`approved.patch`** in this folder,
applied onto the customer's real **Vite** frontend — not a standalone mockup (there is no `index.html`).
When a team member builds this, the key points from the approval note (`approved.md`) are:

- Ship MoatProof behind its **own entry** (`web/moatproof.html` → `web/src/moatproof/main.jsx`, built
  via `web/vite.moatproof.config.js`), staged at its own subpath `/moatproof/`.
- **Restore `web/src/main.jsx` to render `<App />` before shipping** — the patch's swap of that file
  is a design-preview-only change so the canvas could show MoatProof; shipping it would replace the
  live tide-now app. A guard test (`web/src/saltmarsh/entry.test.jsx`) is intentionally red in the
  patch for exactly this reason and must go green after the restore.

## Provenance

- Source design handoff id: `design-a-minimal-landing-screen-for-a-demo-calle-ab3f213a`
- Deliverable thread: `ab3f213a-858c-473b-b1f9-d6840aa16d56`
- Approved at: `2026-07-05T15:36:57Z`
- Mode: brownfield · target framework: Vite · primary artifact: `approved.patch`
- Design content hash: `8352cdc32122d01dce090189754696e8dcd0ab34481586ba8388d715edf246b4`

The full approval details, design system, token subset, lineage, and the machine-readable quality
verdict are in the sibling files (`approved.md`, `design-system.md`, `lineage.json`, `quality.json`).
