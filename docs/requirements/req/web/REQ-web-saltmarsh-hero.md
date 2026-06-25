---
id: REQ-web-saltmarsh-hero
title: Saltmarsh coffee-roaster hero — built to the approved design, live at a customer-viewable URL
status: approved
version: 1.0
project-type: brownfield  # the approved design is a brownfield patch onto the existing Vite + React frontend (web/src/); artifact.json records mode: brownfield, targetFramework: vite
link-design: docs/design/saltmarsh-hero/ (approved 2026-06-25 — primaryArtifact: approved.patch; design-system.md is the binding visual contract)
link-brd: N/A — design-handoff value stream; the customer-approved design (jury PASSED-WITH-FINDINGS, locked in as-is) is the governing upstream spec
link-uc: N/A — single approved screen; the approved design + approved.md define the intended use
link-flow: N/A — single-screen static hero (success view) plus the focus/hover states of its one CTA; no runtime data fetch
link-adr: N/A — no new architectural decision; the frontend stack (Vite + React) was chosen at the tide-now v1.0 build and is reused. The multi-product Pages wiring already exists for tide-now + Foxglove; adding a third product entry follows that established pattern and is a worker build-time choice (LAW 5), constrained by R3 below
link-test: planned — (1) structural + token match of the built hero against approved.patch / design-system.md; (2) per-viewport structural pass conditions at ~390/~834/desktop (no horizontal overflow; single-column→two-column reflow at 860px; hierarchy preserved) per R2; (3) the four R4 accessibility checks, each independently — CTA focus ≥3:1, CTA touch target ≥44px, cream-card reassurance-line AA contrast measured on the live render, and no-colour-as-only-signal; (4) reachability of the public Saltmarsh URL at /saltmarsh/; (5) a regression check that the tide-now (/tide-now/) and Foxglove (/foxglove/) URLs still serve their own screens unchanged. Verified post-deploy by the delivery verifier.
---

## Context

The customer-facing product is **Saltmarsh**, a small-batch coffee roaster. A
landing-page **hero** has been designed on the live canvas in a *warm · crafted ·
calm* direction, **approved by the customer exactly as rendered** (a brownfield
live-edit — the customer approved the hero rendered live, not a description), and
**passed an independent design-quality read** (PASSED-WITH-FINDINGS; clarity 5,
hierarchy 5, accessibility 4, consistency 5; no anti-slop hits; mobile/tablet/
desktop all hold — the two raised items were addressed before sign-off).

The approved design is the spec. The worker builds to it — it does not re-design.
The approved diff, the design system, and the approval record live in the relocated
bundle at `docs/design/saltmarsh-hero/`:

- `approved.patch` — the brownfield diff a worker applies and productionises (the
  primary build artifact; `artifact.json` → `mode: brownfield`,
  `targetFramework: vite`, `primaryArtifact: approved.patch`). It adds
  `web/src/saltmarsh/SaltmarshHero.jsx` and `web/src/saltmarsh/saltmarsh.css`.
- `design-system.md` — the binding visual contract (OKLCH colour roles, the
  Spectral + Hanken Grotesk type pairing, spacing/radius tokens, the warm cream
  `--copy-card` token). Build to this file.
- `approved.md` — the approval record, design rationale, and the build-acceptance
  notes (carried into `handoff.md`).
- `quality.json` — the design-quality read and the build-time punch list.

This repository already ships two products to one unified GitHub Pages deploy —
tide-now at `/tide-now/` and Foxglove Books at `/foxglove/`. Saltmarsh is a third
product screen delivered the same way: built to its approved design and reachable
at its own public URL, **without disturbing the two products already live** (see
R3 and BLAST RADIUS).

## OUTCOME

A visitor opens the Saltmarsh landing page in a browser at a public URL and, at a
glance, sees a warm, crafted small-roaster hero exactly as the approved design
shows it — and can act on the one primary call-to-action.

- **O1 — Saltmarsh hero, approved success view.** The page renders matching the
  approved design: the slim masthead ("Saltmarsh" wordmark + clay dot); the warm
  cream copy card holding the clay eyebrow ("Small-batch coffee roasters"), the
  Spectral serif headline *"Coffee roasted slowly, by the marsh."* ("by the marsh"
  in warm italic), the calm subhead, the **single** primary CTA **"Buy now"**, and
  the quiet reassurance line ("Roasted to order · free UK shipping over £30"); and
  the product image area — the illustrated kraft coffee-bag figure (inline SVG) on
  a warm radial panel with the "Roasted this week" tag chip.
- **O2 — Live at a customer-viewable URL, alongside the existing products.** The
  built hero is deployed via the existing CI/CD pipeline and is reachable at its own
  public Pages subpath — **`/saltmarsh/`** on the shared deploy
  (`https://agentic-delivery.github.io/greenfield-design-target/saltmarsh/`), the
  sibling of the existing `/tide-now/` and `/foxglove/` paths — where the customer
  can open it in a browser and see the running hero. The tide-now and Foxglove URLs
  continue to serve their own screens unchanged.
- **O3a — The one primary action is present and operable.** "Buy now" is the
  single primary action, with a visible `:focus-visible` indicator and a hover
  state. (Always true and always testable, independent of where it points.)
- **O3b — The "Buy now" destination is honest, not a silent dead link.** The CTA
  ships pointing at the documented `href="#shop"` placeholder, and the absence of a
  real order/shop destination is recorded as a **named operator-supplied follow-up**
  (surfaced on the issue as a `needs-manual-steps` input the customer provides) —
  the build does NOT silently ship `#shop` as if it were a real order destination.
  When the customer later supplies the real URL, swapping the placeholder for it is
  a one-line change. (The real order destination is the one product input the
  approved design did not specify; no commerce flow is in scope — see R6.)

## RULES

- **R1 — Build to the approved design, no deviation.** The build MUST match the
  approved diff `docs/design/saltmarsh-hero/approved.patch` and
  `docs/design/saltmarsh-hero/design-system.md` in layout, OKLCH colour roles, the
  Spectral / Hanken Grotesk type pairing, the warm cream copy-card treatment, the
  60-30-10 clay-accent weight, and spacing. No visual deviation without a
  customer-approved design amendment. The worker does NOT invent its own UI. Light
  theme is the approved default.
- **R2 — Mobile-first; hold across viewports (concrete pass conditions).** The
  hero MUST hold up at mobile (~390px), tablet (~834px), and desktop. This bundle
  carries no per-viewport reference PNGs (and `quality.json.renderedOk` is `false` —
  `snapshot.png` is a 1×1 placeholder), so "holds" is verified against these
  concrete structural assertions rather than a pixel reference: (a) **no horizontal
  overflow / scrollbar** at any width; (b) the layout is **single-column on phones
  and reflows to two columns from 860px** (the breakpoint named in
  `design-system.md`); (c) the headline → CTA → reassurance hierarchy is preserved
  and nothing is clipped or overlapping. Visual confirmation of spacing/contrast is
  done against the **live render post-deploy** (the build should also capture a real
  snapshot to replace the 1×1 placeholder). Any failure of (a)–(c) is a defect that
  blocks close.
- **R3 — Own entry; the two live products MUST be preserved (the critical build
  constraint).** The approved patch points `web/src/main.jsx` at `SaltmarshHero`
  so the canvas could render it live; the tide-now app (`web/src/App.jsx`) is
  untouched on disk. The worker MUST wire Saltmarsh behind its **own entry / route
  and its own Pages subpath (`/saltmarsh/`)**, exactly as Foxglove sits alongside
  tide-now on the unified deploy. The worker MUST **NOT** ship the `main.jsx` mount
  swap as-is —
  that would replace the live tide-now app. After this work, the tide-now and
  Foxglove screens MUST remain reachable and unchanged at their existing URLs (this
  is verified as a regression check, see `link-test`).
- **R4 — Accessibility (WCAG 2.2 AA) — four checks, each independently verified.**
  (i) the "Buy now" CTA MUST have a visible `:focus-visible` indicator (≥ 2px,
  ≥ 3:1 contrast); (ii) the CTA MUST reach a ≥ 44px touch target on phones; (iii)
  the muted reassurance line on the cream copy card MUST meet AA contrast — the
  binding token is `--ink-soft: oklch(0.38 …)`, the value darkened at sign-off and
  now recorded in `design-system.md`, so R1 ("build to design-system.md") and this
  rule agree; because the design jury could NOT pixel-verify this on the cream card
  (`quality.json.renderedOk: false`), it MUST be contrast-verified against the live
  render post-deploy; (iv) no status/emphasis may rely on colour alone (the clay
  accent on the eyebrow/emphasis word MUST carry meaning by type/position too, not
  hue only).
- **R5 — Existing stack, no new architectural decision (LAW 5 already settled).**
  The frontend stack is Vite + React, chosen at the tide-now v1.0 build and reused
  here; this REQ introduces no new architectural decision. The mechanism for adding
  the third product entry to the build/deploy is the worker's build-time choice,
  bounded by R3.
- **R6 — One approved hero; no commerce backend in v1 (YAGNI).** Scope is this
  single approved hero screen. There is no checkout, payment, cart, catalogue, or
  account in scope — "Buy now" is a link to an order destination (R3/O3), not a
  commerce flow. Any such capability, if ever requested, is a separate value
  stream.
- **R7 — Illustrated figure preserved, no stock imagery.** The product image is the
  approved inline-SVG kraft coffee-bag illustration (always renders, no network
  dependency). The build MUST preserve this; it MUST NOT substitute stock or
  photographic imagery. (Swapping the figure for a real photo with proper `alt` is
  a later, separately-requested change.)

## BLAST RADIUS

- **Components:** the existing web frontend (`web/src/`, Vite + React) gains a new
  Saltmarsh hero entry; the existing unified GitHub Pages deploy gains a third
  product path. No new pipeline or hosting is required — the pipeline and staging
  already exist (tide-now #2 / #13, Foxglove #5).
- **Preservation (must not regress):** tide-now (`/tide-now/`) and Foxglove
  (`/foxglove/`) MUST remain live and unchanged. R3 forbids the `main.jsx` mount
  swap; the regression check in `link-test` confirms both existing URLs still serve
  their screens.
- **Operator one-time setup:** none new — the hosting target and deploy path
  already exist for this repository's Pages deploy.
- **Operational levers:** if the unified-deploy product set is recorded as an
  operational lever when it lands, add the Saltmarsh path traced to
  `req-id: REQ-web-saltmarsh-hero`.

## EXAMPLES

- **Happy path:** a visitor opens the Saltmarsh page on a phone; the masthead, the
  warm cream copy card with the Spectral headline, the "Buy now" CTA, and the
  illustrated coffee-bag figure with the "Roasted this week" chip render in the
  warm/crafted/calm look; tapping "Buy now" acts on the single primary action.
- **Live alongside siblings:** after merge, the customer opens the public Saltmarsh
  URL (`/saltmarsh/`) and sees the running hero — then opens the tide-now and
  Foxglove URLs and finds both still serving their own screens, unchanged.
- **CTA focus (R4-i):** a keyboard user tabs to "Buy now" and sees a clear, ≥ 3:1
  focus indicator before activating it.
- **CTA touch target (R4-ii):** on a phone, the "Buy now" control's hit area is
  ≥ 44px so it can be tapped reliably.
- **Cream-card contrast (R4-iii):** on the live render, the muted reassurance line
  ("Roasted to order · free UK shipping over £30") on the cream copy card is
  measured to clear AA contrast (this is the item the design jury flagged and could
  not verify without a render).
- **Colour-not-the-only-signal (R4-iv):** the clay eyebrow / emphasis word still
  reads as eyebrow/emphasis by its type and position when colour is removed.
- **Placeholder destination (decided):** because the approved design did not name a
  real order destination, "Buy now" ships pointing at the documented `#shop`
  placeholder and the issue carries a `needs-manual-steps` follow-up for the
  customer to supply the real order URL — the dead link is surfaced, not silently
  shipped as if real.
