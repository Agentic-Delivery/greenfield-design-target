# Foxglove Books Storefront — Operational Manual

**Source:** `web/foxglove/`
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/foxglove/`
**Deploy trigger:** Merge to `main` with changes under `web/foxglove/**`

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| Static storefront | HTML + CSS + Vanilla JS (ES module) | `web/foxglove/` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/foxglove-deploy.yml` | test → deploy → smoke-verify |

**Deploy path:** `web/foxglove/index.html` + `web/foxglove/js/main.js` are staged to `_pages/foxglove/` during the `deploy` job, then published via `actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived credential is written to persistent storage.

**Subdirectory layout:** The Pages root (`/`) hosts a redirect to `/foxglove/`. The `/tide-now/` slot is reserved for the Tide Now project.

---

## Health check

```bash
# Expect HTTP 200
curl -sSo /dev/null -w '%{http_code}' \
  https://agentic-delivery.github.io/greenfield-design-target/foxglove/
```

Expected: `200`

**Navigation verification (after deploy):**

```bash
# Check JS module loads (expect no 404)
curl -sSo /dev/null -w '%{http_code}' \
  https://agentic-delivery.github.io/greenfield-design-target/foxglove/js/main.js
```

Expected: `200`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | REQ-web-foxglove-storefront |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory browser (`factory-browse` CDP container) against the live GitHub Pages URL. No credential is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Storefront loads with hero, featured books, and footer | `https://…/foxglove/` | Browser GET + visual check |
| AC-2: Add to basket — item counted, total updated, success state shown | Same URL | Click "Add to basket" button, observe count badge and SVG swap |
| AC-3: Basket flyout opens/closes; items and total display | Same URL | Open basket button, verify list and total |
| AC-4: Out-of-print button is visually disabled and cannot be clicked | Same URL | Attempt click on disabled button |
| AC-5: Newsletter form validates email; error on invalid, confirmation on valid | Same URL | Submit empty/invalid, then valid email |
| AC-6: WCAG 2.2 AA — keyboard navigation: all interactive elements focusable with visible focus ring | Same URL | Tab through all interactive elements |
| AC-7: Storefront is live at a customer-viewable GitHub Pages URL | `https://…/foxglove/` | HTTP 200 via curl |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Vanilla HTML/CSS/JS (ES module); no server-side runtime |
| Dependencies at runtime | None (self-contained static site) |
| Dependencies at build time | Vitest ^2.0.0 (test runner only) |
| Restart procedure | N/A — static site; re-deploy triggers a new Pages build |
| State | Stateless; basket and newsletter state live only in the browser session |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| Symptom | Likely cause | Diagnosis command | Recovery |
|---|---|---|---|
| `curl` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Check `gh run list --workflow foxglove-deploy.yml` | Enable GitHub Pages (see `needs-manual-steps` section) or wait for CDN propagation (~2 min) |
| `curl` returns `200` but page is blank | JS module `./js/main.js` failed to load | Open DevTools console in factory-browse; check for 404 on `main.js` | Re-run deploy job; verify `_pages/foxglove/js/main.js` was staged |
| Basket add button does nothing | JS parse error in `main.js` | DevTools console | Fix syntax error, re-merge |
| CI pipeline not triggering | `push` event did not match `paths:` filter | Check commit diff vs `paths:` in workflow | Ensure `web/foxglove/**` changed, or touch `.github/workflows/foxglove-deploy.yml` |
| Smoke test returns `404` after successful deploy | CDN propagation delay | Wait 2 min and retry | Pipeline auto-retries 3× via `--retry 3` in curl |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no credentials, no user accounts. All mutations are client-side only (basket/newsletter state is not persisted). Worker may freely load, click, and submit forms on the deployed URL without risk to production data.

**Deploy verification command (worker-use):**

```bash
# After merge to main, wait for deploy job to complete then probe:
until [ "$(curl -sSo /dev/null -w '%{http_code}' \
  https://agentic-delivery.github.io/greenfield-design-target/foxglove/)" = "200" ]; do
  sleep 30
done
echo "Storefront live"
```

---

## Operator one-time setup (captured in `needs-manual-steps`)

GitHub Pages must be activated in the repository settings before the deploy job can succeed. See issue #5 comment for the checklist. This is a one-time action — subsequent deploys are fully automated via the CI/CD pipeline.
