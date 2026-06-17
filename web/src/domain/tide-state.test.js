import { describe, it, expect } from 'vitest'
import {
  deriveFeedStatus,
  formatAge,
  FeedStatus,
  safeStatusForDisplay,
} from './tide-state.js'

const FRESHNESS_15MIN = 15 * 60 * 1000

describe('deriveFeedStatus', () => {
  it('returns error when no reading exists (null timestamp)', () => {
    expect(
      deriveFeedStatus({ readingTimestamp: null, now: Date.now(), freshnessWindowMs: FRESHNESS_15MIN })
    ).toBe(FeedStatus.ERROR)
  })

  it('returns live when data age is inside the freshness window', () => {
    const now = 1_000_000
    const readingTimestamp = now - (FRESHNESS_15MIN - 1000) // 1 second inside window
    expect(deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: FRESHNESS_15MIN })).toBe(FeedStatus.LIVE)
  })

  it('returns live when data age exactly equals the freshness window (boundary – ε)', () => {
    const now = 1_000_000
    const readingTimestamp = now - FRESHNESS_15MIN // exactly at boundary = still live
    expect(deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: FRESHNESS_15MIN })).toBe(FeedStatus.LIVE)
  })

  it('returns stale when data age exceeds the freshness window by 1ms (boundary + ε)', () => {
    const now = 1_000_000
    const readingTimestamp = now - (FRESHNESS_15MIN + 1)
    expect(deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: FRESHNESS_15MIN })).toBe(FeedStatus.STALE)
  })

  it('returns stale when data is much older than the freshness window', () => {
    const now = 1_000_000
    const readingTimestamp = now - 60 * 60 * 1000 // 1 hour old
    expect(deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: FRESHNESS_15MIN })).toBe(FeedStatus.STALE)
  })

  it('uses the supplied freshness window — different windows classify the same age differently', () => {
    const now = 1_000_000
    const readingTimestamp = now - 10 * 60 * 1000 // 10 minutes old

    // 15-min window: 10 min old is live
    expect(
      deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: 15 * 60 * 1000 })
    ).toBe(FeedStatus.LIVE)

    // 5-min window: 10 min old is stale
    expect(
      deriveFeedStatus({ readingTimestamp, now, freshnessWindowMs: 5 * 60 * 1000 })
    ).toBe(FeedStatus.STALE)
  })
})

describe('formatAge', () => {
  it('formats age in minutes when under 1 hour', () => {
    expect(formatAge(5 * 60 * 1000)).toBe('5m')
    expect(formatAge(14 * 60 * 1000)).toBe('14m')
  })

  it('formats age as hours when exactly 1 hour', () => {
    expect(formatAge(60 * 60 * 1000)).toBe('1h')
  })

  it('formats age as hours and minutes when over 1 hour with remainder', () => {
    expect(formatAge(90 * 60 * 1000)).toBe('1h 30m')
  })

  it('formats age as whole hours when no minute remainder', () => {
    expect(formatAge(2 * 60 * 60 * 1000)).toBe('2h')
  })

  it('handles zero minutes as 0m', () => {
    expect(formatAge(0)).toBe('0m')
  })
})

describe('safeStatusForDisplay', () => {
  it('suppresses safe crossing status when feed is stale', () => {
    const result = safeStatusForDisplay({ crossingStatus: 'safe', feedStatus: FeedStatus.STALE })
    expect(result).not.toBe('safe')
  })

  it('suppresses safe crossing status when feed has no data', () => {
    const result = safeStatusForDisplay({ crossingStatus: 'safe', feedStatus: FeedStatus.ERROR })
    expect(result).not.toBe('safe')
  })

  it('passes through safe crossing status when feed is live', () => {
    const result = safeStatusForDisplay({ crossingStatus: 'safe', feedStatus: FeedStatus.LIVE })
    expect(result).toBe('safe')
  })

  it('passes through non-safe status when feed is stale (informational statuses remain)', () => {
    const result = safeStatusForDisplay({ crossingStatus: 'closed', feedStatus: FeedStatus.STALE })
    expect(result).toBe('closed')
  })
})
