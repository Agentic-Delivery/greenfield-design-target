import React from 'react'
import { createRoot } from 'react-dom/client'
import { SaltmarshHero } from './SaltmarshHero.jsx'

// Saltmarsh's OWN entry. This is a SEPARATE build from tide-now (web/src/main.jsx,
// which still mounts <App />) and is published at its own Pages subpath /saltmarsh/.
// REQ-web-saltmarsh-hero R3: the approved design's preview swap of tide-now's mount
// is intentionally NOT shipped — each product owns its entry.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SaltmarshHero />
  </React.StrictMode>
)
