import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/BuyerFolioProject.css'

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
    <div ref={wrapRef} className="bf-phone-hover" onMouseMove={onMove} onMouseLeave={onLeave}>
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

    const COUNT = 50
    const dots: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; phase: number }[] = []
    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2.5 + 1.5,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.2 + 0.12, phase: Math.random() * Math.PI * 2,
      })
    }

    let raf = 0, t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.01
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy
        if (d.x < -20) d.x = w + 20; if (d.x > w + 20) d.x = -20
        if (d.y < -20) d.y = h + 20; if (d.y > h + 20) d.y = -20
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + d.phase)
        const a = d.alpha * (0.6 + 0.4 * pulse)
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 58, 237, ${a})`
        ctx.fill()
      }
      const LINE_DIST = 160
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINE_DIST) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / LINE_DIST)})`
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="bf-bg-canvas" />
}

export default function BuyerFolioProject() {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const goToSection = useCallback((index: number) => {
    navigate('/', { state: { targetSection: index } })
  }, [navigate])

  useEffect(() => {
    document.documentElement.classList.add('scrollable-page')
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.bf-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, pageRef)
    return () => { ctx.revert(); document.documentElement.classList.remove('scrollable-page') }
  }, [])

  return (
    <div className="bf-page" ref={pageRef}>
      <FloatingDotsCanvas />
      <Navbar goToSection={goToSection} blendMode />

      <div className="bf-phone-frame">
        {/* ═══ 1. HERO ═══ */}
        <section className="bf-hero">
          <div className="bf-hero-left">
            <img src={`${B}images/buyerfolio/BuyerfolioLogo.png`} alt="BuyerFolio" className="bf-hero-logo" />
            <h1 className="bf-hero-title">BuyerFolio</h1>
            <p className="bf-hero-subtitle">Designing a Co-Ownership Selling Experience for Modern Real Estate</p>
            <div className="bf-hero-meta-row">
              <div className="bf-meta-item"><span className="bf-meta-label">Role</span><span className="bf-meta-value">Design Lead</span></div>
              <div className="bf-meta-item"><span className="bf-meta-label">Team</span><span className="bf-meta-value">6 Designers</span></div>
              <div className="bf-meta-item"><span className="bf-meta-label">Scope</span><span className="bf-meta-value">Product Design, UX Research, Strategy</span></div>
              <div className="bf-meta-item"><span className="bf-meta-label">Platform</span><span className="bf-meta-value">Mobile App</span></div>
            </div>
          </div>
          <div className="bf-hero-right">
            <img src={`${B}images/buyerfolio/BuyerfolioBanner.png`} alt="BuyerFolio app preview" className="bf-hero-banner" />
          </div>
        </section>

        {/* ═══ 2. MY ROLE ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Case Study</span>
          <h1 className="bf-main-title">Co-Ownership Real Estate<br />App Design for Sellers</h1>
          <p className="bf-main-subtitle">A mobile product that helps homeowners navigate complex co-ownership decisions, connect with compatible buyers, and manage the entire selling process in one place.</p>
        </div>

        <div className="bf-inner bf-reveal" style={{ paddingTop: 0 }}>
          <span className="bf-eyebrow">My Role</span>
          <h2 className="bf-section-heading">My Role & Contribution</h2>
          <div className="bf-role-grid">
            <div className="bf-role-card">
              <div className="bf-role-card-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
              </div>
              <h4>Design Leadership</h4>
              <p>Led a team of 6 designers to define the seller-side product experience for a co-ownership real estate platform.</p>
            </div>
            <div className="bf-role-card">
              <div className="bf-role-card-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
              </div>
              <h4>End-to-End Ownership</h4>
              <p>Owned the end-to-end design of the onboarding flow and shaped the overall product structure across key features, including dashboard, co-buyer matching, and offer management.</p>
            </div>
            <div className="bf-role-card">
              <div className="bf-role-card-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h4>System Consistency</h4>
              <p>Directed design decisions, aligned the team on interaction patterns and system consistency, and ensured a cohesive user experience across all touchpoints.</p>
            </div>
            <div className="bf-role-card">
              <div className="bf-role-card-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <h4>Client Partnership</h4>
              <p>Acted as the primary point of contact with the client, leading weekly reviews, synthesizing feedback, and negotiating product decisions to balance user needs and business goals.</p>
            </div>
          </div>
        </div>

        {/* ═══ 3. CONTEXT ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Context</span>
            <h2 className="bf-section-heading">Context</h2>
            <p className="bf-body">BuyerFolio is a platform designed to support co-ownership, co-living, and rent-to-own housing models.</p>
            <p className="bf-body">Unlike traditional real estate platforms, sellers must navigate not only pricing and listing, but also compatibility, financial structures, and long-term agreements with co-buyers.</p>
            <p className="bf-body">This introduces a new layer of complexity that existing platforms are not designed to handle.</p>
          </div>
        </div>

        {/* ═══ 4. PROBLEM ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Problem</span>
          <h2 className="bf-section-heading">Problem</h2>
          <p className="bf-body bf-body-narrow">Selling a property in a co-ownership model introduces significantly more complexity than traditional real estate workflows.</p>
          <p className="bf-body bf-body-narrow">Sellers are required to define ownership structures, evaluate compatibility with co-buyers, and navigate financial and legal decisions, often without clear guidance.</p>
          <p className="bf-body bf-body-narrow">Existing platforms fail to support these layered decision-making processes, leading to confusion, uncertainty, and high decision pressure.</p>
          <img src={`${B}images/buyerfolio/BuyerfolioMermaidDiagram.png`} alt="Complexity diagram" className="bf-full-img bf-reveal" />
        </div>

        {/* ═══ 5. RESEARCH ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Research</span>
            <h2 className="bf-section-heading">Understanding User Behavior</h2>
            <p className="bf-body bf-body-narrow">To better understand seller challenges, I conducted competitive analysis and synthesized user behaviors through mapping and clustering exercises.</p>
            <p className="bf-body bf-body-narrow">Key insights revealed that sellers often feel overwhelmed by the complexity of co-ownership decisions and lack clear guidance throughout the process.</p>
            <div className="bf-research-grid bf-reveal">
              <img src={`${B}images/buyerfolio/BuyerfolioWorking.jpg`} alt="Team research session" />
              <img src={`${B}images/buyerfolio/BuyerfolioStickNotes.jpg`} alt="Sticky notes synthesis" />
            </div>
          </div>
        </div>

        {/* ═══ 6. INSIGHTS ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Insights</span>
          <h2 className="bf-section-heading">Key Insights</h2>
          <div className="bf-insights-grid">
            <div className="bf-insight-card">
              <span className="bf-insight-num">01</span>
              <p>Sellers struggle to understand how to structure co-ownership agreements</p>
            </div>
            <div className="bf-insight-card">
              <span className="bf-insight-num">02</span>
              <p>Compatibility between co-buyers is difficult to evaluate</p>
            </div>
            <div className="bf-insight-card">
              <span className="bf-insight-num">03</span>
              <p>Financial and legal information is complex and overwhelming</p>
            </div>
            <div className="bf-insight-card">
              <span className="bf-insight-num">04</span>
              <p>There is a lack of step-by-step guidance throughout the journey</p>
            </div>
          </div>
        </div>

        {/* ═══ 7. PRODUCT STRATEGY ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Strategy</span>
            <h2 className="bf-section-heading">Design Strategy</h2>
            <p className="bf-body bf-body-narrow">To address these challenges, the product focuses on three key principles:</p>
            <div className="bf-strategy-cards">
              <div className="bf-strategy-card">
                <h4>Guided Experience</h4>
                <p>Break complex steps into clear, manageable flows</p>
              </div>
              <div className="bf-strategy-card">
                <h4>Transparency & Trust</h4>
                <p>Provide visibility into buyer profiles, scores, and interactions</p>
              </div>
              <div className="bf-strategy-card">
                <h4>Decision Support</h4>
                <p>Help sellers make informed decisions with structured data and tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 8. SYSTEM THINKING ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Architecture</span>
          <h2 className="bf-section-heading">System Architecture</h2>
          <p className="bf-body bf-body-narrow">The platform is designed as a modular system that supports the entire seller journey, from onboarding to offer negotiation and communication.</p>
          <img src={`${B}images/buyerfolio/BuyerfolioSitemap.png`} alt="System architecture sitemap" className="bf-full-img bf-reveal" />
        </div>

        {/* ═══ 9. ONBOARDING ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Design</span>
            <h2 className="bf-section-heading">Designing a Guided Onboarding Experience</h2>
            <p className="bf-body bf-body-narrow">The onboarding flow was designed to simplify a complex process by guiding users step-by-step. Instead of overwhelming users with information, the experience gradually introduces key concepts such as property setup, co-buyer matching, and offer management.</p>
            <div className="bf-phone-row bf-reveal">
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOnboarding2.png`} alt="Onboarding step 1" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOnboarding3.png`} alt="Onboarding step 2" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOnboarding4.png`} alt="Onboarding step 3" className="bf-phone-img" />
            </div>
          </div>
        </div>

        {/* ═══ 10. DASHBOARD ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Design</span>
          <h2 className="bf-section-heading">Centralized Seller Dashboard</h2>
          <p className="bf-body bf-body-narrow">The dashboard provides a clear overview of seller progress, property performance, and ongoing interactions. It allows users to manage listings, track engagement, and access key actions quickly.</p>
          <div className="bf-phone-row bf-reveal">
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioDashboard1.png`} alt="Dashboard overview" className="bf-phone-img" />
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioDashboard2.png`} alt="Dashboard detail" className="bf-phone-img" />
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioDashboard3.png`} alt="Dashboard actions" className="bf-phone-img" />
          </div>
        </div>

        {/* ═══ 11. CO-BUYER MATCHING ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Design</span>
            <h2 className="bf-section-heading">Co-Buyer Discovery & Matching</h2>
            <p className="bf-body bf-body-narrow">To help sellers find suitable co-buyers, the platform introduces filtering, recommendation, and compatibility-based matching. AI-driven suggestions highlight the most relevant candidates, improving decision efficiency.</p>
            <div className="bf-phone-row bf-reveal">
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioCoBuyer1.png`} alt="Co-buyer discovery" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioCoBuyer2.png`} alt="Co-buyer matching" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioCoBuyer3.png`} alt="Co-buyer profile" className="bf-phone-img" />
            </div>
          </div>
        </div>

        {/* ═══ 12. OFFER SYSTEM ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Design</span>
          <h2 className="bf-section-heading">Offer Management & Negotiation</h2>
          <p className="bf-body bf-body-narrow">The offer system allows sellers to review, accept, reject, or counter offers in a structured way. Clear states and actions reduce friction and support real-time decision making.</p>
          <div className="bf-phone-row bf-reveal">
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOffer1.png`} alt="Offer review" className="bf-phone-img" />
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOffer2.png`} alt="Offer negotiation" className="bf-phone-img" />
            <PhoneImg src={`${B}images/buyerfolio/BuyerfolioOffer3.png`} alt="Offer management" className="bf-phone-img" />
          </div>
        </div>

        {/* ═══ 13. COMMUNICATION ═══ */}
        <div className="bf-gray-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Design</span>
            <h2 className="bf-section-heading">Communication & Scheduling</h2>
            <p className="bf-body bf-body-narrow">Integrated messaging and scheduling tools enable seamless interaction between sellers and potential co-buyers. Features such as chat filters, quick replies, and meeting scheduling improve communication efficiency.</p>
            <div className="bf-phone-row bf-reveal">
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioMessage1.png`} alt="Messaging" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioMessage2.png`} alt="Chat detail" className="bf-phone-img" />
              <PhoneImg src={`${B}images/buyerfolio/BuyerfolioMessage3.png`} alt="Scheduling" className="bf-phone-img" />
            </div>
          </div>
        </div>

        {/* ═══ 14. IMPACT ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Impact</span>
          <h2 className="bf-section-heading">Impact</h2>
          <p className="bf-body bf-body-narrow">This design experience simplifies a highly complex process into a structured and guided journey.</p>
          <p className="bf-body bf-body-narrow">It enables sellers to confidently navigate co-ownership decisions, improving clarity, efficiency, and trust throughout the process.</p>
        </div>

        {/* ═══ 15. REFLECTION ═══ */}
        <div className="bf-purple-band">
          <div className="bf-inner bf-reveal">
            <span className="bf-eyebrow">Reflection</span>
            <h2 className="bf-section-heading">What I Learned</h2>
            <p className="bf-body bf-body-narrow">This project strengthened my ability to translate complex business problems into user-centered solutions.</p>
            <p className="bf-body bf-body-narrow">Working with this client taught me how to balance user needs, product strategy, and stakeholder expectations, while leading a team toward a cohesive design outcome.</p>
          </div>
        </div>

        {/* ═══ 16. CLIENT FEEDBACK ═══ */}
        <div className="bf-inner bf-reveal">
          <span className="bf-eyebrow">Testimonial</span>
          <h2 className="bf-section-heading">Client Feedback</h2>
          <div className="bf-testimonial">
            <blockquote>
              "Sihang was an invaluable asset to Buyer Folio during her time as a UX/UI designer. With her creativity, keen attention to detail, and strong user-focused approach, she significantly improved the intuitiveness and engagement of our platform. I have no doubt that Sihang will thrive in any UX/UI role, and I highly recommend her!"
            </blockquote>
            <cite>— Edouard Romeus, Co-Founder & CEO, BuyerFolio</cite>
          </div>
        </div>

      </div>{/* end bf-phone-frame */}

      <div className="bf-back-strip">
        <button onClick={() => goToSection(2)} className="bf-back-btn">← Back to Portfolio</button>
      </div>
      <div className="bf-footer-wrap"><Footer /></div>
    </div>
  )
}
