# Saltmarsh Coffee-Roaster Hero — Operational Manual

**Source:** `web/saltmarsh.html` + `web/src/saltmarsh/` (Vite + React, dedicated build)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/`
**Deploy trigger:** Merge to `main` (shared pipeline — docs-only changes are bypassed)

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| Saltmarsh hero (static SPA) | Vite + React, built to static assets | `web/saltmarsh.html` → `web/src/saltmarsh/main.jsx` → `SaltmarshHero.jsx` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` (shared with tide-now + Foxglove) | test → build (own Vite config) → single deploy (all three apps) → content-verify |

**Dedicated Vite build:** Saltmarsh is a SEPARATE product from tide-now, so it has its
own Vite config (`web/vite.saltmarsh.config.js`) and its own Pages base. Vite's `base`
is per-build, and the Saltmarsh base (`/greenfield-design-target/saltmarsh/`) differs
from tide-now's (`/greenfield-design-target/tide-now/`), so a separate build is
required. The build command is:

```bash
( cd web && npx vite build --config vite.saltmarsh.config.js \
    --base=/greenfield-design-target/saltmarsh/ )
```

It emits `web/dist-saltmarsh/saltmarsh.html` plus hashed assets under
`web/dist-saltmarsh/assets/`.

**Deploy path:** The `deploy` job downloads the `saltmarsh-dist` artifact, copies
`web/dist-saltmarsh/.` to `_pages/saltmarsh/`, then renames `saltmarsh.html` to
`index.html` so the `/saltmarsh/` subpath serves it. Published via
`actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived credential
is written to persistent storage.

**Single shared Pages deploy:** As of issue #23, Saltmarsh is published by the SAME
ONE `deploy` job in `pages-deploy.yml` that publishes tide-now (`_pages/tide-now/`) and
Foxglove (`_pages/foxglove/`). GitHub Pages keeps only the most recent deployment, so a
single deploy job is required; two Pages-deploy workflows would clobber each other. See
`docs/operations/operational-manual.md` (tide-now, the entry point) and
`docs/operations/foxglove-storefront-manual.md` (Foxglove).

**Subdirectory layout:** The Pages root (`/`) hosts a redirect to `/foxglove/`. The
`/tide-now/`, `/foxglove/`, and `/saltmarsh/` slots each serve their own product. The
Saltmarsh slot must not displace the other two — see the Failure taxonomy below.

---

## Health check

A bare 2xx is insufficient (a 200 can be a redirect shell or the wrong app). The
deployed `/saltmarsh/` must serve the Saltmarsh app shell with assets resolving under
its own base — this mirrors the `Saltmarsh hero live` content-verify step in
`pages-deploy.yml`.

```bash
# Expect HTTP 200 AND the Saltmarsh app shell (content, not a bare status / redirect)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/ \
  | grep -qF 'Saltmarsh — small-batch coffee roasters' \
  && echo "saltmarsh shell live"
```

Expected: `saltmarsh shell live`

**Asset-base verification (after deploy):**

```bash
# Assets must resolve under the Saltmarsh subpath base (proves the right Vite base shipped)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/ \
  | grep -qE '/greenfield-design-target/saltmarsh/assets/saltmarsh-[A-Za-z0-9_-]+\.(js|css)' \
  && echo "saltmarsh assets based correctly"
```

Expected: `saltmarsh assets based correctly`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | REQ-web-saltmarsh-hero |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory
browser (`factory-browse` CDP container) against the live GitHub Pages URL. No
credential is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Approved hero renders with every approved element (masthead, cream copy card with eyebrow/headline/subhead/CTA/reassurance line, coffee-bag inline-SVG figure + "Roasted this week" chip) | `https://…/saltmarsh/` | Browser GET + visual check against the approved design |
| AC-2: "Buy now" is the single primary action, keyboard-focusable with a visible focus indicator (≥2px, ≥3:1) and a ≥44px touch target on phones | Same URL | Tab to the CTA, observe focus ring; measure tap target at phone width |
| AC-3: "Buy now" keeps the documented `#shop` placeholder (no real order URL supplied); the gap is surfaced (`needs-manual-steps`) — no silent dead link | Same URL | Inspect the CTA `href`; confirm `#shop` placeholder |
| AC-4: No horizontal overflow at any width; single-column on phones reflowing to two columns from 860px; hierarchy preserved, nothing clipped/overlapping | Same URL | Resize viewport (phone ~390px, tablet ~834px, desktop); check overflow + reflow |
| AC-5: The muted reassurance line on the cream copy card clears WCAG AA contrast (binding token `--ink-soft`) on the live render | Same URL | Measure computed colour-vs-background contrast on the live render |
| AC-6: After this deploy, `/tide-now/` and `/foxglove/` still serve their own screens, unchanged (regression — the preview mount swap is NOT shipped) | `https://…/tide-now/` and `https://…/foxglove/` | Browser GET both URLs; confirm each serves its own app |
| AC-7: Deployed `/saltmarsh/` matches the approved design (layout, OKLCH colour roles, Spectral / Hanken Grotesk pairing, cream copy-card, 60-30-10 clay accent, spacing, inline-SVG figure; light theme default) | `https://…/saltmarsh/` | Browser visual comparison against `docs/design/saltmarsh-hero/` |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Vite + React, built to static assets (no server-side runtime) |
| Vite base | `/greenfield-design-target/saltmarsh/` (per-build, via `vite.saltmarsh.config.js` + `--base`) |
| Build command | `( cd web && npx vite build --config vite.saltmarsh.config.js --base=/greenfield-design-target/saltmarsh/ )` |
| Build output | `web/dist-saltmarsh/saltmarsh.html` + `web/dist-saltmarsh/assets/` |
| Staging path | `_pages/saltmarsh/` (`saltmarsh.html` renamed to `index.html`) |
| Dependencies at runtime | None (self-contained static SPA; the coffee-bag figure is an inline SVG — no network image dependency) |
| Dependencies at build time | Vite + `@vitejs/plugin-react`; Vitest (test runner only) |
| Change propagation | `image-rebuild` — source is compiled by the Vite build; a change reaches `/saltmarsh/` only after a new build + deploy on merge to `main` |
| Restart procedure | N/A — static site; re-deploy triggers a new Pages build |
| State | Stateless; no client-side persisted state |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| Propagation time | Pages CDN propagation typically under a minute after the `deploy` job completes |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| SIG-ID | Symptom | Likely cause | Worker-caused? | Diagnosis command | Recovery |
|---|---|---|---|---|---|
| SIG-S1 | `/saltmarsh/` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Possible | `gh run list --workflow pages-deploy.yml --branch main --limit 3` | Confirm the deploy job succeeded; wait for CDN propagation (~1–2 min) and retry; if Pages disabled, enable it (one-time, see entry-point manual) |
| SIG-S2 | `/saltmarsh/` returns `200` but is blank / missing the hero | JS/CSS assets 404 from a wrong Vite `--base` (assets not resolving under `/greenfield-design-target/saltmarsh/assets/`) | Yes | Asset-base verification command above; check DevTools console in factory-browse for 404 on `saltmarsh-*.js`/`.css` | Rebuild with the correct `--base=/greenfield-design-target/saltmarsh/`; re-merge. The build-output contract in `scripts/verify-pages-deploy.sh` guards this |
| SIG-S3 | **Preservation regression — `/tide-now/` now serves the Saltmarsh hero (or vice-versa)** | The approved design's preview mount swap (tide-now `web/src/main.jsx` repointed at `SaltmarshHero`) was shipped — the central forbidden change of issue #23 (REQ R3) | Yes | `curl -sSL …/tide-now/ \| grep -qF 'tide·now'` (must pass) and `grep -L SaltmarshHero web/src/main.jsx`; the fast in-CI guard is `web/src/saltmarsh/entry.test.jsx` | Revert the tide-now `main.jsx` mount swap so it imports/renders its own `App`; ensure Saltmarsh mounts only via `web/src/saltmarsh/main.jsx`; re-merge |
| SIG-S4 | Two Pages deploys / one app's subpath disappears after deploy | A second workflow also calls `actions/deploy-pages` (clobbers the single shared deploy) | Yes | `grep -rlE 'actions/deploy-pages' .github/workflows \| wc -l` (must be `1`) | Keep exactly one `deploy` job staging all three apps (`_pages/tide-now/` + `_pages/foxglove/` + `_pages/saltmarsh/`); remove the duplicate. `scripts/verify-pages-deploy.sh` invariant B guards this |
| SIG-S5 | Content-verify returns missing content right after deploy | CDN propagation delay | No | Re-run the probe | Pipeline auto-retries via `curl --retry … --retry-delay …`; wait and retry manually |
| SIG-S6 | CI pipeline not triggering for a Saltmarsh change | Change was docs-only (deploy bypassed) | No | Check the `detect-changes` job output (`skip=true`) | Expected for docs-only commits; any `web/**` or workflow change deploys |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no
credentials, no user accounts. The hero is a static, stateless screen; "Buy now" is a
link, not a commerce flow. Worker may freely load, click, tab, and resize the deployed
URL without risk to production data.

**Deploy verification command (worker-use):**

```bash
# After merge to main, wait for the Saltmarsh shell to be live, then content-verify:
until curl -sSL https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/ \
  | grep -qF 'Saltmarsh — small-batch coffee roasters'; do
  sleep 30
done
echo "Saltmarsh hero live"
```

---

## Outstanding manual step

The "Buy now" CTA ships the documented `#shop` placeholder because no real order/shop
URL has been supplied by the customer. When the real URL is provided, swapping the
placeholder in `web/src/saltmarsh/SaltmarshHero.jsx` is a one-line change. The gap is
tracked on issue #23 via `needs-manual-steps`.
