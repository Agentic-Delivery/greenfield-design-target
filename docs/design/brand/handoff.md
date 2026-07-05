# Marginalia — brand library (committed anchor)

The customer approved the **Marginalia** brand system. It is now the canonical,
reusable brand foundation for this factory: later UI work anchors to it via
`link-brand: docs/design/brand/`, and the enforceable token contract lives at
`docs/design/brand/tokens.json`.

This library is a singleton — this commit replaces any previously committed brand
library in full.

## What is here

- `current/index.html` — the approved brand mockup (the primary artifact; greenfield).
- `design-system.md` — the brand spec: atmosphere, colour roles, type scale,
  component inventory & states, token model, motion & accessibility.
- `tokens.json` — the machine-readable token contract workers enforce via `link-brand`.
- `snapshot.png`, `current/viewports/…` — reference renders.
- `brand-state.json`, `lineage.json`, `quality.json`, `artifact.json`,
  `handoff.json`, `versions/` — provenance and lineage carried from the design session.

## Provenance

- Source design deliverable: `21042b48-0078-44da-b51e-0c986e0fd247`
- Approved at: `2026-06-26T03:52:59.267Z`
- Content checksum (parentDesignSha): `c87bb3a7d7e79f69522976b2774eace63d5507d292cb3898710f63f8300d880f`
- Mode: greenfield (`primaryArtifact: current/index.html`)
- Committed via: automated brand commit (label `brand-auto-commit`)
