---
id: REQ-web-tide-home
title: tide-now home screen — built to the approved design, live at a customer-viewable URL
status: approved
version: 1.3
baseline-ref: REQ-web-tide-home v1.2 (feed-integrity/empty states split + design-first)
project-type: brownfield  # v1.1 refines the already-shipped v1.0 screen; v1.2 adds the feed-integrity + empty states as a design-first fast-follow onto the same live app
link-design: docs/design/tide-now-home/ (base — structural reference for the whole screen) + docs/design/tide-now-home-hero-refinement/ (approved 2026-06-22 — authoritative for the hero spacing + accent token). The four v1.2 feed-integrity/empty states (O2/O3a/O3b/O4) are NOT yet designed — they are routed to the design station first (R8); link-design extends to the approved state bundle once it lands.
link-brd: N/A — design-handoff value stream; the customer-approved design (jury PASSED) is the governing upstream spec
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single-screen success view + its loading/error/empty states (enumerated below)
link-adr: ADR-001-tide-feed-freshness-contract (v1.2 — governs the boundary→UI feed-state contract that the O3a/O3b split requires). The frontend stack itself was chosen at the v1.0 build (Vite + React) and is not revisited; design-system.md remains the binding visual contract; on-device persistence + the server-side credential boundary are recorded as R6/R7.
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

### v1.2 — feed-integrity + empty states, design-first fast-follow (2026-07-03)

The screen shipped live as the approved **populated success view only**. Its
design-quality jury explicitly recorded that the loading, feed-failure/stale, and
empty-saved-walks states were **not designed** (`quality.json` →
`states.loading/error/empty: false`) and gated live-app readiness on designing
them. The screen was published on an explicit *"ship the approved look now, these
states as a fast-follow"* decision. This v1.2 delta is that fast-follow. It makes
three changes to close the gap durably:

1. **Splits the former single O3 ("error / stale") into two distinct states** —
   **O3a (feed unreachable)** and **O3b (feed reachable but stale)** — because they
   are different runtime conditions the walker must be able to tell apart. On the
   current static hosting there is **no live tidal-data backend** (the `api/`
   service is not deployed), so "unreachable" is presently the *default* production
   condition, not a rare edge case — the delivery verifier asserts these states
   against the real deployed URL, not a hypothetical backend.
2. **Requires the four states to go through the design station first** (R8) — no
   un-reviewed safety-state UI invented at build time.
3. **Flags an already-live, un-designed fallback for reconciliation.** A "Tide data
   unavailable — check your connection" message is already rendered on the live
   deployment but never passed the design station (it is exactly the un-reviewed
   safety UI R8 forbids). Once the design station produces the approved
   unreachable/stale states, that ad-hoc copy MUST be replaced by the approved
   design, not left as a parallel undocumented fallback.

### v1.3 — temporal freshness (a live reading must not silently age into "safe") (2026-07-03)

An intake quality review found that v1.2 specified the four states only at *initial
render*. A reading that is fresh when the walker opens the app stays inside the
"safe to cross now" success framing indefinitely as it ages past the freshness window
while the walker watches — nothing re-evaluates it. On a crossing-safety screen that is
the same "silently show an out-of-date reading" harm the fast-follow exists to remove,
just over time instead of at load. v1.3 adds **R9** — the screen must re-evaluate
freshness on a cadence and leave the success framing when a displayed reading crosses
the window (O1 → O3b), and recover (O3a/O3b → O1) when the feed returns fresh — so
"safe to cross now" is never shown for a reading that is no longer fresh, whether it was
stale at load or aged into staleness in view.

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
- **O3a — Feed-unreachable state.** When the tide feed cannot be fetched at all
  (the request fails, there is no network, or — as on the current static hosting —
  no live backend is deployed), the screen shows a clearly labelled "tide data
  unavailable" state and MUST NOT present any previous reading as if it were current.
  It offers a way to retry. (Not covered by the approved success view; design it via
  the design station per R8.)
- **O3b — Stale-feed state.** When the tide feed IS reachable but its data is older
  than the configured freshness window (`FRESHNESS_WINDOW_MINUTES`, the existing
  operational lever, 15-minute default — reuse it, do not fabricate a new value), the
  screen shows the last reading **visibly marked stale with its age** and MUST NOT
  render it with the "safe to cross now" success framing (no colour/copy overlap with
  the fresh success state — ties to R3). So a slow-moving or out-of-date feed can
  never silently present out-of-date safety information. (Not covered by the approved
  success view; design it via the design station per R8.)
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
  success state (O1); the loading (O2), feed-unreachable (O3a), stale-feed (O3b),
  and empty (O4) states MUST also be built before the app is considered done. The
  approved mockup contains no disabled controls, so no disabled state is in scope;
  if the build introduces one, it MUST be visibly and programmatically conveyed as
  disabled. Success alone is not done.
- **R8 — The O2/O3a/O3b/O4 states are design-first.** These four states are not in
  the approved bundle (`quality.json` → `states.loading/error/empty: false`). They
  MUST be shaped through the design station and pass a design-quality review BEFORE
  they are built — no un-reviewed safety-state UI invented at build time. The build
  work-item for these states carries `link-design` to the approved state bundle;
  until that bundle exists, the build is blocked (design-first). This rule exists
  because an un-designed feed-unavailable message already shipped to the live app
  once (see v1.2 note); it is the exact failure this rule prevents from recurring.
- **R9 — A displayed reading must not silently age into "safe".** The screen MUST
  re-evaluate feed freshness while it is open, not only at first load, on a cadence
  bounded below `FRESHNESS_WINDOW_MINUTES` (re-fetching from the boundary, which owns
  the `status` per ADR-001 — the UI stays a pure renderer and never runs its own
  freshness math). When a reading currently shown in the "safe to cross now" success
  framing (O1) ages past the window, the screen MUST leave the success framing and show
  the stale state (O3b) with the reading's age; when the feed later returns fresh, the
  screen MUST recover to O1 (and likewise recover O3a → O1 when a previously-unreachable
  feed becomes reachable and fresh). So "safe to cross now" is never shown for a reading
  that is no longer fresh — whether it was stale at load or aged into staleness while the
  walker watched. The re-evaluation cadence and the recovery transitions are verifiable
  on the running screen (the delivery-verifier can hold the screen open across the window
  boundary and observe the O1 → O3b transition).
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
  security-compliance gate, and enforces O3b stale-detection (and O3a
  unreachable-detection) at that boundary. The boundary→UI payload shape — an explicit
  `status` (live/stale/unreachable) + the reading's age, with the UI as a pure renderer
  holding no freshness threshold — is fixed by **ADR-001** (tide-feed freshness/integrity
  contract); the build MUST honour that contract.
  (Recorded here to govern the fetch-layer choice the architecture review flagged.)

## BLAST RADIUS

- **Components:** the existing web frontend (the live home screen), the deploy
  pipeline, and the staging environment — all established at v1.0. This v1.1
  CSS-only refinement lands a hero diff onto the already-running app and
  introduces no new component. The `api/` Express service exists in the source tree
  but is **not deployed** on the current static hosting (there is no `/api/tide`
  endpoint live today, per `docs/operations/operational-manual.md` § Live data —
  which is why O3a "feed unreachable" is presently the default production condition);
  it remains the fetch boundary a future backend deploy may reuse (holding the
  server-side credential per R7).
- **Third-party dependency (LAW 9 — fallback required):** the screen depends on an
  external tidal-data source for height, trend, and safe-crossing prediction. If
  that source is unreachable the app MUST render the feed-unreachable state (O3a);
  if it returns data older than the freshness window the app MUST render the
  stale-feed state (O3b) with the data's age — it MUST NOT crash, show a blank
  screen, or present stale/absent data as live. The specific data source is a worker /
  operator decision at build time and is not fabricated here.
- **Operator one-time setup (path to running software):** established at v1.0 —
  the pipeline + staging and the hosting/cloud target + credentials are already in
  place. This v1.1 refinement introduces no new operator setup; it ships through
  the existing pipeline.
- **Operational levers:** the hosting target, the deploy credentials, the
  tidal-data source endpoint + its credential, and the O3b freshness window are
  operational levers, recorded in the Operational Manual created at v1.0 under
  `docs/operations/operational-manual.md` (traced to `req-id: REQ-web-tide-home`).
  This v1.1 CSS-only refinement adds no new operational lever.

## EXAMPLES

- **Happy path:** walker opens the app on a 390 px phone in bright sun; live data is
  fresh; they see "2.4 m / Rising", "Safe to cross now" with a closing countdown,
  and their two saved walks each with a status chip. They decide to cross. (Matches
  the approved success view.)
- **Feed unreachable:** the tidal source (or the whole backend, as on static
  hosting today) cannot be reached; the app shows a clear "tide data unavailable"
  state with a way to retry, and shows no reading at all rather than a stale number —
  the walker is never handed an out-of-date height dressed as current.
- **Stale feed:** the source is reachable but its last reading is older than the
  15-minute freshness window; the app shows that reading clearly marked stale with
  its age and does not show a green "safe to cross" as if it were current. The walker
  is not misled into an unsafe crossing.
- **Ages into stale while watched (R9):** the walker opens the app on a fresh reading
  showing "safe to cross now", then keeps the screen open at the water's edge; as the
  reading ages past the freshness window the screen leaves the "safe to cross" framing
  and marks the reading stale with its age, rather than silently holding "safe". When a
  newer reading arrives it returns to the live success view.
- **Empty walks:** a first-time walker has saved nothing; the saved-walks area
  invites them to "Add a walk" rather than showing an empty gap.
- **Live URL:** after merge, the customer opens the public staging URL on their
  phone and sees the running home screen.
