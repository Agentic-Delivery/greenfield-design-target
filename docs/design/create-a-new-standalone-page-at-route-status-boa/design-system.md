# Design system — /status-board

**Target platform:** Responsive web, mobile-first. Centered single column, `max-width: 480px` (→ `540px` ≥1024px), same layout shell as the existing tide·now screens. Verified at 320 / 375 / 390 (phone), 768 / 1024 (tablet), 1280 / 1440 / 1920 (desktop).

## Anchor — inherited from the existing product design system
This route matches the existing tide·now design system rather than introducing a new one. Tokens are inherited verbatim from `web/src/styles/tokens.css` (imported by `web/src/status-board/status-board.css`). No new tokens were added.

### Type
- **Display / labels / numerals:** `Saira` (600–800), uppercase labels with `letter-spacing`, tabular numerals for counts.
- **Body:** `Barlow` (400–700).
- Not reflex fonts — carried from the committed product system.

### Colour (OKLCH, inherited)
- `--paper` page, `--surface` card fill, `--ink` / `--ink-soft` text, `--line` / `--line-soft` borders.
- One accent: `--accent` / `--accent-ink` (warm amber, ~56% chroma) — used only on the wordmark dot (60-30-10 discipline).
- Functional status colours: `--safe` / `--safe-bg` (online), `--danger` / `--danger-bg` (offline). All text/UI pairs clear WCAG 2.2 AA (online pill 4.82:1, offline pill 5.12:1, card border 13.5:1, body 16.4:1).

### Components
- **Header** — `status·board` wordmark (Saira 800) + an at-a-glance `N online · N offline` summary with an `aria-label`.
- **Service card** — full-width row (`--surface`, 2.5px `--line` border, `--radius` 6px): service name (Saira 700) left, status pill right. `min-height: 60px`.
- **Status pill** — icon + word + colour, **never colour alone** (matches the app's crossing-status accessibility rule). Online = check + "Online" on `--safe`; Offline = ✕ + "Offline" on `--danger`. `role="status"`, per-service `aria-label`.

### States
Static demo board (hardcoded 3-service array, no data layer): success is the only reachable runtime state; empty / loading / error / disabled are N/A today. If this becomes data-driven, add designed empty ("no services yet"), loading (skeleton rows), and error ("couldn't reach the status feed — retry") states.

## Route mechanics
Multi-entry Vite pattern (mirrors `saltmarsh.html` → `src/saltmarsh/main.jsx`):
`web/status-board/index.html` (served at `/status-board/`) → `web/src/status-board/main.jsx` → `StatusBoard.jsx` + `status-board.css`. Fully isolated from the tide·now app — no existing files modified.
