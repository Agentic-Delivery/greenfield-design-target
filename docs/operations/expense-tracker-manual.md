# Expense tracker main screen — Operational Manual

**req-id:** REQ-web-expense-tracker
**Source:** `web/expenses/index.html` (self-contained static page — inline CSS + inline JS + Google Fonts, no build step)
**Deployed at:** `https://agentic-delivery.github.io/greenfield-design-target/expenses/`
**Deploy trigger:** Merge to `main` (shared pipeline — docs-only changes are bypassed)

---

## What this is

`/expenses/` publishes the **approved greenfield expense-tracker main screen** — the
customer's approved home screen for a simple personal expense tracker — served verbatim
(byte-identical) as a self-contained static page (the Foxglove / cadence / pricing
static-page precedent). It is the **first runnable frontend** on this reset greenfield tree.

The screen has three approved components: a **running monthly total** hero ("Spent this
month" with a budget line and "$X of $Y left" context and a budget bar), an **add-expense
form** (a currency-prefixed amount field, five single-select category chips —
Groceries / Dining / Transport / Home / Other — and one primary "Add expense" button,
disabled until a valid positive amount is entered), and a **Recent** list (expenses
grouped by day — Today / Yesterday). A designed **empty state** ("Nothing logged yet")
is reached by the page's own logic when the count is 0. Light theme is primary; a real
dark theme is wired via `[data-mode="dark"]`, and `prefers-reduced-motion` is honored.

The page is **self-contained and client-side only**: an inline `<script>` handles
add-expense / recent-list / running-total / budget-bar / empty-state entirely in the
browser against seeded demo data. There is **no backend or API** — refreshing the page
returns it to its seeded demo state (nothing is persisted; this is a demo-quality tracker).

Anchored to the committed **Marginalia** brand library (`docs/design/brand/`,
`tokens.json`): the OKLCH clay accent (`oklch(0.55 0.106 41)`, strong CTA
`oklch(0.470 0.094 40)`), warm paper/ink neutrals (no pure black/white), and the
Newsreader (display) + Cabin (body) type pairing. The tokens are carried into the mockup
as CSS custom properties, so serving the mockup verbatim consumes the committed brand —
no new brand tokens are introduced.

**Deferred (out of scope for this build, captured as a separate follow-up):** a
small-caption contrast nudge and async loading/error states for a future live data layer.
The screen ships exactly as approved (the budget-bar easing, which already renders in the
approved mockup, ships unchanged). Acceptance is matched against the as-approved reference
screenshots, not a corrected/idealized target.

---

## Deployment topology

| Component | Technology | Location |
|---|---|---|
| Expense-tracker screen (static page) | Plain HTML, inline CSS, Google Fonts (no build); one inline `<script>` implementing the client-side add-expense / total / budget-bar / empty-state behaviour | `web/expenses/index.html` in source tree |
| Hosting | GitHub Pages (OIDC — no stored credential) | `github-pages` environment |
| CI/CD pipeline | `.github/workflows/pages-deploy.yml` | `Test & Build` (fidelity + topology guard) → single `deploy` → post-deploy content-verify |

**No build step.** The screen is a self-contained static page served as-is (the
Foxglove / cadence / pricing static-page precedent). The `deploy` job (which does
`actions/checkout`) copies it straight from the source tree — there is no artifact upload
or Vite build for this route.

**Deploy path:** The `deploy` job copies `web/expenses/index.html` to
`_pages/expenses/index.html`, so the `/expenses/` subpath serves it, and writes a root
`_pages/index.html` that redirects `/` → `/expenses/`. Published via
`actions/deploy-pages@v4` using a workflow-scoped OIDC token. No long-lived credential is
written to persistent storage.

**Single shared Pages deploy:** GitHub Pages keeps only the most recent deployment, so
this route MUST be published by the ONE shared `deploy` job in `pages-deploy.yml`. Two
Pages-deploy workflows would clobber each other. On this reset greenfield tree, the
older-demo routes (tide-now / foxglove / saltmarsh / cadence / pricing) had their sources
removed by commit `4afba05` and are **not** published here — `/expenses/` is the only route
this tree currently serves, so there is no other route to preserve. If any other content
is ever found live through this same deploy, a change to this route must publish alongside
it, never remove it.

**Pre-deploy fidelity + topology guard:** `scripts/verify-expense-tracker.sh` (run in the
`Test & Build` job and locally) fails loud if the served source is not byte-identical to
the approved mockup, if a content/behaviour/brand marker is missing, if a second
Pages-deploy workflow appears, if the workflow depends on any removed older-demo input, or
if the post-deploy step does not content-verify `/expenses/`.

---

## Health check

A bare 2xx is insufficient (a 200 can be a redirect shell or the wrong app). The deployed
`/expenses/` must serve the approved expense-tracker content — this mirrors the
`Expense-tracker screen live` content-verify step in `pages-deploy.yml`.

```bash
# Expect HTTP 200 AND the approved expense-tracker content (not a bare status / redirect)
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/expenses/ \
  | grep -qF 'Spent this month' \
  && echo "expense-tracker screen live"
```

Expected: `expense-tracker screen live`

**Design-fidelity verification (after deploy):**

```bash
# The approved design ships its OKLCH Marginalia clay accent token inline. Its presence
# proves the approved design shipped (and that this slot is not serving another app).
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/expenses/ \
  | grep -qF 'oklch(0.55 0.106 41)' \
  && echo "expense-tracker clay accent live"
```

Expected: `expense-tracker clay accent live`

**Liveness (app hydrates, not a dead shell):**

```bash
# The inline add-expense handler must ship — the page is a live app, not a static picture.
curl -sSL https://agentic-delivery.github.io/greenfield-design-target/expenses/ \
  | grep -qF "addEventListener('submit'" \
  && echo "expense-tracker add-expense handler live"
```

Expected: `expense-tracker add-expense handler live`

---

## Levers

| Lever | Read | Set | Restore | Req-id |
|---|---|---|---|---|
| `verification_backends` | See below | N/A (static config) | N/A | REQ-web-expense-tracker (link-design: docs/design/design-the-main-screen-of-a-simple-expense-track/) |
| `deploy/route` | The served route is `/expenses/`, staged by the `deploy` job's `Stage the expense-tracker app` step (`cp web/expenses/index.html _pages/expenses/index.html`) | Change the staged subpath in `pages-deploy.yml` and the source path | Restore the `_pages/expenses/` staging line | REQ-web-expense-tracker |

### `verification_backends`

**Value:** `shadow-qg`

**What it means:** The `delivery-verifier` QA agent exercises use-cases via the factory
browser (`factory-browse` CDP container) against the live GitHub Pages URL. No credential
is required — the URL is public.

**Use-cases covered by `shadow-qg`:**

| Use-case | Observed surface | Consumer path |
|---|---|---|
| AC-1: Approved screen renders (monthly-total hero "Spent this month"; add-expense form with amount field + 5 category chips + "Add expense" button; Recent list) — not a 404 / placeholder / stale page | `https://…/expenses/` | Browser GET + visual check against `docs/design/design-the-main-screen-of-a-simple-expense-track/current/index.html` |
| AC-2: Served page is the approved mockup served verbatim (byte-identical), inheriting the Marginalia tokens (clay accent `oklch(0.55 0.106 41)`, warm paper/ink neutrals, Newsreader/Cabin type); matches the approved references at each viewport | Same URL | Browser GET + inspect served tokens; compare to `current/viewports/index.html/<px>.png` |
| AC-3: Enter a valid positive amount (e.g. 12.50), select a category chip, tap "Add expense" → a new row appears in Recent under Today AND the running monthly total + budget bar update immediately, with NO network request. Empty/0 amount → "Add expense" stays disabled; a positive amount enables it | Same URL | Real browser: fill amount, click a chip, click "Add expense"; observe the new row + total + budget-bar update; confirm no fetch/XHR fires. Then clear/enter 0 and observe the disabled button |
| AC-4: Empty state ("Nothing logged yet"), dark-mode styling, and reduced-motion behaviour each match the approved mockup — including the budget-bar easing (ships unchanged; non-regression of the two deferred findings) | Same URL | Real browser: load fresh; toggle `data-mode="dark"`; emulate `prefers-reduced-motion`; observe each state matches the approved mockup |
| AC-5: On merge to `main`, the single shared deploy job builds+publishes WITHOUT referencing removed `web/**` older-demo sources or `scripts/verify-pages-deploy.sh`, fails loud on a broken build, and the post-deploy step content-verifies `/expenses/` (known string, not a bare 2xx) | GitHub Actions run for the merge | Inspect the Actions run: `Test & Build` runs `scripts/verify-expense-tracker.sh`; `Verify deployed content` asserts the served markers |
| AC-6: `docs/project-context.md` Customer-Viewable URL + Verification-targets list the live `/expenses/` route and make no claim about routes whose source the reset removed | `docs/project-context.md` | Grep the file for the `/expenses/` URL; cross-check listed URL against a live curl |
| render_health: the deployed `/expenses/` is a live app whose client-side JS executes (add-expense mutates the DOM), not a static shell | Same URL | Exercising AC-3 on the live URL demonstrates hydration |

---

## Component operational profile

| Attribute | Value |
|---|---|
| Technology | Plain static HTML (inline CSS, Google Fonts); one inline `<script>` implementing add-expense / total / budget-bar / empty-state; no server-side runtime |
| Vite base | N/A — not a Vite build; served verbatim |
| Build command | None (self-contained static page) |
| Build output | N/A — the source file `web/expenses/index.html` is the served artifact |
| Staging path | `_pages/expenses/index.html` |
| Dependencies at runtime | Google Fonts (Newsreader, Cabin) over CDN; if the font CDN is unreachable the page degrades gracefully to the serif/sans-serif system fallback (no layout break) |
| Dependencies at build time | None |
| Change propagation | `none`/`config-change` — the source file IS the artifact; a change reaches `/expenses/` after a re-deploy on merge to `main` (no build) |
| Restart procedure | N/A — static page; re-deploy triggers a new Pages build |
| State | Stateless server-side; client-side state (added expenses, total, selected category, chosen theme) lives only in the open tab and is NOT persisted across reloads (seeded demo data on load) |
| Secrets | None — GitHub Pages OIDC token is ephemeral and scoped to the workflow run |
| Propagation time | Pages CDN propagation typically under a minute after the `deploy` job completes |
| CDN | GitHub Pages CDN (global); cache TTL is Pages default (~10 min after deploy) |

---

## Failure taxonomy

| SIG-ID | Symptom | Likely cause | Worker-caused? | Diagnosis command | Recovery |
|---|---|---|---|---|---|
| SIG-E1 | `/expenses/` returns `404` | GitHub Pages not enabled, or deploy not yet propagated | Possible | `gh run list --workflow pages-deploy.yml --branch main --limit 3` | Confirm the deploy job succeeded; wait for CDN propagation (~1–2 min) and retry; if Pages disabled, enable it (one-time operator action — Pages source = "GitHub Actions") |
| SIG-E2 | `/expenses/` returns `200` but is missing the approved content | The static page was not staged (deploy job `Stage the expense-tracker app` step did not copy `web/expenses/index.html`) | Yes | Health-check command above; confirm the `Stage the expense-tracker app` step lists `_pages/expenses/index.html` in the deploy log | Restore the `cp web/expenses/index.html _pages/expenses/index.html` staging line; re-merge. `scripts/verify-expense-tracker.sh` C3 guards the staging |
| SIG-E3 | `/expenses/` shows the wrong design / a different app's content | The screen was overwritten with another app's content, or the wrong accent shipped | Yes | `curl -sSL …/expenses/ \| grep -qF 'oklch(0.55 0.106 41)'` (must pass) | Restore the approved mockup verbatim from `docs/design/design-the-main-screen-of-a-simple-expense-track/current/index.html`; `scripts/verify-expense-tracker.sh` A (byte-identity) guards this |
| SIG-E4 | Add-expense does nothing / no new row / total never updates | The inline `<script>` was stripped or altered (a static picture, not a working app) | Yes | Load the page; enter a positive amount, pick a chip, click "Add expense" — a new row must appear under Today and the total must change. `curl … \| grep -qF "addEventListener('submit'"` must pass | Restore the mockup verbatim (script included); `scripts/verify-expense-tracker.sh` B guards the behaviour markers |
| SIG-E5 | The deploy is green but the page is a stale/old build | Wrong SHA deployed, or CDN cache | Possible | Re-check the `deploy` job SHA against `main` HEAD | Re-run `pages-deploy.yml` on `main`; wait for CDN propagation |
| SIG-E6 | Deploy job fails referencing a removed input (`web/foxglove`, `web/cadence`, `scripts/verify-pages-deploy.sh`, …) | The workflow re-acquired a dependency on an input the reset removed | Yes | `bash scripts/verify-expense-tracker.sh` (C2 fails) | Remove the executable reference to the removed input from `pages-deploy.yml`; the workflow must only stage `web/expenses/index.html` |
| SIG-E7 | Two Pages deploys / the route disappears after deploy | A second workflow also calls `actions/deploy-pages` (clobbers the single shared deploy) | Yes | `grep -rlE 'actions/deploy-pages' .github/workflows \| wc -l` (must be `1`) | Keep exactly one `deploy` job; remove the duplicate. `scripts/verify-expense-tracker.sh` C1 guards this |
| SIG-E8 | Content-verify returns missing content right after deploy | CDN propagation delay | No | Re-run the probe | Pipeline auto-retries via `curl --retry … --retry-delay …`; wait and retry manually |
| SIG-E9 | CI pipeline not triggering for an expense-tracker change | Change was docs-only (deploy bypassed) | No | Check the `detect-changes` job output (`skip=true`) | Expected for docs-only commits; any `web/**` or workflow change deploys |

---

## Test environment

**Test environment identifier:** `github-pages` (the GitHub Actions environment name)

**Safety zone:** The GitHub Pages deployment is the only live surface. No database, no
credentials, no user accounts. The screen is a static, stateless demo tracker; adding an
expense mutates only the open browser tab and is not persisted. Worker/QA may freely load
and resize the deployed URL, add expenses, toggle dark mode, and emulate reduced-motion,
without risk to production data. `localhost:<port>` and container-internal addresses are
NOT valid post-deploy targets.

**Deploy verification command (worker/QA use):**

```bash
# After merge to main, wait for the expense-tracker screen to be live, then verify:
until curl -sSL https://agentic-delivery.github.io/greenfield-design-target/expenses/ \
  | grep -qF 'Spent this month'; do
  sleep 30
done
echo "expense-tracker screen live"
```
