// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// The published /tide-now-home/ screen is the approved greenfield BASE mockup,
// served verbatim as a self-contained static page (Foxglove static-page precedent).
// This is the served artifact the deploy job stages to _pages/tide-now-home/ — so
// these assertions guard the exact content + design tokens a user will see, and
// fail loud if a future change silently drifts the published screen from the
// approved base bundle (docs/design/tide-now-home/current/index.html).
const html = readFileSync(
  fileURLToPath(new URL('./index.html', import.meta.url)),
  'utf8',
)

describe('published tide-now-home screen (approved base design, success view)', () => {
  it('is a self-contained mobile-first HTML document', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i)
    // mobile-first: the viewport meta the approved design ships with
    expect(html).toContain('width=device-width')
  })

  describe('AC-1 — the four approved components render their approved content', () => {
    it('tide-height hero: heading, reading, trend, change + high water', () => {
      expect(html).toContain('Current tide height')
      expect(html).toContain('2.4')
      expect(html).toContain('Rising')
      expect(html).toContain('+0.8 m') // change · last hr
      expect(html).toContain('14:32') // high water
    })

    it('next-safe-crossing card: safe status + open window + next window', () => {
      expect(html).toContain('Safe to cross now')
      expect(html).toContain('Now → 11:50') // open window
      expect(html).toContain('22:14 → 02:38') // next window
    })

    it('saved-walks list: all three approved walks', () => {
      expect(html).toContain('Holy Island Causeway')
      expect(html).toContain('Cramond Island')
      expect(html).toContain("St Michael's Mount")
    })

    it('add-a-walk affordance is present', () => {
      expect(html).toContain('Add a walk')
    })
  })

  describe('R3 — every crossing status pairs a text word with its colour (never colour-only)', () => {
    it('each saved-walk status carries its word', () => {
      expect(html).toContain('>Safe<')
      expect(html).toContain('>Closing<')
      expect(html).toContain('>Closed<')
    })
  })

  describe('AC-2 — token fidelity to the approved BASE bundle (not the /tide-now/ refinement)', () => {
    it('uses the base hi-vis safety-orange accent token oklch(0.70 0.18 50)', () => {
      expect(html).toContain('oklch(0.70 0.18 50)')
    })

    it('does NOT ship the refined amber accent (that belongs to the /tide-now/ app)', () => {
      expect(html).not.toContain('oklch(0.71 0.135 62)')
    })

    it('references the approved Saira + Barlow type pairing', () => {
      expect(html).toContain('Saira')
      expect(html).toContain('Barlow')
    })
  })

  describe('production cleanliness', () => {
    it('carries no design-editor source-path annotations', () => {
      expect(html).not.toContain('data-od-source-path')
    })
  })
})
