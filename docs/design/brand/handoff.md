# Brand library — Tessera (design singleton)

The customer approved a full **brand library for Tessera, a B2B knowledge-graph
platform** (personality: *precise · grounded · quietly confident*), on the design
canvas. The factory promotes it here as the durable **brand singleton** at
`docs/design/brand/` — the reusable Layer-2 foundation that future UI work items
anchor to via `link-brand: docs/design/brand/`.

This is **not a build work-item.** There is nothing to ship from it directly; it
is the reference library. A later UI requirement that opts in (`link-brand`) makes
its enforceable token contract (`tokens.json`) a build constraint.

## What was approved
All 11 components, approved: color-system, typography, button, text-input, select,
choice-controls, badge, card, data-table, navigation, modal — plus the full brand
(colour roles, type scale, spacing/radius tokens). One low-chroma pine accent
(hue 168) at 60-30-10 weight, neutrals tinted to the brand hue, OKLCH throughout,
no pure black/white. `tokens.json` carries the machine-readable token contract.

## Provenance
- Source design session: `1f55872e-1475-494e-ac65-f8d0deaf5741`
- Approved at: 2026-06-24T22:45:17Z
- Parent design SHA: `68310e0555d3d2bae5e8a7713951c52baa1a5280b06e4d6d347c60e585a0313a`
- Components approved: 11 (see `brand-state.json`)

## Note for the operator
This Tessera brand is distinct from the products currently being built in this
repo (tide-now, Foxglove Books, the Saltmarsh coffee hero) — each of those carries
its own approved `link-design` with its own design system. The Tessera library is
captured here as the brand singleton and is available for any **future** screen
that chooses to inherit it; promoting it does not change any in-flight build.
