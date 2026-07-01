# Design handoff — Marginalia landing hero

The customer approved a landing screen — the **Marginalia landing hero** — exactly as it was
rendered on the design canvas, and the factory has saved it here so a builder can work from it.
It leads with the promise *"Keep your place, not your streak."*, one supporting line, one primary
action (*"Start your shelf"*), and a "Currently reading" list that leads on its honest empty state —
the first thing a brand-new reader actually sees. All five list states (empty, populated, loading,
sync-error-with-Retry, and the add control) are designed, it holds up on phone / tablet / desktop,
and it ships light by default with the brand's dark palette wired to the header toggle.

It is built on the customer's committed **Tessera** brand library at `docs/design/brand/` — the same
colours, type, and spacing — not a fork.

## Build target

- **Mode:** greenfield (a self-contained mockup — see `artifact.json`).
- **Primary artifact:** `current/index.html` — build the screen to match this.
- **Ships at:** `/marginalia/` as its own screen.
- **Brand:** inherits `docs/design/brand/` — every colour/size/radius/space reads a `var(--token)`;
  no hardcoded literals. Keep `--accent` / `--scale` / `--density` / `--motion-mult` / `data-mode`
  as the theming seam, and let `prefers-reduced-motion` disable the skeleton shimmer and transitions.

The full approval note (what was approved and why, the advisory quality read, and the one optional
non-blocking finding the customer chose to ship as-is) is in `approved.md`; the reusable spec is in
`design-system.md`; the machine-readable build target and per-viewport references are in
`DESIGN-MANIFEST.json` / `DESIGN-HANDOFF.md`.

## Provenance

- **Source design handoff id:** `a-design-excursion-was-requested-from-an-upstrea-fc4bb066`
- **Design session id:** `fc4bb066-af44-41e2-a6ec-2a88bbfc3cbd`
- **Originating deliverable:** `7ad608b8-e0d7-4db3-b2bf-270829cc8d16`
- **Approved at:** 2026-07-01T08:58:06Z
- **Design content hash (parentDesignSha):** `cd62b8706ea8b97dcd72ad62aee67ea978c3b7d86fe01812133a1449270df442`
- **Saved via:** automated screen save (`screen-auto-commit`)
