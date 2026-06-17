import { useState } from 'react'
import { loadWalks, saveWalks } from '../domain/walk-store.js'

export function useSavedWalks() {
  const [walks, setWalks] = useState(() => loadWalks())

  const addWalk = (walk) => {
    const updated = [...walks, walk]
    setWalks(updated)
    saveWalks(updated)
  }

  const removeWalk = (id) => {
    const updated = walks.filter((w) => w.id !== id)
    setWalks(updated)
    saveWalks(updated)
  }

  return { walks, addWalk, removeWalk }
}
