# Feature tree

The product feature map for this repository. It currently holds three distinct
products, each rooted at its own home/landing screen; later screens and
capabilities hang off each product's node.

- **tide-now** — mobile-first tide & safe-crossing app for outdoor coastal walkers
  - **Home screen** (first feature) → REQ-web-tide-home · design `docs/design/tide-now-home/`
    - current tide-height reading + trend badge
    - next-safe-crossing card (status: Safe / Closing / Closed)
    - saved-walks list (per-row crossing status)
    - states: success (designed), loading, error/stale, empty
    - delivery: CI/CD pipeline + staging → customer-viewable URL (path to running software)
  - _Future leaves (not yet requested): saved-walk detail/add flow, account & cross-device sync, additional screens._

- **Foxglove Books** — warm, literary storefront for a small independent neighbourhood bookshop
  - **Storefront home** (first feature) → REQ-web-foxglove-storefront · design `docs/design/foxglove-books-storefront/`
    - masthead (foxglove mark + nav + live basket count)
    - "This week we're reading" hero
    - "New & Notable" featured shelf (generative typeset covers — no stock imagery)
    - "What the booksellers love" staff-picks shelf (signed hand-written notes)
    - "This week's book" detail panel + Add to basket
    - monthly-letter sign-up + footer (hours/address)
    - states: success (designed), loading, error/feedback, disabled (out-of-print), empty (basket)
    - delivery: CI/CD pipeline + staging → customer-viewable URL (shared/reconciled with the tide-now bootstrap, see REQ BLAST RADIUS)
  - _Future leaves (not yet requested): book detail pages, search/catalogue browse, checkout & payment, account._

- **Saltmarsh** — warm, crafted landing page for a small-batch coffee roaster
  - **Landing-page hero** (first feature) → REQ-web-saltmarsh-hero · design `docs/design/saltmarsh-hero/`
    - slim masthead (Saltmarsh wordmark + clay dot)
    - warm cream copy card: clay eyebrow, Spectral serif headline, calm subhead, single "Buy now" CTA, reassurance line
    - product panel: illustrated kraft coffee-bag figure (inline SVG) + "Roasted this week" chip
    - states: success only — static marketing hero, no runtime data fetch (loading/empty/error N/A); CTA focus/hover states
    - delivery: own `/saltmarsh/` entry on the existing shared Pages deploy, alongside tide-now + Foxglove (both preserved live — see REQ R3)
  - _Future leaves (not yet requested): real "Buy now" order destination, product/shop pages, a real bag photo._
