# Approved design — /status-board

The customer approved a new standalone `/status-board` screen: a simple, clean status board on the existing tide·now design system, showing three demo service cards (API Gateway — Online, Payments Service — Online, Object Storage — Offline) under a `status·board` header with an at-a-glance "2 online · 1 offline" summary. Status is shown as icon + word + colour (never colour alone), it is mobile-first on the app's centered column, and the route is isolated and additive.

## Build target (brownfield)
This is a **brownfield** design. The build target is the approved diff `approved.patch` in this folder, applied onto the existing `vite` frontend (four new files, no existing files modified). See `approved.md` for the full approval note, key decisions, quality read, and the worker's build acceptance criteria. The design system it inherits is documented in `design-system.md`.

## Provenance
- Source design-id (deliverable): `dcf6f9c6-0ed0-4dac-86e0-0f212e925a15`
- Approved-at: 2026-07-11T09:28:42Z
- Primary artifact: `approved.patch` (per `artifact.json`, `mode: brownfield`, `targetFramework: vite`)
