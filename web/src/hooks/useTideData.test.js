import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useTideData } from './useTideData.js'
import { FeedStatus } from '../domain/tide-state.js'

function freshPayload(overrides = {}) {
  return {
    readingTimestamp: Date.now(),
    location: 'Holy Island Causeway',
    heightMetres: '2.4',
    trend: 'rising',
    changeLastHour: '+0.45m',
    highWaterTime: '14:30',
    crossing: {
      status: 'safe',
      windowLabel: '12:15 – 13:45',
      closesIn: 'closes in 45m',
      nextWindow: '18:30',
      nextWindowOpensIn: '5h 15m',
    },
    ...overrides,
  }
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('useTideData — loading state', () => {
  it('returns LOADING before first fetch resolves', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(() => {}))
    const { result } = renderHook(() => useTideData({ pollIntervalMs: 999_999 }))
    expect(result.current.feedStatus).toBe(FeedStatus.LOADING)
    expect(result.current.reading).toBeNull()
  })
})

describe('useTideData — live state', () => {
  it('returns LIVE with reading and crossing when fetch succeeds with fresh data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => freshPayload(),
    })
    const { result } = renderHook(() => useTideData({ pollIntervalMs: 999_999 }))
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.LIVE))
    expect(result.current.reading.heightMetres).toBe('2.4')
    expect(result.current.reading.trend).toBe('rising')
    expect(result.current.crossing.status).toBe('safe')
    expect(result.current.staleAge).toBeNull()
  })

  it('exposes location from the API response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => freshPayload({ location: 'Test Causeway' }),
    })
    const { result } = renderHook(() => useTideData({ pollIntervalMs: 999_999 }))
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.LIVE))
    expect(result.current.reading.location).toBe('Test Causeway')
  })
})

describe('useTideData — stale state', () => {
  it('returns STALE with staleAge when readingTimestamp is older than freshness window', async () => {
    const FRESHNESS_MS = 10 * 60_000
    const staleTs = Date.now() - 20 * 60_000
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => freshPayload({ readingTimestamp: staleTs }),
    })
    const { result } = renderHook(() =>
      useTideData({ freshnessWindowMs: FRESHNESS_MS, pollIntervalMs: 999_999 })
    )
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.STALE))
    expect(result.current.staleAge).toMatch(/\d+(m|h)/)
  })
})

describe('useTideData — server-provided freshness window (AC-3b operator lever)', () => {
  it('uses freshnessWindowMs from server response, overriding the hook default', async () => {
    // 8-minute-old reading: live under a 15-min window but stale under a 5-min window.
    // Hook default is 15 min → would classify as LIVE.
    // Server says 5 min (operator set FRESHNESS_WINDOW_MINUTES=5) → must classify as STALE.
    const staleTs = Date.now() - 8 * 60_000
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => freshPayload({ readingTimestamp: staleTs, freshnessWindowMs: 5 * 60_000 }),
    })
    const { result } = renderHook(() =>
      useTideData({ freshnessWindowMs: 15 * 60_000, pollIntervalMs: 999_999 })
    )
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.STALE))
  })

  it('falls back to hook parameter when server response omits freshnessWindowMs', async () => {
    // No freshnessWindowMs in response → use the 5-min hook parameter.
    // 8-minute-old reading is stale under 5-min window.
    const staleTs = Date.now() - 8 * 60_000
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => freshPayload({ readingTimestamp: staleTs }),
    })
    const { result } = renderHook(() =>
      useTideData({ freshnessWindowMs: 5 * 60_000, pollIntervalMs: 999_999 })
    )
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.STALE))
  })
})

describe('useTideData — error state', () => {
  it('returns ERROR when fetch fails and there is no prior data', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'))
    const { result } = renderHook(() => useTideData({ pollIntervalMs: 999_999 }))
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.ERROR))
    expect(result.current.reading).toBeNull()
  })

  it('keeps prior data when a subsequent fetch fails (does not revert to ERROR)', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const payload = freshPayload()
    let callCount = 0
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      callCount++
      if (callCount === 1) return Promise.resolve({ ok: true, json: async () => payload })
      return Promise.reject(new Error('transient error'))
    })

    const { result } = renderHook(() => useTideData({ pollIntervalMs: 200 }))
    await waitFor(() => expect(result.current.feedStatus).toBe(FeedStatus.LIVE))

    // Trigger second (failing) poll
    await act(async () => { vi.advanceTimersByTime(200) })
    await waitFor(() => expect(callCount).toBeGreaterThanOrEqual(2))

    // Prior reading data should be retained
    expect(result.current.reading).not.toBeNull()
    expect(result.current.reading.heightMetres).toBe('2.4')
  })
})
