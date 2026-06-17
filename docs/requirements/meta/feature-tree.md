# Feature tree — tide-now

The product feature map. The first node is the home screen; later screens and
capabilities hang off this tree.

- **tide-now** — mobile-first tide & safe-crossing app for outdoor coastal walkers
  - **Home screen** (first feature) → REQ-web-tide-home · design `docs/design/tide-now-home/`
    - current tide-height reading + trend badge
    - next-safe-crossing card (status: Safe / Closing / Closed)
    - saved-walks list (per-row crossing status)
    - states: success (designed), loading, error/stale, empty
    - delivery: CI/CD pipeline + staging → customer-viewable URL (path to running software)

_Future leaves (not yet requested): saved-walk detail/add flow, account & cross-device sync, additional screens._
