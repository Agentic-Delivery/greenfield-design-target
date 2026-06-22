---
id: REQ-web-tide-home
title: tide-now home screen — built to the approved design, live at a customer-viewable URL
status: approved
version: 1.1
baseline-ref: REQ-web-tide-home v1.0 (initial build — orange accent, original hero spacing)
project-type: brownfield  # v1.1 refines the already-shipped v1.0 screen; refinement bundle records mode: brownfield
link-design: docs/design/tide-now-home/ (base — structural reference for the whole screen) + docs/design/tide-now-home-hero-refinement/ (approved 2026-06-22 — authoritative for the hero spacing + accent token)
link-brd: N/A — design-handoff value stream; the customer-approved design (jury PASSED) is the governing upstream spec
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single-screen success view + its loading/error/empty states (enumerated below)
link-adr: N/A — no new architectural decision introduced; the frontend stack was chosen at the v1.0 build (Vite + React, per the refinement's approved.patch) and is not revisited by this CSS-only refinement; design-system.md remains the binding visual contract; the two structural defaults (on-device persistence, server-side credential boundary) are recorded as R6/R7 below
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

- `current/index.html` — the approved base mockup (the primary build
  artifact; `artifact.json` → `primaryArtifact: "current/index.html"`).
- `design-system.md` — the binding visual contract (tokens, type, spacing), at the
  bundle root. There is no machine-readable token contract; build to this file.
- `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` — the worker-fidelity handoff and
  the machine-readable build target (one screen, with per-viewport reference PNGs
  at `current/viewports/index.html/<px>.png` for 320/375/390/768/1024/1280/1440/
  1920 px).
- `approved.md` — the approval record and design rationale.

At **v1.0** this was the **green-field factory's first feature** — it stood up the
CI/CD pipeline, the staging environment, and the customer-viewable URL alongside
the screen itself, per the factory principle "the first feature is the path to
running software." That path now exists and the screen is live; O5 (live at a
public URL) is therefore a **maintained guarantee** from v1.1 onward, not a
first-time deliverable. This v1.1 refinement lands a CSS-only diff onto that
already-running app through the existing pipeline.

### v1.1 — approved hero refinement (2026-06-22)

After the screen shipped live, the customer approved a **refinement of the hero**
on the live design canvas. It is a brownfield, CSS-only change (no component
logic): a calmer, warmer amber accent token in place of the original hi-vis
orange, more generous hero vertical rhythm, and a clearer
**place → reading → times** hierarchy (the location label stepped down a tier so
the big tide reading is the unmistakable headline). The approved refinement
bundle — the build diff (`approved.patch`), its rationale (`approved.md`), and the
refined design system — lives at `docs/design/tide-now-home-hero-refinement/`.
This refinement is authoritative for the hero spacing and the accent token; the
base bundle at `docs/design/tide-now-home/` remains the structural reference for
everything else (layout, components, per-viewport references, and the
loading/error/empty states).

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
- **O5 — Live at a customer-viewable URL.** The app is deployed via a CI/CD
  pipeline to a staging environment and is reachable at a public URL where the
  customer can open it in a browser and see the running home screen. The pipeline
  established this path at v1.0; from v1.1 onward O5 is a **maintained guarantee** —
  the refinement ships through the existing pipeline and the screen MUST remain
  reachable and rendering after deploy.

## RULES

- **R1 — Build to the approved design, no deviation.** The build MUST match
  `docs/design/tide-now-home/current/index.html` and
  `docs/design/tide-now-home/design-system.md` in layout, tokens, type, and
  spacing, **as refined by the approved 2026-06-22 hero refinement at
  `docs/design/tide-now-home-hero-refinement/`**: where the two disagree, the
  refinement is authoritative for the hero spacing and the accent token
  (`--hue`, `--accent`, `--accent-ink` — the calmer amber, NOT the original
  hi-vis orange) and its `design-system.md` supersedes the accent + hero
  rationale in the base bundle. No visual deviation beyond the approved
  refinement is permitted without a further customer-approved design amendment.
  The worker does NOT invent its own UI.
- **R1a — Accent contrast meets WCAG 2.2 AA, by use-class.** The refined accent
  tokens carry different contrast obligations depending on how each is used, and
  the build MUST satisfy all of them:
  - **Accent text / icon — 4.5:1.** Uses of `--accent-ink` as foreground (the
    location pin marker; any accent-coloured text on paper) MUST meet 4.5:1. The
    refined `--accent-ink` (`oklch(0.47 0.13 58)`) is well above this on paper —
    these uses pass as designed.
  - **Accent focus indicator / non-text — 3:1 (WCAG 2.2 SC 1.4.11 / 2.4.13).**
    The raw amber `--accent` (`oklch(0.71 0.135 62)`) is **below 3:1** against
    both paper and surface (~2.4:1 / ~2.6:1). The existing keyboard focus
    outlines on the saved-walk rows and the add-walk control use raw `--accent`
    and therefore fail the 3:1 focus-indicator threshold — a **pre-existing**
    failure (the original orange was also sub-3:1 at ~2.57:1) that shipping the
    amber marginally worsens. Because this refinement is already touching the
    accent token and the same stylesheets, the build MUST bring every
    accent-driven keyboard focus indicator to ≥3:1 (e.g. drive the focus outline
    from `--accent-ink` or `--ink`, keeping it in the approved hue family) so the
    refinement does not ship a sub-AA focus indicator. The trend pill is an
    accent **fill** behind `--ink` text with a `--line` border, not raw accent as
    foreground — it is verified as that text-on-fill pair, not as a 3:1 accent
    edge.
  - **Verification.** The post-deploy delivery verifier MUST assert each class
    explicitly on the running screen — 4.5:1 for accent text/icon and 3:1 for
    accent keyboard focus indicators — not a single blanket "accent is AA" check.

  This does not relax R3 (status is never colour-only).
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

- **Components:** the existing web frontend (the live home screen), the deploy
  pipeline, and the staging environment — all established at v1.0. This v1.1
  CSS-only refinement lands a hero diff onto the already-running app and
  introduces no new component. The `api/` Express service is the live backend
  (the tidal proxy serving `/api/tide`, holding the server-side credential per R7,
  per `docs/operations/operational-manual.md`) and remains the fetch boundary the
  worker may reuse.
- **Third-party dependency (LAW 9 — fallback required):** the screen depends on an
  external tidal-data source for height, trend, and safe-crossing prediction. If
  that source is unreachable or returns stale data, the app MUST render the
  error/stale state (O3) with the data's age — it MUST NOT crash, show a blank
  screen, or present stale data as live. The specific data source is a worker /
  operator decision at build time and is not fabricated here.
- **Operator one-time setup (path to running software):** established at v1.0 —
  the pipeline + staging and the hosting/cloud target + credentials are already in
  place. This v1.1 refinement introduces no new operator setup; it ships through
  the existing pipeline.
- **Operational levers:** the hosting target, the deploy credentials, the
  tidal-data source endpoint + its credential, and the O3 freshness window are
  operational levers, recorded in the Operational Manual created at v1.0 under
  `docs/operations/operational-manual.md` (traced to `req-id: REQ-web-tide-home`).
  This v1.1 CSS-only refinement adds no new operational lever.

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
