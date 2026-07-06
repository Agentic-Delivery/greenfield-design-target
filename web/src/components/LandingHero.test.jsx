import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
