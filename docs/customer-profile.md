# Customer profile

## Engagement level
**0 — Pure delivery.** The customer wants outcomes, not process. The factory
decides all process and structure choices (document structure, artifact count,
session path, framework/build choices, sequencing) and reports them in plain
language. Architecture and process decisions are NOT surfaced as questions
unless they materially change *what* the customer receives.

Captured from the operator's explicit instruction on 2026-06-17: *"Engagement is
pure-delivery (E0) — decide all process/structure choices yourself and just tell
me in prose."*


## Design capability

enabled

Whether this factory offers the design station — the live-preview design/brand canvas a customer uses to
shape a screen or establish a brand before any code is written. One of `enabled | disabled`. Default
`enabled` (opt-out): design is the standard capability, and an absent section / garbage value reads
`enabled` (fail-open). Set to `disabled` only for a headless factory that never wants a visual design
surface: that hides the Design and Brand entry choices, routes a blind New-Session send to planning, and
makes intake write any UI requirement as prose in the requirement rather than opening a design canvas. This
is the per-factory POSTURE toggle (does this factory offer design at all), distinct from the runtime
preview-container liveness (whether the preview is up right now).

> ⚠ Auto-added by factory-upgrade with the conservative default `enabled`. A factory that does not want a
> design station changes this single value to `disabled`.

## Domain expertise
Product-owner level for the product domain (knows what the app should do and
what the customer should see). Not asking to be involved in factory mechanics.

## Plain-language preference
High. Report what was done in outcome language, no spec-IDs in the central
framing — IDs live in evidence/traceability blocks.

## Change protocol
Standing GO given per-request when the operator says so. Do not wait for a
second confirmation when the operator has already said "this message is the GO".
