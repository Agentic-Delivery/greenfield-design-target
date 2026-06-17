import { describe, it, expect, beforeEach } from 'vitest'
import { loadWalks, saveWalks } from './walk-store.js'

// happy-dom provides localStorage
beforeEach(() => {
  localStorage.clear()
})

describe('loadWalks', () => {
  it('returns empty array when no saved walks exist', () => {
    expect(loadWalks()).toEqual([])
  })

  it('returns saved walks after they are persisted', () => {
    const walks = [
      { id: '1', name: 'Holy Island Causeway', lat: 55.67, lon: -1.79 },
    ]
    saveWalks(walks)
    expect(loadWalks()).toEqual(walks)
  })

  it('returns the walks saved in the most recent saveWalks call', () => {
    saveWalks([{ id: '1', name: 'Walk A', lat: 0, lon: 0 }])
    saveWalks([{ id: '2', name: 'Walk B', lat: 1, lon: 1 }])
    expect(loadWalks()).toEqual([{ id: '2', name: 'Walk B', lat: 1, lon: 1 }])
  })

  it('returns empty array when localStorage contains corrupted JSON', () => {
    localStorage.setItem('tide-now:saved-walks', 'not-valid-json{')
    expect(loadWalks()).toEqual([])
  })
})

describe('saveWalks', () => {
  it('persists walks so they survive a simulated reload (re-read from storage)', () => {
    const walks = [
      { id: '1', name: 'Cramond Island', lat: 55.97, lon: -3.30 },
      { id: '2', name: 'St Michaels Mount', lat: 50.12, lon: -5.48 },
    ]
    saveWalks(walks)
    // Simulate a reload by calling loadWalks fresh — no in-memory cache
    const reloaded = loadWalks()
    expect(reloaded).toEqual(walks)
    expect(reloaded).toHaveLength(2)
  })
})
