# Saltmarsh hero — design handoff (intake → worker)

The customer approved a **landing-page hero for Saltmarsh, a small-batch coffee
roaster**, live on the design canvas (they approved it as rendered, not as a
description). Personality: *warm · crafted · calm*. Single screen, responsive web,
light theme.

## What was approved
A warm cream "copy card" holding a clay eyebrow ("Small-batch coffee roasters"),
a confident Spectral serif headline — *"Coffee roasted slowly, by the marsh."* —
a calm subhead, **one** primary call-to-action **"Buy now"**, and a quiet
reassurance line ("Roasted to order · free UK shipping over £30"); alongside it an
illustrated kraft coffee-bag figure (inline SVG, theme-aware) on a warm radial
panel with a "Roasted this week" tag chip. One clay accent carried at ~10% weight
(60-30-10), OKLCH tokens, Spectral (display) + Hanken Grotesk (body).

Independent design-quality read: **PASSED-WITH-FINDINGS** (clarity 5, hierarchy 5,
accessibility 4, consistency 5; no anti-slop hits; mobile/tablet/desktop all hold).
The two raised items were addressed before sign-off (muted-text token darkened for
a comfortable AA margin on the cream card; design record aligned to the "Buy now"
label).

## Build target — this is a BROWNFIELD handoff
- **Primary artifact:** `approved.patch` (NOT an `index.html` — there is none).
  `artifact.json` → `mode: brownfield`, `targetFramework: vite`,
  `primaryArtifact: approved.patch`.
- The patch applies onto the existing **Vite + React** frontend (`web/src/`) and
  adds `web/src/saltmarsh/SaltmarshHero.jsx` + `web/src/saltmarsh/saltmarsh.css`.
- `design-system.md` is the binding visual contract (OKLCH colour roles, the
  Spectral/Hanken Grotesk pairing, spacing/radius tokens).

## Critical build note (carried verbatim from the approval record)
The patch also points `web/src/main.jsx` at `SaltmarshHero` so the canvas could
render it live. **The tide-now app (`web/src/App.jsx`) is untouched on disk.** The
worker MUST wire Saltmarsh behind its **own entry / route**, exactly as the
Foxglove storefront sits alongside tide-now on the shared Pages deploy — it MUST
**not** ship the `main.jsx` mount swap as-is, which would replace the live tide-now
app. The "Buy now" CTA uses placeholder `href="#shop"` and must be wired to the
real order destination (or kept as the documented placeholder if no destination
exists yet).

## Provenance
- Source design session: `53966823-8fc2-409d-9eab-54e82655816e`
- Approved at: 2026-06-25T09:58:13Z
- Parent design SHA: `df7868f182cdb5686e3f45bdaa7c5d4c228990855713b243fa7af667df85132f`
- No customer annotations were drawn (`annotations.json` → `marks: []`).
- `snapshot.png` is a 1×1 placeholder — the build should capture a real render so
  the next review can confirm rendered contrast/spacing visually.
