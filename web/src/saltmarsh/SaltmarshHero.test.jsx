import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SaltmarshHero } from './SaltmarshHero.jsx'

// These tests assert the approved-design contract (REQ-web-saltmarsh-hero O1, O3a,
// O3b, R6, R7) through the rendered DOM — the component's primary port. They fail
// if an approved element is dropped or the single-primary-CTA / honest-placeholder /
// inline-figure contracts regress.

describe('SaltmarshHero — approved masthead (O1)', () => {
  it('renders the Saltmarsh wordmark', () => {
    render(<SaltmarshHero />)
    const banner = screen.getByRole('banner')
    expect(within(banner).getByText(/saltmarsh/i)).toBeInTheDocument()
  })
})

describe('SaltmarshHero — approved cream copy card (O1)', () => {
  it('shows the clay eyebrow', () => {
    render(<SaltmarshHero />)
    expect(screen.getByText(/small-batch coffee roasters/i)).toBeInTheDocument()
  })

  it('shows the Spectral headline with "by the marsh" emphasised in italic (em)', () => {
    render(<SaltmarshHero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/coffee roasted slowly, by the marsh\./i)
    // R4-iv: the emphasis word carries meaning by element/position (<em>), not hue alone.
    const em = heading.querySelector('em')
    expect(em).not.toBeNull()
    expect(em).toHaveTextContent(/by the marsh/i)
  })

  it('shows the calm subhead', () => {
    render(<SaltmarshHero />)
    expect(screen.getByText(/we roast in small batches the week you order/i)).toBeInTheDocument()
  })

  it('shows the quiet reassurance line', () => {
    render(<SaltmarshHero />)
    expect(screen.getByText(/roasted to order/i)).toBeInTheDocument()
    expect(screen.getByText(/free uk shipping over £30/i)).toBeInTheDocument()
  })
})

describe('SaltmarshHero — single primary CTA, honest destination (O3a, O3b, R6)', () => {
  it('renders exactly one "Buy now" primary action as a link', () => {
    render(<SaltmarshHero />)
    const ctas = screen.getAllByRole('link', { name: /buy now/i })
    expect(ctas).toHaveLength(1)
  })

  it('keeps the documented placeholder destination (#shop) — not a silent dead link', () => {
    // O3b: the build does NOT silently ship a fabricated order URL. Until the
    // customer supplies a real one, the CTA points at the documented #shop
    // placeholder and the gap is surfaced on the issue (needs-manual-steps).
    render(<SaltmarshHero />)
    const cta = screen.getByRole('link', { name: /buy now/i })
    expect(cta).toHaveAttribute('href', '#shop')
  })

  it('exposes no second primary action (YAGNI — no cart/checkout/catalogue)', () => {
    render(<SaltmarshHero />)
    expect(screen.queryByRole('link', { name: /add to (basket|cart)/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument()
  })
})

describe('SaltmarshHero — illustrated figure preserved (R7)', () => {
  it('renders the inline-SVG coffee-bag figure with an accessible label (no stock <img>)', () => {
    render(<SaltmarshHero />)
    const figure = screen.getByRole('img', { name: /bag of saltmarsh small-batch coffee/i })
    expect(figure.tagName.toLowerCase()).toBe('svg')
  })

  it('shows the "Roasted this week" tag chip', () => {
    render(<SaltmarshHero />)
    expect(screen.getByText(/roasted this week/i)).toBeInTheDocument()
  })

  it('does not use a network image (<img>) for the product figure', () => {
    const { container } = render(<SaltmarshHero />)
    expect(container.querySelector('img')).toBeNull()
  })
})
