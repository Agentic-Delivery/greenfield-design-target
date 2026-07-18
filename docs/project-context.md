# Project context — tide-now

A mobile-first web app for outdoor coastal walkers. The customer-facing UI is
being built from an approved design (see `docs/design/`), one screen at a time.
The repository currently holds a small Express service (`api/`) and no frontend
yet — this is a greenfield design target.

> Note: the repository was scaffolded under the name "Stilla Notes — service".
> The approved customer-facing product being built here is **tide-now**, a tide
> and safe-crossing app for coastal walkers, per the operator's direction on
> 2026-06-17. The existing `api/` service is unrelated backend scaffolding; the
> worker decides at build time whether any of it is reused.

## Customer-Viewable URL

The approved tide-now home screen is published to GitHub Pages.

- **URL**: https://agentic-delivery.github.io/greenfield-design-target/tide-now/
- **What the customer will see there**: the approved tide-now home screen with the
  **#13 hero refinement** live — the calmer amber accent (`oklch(0.71 0.135 62)`),
  the more generous hero rhythm, and the location stepped a tier below the big tide
  reading. The trend badge, next-safe-crossing card, and saved-walks list render in
  the refined design language.
- **Live tidal data**: GitHub Pages is static hosting — it serves the built frontend
  only, with no `/api/tide` backend. Without that backend the tide reading shows the
  app's designed error state ("Tide data unavailable — check your connection") in the
  refined styling; the refined design itself is fully live and viewable. Standing up a
  data source for the public deployment (a hosted backend, or a public tidal API
  called client-side) is a separate product decision — see the intake-request filed
  from issue #16.

The Foxglove Books storefront is published at
https://agentic-delivery.github.io/greenfield-design-target/foxglove/ from the same
single Pages deploy (see `docs/operations/foxglove-storefront-manual.md`).

The Saltmarsh coffee-roaster hero is published at
https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/ from the same
single Pages deploy (built to the approved design in `docs/design/saltmarsh-hero/`;
its "Buy now" CTA ships a documented `#shop` placeholder until the customer supplies
a real order URL).

The approved tide-now home **base design** is published at
https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/ from the same
single Pages deploy (served verbatim from the approved greenfield bundle
`docs/design/tide-now-home/current/index.html` as a self-contained static page). This is
the approved "all-good" success view with the original hi-vis safety-orange accent — a
design-publish, distinct from the productionised app at `/tide-now/` (refined amber, all
states, live data). See `docs/operations/tide-now-home-manual.md`. The
loading/error-stale/empty-saved-walks states are a separate design-first fast-follow.

The approved **Cadence** focus-timer landing page is published at
https://agentic-delivery.github.io/greenfield-design-target/cadence/ from the same single
Pages deploy (served verbatim from the approved greenfield bundle
`docs/design/design-a-clean-modern-landing-page-for-a-focus-t/current/index.html` as a
self-contained static page — a sticky blurred nav with a light/dark toggle, an editorial
hero with a calm focus-ring timer motif, three anti-gamification feature cards, and a
minimal footer). It is anchored to the committed Marginalia brand library (OKLCH clay
accent, warm paper/ink neutrals, Newsreader + Cabin type). See
`docs/operations/cadence-landing-manual.md`.

## Test Environment

- **Platform**: GitHub Pages (static hosting), deployed via GitHub Actions (OIDC — no
  stored credential) by `.github/workflows/pages-deploy.yml`.
- **Deploy trigger**: merge to `main` (Topology B — trunk-based deploy-on-merge).
- **Verification targets (the ONLY valid post-deploy targets — anything else is PROD)**:
  - tide-now: `https://agentic-delivery.github.io/greenfield-design-target/tide-now/`
  - Foxglove: `https://agentic-delivery.github.io/greenfield-design-target/foxglove/`
  - Saltmarsh: `https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/`
  - tide-now-home: `https://agentic-delivery.github.io/greenfield-design-target/tide-now-home/`
  - cadence: `https://agentic-delivery.github.io/greenfield-design-target/cadence/`
- **Safety zone**: the GitHub Pages site above is the only valid verification target.
  `localhost:<port>` and container-internal addresses are NOT valid post-deploy targets.

## Project Type

[unknown — set manually: greenfield or brownfield]


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

