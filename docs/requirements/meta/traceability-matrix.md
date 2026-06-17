# Traceability matrix

The whole-system traceability anchor for the tide-now product. One row per
requirement, tracing it from its driver down to the work that delivers it. This
is the first feature, so this matrix starts here; every later feature registers a
row.

| REQ | Title | Driver | Design | Status | Covering work |
|---|---|---|---|---|---|
| REQ-web-tide-home | tide-now home screen — built to the approved design, live at a customer-viewable URL | Approved design handoff (jury PASSED) — `docs/design/tide-now-home/` | `docs/design/tide-now-home/` | approved | build work-item (created at LAND; registered in `issue-register.md`) |

Notes:
- For this design-handoff value stream the upstream driver is the customer-approved,
  independently quality-checked design rather than a BRD/UC/FLOW chain. The design
  bundle + `approved.md` is the governing spec.
