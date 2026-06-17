# Project context — tide-now

A mobile-first web app for outdoor coastal walkers. The customer-facing UI is
being built from an approved design (see `docs/design/`), one screen at a time.
The repository currently holds a small Express service (`api/`) and no frontend
yet — this is a greenfield design target.

> Note: the repository was scaffolded under the name "Stilla Notes — service".
> The approved customer-facing product being built here is **tide-now**, a tide
> and safe-crossing app for coastal walkers, per the operator's direction on
> 2026-06-17. The existing `api/` service is unrelated backend scaffolding; the
> worker decides at build time whether any of it is reused.

## Customer-Viewable URL
_Not yet established._ This is a green-field factory: there is no CI/CD pipeline,
no staging environment, and no public URL yet. The factory's first feature
(building the approved tide-now home screen) also stands up the path to running
software — a deploy pipeline + staging — so the approved design becomes a
running app the customer can open in a browser. The public URL will be recorded
here once that first delivery lands.

- **URL**: _to be established by the first delivery (bootstrap)_
- **What the customer will see there**: the approved tide-now home screen — the
  big current tide-height reading, the trend badge, the next-safe-crossing card,
  and the saved-walks list — rendering live.
