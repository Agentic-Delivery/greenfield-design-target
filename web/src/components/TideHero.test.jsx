import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TideHero } from './TideHero.jsx'

const liveReading = {
  heightMetres: 2.4,
  trend: 'rising',
  changeLastHour: '+0.8 m',
  highWaterTime: '14:32',
}

describe('TideHero — success / live state', () => {
  it('shows the tide height value', () => {
    render(<TideHero reading={liveReading} feedStatus="live" />)
    expect(screen.getByText('2.4')).toBeInTheDocument()
  })

  it('shows the unit "m"', () => {
    render(<TideHero reading={liveReading} feedStatus="live" />)
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('shows the trend word "Rising" (not just the icon)', () => {
    render(<TideHero reading={liveReading} feedStatus="live" />)
    expect(screen.getByText(/rising/i)).toBeInTheDocument()
  })

  it('shows the change in last hour', () => {
    render(<TideHero reading={liveReading} feedStatus="live" />)
    expect(screen.getByText('+0.8 m')).toBeInTheDocument()
  })

  it('shows the high water time', () => {
    render(<TideHero reading={liveReading} feedStatus="live" />)
    expect(screen.getByText('14:32')).toBeInTheDocument()
  })
})

describe('TideHero — loading state', () => {
  it('shows a loading indicator when feedStatus is loading', () => {
    render(<TideHero reading={null} feedStatus="loading" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('does not show a tide height value while loading', () => {
    render(<TideHero reading={null} feedStatus="loading" />)
    expect(screen.queryByText('m')).not.toBeInTheDocument()
  })
})

describe('TideHero — stale state', () => {
  it('shows the stale banner with age when feedStatus is stale', () => {
    render(<TideHero reading={liveReading} feedStatus="stale" staleAge="14m" />)
    expect(screen.getByText(/stale/i)).toBeInTheDocument()
    expect(screen.getByText(/14m/)).toBeInTheDocument()
  })

  it('still shows the last known height when stale (useful context for the walker)', () => {
    render(<TideHero reading={liveReading} feedStatus="stale" staleAge="14m" />)
    expect(screen.getByText('2.4')).toBeInTheDocument()
  })
})

describe('TideHero — error state (no reading at all)', () => {
  it('shows an error message when feedStatus is error and no reading', () => {
    render(<TideHero reading={null} feedStatus="error" />)
    expect(screen.getByText(/unavailable/i)).toBeInTheDocument()
  })
})
