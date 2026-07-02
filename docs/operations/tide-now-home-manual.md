# tide-now-home (approved base design) — Operational Manual

**Source:** `web/tide-now-home/index.html` (self-contained static page — inline CSS + Google Fonts, no build step)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/`
**Deploy trigger:** Merge to `main` (shared pipeline — docs-only changes are bypassed)

---

## What this is (and how it differs from `/tide-now/`)

`/tide-now-home/` publishes the **approved greenfield base design** of the tide-now
home screen — the customer's approved "all-good" success view — served verbatim as a
static page. It is a design-publish, not the productionised app.

It is intentionally distinct from `/tide-now/`, which serves the **productionised Vite +
React app** (the v1.1 hero refinement — the calmer amber accent, all five interactive
states, live-data fetch). The two share nothing at runtime:

| | `/tide-now-home/` (this manual) | `/tide-now/` |
|---|---|---|
| What | approved base mockup, success view only | productionised app, all states + live data |
| Accent | hi-vis safety-orange `oklch(0.70 0.18 50)` (base bundle) | refined amber `oklch(0.71 0.135 62)` |
| Tech | self-contained static HTML (no build) | Vite + React build |
| Source of the screen | `docs/design/tide-now-home/current/index.html` (approved base bundle) | `web/src/` app |

The loading / unreachable-feed / stale-feed / empty-saved-walks states are deliberately
**out of scope** for this base publish — they are a separate design-first fast-follow.

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| tide-now-home screen (static page) | Plain HTML, inline CSS, Google Fonts (no build, no JS) | `web/tide-now-home/index.html` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` (shared with tide-now + Foxglove + Saltmarsh) | test → build (tide-now + Saltmarsh) → single deploy (all apps) → content-verify |

**No build step.** Unlike tide-now and Saltmarsh (Vite builds), this screen is a
self-contained static page served as-is — the Foxglove static-page precedent. The
`deploy` job (which does `actions/checkout`) copies it straight from the source tree.

**Deploy path:** The `deploy` job copies `web/tide-now-home/index.html` to
`_pages/tide-now-home/index.html`, so the `/tide-now-home/` subpath serves it. Published
via `actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived
credential is written to persistent storage.

**Single shared Pages deploy:** tide-now-home is published by the SAME ONE `deploy` job
in `pages-deploy.yml` that publishes tide-now (`_pages/tide-now/`), Foxglove
(`_pages/foxglove/`), and Saltmarsh (`_pages/saltmarsh/`). GitHub Pages keeps only the
most recent deployment, so a single deploy job is required; two Pages-deploy workflows
would clobber each other. See `docs/operations/operational-manual.md` (tide-now, the
entry point).

**Subdirectory layout:** The Pages root (`/`) hosts a redirect to `/foxglove/`. The
`/tide-now/`, `/foxglove/`, `/saltmarsh/`, and `/tide-now-home/` slots each serve their
own product; adding this slot must not displace the others — see Failure taxonomy.

---

## Health check

A bare 2xx is insufficient (a 200 can be a redirect shell or the wrong app). The
deployed `/tide-now-home/` must serve the approved base screen content — this mirrors
the `tide-now-home approved base screen live` content-verify step in `pages-deploy.yml`.

```bash
# Expect HTTP 200 AND the approved base screen content (not a bare status / redirect)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/ \
  | grep -qF 'Safe to cross now' \
  && echo "tide-now-home base screen live"
```

Expected: `tide-now-home base screen live`

**Base-design fidelity verification (after deploy):**

```bash
# The base bundle's hi-vis safety-orange accent ships inline. Its presence proves the
# base design shipped — and that this is NOT the productionised /tide-now/ app.
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/ \
  | grep -qF 'oklch(0.70 0.18 50)' \
  && echo "tide-now-home base accent live"
```

Expected: `tide-now-home base accent live`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | issue #28 (link-design: docs/design/tide-now-home/) |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory
browser (`factory-browse` CDP container) against the live GitHub Pages URL. No
credential is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Approved base screen renders every approved component (tide-height hero with "Current tide height" + 2.4 m + Rising trend + change/high-water; "Safe to cross now" crossing card with open window + closing countdown + next window; saved-walks list — Holy Island Causeway / Cramond Island / St Michael's Mount, each with an icon+word+colour status chip; "Add a walk") | `https://…/tide-now-home/` | Browser GET + visual check against `docs/design/tide-now-home/current/index.html` |
| AC-2: Deployed screen structurally + token matches the approved base bundle at each reference viewport (320/375/390/768/1024/1280/1440/1920) — single-column mobile-first, base accent `oklch(0.70 0.18 50)`, Saira/Barlow type, approved spacing/success state; no horizontal overflow, tap targets ≥44px, nothing clipped/overlapping | Same URL | Resize viewport across the 8 widths; compare to `current/viewports/index.html/<px>.png` |
| AC-3: After this deploy, `/tide-now/`, `/foxglove/`, and `/saltmarsh/` still serve their own screens, unchanged (preservation) | `https://…/tide-now/`, `…/foxglove/`, `…/saltmarsh/` | Browser GET each URL; confirm each serves its own app |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Plain static HTML (inline CSS, Google Fonts); no JS, no server-side runtime |
| Vite base | N/A — not a Vite build; served verbatim |
| Build command | None (self-contained static page) |
| Build output | N/A — the source file `web/tide-now-home/index.html` is the served artifact |
| Staging path | `_pages/tide-now-home/index.html` |
| Dependencies at runtime | Google Fonts (Saira, Barlow) over CDN; if the font CDN is unreachable the page degrades gracefully to the system-ui fallback (no layout break) |
| Dependencies at build time | None |
| Change propagation | `none`/`config-change` — the source file IS the artifact; a change reaches `/tide-now-home/` after a re-deploy on merge to `main` (no build) |
| Restart procedure | N/A — static page; re-deploy triggers a new Pages build |
| State | Stateless; no client-side persisted state (success view is a static mockup; the saved-walks buttons are inert in this base publish) |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| Propagation time | Pages CDN propagation typically under a minute after the `deploy` job completes |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| SIG-ID | Symptom | Likely cause | Worker-caused? | Diagnosis command | Recovery |
|---|---|---|---|---|---|
| SIG-H1 | `/tide-now-home/` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Possible | `gh run list --workflow pages-deploy.yml --branch main --limit 3` | Confirm the deploy job succeeded; wait for CDN propagation (~1–2 min) and retry; if Pages disabled, enable it (one-time, see entry-point manual) |
| SIG-H2 | `/tide-now-home/` returns `200` but is missing the approved content | The static page was not staged (deploy job `Stage all apps` step did not copy `web/tide-now-home/index.html`) | Yes | Health-check command above; confirm the `Stage all apps` step lists `_pages/tide-now-home/index.html` in the deploy job log | Restore the `cp web/tide-now-home/index.html _pages/tide-now-home/index.html` staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B guards the staging |
| SIG-H3 | `/tide-now-home/` shows the refined amber accent / the productionised app instead of the approved base | The base page was overwritten with the `/tide-now/` app content, or the wrong accent shipped | Yes | `curl -sSL …/tide-now-home/ \| grep -qF 'oklch(0.70 0.18 50)'` (must pass) and `grep -qF 'oklch(0.71 0.135 62)' web/tide-now-home/index.html` (must find nothing) | Restore the approved base mockup from `docs/design/tide-now-home/current/index.html`; the content test `web/tide-now-home/index.test.js` and `scripts/verify-pages-deploy.sh` section A3 guard this |
| SIG-H4 | Preservation regression — an existing route (`/tide-now/`, `/foxglove/`, `/saltmarsh/`) breaks after a tide-now-home change | A staging step for another app was removed/clobbered | Yes | `grep -qF '_pages/tide-now' .github/workflows/pages-deploy.yml` etc.; the regression guard checks all four are staged | Restore the missing staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B asserts all apps are staged |
| SIG-H5 | Two Pages deploys / one app's subpath disappears after deploy | A second workflow also calls `actions/deploy-pages` (clobbers the single shared deploy) | Yes | `grep -rlE 'actions/deploy-pages' .github/workflows \| wc -l` (must be `1`) | Keep exactly one `deploy` job staging all apps; remove the duplicate. `scripts/verify-pages-deploy.sh` invariant B guards this |
| SIG-H6 | Content-verify returns missing content right after deploy | CDN propagation delay | No | Re-run the probe | Pipeline auto-retries via `curl --retry … --retry-delay …`; wait and retry manually |
| SIG-H7 | CI pipeline not triggering for a tide-now-home change | Change was docs-only (deploy bypassed) | No | Check the `detect-changes` job output (`skip=true`) | Expected for docs-only commits; any `web/**` or workflow change deploys |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no
credentials, no user accounts. The screen is a static, stateless success-view mockup;
the controls (saved-walk rows, "Add a walk") are inert in this base publish. Worker may
freely load and resize the deployed URL without risk to production data.

**Deploy verification command (worker-use):**

```bash
# After merge to main, wait for the tide-now-home base screen to be live, then verify:
until curl -sSL https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/ \
  | grep -qF 'Safe to cross now'; do
  sleep 30
done
echo "tide-now-home base screen live"
```
