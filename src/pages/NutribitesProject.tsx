import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/NutribitesProject.css'

gsap.registerPlugin(ScrollTrigger)
const B = import.meta.env.BASE_URL

export default function NutribitesProject() {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const goToSection = useCallback((index: number) => {
    navigate('/', { state: { targetSection: index } })
  }, [navigate])

  useEffect(() => {
    document.documentElement.classList.add('scrollable-page')
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.nb-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, pageRef)

    return () => {
      ctx.revert()
      document.documentElement.classList.remove('scrollable-page')
    }
  }, [])

  return (
    <div className="nb-case" ref={pageRef}>
      <Navbar goToSection={goToSection} blendMode />

      <section className="nb-hero-section">
        <div className="nb-hero-grid">
          <div className="nb-hero-left">
            <p className="nb-eyebrow">NutriBites — Website Design</p>
            <h1 className="nb-hero-title">
              Designing a product-driven ecommerce experience for NutriBites.
            </h1>
            <p className="nb-subtitle">
              Improving clarity, trust, and conversion through structured content and visual hierarchy.
            </p>
          </div>
          <div className="nb-hero-right">
            <div className="nb-meta-block">
              <h6>Overview</h6>
              <p>
                NutriBites is a pet food brand focused on healthy and nutritious products.
                This project explores how a product website can better communicate value,
                build trust, and guide users toward purchase decisions.
              </p>
            </div>
            <div className="nb-meta-block">
              <h6>Role</h6>
              <p>Lead UX/UI Designer &amp; Researcher, Individual Contributor</p>
            </div>
            <div className="nb-meta-block">
              <h6>Time</h6>
              <p>Nov 2021 – Jan 2022</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nb-cover-section nb-reveal">
        <img src={`${B}images/covers/nutribites.png`} alt="NutriBites Cover" className="nb-cover-img" />
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Problems</h2>
        </div>
        <div className="nb-section-body">
          <ul className="nb-problem-list">
            <li>Limited product visibility</li>
            <li>Product information is not clearly structured</li>
            <li>Users cannot quickly understand benefits</li>
            <li>The visual hierarchy does not guide decision-making</li>
            <li>Trust signals are not strong enough</li>
          </ul>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Users</h2>
        </div>
        <div className="nb-section-body">
          <h3 className="nb-body-title">Target Users</h3>
          <div className="nb-user-cards">
            <div className="nb-user-card">Pet owners</div>
            <div className="nb-user-card">Health-conscious buyers</div>
            <div className="nb-user-card">First-time customers exploring options</div>
          </div>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Key Insight</h2>
        </div>
        <div className="nb-section-body">
          <blockquote className="nb-insight">
            Users don&apos;t read everything — they scan, compare, and decide quickly.
            The website needs to guide attention and communicate value within seconds.
          </blockquote>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Design Strategy</h2>
        </div>
        <div className="nb-section-body">
          <div className="nb-strategy-grid">
            <div className="nb-strategy-item">
              <span className="nb-strategy-num">01</span>
              <p>Prioritize visual hierarchy for scanning</p>
            </div>
            <div className="nb-strategy-item">
              <span className="nb-strategy-num">02</span>
              <p>Highlight key product benefits early</p>
            </div>
            <div className="nb-strategy-item">
              <span className="nb-strategy-num">03</span>
              <p>Build trust through structure and clarity</p>
            </div>
            <div className="nb-strategy-item">
              <span className="nb-strategy-num">04</span>
              <p>Guide users toward clear actions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Page Structure</h2>
        </div>
        <div className="nb-section-body">
          <div className="nb-structure-list">
            {[
              { title: 'Hero Section', desc: 'Introduce product value clearly and immediately' },
              { title: 'Product Section', desc: 'Show the key products and explain key advantages in a scannable format' },
              { title: 'Trust & Credibility', desc: 'Support decisions with clear information' },
              { title: 'Refund Policy', desc: 'Important to show users they are trustable' },
              { title: 'Happy Customers / Testimonials / CTA', desc: 'Show how users love the products and guide more users toward purchase' },
            ].map((item, i) => (
              <div key={i} className="nb-structure-row">
                <span className="nb-structure-idx">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nb-full-image nb-reveal">
        <img src={`${B}images/nutribites/prototype.png`} alt="Page structure and prototype" />
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Key Design Decisions</h2>
        </div>
        <div className="nb-section-body">
          <div className="nb-decisions-grid">
            {[
              { title: 'Clear product hierarchy', desc: 'Users can quickly identify product categories and key offerings' },
              { title: 'Scannable layout', desc: 'Content is structured for fast reading instead of long paragraphs' },
              { title: 'Visual emphasis on benefits', desc: 'Key selling points are highlighted early to reduce hesitation' },
              { title: 'Simplified navigation flow', desc: 'Users can move from browsing to decision with minimal friction' },
            ].map((d, i) => (
              <div key={i} className="nb-decision-card">
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Before / After</h2>
        </div>
        <div className="nb-section-body">
          <div className="nb-ba-grid">
            <div className="nb-ba-card nb-ba-before">
              <span className="nb-ba-label">Before</span>
              <p>Only a single product is prominently displayed, requiring users to navigate manually to discover other offerings. Information is dense and hard to scan.</p>
            </div>
            <div className="nb-ba-card nb-ba-after">
              <span className="nb-ba-label">After</span>
              <p>All products are showcased directly on the homepage with clear visual hierarchy, allowing users to compare and decide at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nb-full-image nb-reveal">
        <img src={`${B}images/nutribites/homepage.png`} alt="NutriBites homepage design" />
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Conversion Thinking</h2>
        </div>
        <div className="nb-section-body">
          <p className="nb-body-text">
            The design focuses on guiding users from attention to action, using hierarchy,
            clarity, and structured content to support faster decision-making.
          </p>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>What I Learned</h2>
        </div>
        <div className="nb-section-body">
          <div className="nb-learned-list">
            <div className="nb-learned-item">
              <h4>Curved UI elements create real engineering constraints</h4>
              <p>Using rounded shapes, wave dividers, and non-rectangular sections throughout the page looked great in design — but introduced significant challenges for front-end implementation. Achieving pixel-perfect curves across breakpoints required close collaboration between design intent and CSS/SVG execution.</p>
            </div>
            <div className="nb-learned-item">
              <h4>Product visibility directly impacts conversion</h4>
              <p>Moving from a single featured product to showing all three products above the fold had the biggest impact on user engagement. Users who can see and compare options immediately are far more likely to take action.</p>
            </div>
            <div className="nb-learned-item">
              <h4>Trust needs to be designed, not assumed</h4>
              <p>Adding a visible refund policy, customer testimonials, and ingredient transparency weren&apos;t just nice-to-haves — they were essential for first-time buyers who have no prior relationship with the brand.</p>
            </div>
            <div className="nb-learned-item">
              <h4>Responsive design for content-heavy pages requires structural thinking</h4>
              <p>This wasn&apos;t just about scaling fonts and images. The information architecture itself had to adapt — reordering sections, collapsing grids, and rethinking hierarchy for smaller screens to maintain clarity and scannability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nb-section nb-reveal">
        <div className="nb-section-header">
          <h2>Reflection</h2>
        </div>
        <div className="nb-section-body">
          <p className="nb-body-text">
            This project reinforced the importance of designing for decision-making,
            not just visual presentation. In product-driven websites, clarity and hierarchy
            directly impact user confidence and conversion.
          </p>
        </div>
      </section>

      <div className="nb-back-strip">
        <button onClick={() => goToSection(2)} className="nb-back-btn">← Back to Portfolio</button>
      </div>
      <div className="nb-footer-wrap"><Footer /></div>
    </div>
  )
}
