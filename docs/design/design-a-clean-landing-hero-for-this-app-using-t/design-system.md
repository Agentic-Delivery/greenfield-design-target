# Design system — applied to the tide·now landing hero

**Anchor:** the committed **Marginalia** brand library at `docs/design/brand/` (`design-system.md` + `tokens.json`). This screen inherits it; it does not define a new system. The token contract used by the hero is mirrored into `web/src/styles/marginalia.css` as live-tunable CSS custom properties.

**Target platform:** responsive web, mobile-first. **Theme:** light primary, with a real dark slot-alias (`html[data-mode="dark"]`). **Colour space:** OKLCH throughout.

## Tokens applied (from Marginalia)

- **Accent:** one clay family — `--color-accent` `oklch(0.55 0.106 41)`, action `--color-accent-strong` clay-700, soft clay-100. Carried at ~10% visual weight (60-30-10). Chroma ≤ 0.106 — well under 80% saturation.
- **Neutrals:** warm paper ground (`--color-bg` paper-50, `--color-surface` paper-100) and ink text (`--text-heading` ink-900 ~14:1, `--text-body` ink-700 ~10:1, `--text-muted` ink-600), all tinted to the clay hue (~42–60) at near-zero chroma. No pure `#000`/`#fff`.
- **Type:** display/headings **Newsreader** (editorial serif, incl. italic accent); interface/body **Cabin** (humanist sans). Modular scale ratio 1.25 (`--step-0`…`--step-5`).
- **Space/radius:** `--space-3`…`--space-6`, `--radius-md` 9px.

## Live-tunable hooks (tweaks panel)

`--accent`, `--scale`, `--density`, `--motion-mult`, and `data-mode` — all wired so the canvas tweaks panel and device/theme toggles move the hero live. `main.jsx` imports `app.css` before `marginalia.css` so the Marginalia `:root` tokens win on the landing screen while sharing hook names with the tide app.

## Motion & accessibility

Transitions animate `transform`/`background` only, custom ease-out (`cubic-bezier(0.22,1,0.36,1)`), ~180ms scaled by `--motion-mult`; fully disabled under `prefers-reduced-motion`. Visible 2px clay focus ring on the CTA; target ≥ 48px; status/meaning never on colour alone.

## Files that realise the design (brownfield)

- `web/src/components/LandingHero.jsx` — the hero markup.
- `web/src/styles/marginalia.css` — Marginalia token contract + hero styles.
- `web/src/main.jsx` — mounts the hero ahead of `<App/>`; CTA enters the tide app.
- `web/index.html` — loads Newsreader + Cabin.
