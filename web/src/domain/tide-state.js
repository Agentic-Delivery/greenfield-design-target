export const FeedStatus = /** @type {const} */ ({
  LOADING: 'loading',
  LIVE: 'live',
  STALE: 'stale',
  ERROR: 'error',
})

export const CrossingStatus = /** @type {const} */ ({
  SAFE: 'safe',
  CLOSING: 'closing',
  CLOSED: 'closed',
  UNKNOWN: 'unknown',
})

/**
 * Derive the feed status from a reading timestamp and the current time.
 *
 * @param {{ readingTimestamp: number|null, now: number, freshnessWindowMs: number }} params
 * @returns {'live' | 'stale' | 'error'}
 */
export function deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs }) {
  if (readingTimestamp === null) return FeedStatus.ERROR
  const ageMs = now - readingTimestamp
  return ageMs <= freshnessWindowMs ? FeedStatus.LIVE : FeedStatus.STALE
}

/**
 * Format a duration in ms to a human-readable string (e.g. "14m", "1h 30m").
 * @param {number} ageMs
 * @returns {string}
 */
export function formatAge(ageMs) {
  const minutes = Math.floor(ageMs / 60_000)
  const hours = Math.floor(minutes / 60)
  if (hours >= 1) {
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
  return `${minutes}m`
}

/**
 * Suppress 'safe' crossing status when the feed is stale or errored.
 * A stale reading must never tell a walker it is safe to cross.
 *
 * @param {{ crossingStatus: string, feedStatus: string }} params
 * @returns {string}
 */
export function safeStatusForDisplay({ crossingStatus, feedStatus }) {
  if (crossingStatus === 'safe' && feedStatus !== FeedStatus.LIVE) {
    return CrossingStatus.UNKNOWN
  }
  return crossingStatus
}
