import '../styles/Navbar.css'

const navLinks = [
  { label: 'Projects', section: 2 },
  { label: 'About', section: 3 },
  { label: 'Contact', section: 4 },
]

interface NavbarProps {
  currentIndex: number
  goToSection: (index: number) => void
}

export default function Navbar({ currentIndex, goToSection }: NavbarProps) {
  const isDark = (currentIndex >= 1 && currentIndex <= 2) || currentIndex === 4

  return (
    <nav className={`navbar ${isDark ? 'navbar-dark' : ''}`}>
      <a
        className="navbar-logo"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          goToSection(0)
        }}
      >
        Sihang Yang
      </a>

      <div className="navbar-links">
        {navLinks.map((link) => (
          <button
            key={link.section}
            className="navbar-link"
            onClick={() => goToSection(link.section)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
