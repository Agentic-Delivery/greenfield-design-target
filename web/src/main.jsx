import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { LandingHero } from './components/LandingHero.jsx'
import './styles/app.css'
import './styles/marginalia.css'

function Root() {
  const [entered, setEntered] = useState(false)
  return entered ? <App /> : <LandingHero onEnter={() => setEntered(true)} />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
