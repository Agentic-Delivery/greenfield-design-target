import React from 'react'
import { safeStatusForDisplay } from '../domain/tide-state.js'

const STATUS_CONFIG = {
  safe: {
    label: 'Safe to cross now',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    ),
  },
  closing: {
    label: 'Closing soon',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  closed: {
    label: 'Closed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    ),
  },
  unknown: {
    label: 'Status unknown',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
  },
}

/**
 * The "Next safe crossing" card.
 * Handles all three crossing statuses (safe / closing / closed) plus the
 * unknown state when the feed is stale (R3: icon + word + colour, never colour alone).
 */
export function CrossingCard({ crossing, feedStatus = 'live' }) {
  const displayStatus = safeStatusForDisplay({
    crossingStatus: crossing.status,
    feedStatus,
  })
  const config = STATUS_CONFIG[displayStatus] ?? STATUS_CONFIG.unknown

  return (
    <section className="crossing" aria-label="Next safe crossing">
      <div className={`badge ${displayStatus}`}>
        {config.icon}
        {config.label}
      </div>
      <div className="crossing-body">
        {crossing.windowLabel && (
          <>
            <div className="label">Open window</div>
            <div className="window-now">
              <span className="num">{crossing.windowLabel}</span>
              {crossing.closesIn && (
                <span className="closes">{crossing.closesIn}</span>
              )}
            </div>
          </>
        )}
        {crossing.nextWindow && (
          <div className="next-window">
            <div>
              <div className="label">Next window</div>
              <span className="num">{crossing.nextWindow}</span>
            </div>
            {crossing.nextWindowOpensIn && (
              <div style={{ textAlign: 'right' }}>
                <div className="label">Opens in</div>
                <span className="num">{crossing.nextWindowOpensIn}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
