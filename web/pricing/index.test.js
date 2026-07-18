// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// The published /pricing/ screen is the approved greenfield Cadence pricing page,
// served verbatim as a self-contained static page (the same static-page precedent
// as /cadence/, tide-now-home, and Foxglove). This is the served artifact the deploy
// job stages to _pages/pricing/ — so these assertions guard the exact content +
// design tokens a user will see, and fail loud if a future change silently drifts the
// published screen from the approved bundle
// (docs/design/design-a-clean-pricing-page-for-cadence-the-focu/current/index.html).
const html = readFileSync(
  fileURLToPath(new URL('./index.html', import.meta.url)),
  'utf8',
)

describe('published /pricing/ screen (approved Cadence pricing page)', () => {
  it('is a self-contained mobile-first HTML document', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i)
    // mobile-first: the viewport meta the approved design ships with
    expect(html).toContain('width=device-width')
  })

  describe('AC-1 — every approved component renders its approved content', () => {
    it('nav: Cadence wordmark, light/dark toggle, and the "Start a session" CTA', () => {
      expect(html).toContain('>Cadence')
      expect(html).toContain('id="themeToggle"')
      expect(html).toContain('Start a session')
    })

    it('pricing hero: eyebrow + editorial headline "Pricing that keeps time with you."', () => {
      expect(html).toContain('Pricing that keeps time')
      expect(html).toContain('<em>with you</em>')
      // the small clay eyebrow, kept identical to the landing page eyebrow
      expect(html).toContain('class="eyebrow">Pricing')
    })

    it('billing toggle: a monthly/annual radiogroup with the honest saving note', () => {
      expect(html).toContain('role="radiogroup"')
      expect(html).toContain('data-period="monthly"')
      expect(html).toContain('data-period="annual"')
      expect(html).toContain('save ~2 months')
    })

    it('three tiers: Free, Focus ("Our pick"), and Team', () => {
      expect(html).toContain('>Free<')
      expect(html).toContain('>Focus<')
      expect(html).toContain('Our pick')
      expect(html).toContain('>Team<')
    })

    it('honest FAQ strip: no trial, cancel any time, price does not climb', () => {
      expect(html).toContain('Is there a trial to run out?')
      expect(html).toContain('Can I cancel?')
      expect(html).toContain('Will the price change later?')
    })

    it('footer: wordmark + copyright', () => {
      expect(html).toContain('© 2026 Cadence')
    })
  })

  describe('AC-2 — token fidelity to the approved design (token-identical to /cadence/)', () => {
    it('uses the OKLCH clay accent oklch(0.55 0.106 41) and the strong CTA clay oklch(0.470 0.094 40)', () => {
      expect(html).toContain('oklch(0.55 0.106 41)')
      expect(html).toContain('oklch(0.470 0.094 40)')
    })

    it('references the approved Newsreader (display) + Cabin (body) type pairing', () => {
      expect(html).toContain('Newsreader')
      expect(html).toContain('Cabin')
    })

    it('warm paper/ink neutrals — no pure #fff / #000', () => {
      expect(html).not.toMatch(/#fff\b/i)
      expect(html).not.toMatch(/#ffffff\b/i)
      expect(html).not.toMatch(/#000\b/i)
      expect(html).not.toMatch(/#000000\b/i)
    })
  })

  describe('AC-3 — the interactive controls are wired, not decorative', () => {
    it('the billing toggle carries per-period price + note data attributes it can swap', () => {
      // the two priced tiers whose amount changes monthly -> annual
      expect(html).toContain('data-monthly="$6" data-annual="$5"')
      expect(html).toContain('data-monthly="$9" data-annual="$7"')
      // per-period sub-notes the script swaps in
      expect(html).toContain('data-annual-sub')
    })

    it('wires the billing toggle in an in-page script that swaps amounts and notes', () => {
      expect(html).toContain("querySelectorAll('.segment__opt')")
      expect(html).toContain('.tier__amount')
      expect(html).toContain('data-annual')
    })

    it('ships the dark-mode token block and wires the theme toggle to flip data-mode', () => {
      expect(html).toContain('[data-mode="dark"]')
      expect(html).toContain("getElementById('themeToggle')")
      expect(html).toContain('data-mode')
    })
  })

  describe('Constraint — keyboard-operable controls with 44px tap targets on touch', () => {
    it('carries the touch-device 44px tap-target rule', () => {
      expect(html).toContain('pointer: coarse')
      expect(html).toContain('44px')
    })

    it('the billing toggle supports arrow-key navigation', () => {
      expect(html).toContain('ArrowRight')
      expect(html).toContain('ArrowLeft')
    })
  })

  describe('production cleanliness', () => {
    it('carries no design-editor source-path annotations', () => {
      expect(html).not.toContain('data-od-source-path')
    })
  })
})
