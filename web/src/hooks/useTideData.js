import { useState, useEffect } from 'react'
import { deriveFeedStatus, formatAge, FeedStatus } from '../domain/tide-state.js'

const DEFAULT_FRESHNESS_MS = 15 * 60_000 // 15 minutes
const DEFAULT_POLL_MS = 60_000 // 1 minute

export function useTideData({
  freshnessWindowMs = DEFAULT_FRESHNESS_MS,
  pollIntervalMs = DEFAULT_POLL_MS,
} = {}) {
  const [state, setState] = useState({
    reading: null,
    crossing: null,
    feedStatus: FeedStatus.LOADING,
    staleAge: null,
  })

  useEffect(() => {
    let alive = true

    async function fetchTide() {
      try {
        const res = await fetch('/api/tide')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!alive) return

        const now = Date.now()
        // Prefer server-provided freshness window (from FRESHNESS_WINDOW_MINUTES env var)
        // so the operator lever is truly operative (AC-3b).
        const effectiveFreshnessMs = json.freshnessWindowMs ?? freshnessWindowMs
        const feedStatus = deriveFeedStatus({
          readingTimestamp: json.readingTimestamp,
          now,
          freshnessWindowMs: effectiveFreshnessMs,
        })
        const staleAge =
          feedStatus === FeedStatus.STALE && json.readingTimestamp != null
            ? formatAge(now - json.readingTimestamp)
            : null

        setState({
          reading: {
            heightMetres: json.heightMetres,
            trend: json.trend ?? null,
            changeLastHour: json.changeLastHour ?? null,
            highWaterTime: json.highWaterTime ?? null,
            location: json.location ?? null,
          },
          crossing: json.crossing ?? null,
          feedStatus,
          staleAge,
        })
      } catch {
        if (!alive) return
        setState((prev) => {
          // No prior data → error; existing data → keep (age-derived status updates on next poll)
          if (prev.reading === null) return { ...prev, feedStatus: FeedStatus.ERROR }
          return prev
        })
      }
    }

    fetchTide()
    const timer = setInterval(fetchTide, pollIntervalMs)
    return () => {
      alive = false
      clearInterval(timer)
    }
  }, [freshnessWindowMs, pollIntervalMs])

  return state
}
