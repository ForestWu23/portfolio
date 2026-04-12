import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import { AuthGate } from './components/AuthGate'
import './styles/global.css'

const BuilderProject = lazy(() => import('./pages/BuilderProject'))
const NutribitesProject = lazy(() => import('./pages/NutribitesProject'))
const GreenAppleProject = lazy(() => import('./pages/GreenAppleProject'))
const KindleProject = lazy(() => import('./pages/KindleProject'))
const BuyerFolioProject = lazy(() => import('./pages/BuyerFolioProject'))

// GitHub Pages SPA redirect: restore path from query string produced by 404.html
;(function () {
  const { search } = window.location
  if (search.startsWith('?/')) {
    const decoded = search
      .slice(1)
      .replace(/~and~/g, '&')
    window.history.replaceState(null, '', decoded + window.location.hash)
  }
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Navigate to="/" state={{ targetSection: 2 }} replace />} />
        <Route path="/about" element={<Navigate to="/" state={{ targetSection: 3 }} replace />} />
        <Route path="/contact" element={<Navigate to="/" state={{ targetSection: 4 }} replace />} />
        <Route path="/projects/builder" element={<AuthGate><BuilderProject /></AuthGate>} />
        <Route path="/projects/nutribites" element={<AuthGate><NutribitesProject /></AuthGate>} />
        <Route path="/projects/greenapple" element={<AuthGate><GreenAppleProject /></AuthGate>} />
        <Route path="/projects/kindle" element={<AuthGate><KindleProject /></AuthGate>} />
        <Route path="/projects/buyerfolio" element={<AuthGate><BuyerFolioProject /></AuthGate>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
