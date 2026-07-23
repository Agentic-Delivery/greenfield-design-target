---
id: REQ-web-expense-tracker
title: Expense tracker main screen — the approved design, published verbatim and running live at a customer-viewable URL
status: approved
version: 1.0
project-type: greenfield  # first runnable frontend on the reset tree — this build stands up the frontend + a working publish/deploy alongside the screen (the first feature is the path to running software)
link-design: docs/design/design-the-main-screen-of-a-simple-expense-track/ (approved 2026-07-23, greenfield mode, primaryArtifact current/index.html; design-quality jury PASSED-WITH-FINDINGS)
link-brand: docs/design/brand/ (Marginalia — inherited verbatim; tokens.json is the token contract, no new brand tokens)
link-brd: N/A — design-handoff value stream; the customer-approved design (jury PASSED-WITH-FINDINGS) is the governing upstream spec (design-handoff exemption, consistent with the approved sibling REQ-web-foxglove-storefront)
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single screen; its canonical state set (empty · populated · add-button-disabled · add→success · dark mode · reduced-motion) is enumerated in the OUTCOME below. No live data layer in this build, so loading/error states are out of scope (explicitly deferred — see CON-01).
link-adr: N/A — a self-contained static publish reuses the established single-Pages-deploy, route-per-app, deploy-on-merge, OIDC convention (governed by docs/project-context.md → Customer-Viewable URL / Test Environment; architecture-gate PASS, no new architectural decision). SAD §8 CI/CD-topology documentation is tracked separately by intake-request #17.
link-test: planned — the delivery verifier exercises the live public route: (a) the served page renders the approved screen (structural + token match to the as-approved references at 320/375/390/768/1024/1280/1440/1920 px — the references contain the deferred findings; match is against the approved mockup, not a WCAG-idealised target), and (b) the add→success interaction works end-to-end in the browser.
---

## Context

The customer approved, on the live design canvas, the **main screen of a simple
personal expense tracker** — approved exactly as rendered, and passed an independent
design-quality jury (**PASSED-WITH-FINDINGS**: clarity 5, visual hierarchy 5,
accessibility 4, consistency 5; holds up at mobile / tablet / desktop). The approved
design is the spec — the worker publishes it, and does not re-design. The approved
bundle lives at `docs/design/design-the-main-screen-of-a-simple-expense-track/`:

- `current/index.html` — the approved mockup and **the deliverable itself**
  (`artifact.json` → `primaryArtifact: "current/index.html"`, `mode: greenfield`).
  It is **self-contained and client-side only** — an inline script handles
  add-expense / recent-list / empty-state entirely in the browser against seeded
  demo data; there is no backend or API dependency.
- `design-system.md` — the visual contract (tokens, type, spacing), anchored to the
  committed **Marginalia** brand (`docs/design/brand/`, `tokens.json`).
- `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` — the worker-fidelity handoff and the
  per-viewport reference PNGs at `current/viewports/index.html/<px>.png`.
- `approved.md` — the approval record; the customer accepted the screen **as-is**.

### Repository reality — this is a green-field build (path to running software)

`origin/main` is currently **docs-only** (`.github`, `docs`, `README.md`). The prior
`web/` frontend and the publish source for the older demo routes were removed by the
direct commit `4afba05 "reset greenfield-design-target to greenfield for scaffold
proof"`, and `.github/workflows/pages-deploy.yml` still references build inputs
(`web/…`, `scripts/verify-pages-deploy.sh`) that no longer exist in the tree. There
is therefore **no runnable frontend** right now, and **nothing is currently served
from Pages** apart from the design canvas.

Per the factory principle "the first feature is the path to running software," this
build is that first feature: it **stands up the first runnable frontend and a working
publish/deploy** for it and delivers a customer-viewable URL. Restoring the older demo
routes (cadence / pricing / tide-now / foxglove / saltmarsh) that the reset removed is
**out of scope** for this requirement and is not attempted here.

## Value stream

*As a person tracking personal spending, I open the expense tracker in my browser,
enter an amount and pick a category, tap "Add expense," and immediately see the new
expense in my Recent list with my running monthly total updated — on a real page I
can open at a public URL.*

## OUTCOME — what must be true (user-observable, verified on the running system)

- **O1 — live at a public URL.** The expense-tracker main screen is reachable at a
  public, customer-viewable URL and the URL returns the app (not a 404, not a
  placeholder).
- **O2 — it is the approved screen, verbatim.** The **approved `current/index.html`
  is published as the deliverable — served verbatim as a self-contained static page**
  (the cadence / pricing convention), **not re-implemented** from the design system.
  The served page therefore matches the approved references across all declared
  viewports by construction, inheriting the Marginalia brand.
- **O3 — add an expense works.** A user enters a **valid amount** (as the approved
  mockup validates it — a positive amount greater than zero), selects a category
  chip, taps **Add expense**, and the new expense appears in **Recent** (under Today)
  with the running monthly total and budget bar updated — all client-side, no backend.
- **O4 — the designed states behave as approved.** The **add-button-disabled** state
  (until a valid amount), the **empty** state ("Nothing logged yet"), the
  **add→success** interaction, **dark mode**, and **`prefers-reduced-motion`** all
  behave exactly as they do in the approved mockup. (The empty state is a designed
  state reached by the mockup's own logic when the count is 0; no clear/delete or
  persistence behaviour is added beyond what the approved mockup already contains —
  on reload the page returns to the mockup's seeded demo state.)
- **O5 — the deploy is green and the operator-facing docs are honest.** The
  publish/deploy for this screen completes and the public route serves the current
  build; `docs/project-context.md` is updated to reflect what is actually live after
  this change (add the expense-tracker URL; do not claim routes that are not served).

## RULES / Constraints

- **CON-01 — publish the approved design exactly as approved.** Serve the approved
  `current/index.html` verbatim; do not re-design and do not re-implement. Do **not**
  fold in the deferred design-quality findings — the small-caption **contrast** nudge,
  the **async loading/error** states for a live data layer, and the budget-bar
  **easing** polish (jury flags A11Y-CONTRAST, STATE-ASYNC, MOTION-1). The
  contrast/async findings are captured as a separate, explicitly-deferred follow-up
  work item; the budget-bar easing (MOTION-1) ships as it already renders in the
  approved mockup. This build ships the approved screen unchanged, so the acceptance
  match is against the **as-approved** references (which contain those findings), not
  a corrected/WCAG-idealised target.
- **CON-02 — inherit Marginalia verbatim.** No new brand tokens; the screen consumes
  `docs/design/brand/` (`tokens.json` + `design-system.md`) as the token contract.
- **CON-03 — client-side only.** No backend/API is introduced; the tracker runs
  entirely in the browser against the mockup's seeded demo data (matches the approved,
  self-contained mockup).
- **CON-04 — make the deploy green from the current greenfield tree.** Produce a green
  Pages deploy that serves this screen at its public route **without depending on the
  removed older-demo sources**. `pages-deploy.yml` currently references removed build
  inputs; the worker owns whether to patch or replace the workflow, but it must fail
  loud on a genuinely broken build (never green-with-a-warning) and must verify the
  deployed **content** of the new route (a known string the app emits), not merely a
  2xx.
- **CON-05 — reconcile stale operator-facing docs.** Update the Customer-Viewable URL
  and Verification-targets sections of `docs/project-context.md` to reflect the actual
  live surface after this build; do not leave them claiming routes whose source the
  reset removed.
- **CON-06 — carry the per-route operational manual.** Every published sibling app has
  a `docs/operations/<app>-manual.md` traced to its req-id. Author
  `docs/operations/expense-tracker-manual.md` in the same shape (deployment topology,
  health check, deploy/route lever, single-shared-deploy note) traced to
  `req-id: REQ-web-expense-tracker`.

## BLAST RADIUS

- **New/changed components:** a new runnable frontend source for the expense-tracker
  route (the verbatim-served approved mockup), and a reconciled
  `.github/workflows/pages-deploy.yml` (its references to the removed older-demo inputs
  resolved so the deploy is green).
- **Shared single Pages deploy:** GitHub Pages keeps only the most recent deployment,
  so this route must be published by the one shared `deploy` job — never a second,
  competing Pages workflow. On the current docs-only tree nothing else is served from
  Pages, so there is no existing route to preserve; the deploy publishes the
  expense-tracker route as the served site.
- **Operations documentation:** create `docs/operations/expense-tracker-manual.md`
  (CON-06).
- **Operator one-time setup:** GitHub Pages + Actions OIDC were already proven by the
  prior deploys — no new operator secret is expected; if the Pages environment needs
  re-enabling on the reset repo, that is a one-time operator action the worker surfaces.
- **Requirement-chain companions (intake reconciles in the same docs-PR):**
  `docs/requirements/meta/feature-tree.md`, `docs/requirements/use-cases/user-stories.md`,
  `docs/requirements/meta/traceability-matrix.md`, and (after issue creation)
  `docs/requirements/meta/issue-register.md`.

## Zero-Value Failure Modes

1. The page deploys and looks right, but **Add expense does nothing** / the new row
   never appears / the total never updates — a static picture, not a working app.
2. The deploy reports green but the **public URL 404s or serves a placeholder / stale
   page** — there is nothing for the customer to open.
3. The build recreates the frontend but the workflow still fails on the **removed
   older-demo inputs**, so the deploy never goes green and the URL never updates — or
   the workflow is made to `exit 0` around the breakage, reporting a false green.
4. The deploy **removes / unpublishes other content currently served from Pages**
   (the design canvas) instead of publishing alongside it.

## EXAMPLES

- **Happy path:** open the public URL on a phone → see the monthly-total hero, the
  add-expense form, and the Recent list in the Marginalia look → type `12.50`, tap
  "Groceries", tap **Add expense** → a Groceries row appears under Today and the total
  + budget bar update.
- **Edge case:** the amount field is empty or `0` → the **Add expense** button stays
  disabled; entering a positive amount enables it (as the approved mockup validates).
- **Failure mode:** a worker patches only the frontend and leaves `pages-deploy.yml`
  referencing the removed `web/cadence/…` / `scripts/verify-pages-deploy.sh` inputs →
  the deploy job fails (or, worse, is forced green) and the URL never serves the app.
  CON-04 forbids both outcomes.

## Notes

- Suggested public route: `/expenses/` (free of collision; factory-decided, reported
  to the operator). The worker owns the final route wiring.
- BATCH-E2E (user-outcome) acceptance is O3 exercised against the live URL by the
  delivery verifier.
