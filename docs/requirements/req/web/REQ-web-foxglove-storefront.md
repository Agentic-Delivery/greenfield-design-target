---
id: REQ-web-foxglove-storefront
title: Foxglove Books storefront — built to the approved design, live at a customer-viewable URL
status: approved
version: 1.0
project-type: greenfield
link-design: docs/design/foxglove-books-storefront/
link-brd: N/A — design-handoff value stream; the customer-approved design (quality read PASSED-WITH-FINDINGS, locked in as-is) is the governing upstream spec
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single-screen storefront (success view) plus its empty/loading/error/disabled states (enumerated below)
link-adr: N/A — greenfield frontend stack deferred to the worker (LAW 5); design-system.md is the binding visual contract; the catalogue-data and basket-scope defaults are recorded as R6/R7 below
link-test: planned — per-viewport structural + token match of the built screen against current/viewports/index.html/<px>.png for each declared width, plus a reachability check of the public staging URL (O6). Verified post-deploy by the delivery verifier.
---

## Context

The customer-facing product is **Foxglove Books**, a small independent
neighbourhood bookshop storefront. Its home screen has been designed on the live
canvas in the **"The Reading Room"** direction, **approved by the customer exactly
as rendered** ("exactly right"), and **passed an independent design-quality read**
(PASSED-WITH-FINDINGS — cleared the AI-slop test; the customer reviewed the
findings and locked the design in as-is).

The approved design is the spec. The worker builds to it — it does not re-design.
The approved mockup, the design system, the per-viewport references, and the
build instructions all live in the relocated bundle at
`docs/design/foxglove-books-storefront/`:

- `current/index.html` — the approved greenfield mockup (the primary build
  artifact; `artifact.json` → `primaryArtifact: "current/index.html"`).
- `design-system.md` — the binding visual contract (OKLCH colour roles, the
  Cormorant + Spectral type pairing, spacing/radius tokens, the five UI states).
  There is no machine-readable token contract; build to this file.
- `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` — the worker-fidelity handoff and
  the machine-readable build target (one screen, with per-viewport reference PNGs
  at `current/viewports/index.html/<px>.png` for 320/375/390/768/1024/1280/1440/
  1920 px).
- `approved.md` — the approval record and design rationale.
- `quality.json` — the design-quality read and the build-time punch list.

This green-field factory has no customer-viewable URL for this product yet. Per
the factory principle "the first feature is the path to running software," this
value stream both builds the storefront and delivers it as a running app the
customer can open in a browser. (A separate bootstrap-path work-item for the
tide-now product, REQ-web-tide-home / issue #2, also stands up a path to running
software; whether the two products share one pipeline/staging is a worker/operator
reconciliation at build time — see BLAST RADIUS.)

## OUTCOME

A customer of Foxglove Books opens the storefront in a browser at a public URL
and, at a glance, browses a warm independent bookshop — the featured titles, the
booksellers' picks, this week's book — and can add a book to their basket, exactly
as the approved design shows it.

- **O1 — Storefront home, populated success view.** The page renders matching the
  approved design `current/index.html`: the masthead (shop name + line-drawn
  foxglove mark, nav, basket button with a live count badge), the "This week we're
  reading" hero, the "New & Notable" featured shelf (hand-typeset generative covers
  with title/author/price), the "What the booksellers love" staff-picks shelf (each
  pick paired with a signed italic hand-written note), the "This week's book" detail
  panel, and the monthly-letter sign-up + footer (hours/address).
- **O2 — Add to basket (default → success) and basket flyout.** Add-to-basket is
  the single primary action: from its default state it confirms success (the button
  becomes "in your basket", the masthead basket count bumps, a confirmation shows).
  The basket flyout shows its **empty** state ("Your basket is empty — go find
  something lovely") and its **filled** state (line items + count + subtotal).
- **O3 — Disabled state.** An out-of-print title shows the add-to-basket control in
  a visibly and programmatically disabled state, per the approved design.
- **O4 — Loading state.** Any content area that is fetched at runtime shows a
  loading state (the approved design demonstrates a cover shimmer placeholder) —
  never a blank panel. (For static catalogue data this may be brief; design it
  consistent with `design-system.md`.)
- **O5 — Error state.** Where a runtime fetch can fail (the newsletter sign-up
  submission; any dynamic basket/catalogue call the worker introduces), the screen
  shows a clearly labelled error/feedback state rather than failing silently —
  including invalid-email feedback on the newsletter form. (Completes the async
  states the static mockup skipped — see the design punch list.)
- **O6 — Live at a customer-viewable URL.** The built storefront is deployed via a
  CI/CD pipeline to a staging environment and is reachable at a public URL where
  the customer can open it in a browser and see the running storefront. This
  establishes (or reuses) the factory's path to running software for this product.

## RULES

- **R1 — Build to the approved design, no deviation.** The build MUST match
  `docs/design/foxglove-books-storefront/current/index.html` and
  `docs/design/foxglove-books-storefront/design-system.md` in layout, OKLCH colour
  roles, the Cormorant/Spectral type pairing, and spacing. No visual deviation is
  permitted without a customer-approved design amendment. The worker does NOT
  invent its own UI. Light theme is the approved default; the source defines
  dark-mode tokens, but a working dark toggle is not a v1 requirement (this
  deferral is stated here in R1).
- **R2 — Mobile-first across the full viewport set.** The build MUST match its
  approved per-viewport references at
  `docs/design/foxglove-books-storefront/current/viewports/index.html/<px>.png` for
  each of 320/375/390/768/1024/1280/1440/1920 px (structural + token match, not a
  pixel copy). A per-viewport divergence is a defect that blocks close.
- **R3 — All interactive states present.** Empty (basket), default & success
  (add-to-basket), disabled (out-of-print title), and loading (O4) MUST all be
  built; the error/feedback states (O5) MUST also be built. Success alone is not
  done.
- **R4 — Accessibility (WCAG 2.2 AA) — the design punch list is in scope.** Every
  interactive element MUST have a visible `:focus-visible` indicator (≥ 2px,
  ≥ 3:1 contrast), and the newsletter email input MUST NOT have its focus outline
  removed (the one AA gap on the primary path). The smallest mobile controls (basket
  close button, nav links) MUST reach a ≥ 44px touch target on phones. Any
  status/feedback MUST NOT rely on colour alone.
- **R5 — Frontend stack chosen by the worker (LAW 5).** No framework is pinned
  (`targetFramework: null`). The worker selects the stack at build time; the design
  system and per-viewport references are the contract, not the source shape.
- **R6 — Generative covers, no stock imagery.** The approved design deliberately
  uses hand-typeset generative covers drawn in the brand's own type and paper tones
  (no image assets). The build MUST preserve this — it MUST NOT substitute stock or
  photographic cover imagery.
- **R7 — One approved screen; no commerce backend in v1 (YAGNI).** Scope is this
  single approved storefront screen and its states. The basket and catalogue are
  client-side for v1 (generative/sample catalogue data is acceptable); there is no
  checkout, payment, real inventory, or account/sign-in in scope. Any such
  capability, if ever requested, is a separate value stream. (Recorded here to
  govern the data/basket-scope choice and keep the build to the approved screen.)

## BLAST RADIUS

- **Components:** new web frontend (the storefront home screen) + a deploy pipeline
  + staging environment. The existing `api/` Express service is unrelated
  scaffolding; the worker decides whether any of it is reused.
- **Shared path to running software (reconcile at build time):** a separate
  bootstrap-path work-item (REQ-web-tide-home / issue #2) also stands up a CI/CD
  pipeline + staging for this repository. The worker/operator decide whether the
  Foxglove storefront shares that pipeline/staging or stands up its own; either way
  O6 requires the storefront to be reachable at a public URL.
- **Operator one-time setup (path to running software):** standing up (or extending)
  the pipeline + staging requires the operator to choose a hosting/cloud target and
  provide the associated account/credentials. This is the single real-world input
  not decided here; the worker surfaces it (needs-manual-steps) at deployment.
- **Operational levers (record when the pipeline lands):** the hosting target and
  the deploy credentials are operational levers. If this factory has no Operational
  Manual yet when this work lands, the build that establishes the pipeline MUST
  create the first manual under `docs/operations/` with these levers traced to
  `req-id: REQ-web-foxglove-storefront`.

## EXAMPLES

- **Happy path:** a customer opens the storefront on a phone; the masthead, hero,
  "New & Notable" shelf, the booksellers' signed picks, and "This week's book"
  render in the warm "Reading Room" look; they tap **Add to basket** on this week's
  book, the button confirms "in your basket", and the masthead count bumps to 1.
- **Out of print:** the customer reaches an out-of-print title; its add control is
  clearly disabled and cannot be added to the basket.
- **Empty basket:** the customer opens the basket before adding anything and sees
  "Your basket is empty — go find something lovely," not a blank panel.
- **Newsletter:** the customer enters an invalid email into the monthly-letter
  sign-up and sees inline invalid-email feedback; a valid email shows a success
  confirmation.
- **Live URL:** after merge, the customer opens the public staging URL and sees the
  running Foxglove Books storefront.
