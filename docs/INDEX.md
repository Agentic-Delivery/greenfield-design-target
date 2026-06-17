# Documentation Index — [Project Name]

> Guide to the `docs/` directory. Explains what each subdirectory contains, its naming convention, and which factory agents read from it.

---

## Directory Structure

| Directory | Purpose | Naming Convention | Used By |
|-----------|---------|-------------------|---------|
| `docs/architecture/adr/` | Architecture Decision Records — why a technical decision was made, alternatives, consequences. | `ADR-NNN-slug.md` | architecture-gate, intake-briefing |
| `docs/lessons-learned/` | Post-mortems — what went wrong, root cause, how to prevent recurrence. | `LESSON-NNN-slug.md` | intake-briefing |
| `docs/requirements/brds/` | Business Requirements Documents — high-level business goals and success criteria. | `BRD-slug.md` | intake-briefing, requirements-quality |
| `docs/requirements/actors/` | Actor definitions — who (human or system) interacts with the system. Single file, extended never forked. | `actors.md` | intake-briefing, issue-shaper |
| `docs/use-cases/` | Use Cases — Cockburn fully-dressed (actor, scope, level, preconditions, scenarios). | `UC-NNN-slug.md` | intake-briefing, requirements-quality |
| `docs/requirements/flows/` | User flow diagrams — actor + action + observable result, all scenarios. | `FLOW-domain-NNN.md` | intake-briefing, requirements-quality |
| `docs/requirements/cifs/` | Component Interaction Frameworks — signal chains between components. | `CIF-slug.md` | intake-briefing, requirements-quality |
| `docs/requirements/components/` | Component definitions — one file per component, responsibility + interface. | `component-name.md` | requirements-quality |
| `docs/requirements/req/` | Requirement specifications — testable behaviors, grouped by domain. | `REQ-slug.md` in `req/<domain>/` | issue-shaper, requirements-quality |
| `docs/operations/` | Operational Manual + procedures — levers, troubleshooting, deployment topology. | `manual.md` + per-topic files | worker (verification), environment-readiness |
| `docs/architecture/sad.md` | System Architecture Document — singular file. Layer model, invariants, deployment view. | Single file (never split) | architecture-gate |
| `docs/process/process-and-scenarios.md` | Factory Process-FLOW — intake/worker steps, scenarios, edge cases. | Single file | worker, intake |
| `docs/business/roadmap/` | Product roadmap and progress tracking. | Free-form `.md` files | intake-briefing |
| `docs/project-context.md` | Shared project knowledge — domain terms, constraints, lessons. | Single file | all agents |

## Key Files

| File | Purpose |
|------|---------|
| `docs/INDEX.md` | This file — directory guide |
| `docs/architecture/sad.md` | System Architecture Document — the shared architectural frame |
| `docs/operations/README.md` | Operational Manual — levers, procedures, troubleshooting |
| `docs/process/process-and-scenarios.md` | Factory process documentation |
| `docs/project-context.md` | Shared project context |
| `docs/requirements/meta/traceability-matrix.md` | Maps requirements → features → ADRs → code → tests |

## How Artifacts Relate

```
BRD (business value — WHY)
 └── UC (scenario — WHICH)
      └── FLOW (user journey — WHAT)
           └── CIF (component signal chain — HOW components collaborate)
                └── Component (one component — WHO)
                     └── REQ (testable behavior — SPEC)
                          └── ADR (architecture decision — WHICH trade-offs)
                               └── Operational Manual (how to operate — LIVE)
                                    └── Test (triggered + observed — PROOF)
```

Cross-cutting: **Actors** (registry of WHO is acting), **SAD** (shared architectural frame).

Every code change should be traceable upward through this chain.

---

**Template version:** 2.0
