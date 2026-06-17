import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CrossingCard } from './CrossingCard.jsx'

const safeCrossing = {
  status: 'safe',
  windowLabel: 'Now → 11:50',
  closesIn: 'Closes 1h 08m',
  nextWindow: '22:14 → 02:38',
  nextWindowOpensIn: '11h 32m',
}

const closingCrossing = {
  status: 'closing',
  windowLabel: 'Now → 11:05',
  closesIn: 'Closes 12m',
  nextWindow: '22:14 → 02:38',
  nextWindowOpensIn: '11h 44m',
}

const closedCrossing = {
  status: 'closed',
  windowLabel: null,
  closesIn: null,
  nextWindow: '15:20 → 19:40',
  nextWindowOpensIn: '3h 22m',
}

describe('CrossingCard — safe status (R3: icon + word + colour — never colour alone)', () => {
  it('shows the status word "Safe" as text (not just colour)', () => {
    render(<CrossingCard crossing={safeCrossing} />)
    expect(screen.getByText(/safe/i)).toBeInTheDocument()
  })

  it('shows the open window label', () => {
    render(<CrossingCard crossing={safeCrossing} />)
    expect(screen.getByText(/Now → 11:50/)).toBeInTheDocument()
  })

  it('shows the closing countdown', () => {
    render(<CrossingCard crossing={safeCrossing} />)
    expect(screen.getByText(/Closes 1h 08m/)).toBeInTheDocument()
  })

  it('shows the next window', () => {
    render(<CrossingCard crossing={safeCrossing} />)
    expect(screen.getByText(/22:14/)).toBeInTheDocument()
  })
})

describe('CrossingCard — closing status', () => {
  it('shows the status word "Closing" as text', () => {
    render(<CrossingCard crossing={closingCrossing} />)
    expect(screen.getByText(/closing/i)).toBeInTheDocument()
  })
})

describe('CrossingCard — closed status', () => {
  it('shows the status word "Closed" as text', () => {
    render(<CrossingCard crossing={closedCrossing} />)
    expect(screen.getByText(/closed/i)).toBeInTheDocument()
  })

  it('shows the next window when currently closed', () => {
    render(<CrossingCard crossing={closedCrossing} />)
    expect(screen.getByText(/15:20/)).toBeInTheDocument()
  })
})

describe('CrossingCard — stale feed suppression (safety rule)', () => {
  it('does not show safe status when feedStatus is stale', () => {
    render(<CrossingCard crossing={safeCrossing} feedStatus="stale" />)
    // "Safe to cross now" should NOT appear
    expect(screen.queryByText(/safe to cross now/i)).not.toBeInTheDocument()
  })
})
