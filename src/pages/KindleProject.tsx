import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/KindleProject.css'

gsap.registerPlugin(ScrollTrigger)
const B = import.meta.env.BASE_URL

const TILT = 6
const SHIFT = 10
const ZOOM = 1.08

function PhoneImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef(0)

  const onMove = useCallback((e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const wrap = wrapRef.current
      const img = imgRef.current
      if (!wrap || !img) return
      const r = wrap.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width
      const ny = (e.clientY - r.top) / r.height
      const ry = (nx - 0.5) * TILT * 2
      const rx = (0.5 - ny) * TILT * 2
      wrap.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
      img.style.transform = `translate(${(nx - 0.5) * SHIFT}px, ${(ny - 0.5) * SHIFT}px) scale(${ZOOM})`
    })
  }, [])

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (wrapRef.current) wrapRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'
    if (imgRef.current) imgRef.current.style.transform = 'translate(0,0) scale(1)'
  }, [])

  return (
    <div
      ref={wrapRef}
      className="kd-phone-hover"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <img ref={imgRef} src={src} alt={alt} className={className} />
    </div>
  )
}

function FloatingDotsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let w = 0, h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 60
    const dots: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; phase: number }[] = []
    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.25 + 0.15,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let raf = 0
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.01

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < -20) d.x = w + 20
        if (d.x > w + 20) d.x = -20
        if (d.y < -20) d.y = h + 20
        if (d.y > h + 20) d.y = -20

        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + d.phase)
        const a = d.alpha * (0.6 + 0.4 * pulse)

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(80, 120, 200, ${a})`
        ctx.fill()
      }

      const LINE_DIST = 180
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINE_DIST) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(80, 120, 200, ${0.12 * (1 - dist / LINE_DIST)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="kd-bg-canvas" />
}

export default function KindleProject() {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const goToSection = useCallback((index: number) => {
    navigate('/', { state: { targetSection: index } })
  }, [navigate])

  useEffect(() => {
    document.documentElement.classList.add('scrollable-page')
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.kd-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, pageRef)
    return () => { ctx.revert(); document.documentElement.classList.remove('scrollable-page') }
  }, [])

  return (
    <div className="kd-page" ref={pageRef}>
      <FloatingDotsCanvas />
      <Navbar goToSection={goToSection} blendMode />

      <div className="kd-phone-frame">
        {/* ═══ HERO ═══ */}
        <section className="kd-hero">
          <img src={`${B}images/kindle/hero-banner.png`} alt="Kindle redesign overview" className="kd-hero-banner" />
        </section>

        {/* ═══ CASE STUDY TITLE + METADATA ═══ */}
        <div className="kd-inner kd-reveal">
          <span className="kd-eyebrow">Case Study</span>
          <h1 className="kd-main-title">Reimagining Kindle for a Calmer,<br />More Focused Reading Experience</h1>
          <p className="kd-main-subtitle">A mobile app redesign that improves discovery, library clarity, and reading control through a more intuitive and reader-centered experience.</p>
          <div className="kd-meta-row">
            <div className="kd-meta-item"><span className="kd-meta-label">Role</span><span className="kd-meta-value">UX/UI Designer</span></div>
            <div className="kd-meta-item"><span className="kd-meta-label">Type</span><span className="kd-meta-value">Product Redesign</span></div>
            <div className="kd-meta-item"><span className="kd-meta-label">Scope</span><span className="kd-meta-value">Research, Usability Testing, Interface Design, Prototype</span></div>
            <div className="kd-meta-item"><span className="kd-meta-label">Platform</span><span className="kd-meta-value">Mobile App</span></div>
          </div>
        </div>

        {/* ═══ OVERVIEW ═══ */}
        <div className="kd-inner kd-overview-grid kd-reveal">
          <div className="kd-overview-left">
            <span className="kd-eyebrow">Overview</span>
            <h2 className="kd-section-heading">Designing for wellness, focus,<br />and reading flow</h2>
            <p className="kd-body">Kindle is built for distraction-light reading, but parts of the mobile experience still feel fragmented across discovery, library management, and in-reading controls. This project explores how the app could better support a smoother, more immersive reading journey for modern readers.</p>
            <p className="kd-body">The redesign focuses on three key areas: helping users find books more easily, making personal libraries easier to manage, and creating a calmer, more customizable reading experience.</p>
          </div>
          <div className="kd-overview-right">
            <PhoneImg src={`${B}images/kindle/splash.png`} alt="Kindle splash screen" className="kd-overview-phone" />
          </div>
        </div>

        {/* ═══ WHY REDESIGN KINDLE? ═══ */}
        <div className="kd-gray-band">
          <div className="kd-inner kd-reveal">
            <span className="kd-eyebrow">Opportunity</span>
            <h2 className="kd-section-heading">Why redesign Kindle?</h2>
            <div className="kd-opportunity-cards">
              <div className="kd-opp-card"><h4>Discovery feels too passive</h4><p>Finding a book should feel natural and engaging, but the entry points to discovery can feel limited or disconnected from user intent.</p></div>
              <div className="kd-opp-card"><h4>Library management lacks clarity</h4><p>Saved books, reading status, and organization tools need stronger hierarchy and better readability.</p></div>
              <div className="kd-opp-card"><h4>Reading controls interrupt immersion</h4><p>Readers need access to settings and navigation without breaking the calm, focused feeling of reading.</p></div>
            </div>
          </div>
        </div>

        {/* ═══ USABILITY TESTING ═══ */}
        <div className="kd-inner kd-reveal">
          <span className="kd-eyebrow">Research</span>
          <h2 className="kd-section-heading">Usability testing and synthesis</h2>
          <p className="kd-body kd-body-narrow">The testing revealed friction across search behavior, action clarity, bookshelf readability, and button accessibility, which became the foundation for the redesign direction.</p>
          <div className="kd-ux-grid kd-reveal">
            <img src={`${B}images/kindle/ux-top-left.jpg`} alt="Usability test notes" />
            <img src={`${B}images/kindle/ux-top-right.png`} alt="User flow diagram" />
            <img src={`${B}images/kindle/ux-bottom-left.png`} alt="Affinity mapping" />
            <img src={`${B}images/kindle/ux-bottom-right.jpg`} alt="Synthesis notes" />
          </div>
          <div className="kd-testing-detail kd-reveal">
            <div><h4>Testing setup</h4><p>Users were asked to complete a focused reading task in the Kindle prototype: search for The Great Gatsby by F. Scott Fitzgerald and add it to their reading list. A second comparative scenario used Kobo as a reference point to understand expectations and usability differences.</p></div>
            <div><h4>Methods</h4><ul><li>Interactive prototype testing</li><li>Observation notes</li><li>KJ analysis synthesis</li></ul></div>
          </div>
        </div>

        {/* ═══ WHAT THE TESTING REVEALED ═══ */}
        <div className="kd-gray-band">
          <div className="kd-inner kd-reveal">
            <span className="kd-eyebrow">Key Findings</span>
            <h2 className="kd-section-heading">What the testing revealed</h2>
            <div className="kd-findings-grid">
              <div className="kd-finding-card kd-reveal"><PhoneImg src={`${B}images/kindle/search-typing.png`} alt="Search autocomplete" className="kd-finding-img" /><h4>Search lacked intuitive support</h4><p>One participant used search immediately, while another browsed the home page and Top 10 list first before returning to search. This suggested that search entry and support were not always intuitive enough for different user behaviors.</p></div>
              <div className="kd-finding-card kd-reveal"><PhoneImg src={`${B}images/kindle/bookshelves-scrolled.png`} alt="Bookshelf with reading status" className="kd-finding-img" /><h4>Bookshelf status needed better readability</h4><p>Reading status labels such as "read" and "unread" were too small to scan comfortably, making the library feel less clear than it should.</p></div>
              <div className="kd-finding-card kd-reveal"><PhoneImg src={`${B}images/kindle/reading-new-icons.png`} alt="Reading controls" className="kd-finding-img" /><h4>Primary actions were too easy to miss</h4><p>Important actions such as "Add to bookshelf" needed stronger emphasis and larger touch targets to improve clarity and usability.</p></div>
              <div className="kd-finding-card kd-reveal"><PhoneImg src={`${B}images/kindle/book-detail.png`} alt="Book detail page" className="kd-finding-img" /><h4>Some icons felt visually ambiguous</h4><p>Participants could confuse certain actions, including exit and share-related icons, which weakened confidence during navigation.</p></div>
            </div>
          </div>
        </div>

        {/* ═══ DESIGN PRINCIPLES ═══ */}
        <div className="kd-inner kd-reveal">
          <span className="kd-eyebrow">Principles</span>
          <h2 className="kd-section-heading">Design principles</h2>
          <div className="kd-principles-row">
            <div className="kd-principle"><span className="kd-principle-icon">✦</span><h4>Calm</h4><p>Support reading without visual overload and protect the quiet, immersive nature of the Kindle experience.</p></div>
            <div className="kd-principle"><span className="kd-principle-icon">◉</span><h4>Clarity</h4><p>Make navigation, status, and actions easier to understand at a glance through stronger hierarchy and cleaner structure.</p></div>
            <div className="kd-principle"><span className="kd-principle-icon">◎</span><h4>Control</h4><p>Help readers personalize and manage their reading experience with less friction and more confidence.</p></div>
          </div>
        </div>

        {/* ═══ SMARTER DISCOVERY ═══ */}
        <div className="kd-gray-band">
          <div className="kd-inner kd-reveal">
            <span className="kd-eyebrow">Redesign</span>
            <h2 className="kd-section-heading">Smarter discovery</h2>
            <p className="kd-body kd-body-narrow">Discovery is the first step in the reading journey. I redesigned the home and search experience to make exploration more visible, more scannable, and easier to enter from multiple points.</p>
            <div className="kd-comparison-row kd-reveal">
              <div className="kd-comp-item"><span className="kd-comp-label">Before</span><PhoneImg src={`${B}images/kindle/home-old.png`} alt="Old homepage" /></div>
              <div className="kd-comp-item"><span className="kd-comp-label">Low-fidelity</span><PhoneImg src={`${B}images/kindle/home-lowfi.png`} alt="Homepage wireframe" /></div>
              <div className="kd-comp-item"><span className="kd-comp-label">After</span><PhoneImg src={`${B}images/kindle/home-new.png`} alt="New homepage" /></div>
            </div>
            <div className="kd-pso-row kd-reveal">
              <div className="kd-pso-col"><h4>Problem</h4><p>Users did not always begin with the same behavior. Some relied on search immediately, while others browsed first and only searched later. The discovery experience needed to support both paths more naturally.</p></div>
              <div className="kd-pso-col"><h4>Solution</h4><p>The redesigned home screen highlights content categories, recommendations, and time-based reading cues, while the search experience provides faster entry, clearer results, and more supportive suggestions.</p></div>
              <div className="kd-pso-col"><h4>Outcome</h4><p>The new flow makes discovery feel less passive and more responsive to user intent, whether a reader wants to browse, search directly, or explore recommendations.</p></div>
            </div>
          </div>
        </div>

        {/* ═══ CLEARER BOOKSHELF ═══ */}
        <div className="kd-inner kd-reveal">
          <span className="kd-eyebrow">Redesign</span>
          <h2 className="kd-section-heading">Clearer bookshelf management</h2>
          <p className="kd-body kd-body-narrow">A personal library should feel organized, readable, and easy to manage over time.</p>
          <div className="kd-comparison-row kd-reveal">
            <div className="kd-comp-item"><span className="kd-comp-label">Before</span><PhoneImg src={`${B}images/kindle/bookshelf-old.png`} alt="Old bookshelf" /></div>
            <div className="kd-comp-item"><span className="kd-comp-label">Low-fidelity</span><PhoneImg src={`${B}images/kindle/bookshelf-lowfi.png`} alt="Bookshelf wireframe" /></div>
            <div className="kd-comp-item"><span className="kd-comp-label">After</span><PhoneImg src={`${B}images/kindle/bookshelf-manage.png`} alt="Redesigned bookshelf" /></div>
          </div>
          <div className="kd-pso-row kd-reveal">
            <div className="kd-pso-col"><h4>Problem</h4><p>The bookshelf needed stronger hierarchy and better status visibility so users could quickly tell what they had read, what they were currently reading, and what still remained.</p></div>
            <div className="kd-pso-col"><h4>Solution</h4><p>I redesigned the bookshelf to improve reading-status visibility, simplify filtering and management actions, and create a more structured layout for everyday use.</p></div>
            <div className="kd-pso-col"><h4>Outcome</h4><p>The result is a library experience that feels easier to scan, easier to maintain, and more supportive of long-term reading habits.</p></div>
          </div>
        </div>

        {/* ═══ MORE IMMERSIVE READING ═══ */}
        <div className="kd-gray-band">
          <div className="kd-inner kd-reveal">
            <span className="kd-eyebrow">Redesign</span>
            <h2 className="kd-section-heading">More immersive reading controls</h2>
            <p className="kd-body kd-body-narrow">Reading settings should support focus, not interrupt it.</p>
            <div className="kd-comparison-row kd-reveal">
              <div className="kd-comp-item"><span className="kd-comp-label">Before</span><PhoneImg src={`${B}images/kindle/reading-old.png`} alt="Old reading view" /></div>
              <div className="kd-comp-item"><span className="kd-comp-label">Low-fidelity</span><PhoneImg src={`${B}images/kindle/reading-lowfi.png`} alt="Reading wireframe" /></div>
              <div className="kd-comp-item"><span className="kd-comp-label">After</span><PhoneImg src={`${B}images/kindle/reading-new.png`} alt="New reading view" /></div>
            </div>
            <div className="kd-pso-row kd-reveal">
              <div className="kd-pso-col"><h4>Problem</h4><p>Readers need quick access to brightness, font controls, chapter navigation, and display settings, but these controls should remain easy to reach without breaking immersion.</p></div>
              <div className="kd-pso-col"><h4>Solution</h4><p>I redesigned the reading controls to feel more accessible, more structured, and easier to adjust in context. The interface supports both quick changes and deeper customization while preserving a calm reading environment.</p></div>
              <div className="kd-pso-col"><h4>Outcome</h4><p>The updated reading controls make personalization feel smoother and more supportive, helping users stay comfortable and focused for longer reading sessions.</p></div>
            </div>
          </div>
        </div>

        {/* ═══ HOW USABILITY FEEDBACK INFORMED ═══ */}
        <div className="kd-inner kd-reveal">
          <h2 className="kd-section-heading">How usability feedback informed the redesign</h2>
          <p className="kd-body kd-body-narrow">Each design decision was rooted in real feedback from usability testing. Here's how specific findings directly shaped the final product.</p>
          <div className="kd-feedback-grid kd-reveal">
            <div className="kd-feedback-item"><div className="kd-feedback-before"><h4>Finding</h4><p>Search bar suggested unrelated titles before user finished typing</p></div><div className="kd-feedback-arrow">→</div><div className="kd-feedback-after"><h4>Solution</h4><p>Redesigned search with clear categories, auto-complete from library first, and separated store results</p></div></div>
            <div className="kd-feedback-item"><div className="kd-feedback-before"><h4>Finding</h4><p>Share icon was mistaken for an exit button by multiple testers</p></div><div className="kd-feedback-arrow">→</div><div className="kd-feedback-after"><h4>Solution</h4><p>Replaced ambiguous icon with clear labeling and moved share to a contextual menu</p></div></div>
            <div className="kd-feedback-item"><div className="kd-feedback-before"><h4>Finding</h4><p>"Read it now" button was too small for comfortable thumb tapping</p></div><div className="kd-feedback-arrow">→</div><div className="kd-feedback-after"><h4>Solution</h4><p>Increased CTA size, added stronger visual contrast, and positioned within the thumb zone</p></div></div>
            <div className="kd-feedback-item"><div className="kd-feedback-before"><h4>Finding</h4><p>Bookshelf font labels ("read" / "unread") were too small to scan</p></div><div className="kd-feedback-arrow">→</div><div className="kd-feedback-after"><h4>Solution</h4><p>Increased label size, added page-count progress, and introduced reading time tracking</p></div></div>
          </div>
        </div>

        {/* ═══ VISUAL DIRECTION ═══ */}
        <div className="kd-inner kd-reveal">
          <span className="kd-eyebrow">Visual System</span>
          <h2 className="kd-section-heading">Visual direction</h2>
          <div className="kd-visual-grid kd-reveal">
            <div className="kd-visual-card"><div className="kd-visual-swatch"><span className="kd-swatch kd-swatch-dark" /><span className="kd-swatch kd-swatch-mid" /><span className="kd-swatch kd-swatch-light" /></div><h4>Color palette</h4><p>A soft blue-led palette creates a calm and trustworthy tone while maintaining enough contrast for clarity and action.</p></div>
            <div className="kd-visual-card"><div className="kd-visual-type"><span className="kd-type-lg">Aa</span><span className="kd-type-md">Aa</span><span className="kd-type-sm">Aa</span></div><h4>Typography</h4><p>The typography balances readability and warmth, supporting long-form reading while keeping interface elements clean and structured.</p></div>
            <div className="kd-visual-card"><div className="kd-visual-tone"><span /><span /><span /></div><h4>Interface tone</h4><p>The visual language is intentionally quiet and lightweight, allowing content to remain central without making the interface feel flat.</p></div>
            <div className="kd-visual-card"><div className="kd-visual-comp"><span className="kd-comp-btn">Button</span><span className="kd-comp-card-el">Card</span></div><h4>Components</h4><p>Buttons, cards, labels, and controls were designed to feel consistent, clear, and easy to use across different moments of the reading journey.</p></div>
          </div>
        </div>

        {/* ═══ WHAT I LEARNED ═══ */}
        <div className="kd-blue-band">
          <div className="kd-inner kd-reveal" style={{ textAlign: 'center' }}>
            <span className="kd-eyebrow kd-eyebrow-center">Reflection</span>
            <h2 className="kd-section-heading kd-heading-center">What I learned</h2>
            <p className="kd-body kd-body-center">Redesigning the Kindle taught me the power of invisible design. Unlike social media apps that compete for attention, Kindle’s success lies in its ability to disappear. I learned that for this specific user base—who often prioritize the "real book" experience—less is truly more.</p>
            <p className="kd-body kd-body-center">I focused on evolution over revolution. Because Kindle users are deeply loyal and generally more mature, they value stability and clarity. This project taught me to resist the urge to follow "trendy" UI patterns and instead focus on subtle enhancements that respect the emotional ritual of reading.</p>
          </div>
        </div>

      </div>{/* end kd-phone-frame */}

      <div className="kd-back-strip">
        <button onClick={() => goToSection(0)} className="kd-back-btn">← Back to Portfolio</button>
      </div>
      <div className="kd-footer-wrap"><Footer /></div>
    </div>
  )
}
