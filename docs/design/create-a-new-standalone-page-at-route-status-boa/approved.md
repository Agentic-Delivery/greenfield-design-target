# Approved — /status-board

The customer approved the whole `/status-board` screen exactly as rendered on the canvas (a single-screen design).

## What was approved
A new standalone route at **`/status-board`** — a simple, clean status board showing **three demo service cards**, each with a service name and an **online/offline pill**:

- **API Gateway** — Online
- **Payments Service** — Online
- **Object Storage** — Offline

Plus a `status·board` header with an at-a-glance "2 online · 1 offline" summary.

## Key decisions made at the canvas
- **Inherits the existing product design system** (tide·now `tokens.css`) — Saira/Barlow type, warm amber accent, heavy editorial ink borders, flat paper surfaces. The route looks like it belongs to the product; no new design system introduced.
- **Status is icon + word + colour, never colour alone** — matches the app's existing accessibility rule; online = green check + "Online", offline = red ✕ + "Offline".
- **Mobile-first**, on the same centered column as the rest of the app; verified with no horizontal overflow across phone/tablet/desktop widths.
- **Isolated additive route** — new Vite entry (`web/status-board/index.html` → `src/status-board/main.jsx`), following the same multi-entry pattern as Saltmarsh. No existing files were modified.

## Quality read (advisory) — PASSED
Design-quality jury: clarity 5, visual hierarchy 4, accessibility 5, consistency 5. Every text/UI contrast clears WCAG 2.2 AA. Zero anti-slop hits. See `quality.json`.

## Verification
- **Build:** `npm run build` (vite build) — exit 0, 40 modules transformed.
- **Tests:** `npm test` (vitest run) — 115/115 pass (run with `NODE_ENV=test`; the stray `NODE_ENV=production` in the raw shell made React's production build throw in the test renderer — an environment artifact, not a code regression, not attributable to this additive change).

## Build acceptance criteria for the worker
- The three service names, their online/offline states, and the header summary are demo/hardcoded — implement as shown.
- Keep the route isolated and additive; do not modify existing tide·now files.
- If the production build must include `/status-board`, add it to the Vite entry inputs (the dev canvas served it automatically, but the default production build only includes `index.html`).
- The board is static today; the undesigned empty/loading/error states are only needed if/when it becomes data-driven (noted as follow-up, not part of this screen).

## Deliverable
Edits captured as `approved.patch` (four new files). Apply and productionise.
