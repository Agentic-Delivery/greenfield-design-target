# User stories

User stories for this repository's products. The `US-01-xx` block serves
**tide-now** (REQ-web-tide-home); the `US-02-xx` block serves **Foxglove Books**
(REQ-web-foxglove-storefront); the `US-03-xx` block serves **Saltmarsh**
(REQ-web-saltmarsh-hero); the `US-04-xx` block serves the **Expense tracker**
(REQ-web-expense-tracker).

## tide-now

| ID | Story | Traces to |
|---|---|---|
| US-01-01 | As a coastal walker, I open the tide-now app on my phone and see the current tide height and trend at a glance, so I know what the tide is doing right now. | REQ-web-tide-home (O1) |
| US-01-02 | As a coastal walker, I see whether the next crossing is safe — with its open window and closing countdown — so I can decide whether to cross. | REQ-web-tide-home (O1) |
| US-01-03 | As a coastal walker, I see my saved walks each with its own crossing status, so I can check the ones I care about. | REQ-web-tide-home (O1, O4) |
| US-01-04 | As a coastal walker, when the tide data is unavailable or out of date, I am clearly told it is stale and never shown a "safe to cross" as if it were current, so I am never misled into an unsafe crossing. | REQ-web-tide-home (O2, O3) |
| US-01-05 | As a coastal walker, I can open the app at a public URL on my phone, so the product is something I can actually use. | REQ-web-tide-home (O5) |

## Foxglove Books

| ID | Story | Traces to |
|---|---|---|
| US-02-01 | As a bookshop customer, I open the Foxglove Books storefront and browse the shop — the featured titles, the booksellers' picks, and this week's book — so I can see what the shop has, exactly as the approved design shows. | REQ-web-foxglove-storefront (O1) |
| US-02-02 | As a bookshop customer, I add a book to my basket and see the basket count update and a confirmation, and I can open the basket to see what's in it (or an empty-basket message before I've added anything). | REQ-web-foxglove-storefront (O2) |
| US-02-03 | As a bookshop customer, when a title is out of print I see its add control clearly disabled, so I'm not misled into trying to buy something unavailable. | REQ-web-foxglove-storefront (O3) |
| US-02-04 | As a bookshop customer, while content loads I see a loading state rather than a blank panel, and when something fails (an invalid newsletter email, a failed action) I get clear feedback rather than a silent failure. | REQ-web-foxglove-storefront (O4, O5) |
| US-02-05 | As a bookshop customer, I can open the storefront at a public URL in my browser, so the shop is something I can actually visit. | REQ-web-foxglove-storefront (O6) |

## Saltmarsh

| ID | Story | Traces to |
|---|---|---|
| US-03-01 | As a visitor to the Saltmarsh coffee roaster, I land on the hero and at a glance see a warm, crafted small-roaster page — the wordmark, the serif "Coffee roasted slowly, by the marsh" headline, the calm subhead, and the illustrated coffee-bag figure — exactly as the approved design shows. | REQ-web-saltmarsh-hero (O1) |
| US-03-02 | As a visitor, I see and can act on the one clear "Buy now" call-to-action — and if a real order destination isn't wired yet, it's an honestly-surfaced gap, not a silent dead link. | REQ-web-saltmarsh-hero (O3a, O3b) |
| US-03-03 | As a visitor on a phone or keyboard, the hero holds up at my screen size and the "Buy now" control has a clear focus indicator, a big-enough tap target, and readable text — so the page is comfortable to use, not just to look at. | REQ-web-saltmarsh-hero (O1, R2, R4) |
| US-03-04 | As the customer, I can open the Saltmarsh hero at its own public URL — and opening tide-now and Foxglove still shows their own screens, unchanged. | REQ-web-saltmarsh-hero (O2) |

## Expense tracker

| ID | Story | Traces to |
|---|---|---|
| US-04-01 | As a person tracking personal spending, I open the expense tracker at a public URL and see the approved main screen — my running monthly total, the add-expense form, and my Recent list — in the Marginalia look, exactly as approved. | REQ-web-expense-tracker (O1, O2) |
| US-04-02 | As a person tracking spending, I enter an amount, pick a category, and tap "Add expense," and the new expense appears in Recent under Today with my running total and budget bar updated immediately — all in the page, no login or server. | REQ-web-expense-tracker (O3) |
| US-04-03 | As a person tracking spending, the "Add expense" button stays disabled until I've entered a valid amount, and the empty, dark-mode, and reduced-motion states all behave as the approved screen shows. | REQ-web-expense-tracker (O4) |
| US-04-04 | As the customer, I can open the expense tracker at its own public URL on a page that reliably stays live — every merge re-publishes it through a deploy that verifies the real page content and fails loudly if it's broken. | REQ-web-expense-tracker (O5) |
