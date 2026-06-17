import React from 'react'
import { FeedStatus } from '../domain/tide-state.js'

const TREND_ICONS = {
  rising: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
    </svg>
  ),
  falling: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
    </svg>
  ),
}

/**
 * Displays the current tide height, trend, and sub-stats.
 * Handles four states: live, loading, stale (with last known reading), error (no reading).
 */
export function TideHero({ reading, feedStatus, staleAge }) {
  if (feedStatus === FeedStatus.LOADING) {
    return (
      <section className="hero" aria-label="Current tide height">
        <div className="label">Current tide height</div>
        <div className="loading-skeleton" role="status" aria-label="Loading tide data">
          <div className="skeleton-line" style={{ height: 80, width: '60%' }} />
          <div className="skeleton-line" style={{ height: 36, width: '40%' }} />
          <div className="skeleton-line" style={{ height: 24, width: '80%', marginTop: 8 }} />
        </div>
      </section>
    )
  }

  if (feedStatus === FeedStatus.ERROR && !reading) {
    return (
      <section className="hero" aria-label="Current tide height">
        <div className="label">Current tide height</div>
        <div className="error-state">
          Tide data unavailable — check your connection
        </div>
      </section>
    )
  }

  const trendLabel = reading?.trend
    ? reading.trend.charAt(0).toUpperCase() + reading.trend.slice(1)
    : null

  return (
    <section className="hero" aria-label="Current tide height">
      <div className="label">Current tide height</div>

      {feedStatus === FeedStatus.STALE && (
        <div className="stale-banner" role="alert" aria-live="polite">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/>
          </svg>
          Stale · last updated {staleAge} ago
        </div>
      )}

      <div className="reading">
        <span className="value num" aria-label={`${reading?.heightMetres} metres`}>
          {reading?.heightMetres}
        </span>
        <span className="unit num">m</span>
      </div>

      {trendLabel && (
        <div className="trend" aria-label={`Tide is ${trendLabel}`}>
          {TREND_ICONS[reading?.trend] ?? null}
          {trendLabel}
        </div>
      )}

      {reading?.changeLastHour && (
        <div className="hero-sub">
          <div>
            <div className="label">Change · last hr</div>
            <span className="num">{reading.changeLastHour}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label">High water</div>
            <span className="num">{reading.highWaterTime}</span>
          </div>
        </div>
      )}
    </section>
  )
}
