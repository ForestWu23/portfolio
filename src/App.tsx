import { useRef, useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import './styles/NavDots.css'

const SECTIONS = [
  { id: 'hero', label: '' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'work', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const TRANSITION_DURATION = 700
const EASING = 'cubic-bezier(0.1, 0.57, 0.1, 1)'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const goToSection = useCallback((targetIndex: number) => {
    if (isAnimating.current) return
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return
    if (targetIndex === currentIndex) return

    isAnimating.current = true
    const direction = targetIndex > currentIndex ? 1 : -1

    const currentSlide = slidesRef.current[currentIndex]
    const targetSlide = slidesRef.current[targetIndex]
    if (!currentSlide || !targetSlide) return

    targetSlide.style.transition = 'none'
    targetSlide.style.transform = `translateY(${direction * 100}%)`
    targetSlide.style.opacity = '1'
    targetSlide.style.zIndex = '10'
    currentSlide.style.zIndex = '5'

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const t = `transform ${TRANSITION_DURATION}ms ${EASING}, opacity ${TRANSITION_DURATION}ms ${EASING}`
        targetSlide.style.transition = t
        currentSlide.style.transition = t
        targetSlide.style.transform = 'translateY(0%) scale(1)'
        targetSlide.style.opacity = '1'
        currentSlide.style.transform = `translateY(${-direction * 50}%) scale(0.9)`
        currentSlide.style.opacity = '0.4'

        setTimeout(() => {
          slidesRef.current.forEach((slide, i) => {
            if (!slide) return
            slide.style.transition = 'none'
            if (i === targetIndex) {
              slide.style.transform = 'translateY(0%) scale(1)'
              slide.style.opacity = '1'
              slide.style.zIndex = '10'
            } else {
              slide.style.transform = i > targetIndex ? 'translateY(100%)' : 'translateY(-100%)'
              slide.style.opacity = '1'
              slide.style.zIndex = '1'
            }
          })
          setCurrentIndex(targetIndex)
          isAnimating.current = false
        }, TRANSITION_DURATION)
      })
    })
  }, [currentIndex])

  useEffect(() => {
    slidesRef.current.forEach((slide, i) => {
      if (!slide) return
      slide.style.transition = 'none'
      if (i === 0) {
        slide.style.transform = 'translateY(0%) scale(1)'
        slide.style.opacity = '1'
        slide.style.zIndex = '10'
      } else {
        slide.style.transform = 'translateY(100%)'
        slide.style.opacity = '1'
        slide.style.zIndex = '1'
      }
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let touchStartY = 0
    let lastWheelTime = 0

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelTime < 800) return
      if (Math.abs(e.deltaY) < 30) return
      lastWheelTime = now
      if (e.deltaY > 0) goToSection(currentIndex + 1)
      else goToSection(currentIndex - 1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 50) return
      if (delta > 0) goToSection(currentIndex + 1)
      else goToSection(currentIndex - 1)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goToSection(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToSection(currentIndex - 1)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [currentIndex, goToSection])

  const setSlideRef = (index: number) => (el: HTMLDivElement | null) => {
    slidesRef.current[index] = el
  }

  const isDarkDots = currentIndex >= 1 && currentIndex <= 2

  return (
    <div className="app-wrapper">
      <Navbar currentIndex={currentIndex} goToSection={goToSection} />
      <div className="slides-container" ref={containerRef}>
        <div className="slide" ref={setSlideRef(0)}>
          <Hero goToSection={goToSection} isActive={currentIndex === 0} />
        </div>
        <div className="slide" ref={setSlideRef(1)}>
          <Highlights isActive={currentIndex === 1} />
        </div>
        <div className="slide" ref={setSlideRef(2)}>
          <Projects />
        </div>
        <div className="slide" ref={setSlideRef(3)}>
          <About isActive={currentIndex === 3} />
        </div>
        <div className="slide" ref={setSlideRef(4)}>
          <Footer />
        </div>
      </div>

      <nav className={`fp-nav right ${isDarkDots ? 'light-controls' : ''}`}>
        <ul>
          {SECTIONS.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={currentIndex === i ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(i)
                }}
              >
                <span />
              </a>
              {section.label && (
                <div className="fp-tooltip right">
                  <div className="tooltip-inner">
                    <span>{section.label}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
