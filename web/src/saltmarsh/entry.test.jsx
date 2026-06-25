import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// REQ-web-saltmarsh-hero R3 (the critical preservation constraint): Saltmarsh must
// be wired behind its OWN entry; the approved design's preview swap of tide-now's
// mount (web/src/main.jsx) MUST NOT be shipped — that would replace the live
// tide-now app. The real cross-product regression is verified on the deployed site
// (AC-6, delivery-verifier). These are the fast in-CI guards for the exact wiring.
// vitest runs with cwd = web/, so the tide-now entry is at src/main.jsx.
const tideEntryPath = resolve(process.cwd(), 'src/main.jsx')

describe('Saltmarsh own entry mounts the hero (R3)', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('booting web/src/saltmarsh/main.jsx renders the Saltmarsh hero into #root', async () => {
    await import('./main.jsx')
    // React 18 concurrent root renders asynchronously — wait for the headline.
    await vi.waitFor(() => {
      const root = document.getElementById('root')
      expect(root.textContent).toMatch(/coffee roasted slowly, by the marsh/i)
    })
  })
})

describe('tide-now mount is preserved — preview swap NOT shipped (R3)', () => {
  const tideEntry = readFileSync(tideEntryPath, 'utf8')

  it('tide-now entry still imports and renders its own App', () => {
    expect(tideEntry).toMatch(/import\s*\{\s*App\s*\}\s*from\s*['"]\.\/App\.jsx['"]/)
    expect(tideEntry).toMatch(/<App\s*\/>/)
  })

  it('tide-now entry does NOT mount SaltmarshHero (the forbidden preview swap)', () => {
    expect(tideEntry).not.toMatch(/SaltmarshHero/)
  })
})
