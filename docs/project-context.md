# Project context — greenfield-design-target

A greenfield tree that ships approved customer designs (see `docs/design/`) as
running web pages, one screen at a time, published to GitHub Pages. The tree was
reset to greenfield (commit `4afba05`), which removed the prior `web/**` frontend
and the older-demo publish sources; earlier demo routes (tide-now / foxglove /
saltmarsh / cadence / pricing) are therefore no longer built or served here.

The **first runnable frontend** on this reset tree is the approved **expense
tracker** main screen, published at `/expenses/` (see `## Customer-Viewable URL`).
Subsequent screens follow the same route-per-app, single-Pages-deploy pattern.

> Note: the repository was originally scaffolded under other product names; those
> are historical. The live surface is whatever `## Customer-Viewable URL` and
> `## Test Environment` below list — kept current with each build.

## Customer-Viewable URL

The approved expense-tracker main screen is published to GitHub Pages.

- **URL**: https://agentic-delivery.github.io/greenfield-design-target/expenses/
- **What the customer will see there**: the approved expense-tracker main screen in the
  **Marginalia** look (OKLCH clay accent `oklch(0.55 0.106 41)`, warm paper/ink neutrals,
  Newsreader + Cabin type) — a running monthly-total hero ("Spent this month" with a budget
  line and budget bar), an add-expense form (currency amount field, five category chips,
  one "Add expense" button that stays disabled until a valid positive amount is entered),
  and a Recent list grouped by day. Entering a valid amount, picking a category, and tapping
  "Add expense" adds a row to Recent and updates the running total + budget bar immediately,
  entirely in the browser. A designed empty state ("Nothing logged yet"), dark mode, and
  reduced-motion behaviour are all present.
- **Client-side only**: GitHub Pages is static hosting — the screen is a self-contained
  static page (inline CSS + inline JS + Google Fonts, no build step, no backend). It runs
  entirely in the visitor's browser tab against seeded demo data; nothing is persisted, so
  refreshing the page returns it to its seeded starting state. This is a demo-quality
  tracker (a small-caption contrast nudge and async loading/error states for a future live
  data layer are captured as a separate, explicitly-deferred follow-up).
- Served verbatim (byte-identical) from the approved greenfield bundle
  `docs/design/design-the-main-screen-of-a-simple-expense-track/current/index.html`, staged
  as `web/expenses/index.html`. This is the **first runnable frontend** on the reset tree.
  See `docs/operations/expense-tracker-manual.md`.

This is currently the ONLY route served from Pages on this reset tree. The older-demo routes
(tide-now / foxglove / saltmarsh / cadence / pricing) had their sources removed by the
greenfield reset (commit `4afba05`) and are no longer built or served; their operational
manuals under `docs/operations/` describe those removed routes and are stale pending a
separate cleanup.

## Test Environment

- **Platform**: GitHub Pages (static hosting), deployed via GitHub Actions (OIDC — no
  stored credential) by `.github/workflows/pages-deploy.yml`.
- **Deploy trigger**: merge to `main` (Topology B — trunk-based deploy-on-merge).
- **Verification targets (the ONLY valid post-deploy targets — anything else is PROD)**:
  - expense tracker: `https://agentic-delivery.github.io/greenfield-design-target/expenses/`
- **Safety zone**: the GitHub Pages site above is the only valid verification target.
  `localhost:<port>` and container-internal addresses are NOT valid post-deploy targets.

## Project Type

greenfield


## CI/CD Profile

> Baseline metrics for CI/CD pipeline monitoring. Set by measurement or default.
> Used by ADR-079 Phase 2 monitor to detect deviations from expected durations.

| Metric | Value | Set by | Date |
|--------|-------|--------|------|
| ci_duration_budget_seconds | (not set) | — | — |
| deploy_verification_budget_seconds | 120 | default | YYYY-MM-DD |

### CI Steps

| Step | Typical duration | Notes |
|------|-----------------|-------|
| [Step name] | [duration] | [notes] |

## Known Gotchas (cross-factory)

> Lessons learned across all Delivery Factory deployments. These apply to every project.

### GitHub Actions: Always set artifact retention

GitHub Actions has a storage quota for artifacts (500 MB free, 2 GB Pro). Without explicit `retention-days`, artifacts are kept for 90 days. The quota fills up silently and **all** Actions runs start failing — which breaks the factory's CI feedback loop. Workers stall or escalate because they can't read CI results.

**Fix**: Always set `retention-days` in every workflow that uploads artifacts:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: results/
    retention-days: 14
```

**Detection**: If CI suddenly fails on all PRs with storage-related errors, check artifact usage at `https://github.com/<org>/<repo>/settings/actions` → Artifact and log retention.

*Source: LESSON-016 (SmartPill Organizer) — 3-day outage masked by full artifact quota.*


### GitHub: Disable "Auto-close issues with merged linked pull requests"

GitHub has a repo setting that automatically closes issues when a PR with `Fixes #N` or `Closes #N` is merged. This bypasses **all** post-deploy verification gates — Quality Guardian Step 7, real-system verification, and AC sign-off never run. The issue is marked "done" the moment the PR merges, with no human or automated check that it actually works.

**Fix**: Disable this setting in repo **Settings → General → Issues → uncheck "Auto-close issues with merged linked pull requests"**. The factory's `/next` process closes issues explicitly in Step 7 after Quality Guardian returns `ALL_PASS`.

**Detection**: The factory detects auto-closed issues indirectly — if an issue's close timestamp matches a PR merge timestamp and no Step 7 marker exists, the issue was likely auto-closed. The intake process warns at session start when this pattern is detected. The `factory-upgrade.sh` script also checks and emits `auto_close_detected` events.

**Why it matters**: An auto-closed issue that has a regression will never be caught by the factory's quality gates. The customer believes the feature is shipped and verified — but no verification happened.

