import React, { useState, useEffect } from 'react'
import { TideHero } from './components/TideHero.jsx'
import { CrossingCard } from './components/CrossingCard.jsx'
import { SavedWalks } from './components/SavedWalks.jsx'
import { useTideData } from './hooks/useTideData.js'
import { useSavedWalks } from './hooks/useSavedWalks.js'
import { FeedStatus } from './domain/tide-state.js'

function generateId() {
  const b = new Uint8Array(16)
  crypto.getRandomValues(b)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

function formatTime(date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function App() {
  const { reading, crossing, feedStatus, staleAge } = useTideData()
  const { walks, addWalk, removeWalk } = useSavedWalks()
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  const location = reading?.location ?? 'Holy Island Causeway'
  const isLive = feedStatus === FeedStatus.LIVE

  const handleAddWalk = () => {
    addWalk({
      id: generateId(),
      name: 'New Walk',
      when: 'Next safe crossing',
      status: crossing?.status ?? 'safe',
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="wordmark" aria-label="tide·now">
          tide<b>·</b>now
        </div>
        <div className="updated" aria-live="polite" aria-label={`Feed status: ${feedStatus}, last updated ${time}`}>
          <div className="live">
            <span className={`dot${isLive ? '' : ' dot--stale'}`} aria-hidden="true" />
            {isLive ? 'Live' : feedStatus === FeedStatus.LOADING ? 'Loading…' : 'Stale'}
          </div>
          <span className="num">{time}</span>
        </div>
      </header>

      <div className="location" aria-label={`Location: ${location}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.2-7-11A7 7 0 0 1 19 10c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {location}
      </div>

      <TideHero reading={reading} feedStatus={feedStatus} staleAge={staleAge} />

      {crossing && <CrossingCard crossing={crossing} feedStatus={feedStatus} />}

      <SavedWalks
        walks={walks}
        onAddWalk={handleAddWalk}
        onWalkClick={(walk) => removeWalk(walk.id)}
      />
    </div>
  )
}
