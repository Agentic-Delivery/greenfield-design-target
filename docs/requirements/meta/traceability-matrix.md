# Traceability matrix

The whole-system traceability anchor for this repository. One row per
requirement, tracing it from its driver down to the work that delivers it. Every
feature registers a row. The repository currently holds three design-handoff value
streams for three distinct products — **tide-now** (a coastal-walker tide app),
**Foxglove Books** (an independent-bookshop storefront), and **Saltmarsh** (a
small-batch coffee-roaster landing hero).

| REQ | Title | Driver | Design | Status | Covering work |
|---|---|---|---|---|---|
| REQ-web-tide-home | tide-now home screen — built to the approved design, live at a customer-viewable URL (v1.1 — hero refinement) | Approved design handoff — base `docs/design/tide-now-home/` + refinement `docs/design/tide-now-home-hero-refinement/` (approved 2026-06-22) | `docs/design/tide-now-home/`, `docs/design/tide-now-home-hero-refinement/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |
| REQ-web-foxglove-storefront | Foxglove Books storefront — built to the approved design, live at a customer-viewable URL | Approved design handoff (quality read PASSED-WITH-FINDINGS, locked in as-is) — `docs/design/foxglove-books-storefront/` | `docs/design/foxglove-books-storefront/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |
| REQ-web-saltmarsh-hero | Saltmarsh coffee-roaster hero — built to the approved design, live at a customer-viewable URL (own /saltmarsh/ entry; tide-now + Foxglove preserved) | Approved design handoff (jury PASSED-WITH-FINDINGS, locked in as-is; brownfield patch onto the Vite+React frontend) — `docs/design/saltmarsh-hero/` | `docs/design/saltmarsh-hero/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |

Notes:
- For this design-handoff value stream the upstream driver is the customer-approved,
  independently quality-checked design rather than a BRD/UC/FLOW chain. The design
  bundle + `approved.md` is the governing spec.
