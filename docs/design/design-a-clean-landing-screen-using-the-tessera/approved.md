# Approved design — Tessera landing hero

**Approved by the customer as-is, on the running canvas, on 2026-06-30.**

## What was approved

A single, minimal landing hero for **Tessera** (a B2B knowledge-graph platform),
built into the live frontend and approved running in the preview. One screen,
one version — no variations requested.

The hero, top to bottom:

- A slim masthead — the Spectral **Tessera** wordmark beside a small four-tile
  mosaic mark (one tile in pine), a quiet nod to what "tessera" means.
- An eyebrow line: **"Knowledge-graph platform"** (mono, muted).
- The headline: **"Every connection, exactly where it belongs."** — the phrase
  *"exactly where it belongs"* lifted in pine italic.
- A one-line subline: **"Tessera links your scattered records into one knowledge
  graph your team can query with confidence."**
- A single primary call-to-action: **"Request a walkthrough"** (pine button,
  arrow icon).
- One quiet reassurance line: **"No setup required · see it on your own data."**

## Why it looks this way (decisions made at the canvas)

- **It is the committed Tessera brand applied, not a new look** — warm-cool
  off-white paper, near-black pine-tinted ink, one deep low-chroma pine accent at
  ~10% weight, and the brand's three type voices (Spectral / Hanken Grotesk /
  JetBrains Mono).
- **Calm, precise, trustworthy** — generous structure and whitespace, pine used
  only where it carries meaning (the action and one emphasised phrase), a
  low-pressure CTA, no urgency tricks, no decoration competing with the message.
- **One primary action only**, as requested — kept deliberately minimal.

## Quality read (advisory)

Independent design-quality jury verdict: **PASSED** — clarity / hierarchy /
accessibility / consistency all 5/5, no anti-slop hits, no responsive breaks,
WCAG 2.2 AA verified in both light and dark modes. Full block in
`.preview/quality.json`. The customer reviewed and approved as-is.

## Build notes for the worker

- Ships as its **own product entry**, mirroring the Saltmarsh hero precedent:
  `web/tessera.html` → `web/src/tessera/main.jsx` → `<TesseraLanding />`,
  `web/src/tessera/tessera.css`, dedicated `web/vite.tessera.config.js`
  (output `dist-tessera`, own Pages subpath `/tessera/`).
- Change is **purely additive** — only new files plus one `.gitignore` line
  (`web/dist-tessera/`). tide-now, Foxglove, and Saltmarsh are untouched.
- The full edit diff is in `.preview/approved.patch`.
- Verified before handoff: the Tessera entry **builds green** (Vite v5,
  `vite build --config vite.tessera.config.js`) and the **full test suite passes
  (94/94, `vitest run`)** with the project's pinned toolchain.

## No open items

No missing screens, no deferred states, no unresolved findings. Single-screen
design, fully approved.
