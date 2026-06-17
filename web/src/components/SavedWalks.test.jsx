import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SavedWalks } from './SavedWalks.jsx'

const sampleWalks = [
  { id: '1', name: 'Holy Island Causeway', status: 'safe', when: 'Open · closes 11:50' },
  { id: '2', name: 'Cramond Island', status: 'closing', when: 'Closes soon · 11:05' },
  { id: '3', name: "St Michael's Mount", status: 'closed', when: 'Reopens 15:20' },
]

describe('SavedWalks — empty state (AC-4)', () => {
  it('shows "Add a walk" affordance when no walks are saved', () => {
    render(<SavedWalks walks={[]} onAddWalk={() => {}} />)
    expect(screen.getByRole('button', { name: /add a walk/i })).toBeInTheDocument()
  })

  it('does not show a blank gap — the empty state has content', () => {
    const { container } = render(<SavedWalks walks={[]} onAddWalk={() => {}} />)
    expect(container.firstChild).not.toBeEmptyDOMElement()
  })
})

describe('SavedWalks — populated state (AC-1: three statuses each as icon + word + colour)', () => {
  it('shows all three walk names', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    expect(screen.getByText('Holy Island Causeway')).toBeInTheDocument()
    expect(screen.getByText('Cramond Island')).toBeInTheDocument()
    expect(screen.getByText("St Michael's Mount")).toBeInTheDocument()
  })

  it('shows the word "Safe" as text (not just colour) for the safe walk', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    expect(screen.getByText('Safe')).toBeInTheDocument()
  })

  it('shows the word "Closing" as text for the closing walk', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    expect(screen.getByText('Closing')).toBeInTheDocument()
  })

  it('shows the word "Closed" as text for the closed walk', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })

  it('each walk row is a button (keyboard accessible, AC-9)', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    const walkButtons = screen.getAllByRole('button', { name: /causeway|cramond|michael/i })
    expect(walkButtons).toHaveLength(3)
  })

  it('still shows "Add a walk" button when walks are present', () => {
    render(<SavedWalks walks={sampleWalks} onAddWalk={() => {}} />)
    expect(screen.getByRole('button', { name: /add a walk/i })).toBeInTheDocument()
  })
})

describe('SavedWalks — keyboard accessibility (AC-9)', () => {
  it('calls onAddWalk when "Add a walk" is clicked', async () => {
    const user = userEvent.setup()
    let called = false
    render(<SavedWalks walks={[]} onAddWalk={() => { called = true }} />)
    await user.click(screen.getByRole('button', { name: /add a walk/i }))
    expect(called).toBe(true)
  })
})
