import { useState, useCallback } from 'react'
import '../styles/Navbar.css'

const navLinks = [
  { label: 'Projects', section: 2 },
  { label: 'About', section: 3 },
  { label: 'Contact', section: 4 },
]

interface NavbarProps {
  currentIndex?: number
  goToSection: (index: number) => void
  blendMode?: boolean
}

export default function Navbar({ currentIndex = 0, goToSection, blendMode }: NavbarProps) {
  const [open, setOpen] = useState(false)

  // sections 1, 2, 4 have dark backgrounds; project pages (blendMode) are also dark
  const onDark = blendMode || currentIndex === 1 || currentIndex === 2 || currentIndex === 4

  const handleNav = useCallback(
    (section: number) => {
      goToSection(section)
      setOpen(false)
    },
    [goToSection],
  )

  return (
    <div className="notch-root">
      <div
        className={`notch-pill${open ? ' notch-open' : ''}${onDark ? ' notch-light' : ''}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Collapsed: arch indicator */}
        <div className="notch-indicator">
          <span />
          <span />
          <span />
        </div>

        {/* Expanded: full-width horizontal banner */}
        <div className="notch-banner">
          {/* Left */}
          <button className="notch-brand" onClick={() => handleNav(0)}>
            Sihang Yang
          </button>

          <div className="notch-sep notch-sep-left" />

          {/* Center — always exactly centered */}
          <nav className="notch-nav">
            {navLinks.map((link) => (
              <button
                key={link.section}
                className="notch-navlink"
                onClick={() => handleNav(link.section)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="notch-sep notch-sep-right" />

          {/* Right */}
          <div className="notch-right">
            <span className="notch-avail-dot" />
            <span className="notch-role">Product Designer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
