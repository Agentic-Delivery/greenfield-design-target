# Tide-Now Operational Manual

**Source:** `web/` (Vite + React app, root `index.html`)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/tide-now/`
**Deploy trigger:** Merge to `main` (see Test Deployment Source below)

> Tide-now was previously wired to a Render Web Service that was never provisioned
> (its deploy hook no-opped). As of issue #16 it deploys as a **static frontend to
> GitHub Pages** from the same single Pages deploy that publishes the Foxglove
> storefront. GitHub Pages serves the built frontend only — there is no Express
> backend and no `/api/tide` endpoint in this deployment (see "Live data" below).

## Deployment Topology

| Component | Technology | Location |
|---|---|---|
| Frontend (tide-now) | Vite + React, built to static assets | `web/` in source tree → `web/dist/` at build time |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` | test+build → single deploy (both apps) → content-verify |

**Subpath base:** The Vite app is built with `--base=/greenfield-design-target/tide-now/`
so its hashed assets resolve under the `/tide-now/` subpath. The build artifact is
produced once in the `Test & Build` job and promoted to the `deploy` job.

**Single shared Pages deploy:** GitHub Pages keeps only the most recent deployment, so
tide-now, Foxglove, Saltmarsh, tide-now-home, cadence, and pricing are staged together and
published by ONE `deploy` job (`_pages/tide-now/` + `_pages/foxglove/` +
`_pages/saltmarsh/` + `_pages/tide-now-home/` + `_pages/cadence/` + `_pages/pricing/`, root
redirect → `/foxglove/`). Two separate Pages-deploy workflows would clobber each other. See
`docs/operations/foxglove-storefront-manual.md` (Foxglove),
`docs/operations/saltmarsh-hero-manual.md` (Saltmarsh),
`docs/operations/tide-now-home-manual.md` (tide-now-home — the approved base design
published at `/tide-now-home/`, distinct from the productionised app at `/tide-now/`),
`docs/operations/cadence-landing-manual.md` (cadence — the approved Cadence
focus-timer landing page published at `/cadence/`), and
`docs/operations/cadence-pricing-manual.md` (pricing — the approved Cadence pricing page
published at `/pricing/`, sibling of the landing page).

## Test Deployment Source

**Mode:** `deploy-from-main`

Merging to `main` triggers `.github/workflows/pages-deploy.yml`. On success the `deploy`
job publishes both apps to GitHub Pages via `actions/upload-pages-artifact` +
`actions/deploy-pages` using a workflow-scoped OIDC token (no long-lived credential).
Pages propagation is typically under a minute.

## Test Environment

- **URL:** Declared in `docs/project-context.md` under `## Customer-Viewable URL` /
  `## Test Environment`.
- **Safety zone:** The GitHub Pages site is the ONLY valid verification target.
  `localhost:<port>` and container-internal addresses are NOT valid post-deploy targets.

## Live data

GitHub Pages is static hosting. The app fetches `/api/tide` (a same-origin relative
path); on Pages there is no backend serving it, so the fetch fails and the app shows
an **interim feed-unavailable fallback** — "Tide data unavailable — check your
connection" — styled with the design tokens (accent, typography, layout). It is not a
crash, but it is NOT yet an approved, design-station-reviewed state: the tide-now
design bundle records the error/stale/loading states as un-designed
(`docs/design/tide-now-home/quality.json` → `states.error/loading/empty: false`). Per
REQ-web-tide-home R8 (v1.2), the feed-unreachable (O3a) and stale (O3b) states are
being shaped through the design station; once that approved bundle lands, this ad-hoc
fallback is replaced by the approved design rather than left as a parallel contract.

To serve live tide readings from the public deployment, a data source is required —
either a hosted backend exposing `/api/tide`, or a public tidal API called directly
from the client. That is a separate product decision (tracked via the intake-request
filed from issue #16), not part of the static Pages deploy.

The tidal-data levers below (`TIDAL_API_KEY`, `TIDAL_API_ENDPOINT`,
`FRESHNESS_WINDOW_MINUTES`) belong to a backend (`api/server.js`) that is **not part of
the GitHub Pages deployment**; they are retained here for the day a backend is stood up.

## Health Check

```bash
# Expect HTTP 200 AND the tide-now app shell (content, not a bare status)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/tide-now/ | grep -q 'tide·now' \
  && echo "tide-now shell live"
```

A bare 2xx is insufficient — a 200 can be a redirect or an error shell. The post-deploy
verify job in `pages-deploy.yml` asserts deployed CONTENT: the `tide·now` shell title,
asset references under the correct base, and the refined accent `oklch(.71 .135 62)` in
the deployed CSS.

## Levers

> These levers control a tidal-data backend (`api/server.js`) that is NOT part of the
> GitHub Pages deployment. They apply only if/when a backend is provisioned.

| Lever | Env var | Read | Set | Restore | Req |
|---|---|---|---|---|---|
| Tidal API key | `TIDAL_API_KEY` | _not readable — secret_ | Set in backend host environment | Remove the variable | REQ-web-tide-home R7 |
| Tidal API endpoint | `TIDAL_API_ENDPOINT` | _not readable — secret_ | Set in backend host environment | Remove the variable | REQ-web-tide-home R7 |
| Freshness window | `FRESHNESS_WINDOW_MINUTES` | `echo $FRESHNESS_WINDOW_MINUTES` (backend shell) | Set in backend host environment | Remove variable (reverts to 15-minute default) | REQ-web-tide-home O3b / R7 |

## Component Operational Profile

### Frontend build (`web/` → `web/dist/`)

- Built by Vite with `--base=/greenfield-design-target/tide-now/`. Published as static
  files on GitHub Pages.
- No API keys or secrets in the bundle.
- **Landing hero front door (issue #35).** Opening `/tide-now/` first renders the approved
  Marginalia landing hero (`web/src/components/LandingHero.jsx`); its single primary CTA
  ("Check today's crossing") enters the existing tide app (`<App/>`) in place. The tide app
  is unchanged and reachable via the CTA — the hero mounts ahead of it, nothing is removed.
  The static shell title stays `tide·now`, so the Health Check below is unaffected.
- Without a `/api/tide` backend the app renders its interim feed-unavailable fallback,
  pending the approved O3a design-station state (see Live data). This fallback is now shown
  after entering the tide app via the hero CTA.

### Tidal-data backend (`api/server.js`) — NOT deployed on Pages

- Serves `GET /api/tide` (tidal proxy / mock). Present in the source tree but not part
  of the GitHub Pages deployment. Documented for a future backend deploy.

## Failure Taxonomy

| Symptom | Likely cause | Fix |
|---|---|---|
| `/tide-now/` returns 404 | Pages source not set to "GitHub Actions", or deploy job failed | Check repo Settings → Pages source; check the `deploy` job log in `pages-deploy.yml` |
| tide-now assets 404 (blank page) | Vite `base` wrong — assets requested from the wrong path | Confirm build ran with `--base=/greenfield-design-target/tide-now/`; the regression guard `scripts/verify-pages-deploy.sh` asserts this |
| Refined accent missing | Stale/wrong build deployed | Re-run `pages-deploy.yml` on `main`; verify job asserts `oklch(.71 .135 62)` in deployed CSS |
| Tide reading shows "Tide data unavailable" | No `/api/tide` backend on static Pages (expected) | Not a crash — static deploy has no backend (see Live data). Note: this is an interim fallback, not yet the approved O3a design-station state (REQ-web-tide-home R8) |
| Foxglove site broken after a tide-now change | Staging step clobbered Foxglove | Both apps stage in one `deploy` job — check the `Stage both apps` step staged `_pages/foxglove/` |

## Verification Backends

**verification_backends:** shadow-qg

The delivery-verifier uses the `shadow-qg` backend. It drives a real browser against the
GitHub Pages URL to verify each AC through the full consumer path.

## Operator One-Time Setup (bootstrap)

- [x] GitHub Pages source set to "GitHub Actions" (already configured — Foxglove deploys this way)
- [x] Record the public URL in `docs/project-context.md` under `## Customer-Viewable URL`
- [ ] (Optional, future) Provision a tidal-data backend exposing `/api/tide`, or switch
      the client to a public tidal API, if live readings are wanted in the public deploy
