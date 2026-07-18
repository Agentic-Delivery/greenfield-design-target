# Cadence landing page — Operational Manual

**Source:** `web/cadence/index.html` (self-contained static page — inline CSS + Google Fonts, no build step)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/cadence/`
**Deploy trigger:** Merge to `main` (shared pipeline — docs-only changes are bypassed)

---

## What this is

`/cadence/` publishes the **approved greenfield Cadence landing page** — the customer's
approved marketing landing for **Cadence**, a focus-timer app — served verbatim as a
self-contained static page. It is a design-publish (a greenfield mockup shipped as-is),
not a productionised app with live data.

The screen has four approved components: a sticky blurred nav (Cadence wordmark +
light/dark toggle + a small "Start a session" CTA), an editorial hero ("Find your
*cadence*." with a calm clay focus-ring timer motif showing 25:00 / Deep work and the
"Start a session" + "See how it works" CTAs), three anti-gamification feature cards
("Sessions, not stopwatches" / "Breaks you'll actually take" / "A record of quiet
hours"), and a minimal footer. Light theme is primary; a real dark theme is wired via
`[data-mode="dark"]` and an in-page toggle.

Anchored to the committed **Marginalia** brand library (`docs/design/brand/`): the OKLCH
clay accent (`oklch(0.55 0.106 41)`, strong CTA `oklch(0.470 0.094 40)`), warm paper/ink
neutrals (no pure black/white), and the Newsreader (display) + Cabin (body) type pairing.
The tokens are carried into the mockup as CSS custom properties, so building the mockup
verbatim consumes the committed brand.

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| Cadence landing page (static page) | Plain HTML, inline CSS, Google Fonts (no build); one small in-page `<script>` wiring the light/dark toggle | `web/cadence/index.html` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` (shared with tide-now + Foxglove + Saltmarsh + tide-now-home) | test → build (tide-now + Saltmarsh) → single deploy (all apps) → content-verify |

**No build step.** Unlike tide-now and Saltmarsh (Vite builds), this screen is a
self-contained static page served as-is — the Foxglove / tide-now-home static-page
precedent. The `deploy` job (which does `actions/checkout`) copies it straight from the
source tree.

**Deploy path:** The `deploy` job copies `web/cadence/index.html` to
`_pages/cadence/index.html`, so the `/cadence/` subpath serves it. Published via
`actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived credential is
written to persistent storage.

**Single shared Pages deploy:** cadence is published by the SAME ONE `deploy` job in
`pages-deploy.yml` that publishes tide-now (`_pages/tide-now/`), Foxglove
(`_pages/foxglove/`), Saltmarsh (`_pages/saltmarsh/`), and tide-now-home
(`_pages/tide-now-home/`). GitHub Pages keeps only the most recent deployment, so a single
deploy job is required; two Pages-deploy workflows would clobber each other. See
`docs/operations/operational-manual.md` (tide-now, the entry point).

**Subdirectory layout:** The Pages root (`/`) hosts a redirect to `/foxglove/`. The
`/tide-now/`, `/foxglove/`, `/saltmarsh/`, `/tide-now-home/`, and `/cadence/` slots each
serve their own product; adding this slot must not displace the others — see Failure
taxonomy.

---

## Health check

A bare 2xx is insufficient (a 200 can be a redirect shell or the wrong app). The deployed
`/cadence/` must serve the approved Cadence content — this mirrors the `Cadence landing
page live` content-verify step in `pages-deploy.yml`.

```bash
# Expect HTTP 200 AND the approved Cadence content (not a bare status / redirect)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/cadence/ \
  | grep -qF 'Sessions, not stopwatches' \
  && echo "cadence landing page live"
```

Expected: `cadence landing page live`

**Design-fidelity verification (after deploy):**

```bash
# The approved Cadence design ships its OKLCH clay accent token inline. Its presence
# proves the approved Cadence design shipped (and the slot is not serving another app).
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/cadence/ \
  | grep -qF 'oklch(0.55 0.106 41)' \
  && echo "cadence clay accent live"
```

Expected: `cadence clay accent live`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | issue #43 (link-design: docs/design/design-a-clean-modern-landing-page-for-a-focus-t/) |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory
browser (`factory-browse` CDP container) against the live GitHub Pages URL. No credential
is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Approved landing renders every approved component (nav: Cadence wordmark + light/dark toggle + "Start a session" CTA; hero: "Find your *cadence*." + focus-ring timer motif 25:00 / Deep work + "Start a session" & "See how it works" CTAs; three feature cards — "Sessions, not stopwatches" / "Breaks you'll actually take" / "A record of quiet hours"; minimal footer) | `https://…/cadence/` | Browser GET + visual check against `docs/design/design-a-clean-modern-landing-page-for-a-focus-t/current/index.html` |
| AC-2: Deployed screen structurally + token matches the approved design at each reference viewport (320/375/390/768/1024/1280/1440/1920) — clay accent `oklch(0.55 0.106 41)`, Newsreader/Cabin type, warm paper/ink neutrals, light-primary, approved layout/spacing; no horizontal overflow, tap targets ≥44px, nothing clipped/overlapping | Same URL | Resize viewport across the 8 widths; compare to `current/viewports/index.html/<px>.png` |
| AC-3: The nav light/dark toggle flips the theme on the live page (wired `[data-mode="dark"]`, not decorative) | Same URL | Click the toggle; observe the page repaint to dark and back |
| AC-4: After this deploy, `/tide-now/`, `/foxglove/`, `/saltmarsh/`, and `/tide-now-home/` still serve their own screens, unchanged (preservation) | `https://…/tide-now/`, `…/foxglove/`, `…/saltmarsh/`, `…/tide-now-home/` | Browser GET each URL; confirm each serves its own app |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Plain static HTML (inline CSS, Google Fonts); one small in-page `<script>` for the light/dark toggle; no server-side runtime |
| Vite base | N/A — not a Vite build; served verbatim |
| Build command | None (self-contained static page) |
| Build output | N/A — the source file `web/cadence/index.html` is the served artifact |
| Staging path | `_pages/cadence/index.html` |
| Dependencies at runtime | Google Fonts (Newsreader, Cabin) over CDN; if the font CDN is unreachable the page degrades gracefully to the serif/sans-serif system fallback (no layout break) |
| Dependencies at build time | None |
| Change propagation | `none`/`config-change` — the source file IS the artifact; a change reaches `/cadence/` after a re-deploy on merge to `main` (no build) |
| Restart procedure | N/A — static page; re-deploy triggers a new Pages build |
| State | Stateless; the only client-side state is the in-page light/dark toggle (not persisted across reloads) |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| Propagation time | Pages CDN propagation typically under a minute after the `deploy` job completes |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| SIG-ID | Symptom | Likely cause | Worker-caused? | Diagnosis command | Recovery |
|---|---|---|---|---|---|
| SIG-C1 | `/cadence/` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Possible | `gh run list --workflow pages-deploy.yml --branch main --limit 3` | Confirm the deploy job succeeded; wait for CDN propagation (~1–2 min) and retry; if Pages disabled, enable it (one-time, see entry-point manual) |
| SIG-C2 | `/cadence/` returns `200` but is missing the approved content | The static page was not staged (deploy job `Stage all apps` step did not copy `web/cadence/index.html`) | Yes | Health-check command above; confirm the `Stage all apps` step lists `_pages/cadence/index.html` in the deploy job log | Restore the `cp web/cadence/index.html _pages/cadence/index.html` staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B guards the staging |
| SIG-C3 | `/cadence/` shows the wrong design / a different app's content | The cadence page was overwritten with another app's content, or the wrong accent shipped | Yes | `curl -sSL …/cadence/ \| grep -qF 'oklch(0.55 0.106 41)'` (must pass) | Restore the approved mockup from `docs/design/design-a-clean-modern-landing-page-for-a-focus-t/current/index.html` (stripping `data-od-source-path`); the content test `web/cadence/index.test.js` and `scripts/verify-pages-deploy.sh` section A4 guard this |
| SIG-C4 | Preservation regression — an existing route (`/tide-now/`, `/foxglove/`, `/saltmarsh/`, `/tide-now-home/`) breaks after a cadence change | A staging step for another app was removed/clobbered | Yes | `grep -qF '_pages/tide-now-home' .github/workflows/pages-deploy.yml` etc.; the regression guard checks all are staged | Restore the missing staging line; re-merge. `scripts/verify-pages-deploy.sh` invariant B asserts all apps are staged |
| SIG-C5 | Two Pages deploys / one app's subpath disappears after deploy | A second workflow also calls `actions/deploy-pages` (clobbers the single shared deploy) | Yes | `grep -rlE 'actions/deploy-pages' .github/workflows \| wc -l` (must be `1`) | Keep exactly one `deploy` job staging all apps; remove the duplicate. `scripts/verify-pages-deploy.sh` invariant B guards this |
| SIG-C6 | Content-verify returns missing content right after deploy | CDN propagation delay | No | Re-run the probe | Pipeline auto-retries via `curl --retry … --retry-delay …`; wait and retry manually |
| SIG-C7 | CI pipeline not triggering for a cadence change | Change was docs-only (deploy bypassed) | No | Check the `detect-changes` job output (`skip=true`) | Expected for docs-only commits; any `web/**` or workflow change deploys |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no
credentials, no user accounts. The screen is a static, stateless marketing mockup; its
CTAs are inert placeholder links (`#`) in this publish. Worker may freely load and resize
the deployed URL, and click the light/dark toggle, without risk to production data.

**Deploy verification command (worker-use):**

```bash
# After merge to main, wait for the cadence landing page to be live, then verify:
until curl -sSL https://agentic-delivery.github.io/greenfield-design-target/cadence/ \
  | grep -qF 'Sessions, not stopwatches'; do
  sleep 30
done
echo "cadence landing page live"
```
