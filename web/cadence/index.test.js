// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// The published /cadence/ screen is the approved greenfield Cadence landing page,
// served verbatim as a self-contained static page (Foxglove / tide-now-home
// static-page precedent). This is the served artifact the deploy job stages to
// _pages/cadence/ — so these assertions guard the exact content + design tokens a
// user will see, and fail loud if a future change silently drifts the published
// screen from the approved bundle
// (docs/design/design-a-clean-modern-landing-page-for-a-focus-t/current/index.html).
const html = readFileSync(
  fileURLToPath(new URL('./index.html', import.meta.url)),
  'utf8',
)

describe('published /cadence/ screen (approved Cadence landing page)', () => {
  it('is a self-contained mobile-first HTML document', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i)
    // mobile-first: the viewport meta the approved design ships with
    expect(html).toContain('width=device-width')
  })

  describe('AC-1 — the four approved components render their approved content', () => {
    it('nav: Cadence wordmark, light/dark toggle, and the "Start a session" CTA', () => {
      expect(html).toContain('>Cadence')
      expect(html).toContain('id="themeToggle"')
      expect(html).toContain('Start a session')
    })

    it('hero: editorial headline "Find your cadence.", the focus-ring timer motif, and both CTAs', () => {
      expect(html).toContain('Find your')
      expect(html).toContain('<em>cadence</em>')
      expect(html).toContain('25:00')
      expect(html).toContain('Deep work')
      expect(html).toContain('See how it works')
    })

    it('features: all three anti-gamification cards', () => {
      expect(html).toContain('Sessions, not stopwatches')
      expect(html).toContain("Breaks you'll actually take")
      expect(html).toContain('A record of quiet hours')
    })

    it('footer: wordmark + copyright', () => {
      expect(html).toContain('© 2026 Cadence')
    })
  })

  describe('AC-2 — token fidelity to the approved design (Marginalia brand, carried into the mockup)', () => {
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

  describe('AC-3 — the dark theme is real (wired), not decorative', () => {
    it('ships the dark-mode token block keyed on [data-mode="dark"]', () => {
      expect(html).toContain('[data-mode="dark"]')
    })

    it('wires the toggle to flip data-mode in an in-page script', () => {
      expect(html).toContain("getElementById('themeToggle')")
      expect(html).toContain('data-mode')
    })
  })

  describe('Constraint — the post-approval 44px tap-target accessibility fix is kept', () => {
    it('carries the touch-device 44px tap-target rule', () => {
      expect(html).toContain('pointer: coarse')
      expect(html).toContain('44px')
    })
  })

  describe('production cleanliness', () => {
    it('carries no design-editor source-path annotations', () => {
      expect(html).not.toContain('data-od-source-path')
    })
  })
})
