import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { LandingHero } from './LandingHero.jsx'

// Issue #35 — the approved Marginalia landing hero that fronts the tide-now app.
// These guard the DoD-observable content and the single-CTA enter-flow so the
// approved design cannot silently drift or lose its one primary action.

describe('LandingHero — approved content (AC-2)', () => {
  it('renders the tide·now masthead', () => {
    render(<LandingHero onEnter={() => {}} />)
    expect(screen.getByLabelText('tide·now')).toBeInTheDocument()
  })

  it('renders the "Holy Island Causeway" eyebrow', () => {
    render(<LandingHero onEnter={() => {}} />)
    expect(screen.getByText('Holy Island Causeway')).toBeInTheDocument()
  })

  it('renders the approved headline "Cross when the tide lets you." as the single h1', () => {
    render(<LandingHero onEnter={() => {}} />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    // nbsp between "lets" and "you" in the accent span → normalise whitespace.
    expect(headings[0].textContent.replace(/ /g, ' ')).toMatch(
      /Cross when the tide lets you\./,
    )
  })

  it('carries the single clay italic accent on "lets you" (an <em> inside the headline)', () => {
    render(<LandingHero onEnter={() => {}} />)
    const heading = screen.getByRole('heading', { level: 1 })
    const accent = heading.querySelector('em')
    expect(accent).not.toBeNull()
    expect(accent.textContent.replace(/ /g, ' ')).toMatch(/lets you/)
  })

  it('renders the one supporting line', () => {
    render(<LandingHero onEnter={() => {}} />)
    expect(
      screen.getByText(/Live tide readings for the Holy Island crossing/i),
    ).toBeInTheDocument()
  })

  it('renders the grounding footnote', () => {
    render(<LandingHero onEnter={() => {}} />)
    expect(screen.getByText(/Updated from the live tide feed/i)).toBeInTheDocument()
  })
})

describe('LandingHero — single primary action (AC-3)', () => {
  it('exposes exactly one button, the "Check today’s crossing" CTA', () => {
    render(<LandingHero onEnter={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveAccessibleName(/Check today.s crossing/i)
  })

  it('invokes onEnter when the CTA is activated (enters the tide app)', async () => {
    const onEnter = vi.fn()
    const user = userEvent.setup()
    render(<LandingHero onEnter={onEnter} />)
    await user.click(screen.getByRole('button', { name: /Check today.s crossing/i }))
    expect(onEnter).toHaveBeenCalledTimes(1)
  })

  it('does NOT invoke onEnter on initial render (no accidental auto-entry)', () => {
    const onEnter = vi.fn()
    render(<LandingHero onEnter={onEnter} />)
    expect(onEnter).not.toHaveBeenCalled()
  })
})

// Regression guard (issue #35): the hero mounts ahead of the tide app and the two
// stylesheets (tokens.css + marginalia.css) both stay loaded for the page lifetime.
// tokens.css and marginalia.css both define --accent. If marginalia declared it at
// global :root and loaded last, its clay would permanently override the tide app's
// own amber document-wide — regressing TideHero's .trend badge once <App/> mounts.
// The Marginalia tokens MUST be scoped to .mg-hero. These tests load the real CSS
// files in main.jsx's source order and prove the leak does not happen — both sides:
// :root keeps the tide amber, and the hero root carries the Marginalia clay.
describe('LandingHero — Marginalia tokens are scoped, no leak into the tide app (#35)', () => {
  const stylesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../styles')
  const tokensCss = readFileSync(resolve(stylesDir, 'tokens.css'), 'utf8')
  const marginaliaCss = readFileSync(resolve(stylesDir, 'marginalia.css'), 'utf8')

  beforeEach(() => {
    // Source order matches main.jsx: app.css (→ tokens.css) first, marginalia.css last.
    for (const css of [tokensCss, marginaliaCss]) {
      const style = document.createElement('style')
      style.textContent = css
      document.head.appendChild(style)
    }
  })

  afterEach(() => {
    document.head.querySelectorAll('style').forEach((s) => s.remove())
  })

  it('keeps the tide app amber --accent on :root — Marginalia clay does NOT win globally', () => {
    render(<LandingHero onEnter={() => {}} />)
    const rootAccent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    // The tide app's own amber (tokens.css), never the Marginalia clay oklch(0.55 0.106 41).
    expect(rootAccent).toBe('oklch(0.71 0.135 62)')
  })

  it('applies the Marginalia clay --accent scoped to the hero root (.mg-hero)', () => {
    const { container } = render(<LandingHero onEnter={() => {}} />)
    const hero = container.querySelector('.mg-hero')
    const heroAccent = getComputedStyle(hero).getPropertyValue('--accent').trim()
    expect(heroAccent).toBe('oklch(0.55 0.106 41)')
  })
})
