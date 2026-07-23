# Async-states design spec — Expense tracker main screen (design-first)

**Status: DESIGNED, PENDING a live data layer.** This is the design deliverable for the
second deferred finding on the approved expense-tracker main screen (issue #54). It is a
**design-first** specification: it describes the loading / pending / error states the
screen will need **once it is connected to a real persisted or fetched data source**.

**It is intentionally not implemented in `web/expenses/index.html` today.** The current
screen is synchronous and client-side only (seeded demo data, no backend — see
`docs/operations/expense-tracker-manual.md`). None of these states can be *entered* until a
live data layer exists, so building them now would be dead code with no trigger. Per the
issue Constraints, **no backend is introduced by this item.** When a live data layer is
introduced (a separate, separately-requested piece of work), the worker who builds it
implements the three states below and wires each to the corresponding real event.

Anchored to the committed **Marginalia** brand: use the existing tokens already defined in
`web/expenses/index.html` (`--color-surface`, `--border`, `--color-accent-strong`,
`--signal-error`, `--text-caption`, `--radius-*`, `--space-*`, `--motion-mult`). No new
brand tokens are introduced. All three states honour `prefers-reduced-motion` (the screen
already removes every transition under that query).

Craft floors this spec is built to (the single canonical owners): five-state coverage and
mobile-first responsiveness (`craft-state-coverage`), on-blur validation + inline-adjacent
errors (`craft-form-validation` FORM-1/FORM-2), honest submit state
(`craft-motion` MOTION-2), and the WCAG 2.2 AA baseline — `aria-busy`, `role="alert"`,
focus-to-first-error, contrast (`craft-accessibility`).

---

## Surface 1 — Recent list: **loading** state

**Trigger (future):** the Recent list (`#list-today` and the day groups under
`section.recent`) is awaiting the first fetch of persisted expenses.

**Design:**
- Replace the populated rows with **3–4 skeleton rows** that match the real row geometry
  (a 40px circular avatar block + two stacked text bars for name and `category · time` +
  a right-aligned amount bar). Each skeleton block is `--color-surface-2` on the
  `--color-surface`/`--color-bg` background — a quiet placeholder, not a spinner.
- A gentle shimmer using **opacity only** (a 1.4s ease-in-out pulse between ~0.5 and ~1.0
  opacity), scaled by `--motion-mult`, and **fully removed** under
  `prefers-reduced-motion` (a static muted skeleton, no pulse).
- The `section.recent` region carries **`aria-busy="true"`** while loading; a visually
  hidden "Loading recent expenses…" is exposed to assistive tech (reuse the existing
  `.sr-only` helper).
- The running-total hero (`section.total`) shows its own quiet loading treatment (the
  amount rendered as a skeleton bar of the same width), so the whole screen reads as
  "loading" coherently rather than a half-populated page.
- **Empty vs loading are distinct:** loading shows skeletons; the existing designed empty
  state ("Nothing logged yet") is shown only after the fetch resolves with zero rows —
  never show the empty state while a fetch is still in flight.

## Surface 2 — "Add expense" action: **pending** state

**Trigger (future):** the user submits a valid expense (`#expense-form` submit) and the
write to the live data source is in flight.

**Design (honest submit state — MOTION-2):**
- On submit, the primary button (`#submit`) stays the same size and **keeps a readable
  label** — it changes from "Add expense" to **"Adding…"**; it does **not** collapse to a
  bare spinner that removes the label (that loses context). An optional small inline
  spinner may sit beside the label (opacity/transform animation only, `--motion-mult`
  scaled, removed under reduced-motion).
- The button is set **`aria-busy="true"`** and disabled for the duration of the request
  **only** — it is not disabled speculatively before the request starts.
- On success: the new row is inserted under **Today** (the existing success interaction),
  the total + budget bar update, the amount field clears and returns focus to the amount
  input for fast repeat entry, and the button label returns to "Add expense".
- The amount field and category chips are non-interactive (visually calm, not jarringly
  greyed) while the write is pending, so a double-submit cannot race.

## Surface 3 — Amount rejected: **inline error + recovery**

**Trigger (future):** the live data layer rejects the submitted amount (e.g. server-side
validation — over a per-expense cap, a currency/precision rule, or a transient write
failure). Note the current client-side rule (submit disabled until a positive amount)
stays; this state is for a rejection the client could not pre-empt.

**Design (FORM-1 / FORM-2 / accessibility):**
- The error message appears **inline, immediately below the amount field** (`#amount`),
  bound to it via `aria-describedby`, with **`role="alert"`** so assistive tech announces
  it. It is **not** a top-of-form summary and **not** a toast that vanishes.
- The message **names the problem and the fix in plain language**, e.g. *"That amount
  couldn't be saved — it's above the $10,000 per-expense limit. Enter a smaller amount."*
  or, for a transient failure, *"Couldn't save just now — check your connection and try
  again."* (Copy tone follows `craft-copy`.)
- The field is marked by **more than colour**: the `.amount-input` border uses
  `--signal-error` **plus** a small error icon **plus** the adjacent message text — never
  colour alone (colour-blind safe). Verify the error border/text clears the 3:1
  UI-component / 4.5:1 text contrast floors against `--color-bg`.
- **Recovery path:** focus moves to the amount field, its value is preserved (never
  cleared on error — the user does not retype), and correcting the amount **re-validates
  on input to clear the error** the instant it is fixed (FORM-1 encouragement rule). For a
  transient failure, the primary action offers a direct **"Try again"** re-submit without
  re-entering data.
- The error state is removed the moment the field is corrected or the retry succeeds.

---

## Verification when this is built (future work)

When the live data layer lands, each state above becomes a deployed-surface acceptance
criterion verified through the real consumer path: drive a slow/failed fetch and observe
the Recent skeletons + `aria-busy`; submit and observe the "Adding…" pending button;
force a rejected amount and observe the inline `role="alert"` error, the preserved value,
and the re-validate-to-clear recovery. Until then, this finding is **recorded and pending**
— not silently dropped, and not built as dead code.
