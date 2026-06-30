# Handoff — Tessera landing hero

The customer approved a clean landing hero for **Tessera** on the live design
canvas and it has been saved into the project. A worker will build it; future
screens inherit the Tessera brand automatically.

## What was approved

A single, minimal landing hero for Tessera (a B2B knowledge-graph platform): a
slim masthead with the Tessera wordmark and a four-tile mosaic mark, an eyebrow
line, the headline *"Every connection, exactly where it belongs."*, a one-line
subline, one primary call-to-action ("Request a walkthrough"), and one quiet
reassurance line. It is the committed Tessera brand applied — not a new look —
calm, precise, and trustworthy, with one deep pine accent used only where it
carries meaning. One screen, one version; no open items.

The independent design-quality jury passed it (clarity / hierarchy /
accessibility / consistency all 5/5, WCAG 2.2 AA verified in light and dark, no
anti-slop findings). The full read is in `quality.json`; the customer-facing
narrative is in `approved.md`, and the screen's use of the brand is in
`design-system.md`.

## Build target (for the worker)

- **Mode:** brownfield — this is a diff against the customer's real frontend, not
  a standalone mockup.
- **Primary artifact:** `approved.patch` (in this folder), applied onto the
  **Vite** frontend (`web/`).
- The patch ships Tessera as its own product entry, mirroring the Saltmarsh
  precedent (`web/tessera.html` → `web/src/tessera/main.jsx` →
  `<TesseraLanding />`, `web/src/tessera/tessera.css`, a dedicated
  `web/vite.tessera.config.js` serving `/tessera/`). The change is purely
  additive — tide-now, Foxglove, and Saltmarsh are untouched.
- The screen inherits the committed Tessera brand library at
  `docs/design/brand/`; its tokens are the canonical source.

## Provenance

- Source design id: `design-a-clean-landing-screen-using-the-tessera-ddd83846`
- Deliverable / session id: `ddd83846-1af2-45a2-9410-579238c171f3`
- Parent design content hash: `2490248f30a51fc41f3965d6732ff68619dceb19df232120571fcd7d5d65496b`
- Inherited brand-tokens hash: `69bbfd7b9c24b4826cf7f11b89640d89a90c4aa30ae7b0d34564951dfc7941ed`
- Approved at: `2026-06-30T20:24:15Z`
