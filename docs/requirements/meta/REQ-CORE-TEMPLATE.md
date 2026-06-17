# REQ-[slug] — [Short Requirement Name]

> SRS requirement in CORE format (v1.4.1). Every requirement MUST have exactly eight sections — including the ISO 29148 Quality Gate. All eight are required.
> Replace all `[bracketed]` placeholders before submitting for review. Use lowercase-hyphenated slugs for all IDs (e.g. `REQ-web-file-viewer`, not `REQ-001`).

---

## CONTEXT

_Why does this requirement exist? What pain or opportunity drives it? What happens if we skip it?_

[Describe the problem or opportunity this requirement addresses. Link to the relevant business requirement.]

**Traces to:** BRD-[NNN]
**Glossary terms used:** TERM-[NNN]
**Assumptions:** ASM-[NNN]
**Constraints:** CON-[NNN]

---

## OUTCOME

_What measurable state exists when this requirement is fulfilled? Never use "the system shall be able to" — describe the observable result._

[Describe the specific, measurable outcome. Use concrete metrics where possible.]

---

## RULES

_Absolute constraints, NFR thresholds, and invariants that must hold._

- [Rule 1: e.g., Response time < 200ms at p95]
- [Rule 2: e.g., Must work offline — no network dependency]
- [Rule 3: e.g., Data retention: 90 days minimum]

---

## EXAMPLES

_Three mandatory scenarios: happy path, edge case, and failure mode. All three are required — the failure mode is blocking._

### Happy Path [type: NEW | BASELINE]

- **GIVEN** [precondition]
- **WHEN** [action]
- **THEN** [expected outcome]

### Edge Case [type: NEW | BASELINE]

- **GIVEN** [unusual but valid precondition]
- **WHEN** [action under edge conditions]
- **THEN** [expected outcome — system handles gracefully]

### Failure Mode [type: NEW | BASELINE]

> This failure mode stub is mandatory. It cannot be deleted without being noticed during review.
> Replace `[failure condition]` with the actual failure scenario.

- **GIVEN** [failure condition]
- **WHEN** [the system encounters this failure]
- **THEN** [the system degrades gracefully / alerts / recovers — describe expected behavior]
- **AND** [no data is lost / user is informed / fallback activates]

---

## BLAST RADIUS

_What does this requirement affect? Who needs to know if it changes?_

| Impact | Components |
|--------|-----------|
| **Directly affects** | [List components, services, or modules directly impacted] |
| **Indirectly affects** | [List downstream consumers, integrations, or dependent features] |
| **Third-party dependencies** | [External services/APIs affected — include fallback strategy] |
| **Requires escalation if** | [Conditions that require human decision — e.g., "changes affect >3 other REQs"] |

---

## USER FLOW COVERAGE
<!-- CORE section 6 of 8 — MANDATORY -->
<!-- Which user flows in the value stream does this requirement enable? -->
<!-- A requirement with no flow coverage is a feature without a purpose. -->

| Flow ID | Flow Name | Step | Coverage | Notes |
|---------|-----------|------|----------|-------|
| FLOW-[NNN] | [flow name] | STEP-[N] | YES / PARTIAL / NO | [why, or what's missing] |

<!-- Add one row per affected user flow. -->
<!-- If coverage is NO for all rows: escalate to Intake before -->
<!-- creating implementation issues — this requirement may not -->
<!-- belong in the current scope. -->

---

## ISO 29148 QUALITY GATE
<!-- CORE section 7 of 8 — MANDATORY. Complete before transitioning from DRAFT to REVIEW. All 9 boxes must be checked. -->

- [ ] Necessary — removing it would leave a genuine gap
- [ ] Appropriate — correct abstraction level, no implementation prescription
- [ ] Unambiguous — only one possible interpretation
- [ ] Complete — all conditions, inputs, outputs, boundaries stated
- [ ] Singular — exactly one testable condition (no compound "and")
- [ ] Feasible — achievable within declared constraints
- [ ] Verifiable — verification-method declared, binary pass/fail possible
- [ ] Correct — cause-effect relationships accurately described
- [ ] Conforming — follows CORE format, uses only Glossary-defined terms

---

## METADATA

```yaml
req-id: REQ-[slug]           # Must match filename
status: draft                 # draft → review → approved → implemented → verified
version: 1.0
owner: [agent-role]
priority: must|should|could|won't
stability: stable|volatile    # NOT tbd for APPROVED
testability: AUTO|MANUAL|HYBRID|EXPLORATORY
verification-method: TEST|DEMONSTRATION|INSPECTION|ANALYSIS|HYBRID
test-owner: QA Agent | Developer Agent
link-brd: BRD-[NNN]          # Must exist in repo, must be semantically relevant
link-flow: FLOW-[NNN]        # STEP-ID goes in USER FLOW COVERAGE table, not here
link-adr: ADR-[NNN]|N/A
link-test: [path/to/test]|N/A  # File path to test, not a TEST-ID
link-domain: ENT-[NNN]|N/A
assumptions: [inline or ASM-IDs]
constraints: [inline or CON-IDs]
environment: all
project-type: greenfield|brownfield|replatforming
baseline-ref: FLOW-AS-IS-[NNN]|N/A  # Required for brownfield/replatforming
parity-ref: FP-[NNN]|N/A            # Required for replatforming only
migration-strategy: BIG_BANG|LAZY|PHASED|SYNC|N/A
```

---

**Template version:** 1.5.0
**Last updated:** 2026-03-31
