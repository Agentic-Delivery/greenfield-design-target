#!/usr/bin/env bash
#
# verify-expense-tracker.sh — pre-deploy fidelity + pipeline-topology guard for the
# expense-tracker route (/expenses/).
#
# This is the reconciled root-cause replacement for the removed
# scripts/verify-pages-deploy.sh: the reset (commit 4afba05) deleted every older-demo
# source (web/**) and the old verify script, leaving pages-deploy.yml referencing inputs
# that no longer exist. This script guards the ONE route this tree now publishes.
#
# It runs in the CI "Test & Build" job (before any deploy) and locally. It fails loud
# (exit 1) on any violation — never green-with-a-warning.
#
# What it asserts:
#   A. CON-01 verbatim fidelity — the served source web/expenses/index.html is
#      byte-identical to the approved mockup (the deliverable is served, not re-implemented).
#   B. Content/behaviour markers — the approved screen's four components + the inline
#      add-expense behaviour + the Marginalia brand token are present in the served source.
#   C. CON-04 pipeline topology — exactly one Pages-deploy job; no dependence on the
#      removed web/** older-demo sources or scripts/verify-pages-deploy.sh; the deploy
#      stages the expenses route; the post-deploy step content-verifies /expenses/
#      (a known string, not a bare 2xx).
#
# Exit 0 = all invariants hold. Exit 1 = at least one violation (printed).

set -eu

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

SERVED="web/expenses/index.html"
APPROVED="docs/design/design-the-main-screen-of-a-simple-expense-track/current/index.html"
WORKFLOW=".github/workflows/pages-deploy.yml"

fail() { echo "FAIL: $*" >&2; exit 1; }
ok()   { echo "PASS: $*"; }

# ── A. CON-01 verbatim fidelity ──────────────────────────────────────────────
[ -f "$SERVED" ]   || fail "served source $SERVED does not exist"
[ -f "$APPROVED" ] || fail "approved mockup $APPROVED does not exist (design bundle missing?)"
if ! cmp -s "$SERVED" "$APPROVED"; then
  fail "$SERVED is NOT byte-identical to the approved mockup $APPROVED (CON-01: serve verbatim, do not re-implement)"
fi
ok "A. served source is byte-identical to the approved mockup (verbatim)"

# ── B. Content / behaviour markers (in the served source) ────────────────────
# One marker from each approved component + the inline behaviour + the brand token.
declare -a MARKERS=(
  'Ledger'                       # masthead wordmark
  'Spent this month'             # running-total hero
  'Add an expense'               # add-expense form heading
  'Recent'                       # recent list heading
  'Nothing logged yet'           # empty state
  'id="expense-form"'            # the add-expense form (behaviour target)
  'id="submit" disabled'         # add-button starts disabled (edge-case behaviour)
  "addEventListener('submit'"    # inline client-side add-expense handler (hydration)
  'is-empty'                     # empty-state toggle logic
  'oklch(0.55 0.106 41)'         # Marginalia clay accent token (brand inheritance)
)
for m in "${MARKERS[@]}"; do
  grep -qF -- "$m" "$SERVED" || fail "content marker not found in $SERVED: '$m'"
done
ok "B. all ${#MARKERS[@]} content/behaviour/brand markers present in the served source"

# ── C. CON-04 pipeline topology ──────────────────────────────────────────────
[ -f "$WORKFLOW" ] || fail "workflow $WORKFLOW does not exist"

# C1. Exactly one workflow calls actions/deploy-pages (single shared Pages deploy —
#     GitHub Pages keeps only the most recent deployment; two would clobber).
DEPLOY_WFS=$(grep -rlE 'actions/deploy-pages' .github/workflows 2>/dev/null || true)
DEPLOY_WF_COUNT=$(printf '%s\n' "$DEPLOY_WFS" | grep -c . || true)
[ "$DEPLOY_WF_COUNT" = "1" ] || fail "expected exactly ONE Pages-deploy workflow, found $DEPLOY_WF_COUNT: $DEPLOY_WFS"
ok "C1. exactly one Pages-deploy workflow (single shared deploy)"

# C2. The workflow must NOT DEPEND ON inputs the reset removed. Only executable lines
#     count — comment lines (YAML `#` and shell `#` inside run blocks) may legitimately
#     reference the removed routes to document the reset history, so they are stripped
#     before scanning. A removed input in an executable position is a broken dependency
#     (CON-04: make the deploy green WITHOUT the removed inputs).
declare -a REMOVED_INPUTS=(
  'scripts/verify-pages-deploy.sh'
  'web/foxglove'
  'web/cadence'
  'web/pricing'
  'web/tide-now-home'
  'web/dist'
  'web/dist-saltmarsh'
  'vite.saltmarsh.config.js'
  'web/package-lock.json'
)
NONCOMMENT="$(grep -vE '^[[:space:]]*#' "$WORKFLOW" || true)"
for r in "${REMOVED_INPUTS[@]}"; do
  if grep -qF -- "$r" <<< "$NONCOMMENT"; then
    fail "$WORKFLOW still DEPENDS ON removed input '$r' (reset deleted it — deploy would break)"
  fi
done
ok "C2. no executable dependency on any removed older-demo input"

# C3. The deploy stages the expenses route from the served source.
grep -qF -- 'web/expenses/index.html' "$WORKFLOW" \
  || fail "$WORKFLOW does not stage web/expenses/index.html into the deploy"
grep -qF -- '_pages/expenses' "$WORKFLOW" \
  || fail "$WORKFLOW does not publish the /expenses/ route (_pages/expenses)"
ok "C3. workflow stages web/expenses/index.html into _pages/expenses"

# C4. The post-deploy step content-verifies /expenses/ with a known string (not a bare 2xx).
grep -qF -- '/expenses/' "$WORKFLOW" \
  || fail "$WORKFLOW has no post-deploy check against the /expenses/ route"
grep -qF -- 'Spent this month' "$WORKFLOW" \
  || fail "$WORKFLOW post-deploy check does not assert deployed CONTENT ('Spent this month') — a bare 2xx is insufficient"
ok "C4. post-deploy step content-verifies /expenses/ (known string, not a bare 2xx)"

echo "OK: expense-tracker fidelity + pipeline topology verified"
