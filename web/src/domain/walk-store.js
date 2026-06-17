const STORAGE_KEY = 'tide-now:saved-walks'

/**
 * Load saved walks from device storage.
 * Returns an empty array on missing or corrupted data (defensive — never crashes).
 * @returns {Array<{id: string, name: string, lat: number, lon: number}>}
 */
export function loadWalks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

/**
 * Persist saved walks to device storage.
 * @param {Array<{id: string, name: string, lat: number, lon: number}>} walks
 */
export function saveWalks(walks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(walks))
}
