import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import NotFound from './pages/NotFound'
import './styles/global.css'

const BuilderProject = lazy(() => import('./pages/BuilderProject'))
const EastsidePage = lazy(() => import('./pages/EastsidePage'))
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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<Navigate to="/" state={{ targetSection: 2 }} replace />} />
          <Route path="/about" element={<Navigate to="/" state={{ targetSection: 3 }} replace />} />
          <Route path="/contact" element={<Navigate to="/" state={{ targetSection: 4 }} replace />} />
          <Route path="/projects/builder" element={<BuilderProject />} />
          <Route path="/random/eastside" element={<EastsidePage />} />
          <Route path="/projects/nutribites" element={<NutribitesProject />} />
          <Route path="/projects/greenapple" element={<GreenAppleProject />} />
          <Route path="/projects/kindle" element={<KindleProject />} />
          <Route path="/projects/buyerfolio" element={<BuyerFolioProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
