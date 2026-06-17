import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useSavedWalks } from './useSavedWalks.js'

const WALK_A = { id: 'a', name: 'Morning Crossing', when: 'Low tide', status: 'safe' }
const WALK_B = { id: 'b', name: 'Sunset Walk', when: 'High tide', status: 'closed' }

beforeEach(() => {
  localStorage.clear()
})

describe('useSavedWalks', () => {
  it('starts empty when localStorage is empty', () => {
    const { result } = renderHook(() => useSavedWalks())
    expect(result.current.walks).toHaveLength(0)
  })

  it('loads pre-existing walks from localStorage on mount', () => {
    localStorage.setItem('tide-now:saved-walks', JSON.stringify([WALK_A]))
    const { result } = renderHook(() => useSavedWalks())
    expect(result.current.walks).toHaveLength(1)
    expect(result.current.walks[0].name).toBe('Morning Crossing')
  })

  it('addWalk appends the walk and persists to localStorage', () => {
    const { result } = renderHook(() => useSavedWalks())
    act(() => result.current.addWalk(WALK_A))

    expect(result.current.walks).toHaveLength(1)
    const stored = JSON.parse(localStorage.getItem('tide-now:saved-walks'))
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe('a')
  })

  it('removeWalk removes the walk and persists to localStorage', () => {
    localStorage.setItem('tide-now:saved-walks', JSON.stringify([WALK_A, WALK_B]))
    const { result } = renderHook(() => useSavedWalks())

    act(() => result.current.removeWalk('a'))

    expect(result.current.walks).toHaveLength(1)
    expect(result.current.walks[0].id).toBe('b')
    const stored = JSON.parse(localStorage.getItem('tide-now:saved-walks'))
    expect(stored).toHaveLength(1)
  })
})
