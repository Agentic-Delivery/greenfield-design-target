# Approved — MoatProof landing (minimal, one screen)

**Approved on the live canvas** by the customer, the whole screen exactly as shown, on 2026-07-05.
Brownfield live-edit session: the deliverable is the edited-frontend diff at `.preview/approved.patch`.

## What was approved

A single, minimal landing screen for the **MoatProof** versioning-test demo:

- A small "MoatProof" eyebrow mark (with a clay dot).
- Headline (exact text): **"MoatProof versioning-test 2026-07-05"**, set in Newsreader serif.
- One-line subtitle: *"A minimal demo screen, stamped with today's build so you can see the version at a glance."*
- A single primary button: **"Get started"** (clay, with hover / active / keyboard-focus states).

Warm-paper (OKLCH) background, soft warm near-black text, one muted clay accent. Vertically and
horizontally centered hero, mobile-first, responsive. No other sections (intentionally minimal).

## Why these decisions

- **Inherits the committed Marginalia brand** — clay terracotta accent (`oklch(0.55 0.106 41)`, ~56%
  sat), warm paper neutrals, Newsreader display serif + Cabin body. The screen looks like it belongs
  to the customer's product rather than a generic template.
- **Anti-slop floor held**: no reflex font (Newsreader/Cabin are the brand's named faces), no AI-lila
  accent, no pure black/white, no gradient text, no centered long-form body — a single legitimate hero.
- **Accessibility**: heading ~14:1, subtitle ~6.8:1 (large), paper-white on clay-700 button ~7:1;
  visible 3px focus ring, 48px target, `prefers-reduced-motion` honored, correct `<h1>` semantics.

## Independent quality read (advisory)

`design-quality-gate` jury: **PASSED** — clarity 5, hierarchy 5, accessibility 5, consistency 5; zero
anti-slop flags; holds at mobile / tablet / desktop. Full machine-readable block in `.preview/quality.json`.

## Files (in `.preview/approved.patch`)

- `web/src/moatproof/MoatProof.jsx` — the landing component.
- `web/src/moatproof/moatproof.css` — self-contained styles (inherits Marginalia tokens as custom props).
- `web/src/moatproof/main.jsx` — MoatProof's OWN entry (mounts `<MoatProof />`).
- `web/moatproof.html` — MoatProof's own HTML entry → `/src/moatproof/main.jsx`.
- `web/vite.moatproof.config.js` — dedicated Vite build (`dist-moatproof`, own subpath `/moatproof/`).
- `web/src/main.jsx` — **design-preview swap only (see build criteria below).**

## Build acceptance criteria for the worker (MUST)

1. **Do NOT ship the `web/src/main.jsx` preview swap.** The patch points tide-now's mount at MoatProof
   *only so the design canvas could preview it*. Before shipping, **restore `web/src/main.jsx` to
   render `<App />`** (import `{ App } from './App.jsx'`). This is guarded by
   `web/src/saltmarsh/entry.test.jsx` ("tide-now entry still imports and renders its own App"), which
   is intentionally RED in this handoff for exactly this reason and MUST return green after restore.
   Shipping the swap would replace the live tide-now app — mirrors the Saltmarsh handoff (REQ R3).
2. **Ship MoatProof behind its own entry** — `web/moatproof.html` → `web/src/moatproof/main.jsx`,
   built via `web/vite.moatproof.config.js` and staged at its own subpath `/moatproof/`, exactly as
   Saltmarsh and Foxglove are staged.
3. After the above, the full suite is green (verified this session: build exit 0; 103/104 tests pass,
   the single red being the preview-swap guard that step 1 resolves).

## Deliverable

`deliverableId` = `ab3f213a-858c-473b-b1f9-d6840aa16d56` — this approved design folds INTO the existing
deliverable thread of the same id; attach to that work item rather than minting a fresh one.
