#!/usr/bin/env bash
#
# Regression guard for the unified GitHub Pages deploy (issue #16, extended #23).
#
# Protects the DoD contract that lets a single Pages deploy publish the
# tide-now app (at /tide-now/), the Foxglove storefront (at /foxglove/), and the
# Saltmarsh hero (at /saltmarsh/) without clobbering each other, with the refined
# #13 hero accent live.
#
# Two layers:
#   A. Build-output contract — each Vite build, built with its Pages base,
#      produces a shell + assets that resolve under its subpath; tide-now also
#      carries the approved refined accent. Requires the builds pre-built:
#        ( cd web && npm ci && npm run build -- --base=/greenfield-design-target/tide-now/ )
#        ( cd web && npx vite build --config vite.saltmarsh.config.js --base=/greenfield-design-target/saltmarsh/ )
#   B. Workflow-topology invariants — exactly one Pages deploy (no clobber),
#      no obsolete Render deploy, all three apps staged in that one deploy, and
#      the branch-protection-required "Test & Build" check preserved.
#
# Exit non-zero on any violation (fail-loud).

set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE_PATH="/greenfield-design-target/tide-now"
SALT_BASE_PATH="/greenfield-design-target/saltmarsh"
# The approved refined accent (#13). Tolerant of CSS minification, which strips
# the leading zeros: source `oklch(0.71 0.135 62)` -> deployed `oklch(.71 .135 62)`.
ACCENT_RE='oklch\(0?\.71 0?\.135 62\)'
WF_DIR="$ROOT/.github/workflows"
DIST="$ROOT/web/dist"
SALT_DIST="$ROOT/web/dist-saltmarsh"
# tide-now-home is the approved base design published as a self-contained static
# page (no build step) — the served artifact lives directly in the source tree.
HOME_PAGE="$ROOT/web/tide-now-home/index.html"
# The base bundle's hi-vis safety-orange accent (source form; this page is NOT
# minified, so no minified variant needs tolerating).
HOME_ACCENT='oklch(0.70 0.18 50)'
# cadence is the approved Cadence landing page, same self-contained static-page
# precedent — the served artifact lives directly in the source tree.
CADENCE_PAGE="$ROOT/web/cadence/index.html"
# The approved Cadence OKLCH clay accent (source form; not minified).
CADENCE_ACCENT='oklch(0.55 0.106 41)'

fail=0
check() { # $1 = exit code from the caller's test (0=pass, non-zero=fail); $2 = description
  if [ "$1" -eq 0 ]; then
    echo "PASS: $2"
  else
    echo "FAIL: $2"
    fail=1
  fi
}

echo "== A. Build-output contract (web/dist) =="
if [ ! -f "$DIST/index.html" ]; then
  echo "FAIL: web/dist/index.html missing — build first with:"
  echo "      ( cd web && npm ci && npm run build -- --base=$BASE_PATH/ )"
  exit 1
fi

grep -qF "$BASE_PATH/assets/" "$DIST/index.html"; check $? "tide-now shell references assets under the Pages base ($BASE_PATH/assets/)"

grep -qF 'tide·now' "$DIST/index.html"; check $? "tide-now shell carries its title marker (tide·now)"

# Refined accent must be present in the built CSS (proves the #13 refinement shipped).
if ls "$DIST"/assets/*.css >/dev/null 2>&1 && grep -qE "$ACCENT_RE" "$DIST"/assets/*.css; then
  check 0 "refined accent present in built CSS (matches $ACCENT_RE)"
else
  check 1 "refined accent present in built CSS (matches $ACCENT_RE)"
fi

echo "== A2. Build-output contract (web/dist-saltmarsh) =="
if [ ! -f "$SALT_DIST/saltmarsh.html" ]; then
  echo "FAIL: web/dist-saltmarsh/saltmarsh.html missing — build first with:"
  echo "      ( cd web && npx vite build --config vite.saltmarsh.config.js --base=$SALT_BASE_PATH/ )"
  exit 1
fi

grep -qF "$SALT_BASE_PATH/assets/" "$SALT_DIST/saltmarsh.html"; check $? "Saltmarsh shell references assets under the Pages base ($SALT_BASE_PATH/assets/)"

grep -qF 'Saltmarsh — small-batch coffee roasters' "$SALT_DIST/saltmarsh.html"; check $? "Saltmarsh shell carries its title marker"

# The tide-now base must NOT leak into the Saltmarsh build (separate-base contract).
if grep -qF "$BASE_PATH/assets/" "$SALT_DIST/saltmarsh.html"; then
  check 1 "Saltmarsh shell does NOT reference the tide-now base (separate per-product base)"
else
  check 0 "Saltmarsh shell does NOT reference the tide-now base (separate per-product base)"
fi

echo "== A3. Published-page contract (web/tide-now-home/index.html) =="
if [ ! -f "$HOME_PAGE" ]; then
  echo "FAIL: web/tide-now-home/index.html missing — the approved base design page is not present"
  exit 1
fi

# One marker from each of the four approved components — proves the approved base
# screen (not a placeholder) is what will be served.
grep -qF 'Current tide height' "$HOME_PAGE"; check $? "tide-now-home carries the tide-height hero (Current tide height)"
grep -qF 'Safe to cross now' "$HOME_PAGE";   check $? "tide-now-home carries the next-safe-crossing card (Safe to cross now)"
grep -qF 'Holy Island Causeway' "$HOME_PAGE"; check $? "tide-now-home carries the saved-walks list (Holy Island Causeway)"
grep -qF 'Add a walk' "$HOME_PAGE";          check $? "tide-now-home carries the add-a-walk affordance"

# Fidelity: the base bundle's accent token is present, and the refined /tide-now/
# accent has NOT leaked in (base publish, not the productionised app).
grep -qF "$HOME_ACCENT" "$HOME_PAGE"; check $? "tide-now-home ships the approved base accent token ($HOME_ACCENT)"
if grep -qF 'oklch(0.71 0.135 62)' "$HOME_PAGE"; then
  check 1 "tide-now-home does NOT carry the refined /tide-now/ accent (base publish, not the app)"
else
  check 0 "tide-now-home does NOT carry the refined /tide-now/ accent (base publish, not the app)"
fi

echo "== A4. Published-page contract (web/cadence/index.html) =="
if [ ! -f "$CADENCE_PAGE" ]; then
  echo "FAIL: web/cadence/index.html missing — the approved Cadence landing page is not present"
  exit 1
fi

# One marker from each of the four approved components — proves the approved Cadence
# landing page (not a placeholder) is what will be served.
grep -qF 'Find your' "$CADENCE_PAGE";              check $? "cadence carries the editorial hero (Find your cadence.)"
grep -qF 'Start a session' "$CADENCE_PAGE";        check $? "cadence carries the nav CTA (Start a session)"
grep -qF 'Sessions, not stopwatches' "$CADENCE_PAGE"; check $? "cadence carries the feature cards (Sessions, not stopwatches)"
grep -qF '© 2026 Cadence' "$CADENCE_PAGE";         check $? "cadence carries the footer (© 2026 Cadence)"

# Fidelity: the approved Cadence clay accent token is present.
grep -qF "$CADENCE_ACCENT" "$CADENCE_PAGE"; check $? "cadence ships the approved clay accent token ($CADENCE_ACCENT)"

# Production cleanliness: no design-editor source-path annotations leak into the served page.
if grep -qF 'data-od-source-path' "$CADENCE_PAGE"; then
  check 1 "cadence carries no design-editor annotations (data-od-source-path stripped)"
else
  check 0 "cadence carries no design-editor annotations (data-od-source-path stripped)"
fi

echo "== B. Workflow-topology invariants (.github/workflows) =="

# Exactly one Pages deploy across all workflows — two would clobber each other.
DEPLOY_COUNT=$(grep -rlE 'actions/deploy-pages' "$WF_DIR" 2>/dev/null | wc -l | tr -d ' ')
[ "$DEPLOY_COUNT" = "1" ]; check $? "exactly one workflow calls actions/deploy-pages (found: $DEPLOY_COUNT — no Pages clobber)"

# No obsolete Render deploy anywhere.
if grep -rqE 'RENDER_DEPLOY_HOOK_URL|Deploy to Render' "$WF_DIR" 2>/dev/null; then
  check 1 "obsolete Render deploy removed (none of RENDER_DEPLOY_HOOK_URL / 'Deploy to Render')"
else
  check 0 "obsolete Render deploy removed (none of RENDER_DEPLOY_HOOK_URL / 'Deploy to Render')"
fi

# The single deploy stages ALL apps.
DEPLOY_WF=$(grep -rlE 'actions/deploy-pages' "$WF_DIR" 2>/dev/null | head -1)
if [ -n "$DEPLOY_WF" ]; then
  grep -qF '_pages/foxglove' "$DEPLOY_WF"; check $? "the Pages deploy stages Foxglove (_pages/foxglove) — $(basename "$DEPLOY_WF")"
  # Boundary-anchored: `_pages/tide-now` is a substring of `_pages/tide-now-home`, so a
  # bare fixed-string match would falsely pass if the real /tide-now/ staging were removed
  # while tide-now-home remained. Require a trailing space or `/` (both the mkdir arg and
  # the `cp … _pages/tide-now/` satisfy this; `_pages/tide-now-home` does not).
  grep -qE '_pages/tide-now[[:space:]/]' "$DEPLOY_WF"; check $? "the Pages deploy stages tide-now (_pages/tide-now) — $(basename "$DEPLOY_WF")"
  grep -qF '_pages/saltmarsh' "$DEPLOY_WF"; check $? "the Pages deploy stages Saltmarsh (_pages/saltmarsh) — $(basename "$DEPLOY_WF")"
  grep -qF '_pages/tide-now-home' "$DEPLOY_WF"; check $? "the Pages deploy stages tide-now-home (_pages/tide-now-home) — $(basename "$DEPLOY_WF")"
  grep -qF '_pages/cadence' "$DEPLOY_WF"; check $? "the Pages deploy stages cadence (_pages/cadence) — $(basename "$DEPLOY_WF")"
else
  check 1 "a Pages deploy workflow exists"
fi

# Branch-protection required status check name preserved.
if grep -rqE 'name:[[:space:]]*Test & Build' "$WF_DIR" 2>/dev/null; then
  check 0 "branch-protection required check 'Test & Build' job preserved"
else
  check 1 "branch-protection required check 'Test & Build' job preserved"
fi

echo
if [ "$fail" -ne 0 ]; then
  echo "RESULT: FAIL"
  exit 1
fi
echo "RESULT: PASS"
