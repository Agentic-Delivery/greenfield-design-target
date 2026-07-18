# Cadence pricing page — Operational Manual

**Source:** `web/pricing/index.html` (self-contained static page — inline CSS + Google Fonts, no build step)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/pricing/`
**Deploy trigger:** Merge to `main` (shared pipeline — docs-only changes are bypassed)

---

## What this is

`/pricing/` publishes the **approved greenfield Cadence pricing page** — the customer's
approved pricing screen for **Cadence**, a focus-timer app — served verbatim as a
self-contained static page, a sibling of the already-live landing page at `/cadence/`. It
is a design-publish (a greenfield mockup shipped as-is), not a productionised app with live
billing.

The screen has five approved components: the same sticky blurred nav as the landing page
(Cadence wordmark + light/dark toggle + a small "Start a session" CTA), an editorial
pricing hero ("Pricing that keeps time *with you*." with a calm honest sub-line), a working
**monthly/annual billing toggle** (a `role="radiogroup"` segmented control that swaps every
tier's price and note and honestly shows the annual saving), three pricing tiers (Free $0 /
Focus $6 "Our pick" / Team $9 per person), an honest FAQ strip (no trial to run out, cancel
any time, the price you pick is the price you keep), and the same minimal footer. Light
theme is primary; a real dark theme is wired via `[data-mode="dark"]` and an in-page toggle.

Anchored to the committed **Marginalia** brand library (`docs/design/brand/`) — token-identical
to the landing page: the OKLCH clay accent (`oklch(0.55 0.106 41)`, strong CTA
`oklch(0.470 0.094 40)`), warm paper/ink neutrals (no pure black/white), and the Newsreader
(display) + Cabin (body) type pairing. The tokens are carried into the mockup as CSS custom
properties, so building the mockup verbatim consumes the committed brand.

**Prices are the approved design's numbers, shipped unchanged.** On this throwaway
greenfield demo stack there are no separate "real" prices to substitute — the operator
confirmed on the source issue that the approved design's numbers ($0 Free / $6 Focus /
$9 Team) are the intended demo content. This is a documented decision, not a placeholder gap.

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| Cadence pricing page (static page) | Plain HTML, inline CSS, Google Fonts (no build); one small in-page `<script>` wiring the light/dark toggle and the monthly/annual billing toggle | `web/pricing/index.html` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` (shared with tide-now + Foxglove + Saltmarsh + tide-now-home + cadence) | test → build (tide-now + Saltmarsh) → single deploy (all apps) → content-verify |

**No build step.** Unlike tide-now and Saltmarsh (Vite builds), this screen is a
self-contained static page served as-is — the Foxglove / tide-now-home / cadence
static-page precedent. The `deploy` job (which does `actions/checkout`) copies it straight
from the source tree.

**Deploy path:** The `deploy` job copies `web/pricing/index.html` to
`_pages/pricing/index.html`, so the `/pricing/` subpath serves it. Published via
`actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived credential is
written to persistent storage.

**Single shared Pages deploy:** pricing is published by the SAME ONE `deploy` job in
`pages-deploy.yml` that publishes tide-now (`_pages/tide-now/`), Foxglove
(`_pages/foxglove/`), Saltmarsh (`_pages/saltmarsh/`), tide-now-home
(`_pages/tide-now-home/`), and cadence (`_pages/cadence/`). GitHub Pages keeps only the most
recent deployment, so a single deploy job is required; two Pages-deploy workflows would
clobber each other. See `docs/operations/operational-manual.md` (tide-now, the entry point).

**Subdirectory layout:** The Pages root (`/`) hosts a redirect to `/foxglove/`. The
`/tide-now/`, `/foxglove/`, `/saltmarsh/`, `/tide-now-home/`, `/cadence/`, and `/pricing/`
slots each serve their own product; adding this slot must not displace the others — see
Failure taxonomy.

---

## Health check

A bare 2xx is insufficient (a 200 can be a redirect shell or the wrong app). The deployed
`/pricing/` must serve the approved Cadence pricing content — this mirrors the `Cadence
pricing page live` content-verify step in `pages-deploy.yml`.

```bash
# Expect HTTP 200 AND the approved Cadence pricing content (not a bare status / redirect)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/pricing/ \
  | grep -qF 'Pricing that keeps time' \
  && echo "cadence pricing page live"
```

Expected: `cadence pricing page live`

**Design-fidelity verification (after deploy):**

```bash
# The approved Cadence pricing design ships its OKLCH clay accent token inline (token-identical
# to /cadence/). Its presence proves the approved design shipped (and the slot is not serving
# another app).
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/pricing/ \
  | grep -qF 'oklch(0.55 0.106 41)' \
  && echo "cadence pricing clay accent live"
```

Expected: `cadence pricing clay accent live`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | issue #47 (link-design: docs/design/design-a-clean-pricing-page-for-cadence-the-focu/) |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory
browser (`factory-browse` CDP container) against the live GitHub Pages URL. No credential
is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Approved pricing page renders every approved component (nav: Cadence wordmark + light/dark toggle + "Start a session" CTA; pricing hero "Pricing that keeps time *with you*."; monthly/annual billing toggle; three tiers — Free / Focus "Our pick" / Team; honest FAQ strip; minimal footer) | `https://…/pricing/` | Browser GET + visual check against `docs/design/design-a-clean-pricing-page-for-cadence-the-focu/current/index.html` |
| AC-2: Deployed screen is token-identical to `/cadence/` — clay accent `oklch(0.55 0.106 41)`, strong CTA `oklch(0.470 0.094 40)`, Newsreader/Cabin type, warm paper/ink neutrals (no pure #fff/#000); no `data-od-source-path` annotations | Same URL | Browser GET + inspect served CSS tokens |
| AC-3: The monthly/annual billing toggle swaps every tier's price + note (Focus $6→$5, Team $9→$7) and back; the nav light/dark toggle flips the theme (wired `[data-mode="dark"]`, not decorative); both keyboard-operable, ≥44px tap targets | Same URL | Click "Annually"/"Monthly"; observe prices + notes swap. Click the theme toggle; observe repaint to dark and back. Arrow-key the toggle |
| AC-4: Deployed screen structurally + token matches the approved design at each reference viewport (320/375/390/768/1024/1280/1440/1920) — no horizontal overflow, tap targets ≥44px, nothing clipped/overlapping | Same URL | Resize viewport across the 8 widths; compare to `current/viewports/index.html/<px>.png` |
| AC-5: After this deploy, `/cadence/`, `/tide-now/`, `/foxglove/`, `/saltmarsh/`, and `/tide-now-home/` still serve their own screens, unchanged (preservation) | `https://…/cadence/`, `…/tide-now/`, `…/foxglove/`, `…/saltmarsh/`, `…/tide-now-home/` | Browser GET each URL; confirm each serves its own app |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Plain static HTML (inline CSS, Google Fonts); one small in-page `<script>` for the light/dark toggle and the monthly/annual billing toggle; no server-side runtime |
| Vite base | N/A — not a Vite build; served verbatim |
| Build command | None (self-contained static page) |
| Build output | N/A — the source file `web/pricing/index.html` is the served artifact |
| Staging path | `_pages/pricing/index.html` |
| Dependencies at runtime | Google Fonts (Newsreader, Cabin) over CDN; if the font CDN is unreachable the page degrades gracefully to the serif/sans-serif system fallback (no layout break) |
| Dependencies at build time | None |
| Change propagation | `none`/`config-change` — the source file IS the artifact; a change reaches `/pricing/` after a re-deploy on merge to `main` (no build) |
| Restart procedure | N/A — static page; re-deploy triggers a new Pages build |
| State | Stateless; the only client-side state is the in-page light/dark toggle and the billing-period selection (neither persisted across reloads) |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| Propagation time | Pages CDN propagation typically under a minute after the `deploy` job completes |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| SIG-ID | Symptom | Likely cause | Worker-caused? | Diagnosis command | Recovery |
|---|---|---|---|---|---|
| SIG-P1 | `/pricing/` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Possible | `gh run list --workflow pages-deploy.yml --branch main --limit 3` | Confirm the deploy job succeeded; wait for CDN propagation (~1–2 min) and retry; if Pages disabled, enable it (one-time, see entry-point manual) |
| SIG-P2 | `/pricing/` returns `200` but is missing the approved content | The static page was not staged (deploy job `Stage all apps` step did not copy `web/pricing/index.html`) | Yes | Health-check command above; confirm the `Stage all apps` step lists `_pages/pricing/index.html` in the deploy job log | Restore the `cp web/pricing/index.html _pages/pricing/index.html` staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B guards the staging |
| SIG-P3 | `/pricing/` shows the wrong design / a different app's content | The pricing page was overwritten with another app's content, or the wrong accent shipped | Yes | `curl -sSL …/pricing/ \| grep -qF 'oklch(0.55 0.106 41)'` (must pass) | Restore the approved mockup from `docs/design/design-a-clean-pricing-page-for-cadence-the-focu/current/index.html`; the content test `web/pricing/index.test.js` and `scripts/verify-pages-deploy.sh` section A5 guard this |
| SIG-P4 | Billing toggle does not swap prices, or theme toggle does not flip | The in-page `<script>` was stripped or altered | Yes | Load the page; click "Annually" — prices must change to $5/$7. Click the theme toggle — page must repaint | Restore the mockup verbatim (script included); `web/pricing/index.test.js` AC-3 guards the wiring data-attributes + script |
| SIG-P5 | Preservation regression — an existing route (`/cadence/`, `/tide-now/`, `/foxglove/`, `/saltmarsh/`, `/tide-now-home/`) breaks after a pricing change | A staging step for another app was removed/clobbered | Yes | `grep -qF '_pages/cadence' .github/workflows/pages-deploy.yml` etc.; the regression guard checks all are staged | Restore the missing staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B asserts all apps are staged |
| SIG-P6 | Two Pages deploys / one app's subpath disappears after deploy | A second workflow also calls `actions/deploy-pages` (clobbers the single shared deploy) | Yes | `grep -rlE 'actions/deploy-pages' .github/workflows \| wc -l` (must be `1`) | Keep exactly one `deploy` job staging all apps; remove the duplicate. `scripts/verify-pages-deploy.sh` invariant B guards this |
| SIG-P7 | Content-verify returns missing content right after deploy | CDN propagation delay | No | Re-run the probe | Pipeline auto-retries via `curl --retry … --retry-delay …`; wait and retry manually |
| SIG-P8 | CI pipeline not triggering for a pricing change | Change was docs-only (deploy bypassed) | No | Check the `detect-changes` job output (`skip=true`) | Expected for docs-only commits; any `web/**` or workflow change deploys |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no
credentials, no user accounts. The screen is a static, stateless marketing mockup; its
CTAs are inert placeholder links (`#`) in this publish, and no real payment is taken. Worker
may freely load and resize the deployed URL, click the light/dark toggle, and toggle the
monthly/annual billing period, without risk to production data.

**Deploy verification command (worker-use):**

```bash
# After merge to main, wait for the cadence pricing page to be live, then verify:
until curl -sSL https://agentic-delivery.github.io/greenfield-design-target/pricing/ \
  | grep -qF 'Pricing that keeps time'; do
  sleep 30
done
echo "cadence pricing page live"
```
