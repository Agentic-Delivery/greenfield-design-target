# Traceability matrix

The whole-system traceability anchor for this repository. One row per
requirement, tracing it from its driver down to the work that delivers it. Every
feature registers a row. The repository currently holds two design-handoff value
streams for two distinct products — **tide-now** (a coastal-walker tide app) and
**Foxglove Books** (an independent-bookshop storefront).

| REQ | Title | Driver | Design | Status | Covering work |
|---|---|---|---|---|---|
| REQ-web-tide-home | tide-now home screen — built to the approved design, live at a customer-viewable URL | Approved design handoff (jury PASSED) — `docs/design/tide-now-home/` | `docs/design/tide-now-home/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |
| REQ-web-foxglove-storefront | Foxglove Books storefront — built to the approved design, live at a customer-viewable URL | Approved design handoff (quality read PASSED-WITH-FINDINGS, locked in as-is) — `docs/design/foxglove-books-storefront/` | `docs/design/foxglove-books-storefront/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |

Notes:
- For this design-handoff value stream the upstream driver is the customer-approved,
  independently quality-checked design rather than a BRD/UC/FLOW chain. The design
  bundle + `approved.md` is the governing spec.
