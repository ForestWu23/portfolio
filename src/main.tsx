import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BuilderProject from './pages/BuilderProject'
import NutribitesProject from './pages/NutribitesProject'
import GreenAppleProject from './pages/GreenAppleProject'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/builder" element={<BuilderProject />} />
        <Route path="/projects/nutribites" element={<NutribitesProject />} />
        <Route path="/projects/greenapple" element={<GreenAppleProject />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
