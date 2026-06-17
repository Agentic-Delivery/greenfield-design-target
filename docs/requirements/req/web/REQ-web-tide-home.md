---
id: REQ-web-tide-home
title: tide-now home screen — built to the approved design, live at a customer-viewable URL
status: approved
version: 1.0
project-type: greenfield
link-design: docs/design/tide-now-home/
link-brd: N/A — design-handoff value stream; the customer-approved design (jury PASSED) is the governing upstream spec
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single-screen success view + its loading/error/empty states (enumerated below)
link-adr: N/A — greenfield frontend stack deferred to the worker (LAW 5); design-system.md is the binding visual contract; the two structural defaults (on-device persistence, server-side credential boundary) are recorded as R6/R7 below
link-test: planned — per-viewport structural + token match of the built screen against current/viewports/index.html/<px>.png for each declared width, plus a reachability check of the public staging URL (O5). Verified post-deploy by the delivery verifier.
---

## Context

The customer-facing product is **tide-now**, a mobile-first web app for outdoor
coastal walkers. Its home screen has been designed on the live canvas, **approved
by the customer exactly as rendered**, and **passed an independent design-quality
jury** (clarity / visual hierarchy / accessibility WCAG 2.2 AA / consistency all
top score, zero anti-slop hits).

The approved design is the spec. The worker builds to it — it does not re-design.
The approved mockup, the design system, the per-viewport references, and the
build instructions all live in the relocated bundle at `docs/design/tide-now-home/`:

- `current/index.html` — the approved greenfield mockup (the primary build
  artifact; `artifact.json` → `primaryArtifact: "current/index.html"`).
- `design-system.md` — the binding visual contract (tokens, type, spacing), at the
  bundle root. There is no machine-readable token contract; build to this file.
- `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` — the worker-fidelity handoff and
  the machine-readable build target (one screen, with per-viewport reference PNGs
  at `current/viewports/index.html/<px>.png` for 320/375/390/768/1024/1280/1440/
  1920 px).
- `approved.md` — the approval record and design rationale.

This is the **green-field factory's first feature**. There is no CI/CD pipeline,
no staging, and no customer-viewable URL yet. Per the factory principle "the first
feature is the path to running software," this value stream must not only build
the screen but also deliver it as a running app the customer can open in a browser.

## OUTCOME

A coastal walker opens the tide-now app in a phone browser at a public URL and, at
a glance in bright daylight, sees the current tide situation and whether it is safe
to cross — exactly as the approved design shows it.

- **O1 — Home screen, populated success view.** When live tide data is available,
  the screen renders, matching the approved design: the large current tide-height
  reading, the trend badge (e.g. "Rising", up-arrow + word), change-in-last-hour
  and high-water time, the "next safe crossing" card (status icon + word + colour,
  open window with closing countdown, next window), and the saved-walks list (each
  row carrying its own crossing status as icon + word + colour).
- **O2 — Loading state.** While the live tide feed is being fetched, the screen
  shows a loading state for the live data — never a blank panel and never a stale
  number presented as if it were live. (Not covered by the approved success view;
  design it consistent with `design-system.md`.)
- **O3 — Error / stale-feed state.** When the tide feed is unreachable, or the data
  is older than a configured freshness window (an operator-tunable threshold chosen
  at build time — not a fabricated value here), the screen shows a clearly labelled
  stale/error state with the data's age — so a failed fetch can never silently
  present out-of-date safety information. (Not covered by the approved success
  view; design it.)
- **O4 — Empty saved-walks state.** When the walker has zero saved walks, the
  saved-walks area shows a meaningful empty state leading with the "Add a walk"
  affordance — not a blank area. (Not covered by the approved success view.)
- **O5 — Live at a customer-viewable URL.** The built app is deployed via a CI/CD
  pipeline to a staging environment and is reachable at a public URL where the
  customer can open it in a browser and see the running home screen. This
  establishes the factory's path to running software.

## RULES

- **R1 — Build to the approved design, no deviation.** The build MUST match
  `docs/design/tide-now-home/current/index.html` and
  `docs/design/tide-now-home/design-system.md` in layout, tokens, type, and
  spacing. No visual deviation is permitted without a customer-approved design
  amendment. The worker does NOT invent its own UI.
- **R2 — Mobile-first across the full viewport set.** The build MUST match its
  approved per-viewport references at
  `docs/design/tide-now-home/current/viewports/index.html/<px>.png` for each of
  320/375/390/768/1024/1280/1440/1920 px (structural + token match, not a pixel
  copy). A per-viewport divergence is a defect that blocks close.
- **R3 — Status is never colour-only.** Every crossing/tide status MUST pair an
  icon/shape + a text word with the colour (accessibility — colour-as-only-signal
  is forbidden, per the approved design and WCAG 2.2 AA).
- **R4 — All interactive states present.** The approved design covers only the
  success state (O1); the loading (O2), error/stale (O3), and empty (O4) states
  MUST also be built before the app is considered done. The approved mockup
  contains no disabled controls, so no disabled state is in scope; if the build
  introduces one, it MUST be visibly and programmatically conveyed as disabled.
  Success alone is not done.
- **R5 — Frontend stack chosen by the worker (LAW 5).** No framework is pinned.
  The worker selects the stack at build time; the design system and per-viewport
  references are the contract, not the source shape.
- **R6 — Saved walks persist on the device for v1.** The approved design has no
  sign-in or account, so cross-device sync is out of scope (YAGNI). Saved walks
  persist locally on the walker's device; a future account/sync feature, if ever
  requested, is a separate value stream. (Recorded here to govern the structural
  storage choice the architecture review flagged as otherwise undocumented.)
- **R7 — The tidal-data credential never reaches the browser.** Any API key /
  secret for the external tidal source MUST be held server-side, not embedded in
  client code. The worker chooses the concrete fetch boundary at build time (e.g. a
  thin server-side proxy, which may reuse the existing `api/` service) under the
  security-compliance gate, and enforces O3 stale-detection at that boundary.
  (Recorded here to govern the fetch-layer choice the architecture review flagged.)

## BLAST RADIUS

- **Components:** new web frontend (the home screen) + a deploy pipeline + staging
  environment. The existing `api/` Express service is unrelated scaffolding; the
  worker decides whether any of it is reused.
- **Third-party dependency (LAW 9 — fallback required):** the screen depends on an
  external tidal-data source for height, trend, and safe-crossing prediction. If
  that source is unreachable or returns stale data, the app MUST render the
  error/stale state (O3) with the data's age — it MUST NOT crash, show a blank
  screen, or present stale data as live. The specific data source is a worker /
  operator decision at build time and is not fabricated here.
- **Operator one-time setup (path to running software):** standing up the pipeline
  + staging requires the operator to choose a hosting/cloud target and provide the
  associated account/credentials. This is the single real-world input not decided
  here; the worker surfaces it (needs-manual-steps) when it reaches deployment.
- **Operational levers (record when the pipeline lands):** the hosting target, the
  deploy credentials, the tidal-data source endpoint + its credential, and the O3
  freshness window are operational levers. This green-field factory has no
  Operational Manual yet; the build that establishes the pipeline MUST create the
  first manual under `docs/operations/` with these levers traced to
  `req-id: REQ-web-tide-home`.

## EXAMPLES

- **Happy path:** walker opens the app on a 390 px phone in bright sun; live data is
  fresh; they see "2.4 m / Rising", "Safe to cross now" with a closing countdown,
  and their two saved walks each with a status chip. They decide to cross. (Matches
  the approved success view.)
- **Stale feed:** the tidal source is down; the app shows the last reading clearly
  marked stale with its age and does not show a green "safe to cross" as if it were
  current. The walker is not misled into an unsafe crossing.
- **Empty walks:** a first-time walker has saved nothing; the saved-walks area
  invites them to "Add a walk" rather than showing an empty gap.
- **Live URL:** after merge, the customer opens the public staging URL on their
  phone and sees the running home screen.
