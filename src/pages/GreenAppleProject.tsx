import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/GreenAppleProject.css'

gsap.registerPlugin(ScrollTrigger)
const B = import.meta.env.BASE_URL

const IconAlert = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>
)
const IconTarget = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
)
const IconRole = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const IconList = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="4" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const IconBolt = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/></svg>
)
const IconUsers = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><circle cx="9" cy="7" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="18" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M18 13.5c2.5.5 4 2 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const IconBulb = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M9 21h6M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const IconMap = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="9" y1="3" x2="9" y2="18" stroke="currentColor" strokeWidth="1.5"/><line x1="15" y1="6" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>
)
const IconFilter = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M3 4h18M7 9h10M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
const IconLayout = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/><line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>
)
const IconFile = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
)
const IconPhone = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)
const IconTrend = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M23 6l-9.5 9.5-5-5L1 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 6h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const IconHeart = () => (
  <svg viewBox="0 0 24 24" className="ga-icon"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
)
export default function GreenAppleProject() {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const goToSection = useCallback((index: number) => {
    navigate('/', { state: { targetSection: index } })
  }, [navigate])

  useEffect(() => {
    document.documentElement.classList.add('scrollable-page')
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ga-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, pageRef)
    return () => { ctx.revert(); document.documentElement.classList.remove('scrollable-page') }
  }, [])

  return (
    <div className="ga-page" ref={pageRef}>
      <Navbar goToSection={goToSection} blendMode />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO (textured gray background)
          ═══════════════════════════════════════════ */}
      <section className="ga-hero">
        <div className="ga-hero-left">
          <img src={`${B}images/greenapple/logo.png`} alt="Green Apple Art Center" className="ga-hero-logo" />
          <h1 className="ga-hero-title">Green Apple</h1>
          <div className="ga-hero-meta-row">
            <div className="ga-hero-meta-item">
              <span className="ga-meta-label">Role</span>
              <span className="ga-meta-value">Product Designer</span>
            </div>
            <div className="ga-hero-meta-item">
              <span className="ga-meta-label">Scope</span>
              <span className="ga-meta-value">UX/UI Design, Information Architecture, Website Redesign</span>
            </div>
            <div className="ga-hero-meta-item">
              <span className="ga-meta-label">Timeline</span>
              <span className="ga-meta-value">3 Months</span>
            </div>
          </div>
        </div>
        <div className="ga-hero-right">
          <img src={`${B}images/greenapple/hero-desktop.png`} alt="Green Apple homepage mockup" className="ga-hero-mockup" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: PROJECT OVERVIEW (white background)
          Contains: Overview, Pain Points, User Groups, Key Insight
          ═══════════════════════════════════════════ */}
      <div className="ga-band">
        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <p className="ga-script-label">The project itself :</p>
            <h2 className="ga-section-title">Project Overview</h2>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              Green Apple Art Center is a Vancouver-based visual arts education platform offering programs
              for students, hobbyists, and professionals. The goal of this redesign was to simplify how users
              explore programs, understand offerings, and make enrollment decisions.
            </p>
          </div>
        </div>

        <div className="ga-divider" />

        <div className="ga-sub-row ga-reveal">
          <div className="ga-sub-card">
            <IconAlert />
            <h4>Problem:</h4>
            <p>Users struggled to navigate the content-rich platform, understand differences between programs, and make enrollment decisions efficiently.</p>
          </div>
          <div className="ga-sub-card">
            <IconTarget />
            <h4>Goal:</h4>
            <p>Redesign the platform to simplify program discovery, improve information architecture, and guide users toward confident enrollment decisions.</p>
          </div>
        </div>

        <div className="ga-divider" />

        <div className="ga-sub-row ga-reveal">
          <div className="ga-sub-card">
            <IconRole />
            <h4>My role:</h4>
            <p>Product Designer leading the website redesign, responsible for UX research, information architecture, and UI design.</p>
          </div>
          <div className="ga-sub-card">
            <IconList />
            <h4>Responsibilities:</h4>
            <div className="ga-resp-cols">
              <ul>
                <li>User research</li>
                <li>Information architecture</li>
                <li>Wireframing</li>
              </ul>
              <ul>
                <li>Visual design</li>
                <li>Prototyping</li>
                <li>Responsive design</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ga-full-img ga-reveal">
          <img src={`${B}images/greenapple/old-website.png`} alt="Original Green Apple website" />
          <span className="ga-img-caption">The original website before redesign</span>
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconBolt />
            <h3 className="ga-subsection-title">Pain Points</h3>
          </div>
          <div className="ga-section-right">
            <div className="ga-numbered-grid">
              <div>
                <span className="ga-circle-num">①</span>
                <h4>Navigation:</h4>
                <p>Users couldn't easily find classes that fit their level and goals across fragmented pages.</p>
              </div>
              <div>
                <span className="ga-circle-num">②</span>
                <h4>Comparison:</h4>
                <p>No clear way to understand differences between programs or compare options side by side.</p>
              </div>
              <div>
                <span className="ga-circle-num">③</span>
                <h4>Decision-making:</h4>
                <p>Information overload made it difficult to commit to enrollment decisions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconUsers />
            <h3 className="ga-subsection-title">User Groups</h3>
            <p className="ga-section-aside">Three primary audiences with distinct goals and skill levels.</p>
          </div>
          <div className="ga-section-right">
            <div className="ga-persona-card">
              <div className="ga-persona-row">
                <div>
                  <h4>Aspiring Students <span className="ga-persona-age">15–22</span></h4>
                  <p>Preparing portfolios for art school applications. Need clear program pathways and skill-level matching.</p>
                </div>
                <div>
                  <h4>Adult Learners <span className="ga-persona-age">30–60</span></h4>
                  <p>Exploring art as a hobby or skill development. Need flexible scheduling and approachable entry points.</p>
                </div>
                <div>
                  <h4>Art Professionals <span className="ga-persona-age">Educators</span></h4>
                  <p>Seeking collaboration and advanced learning. Need detailed program information and instructor credentials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconBulb />
            <h3 className="ga-subsection-title">Key Insight</h3>
            <p className="ga-section-aside">The core realization that shaped the redesign direction.</p>
          </div>
          <div className="ga-section-right">
            <blockquote className="ga-quote">
              "Users don't just browse — they decide. They are actively trying to answer:
              Which class is right for me? What level should I start at? How do I compare options?"
            </blockquote>
            <p className="ga-body">The experience needed to shift from content browsing → <strong>guided decision-making.</strong></p>
          </div>
        </div>

        <div className="ga-full-img ga-reveal">
          <img src={`${B}images/greenapple/sticky-notes.jpg`} alt="Research sticky notes" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3: INFORMATION ARCHITECTURE (light gray background)
          Contains: Sitemap
          ═══════════════════════════════════════════ */}
      <div className="ga-section ga-reveal">
        <div className="ga-section-left">
          <p className="ga-script-label">The project schematically :</p>
          <h2 className="ga-section-title">Information Architecture</h2>
        </div>
        <div className="ga-section-right">
          <p className="ga-body">
            To reduce cognitive load, I reorganized the platform into four clear pillars: Programs, Events,
            Student Showcase, and Store. This simplification helped users form clear mental models of the platform.
          </p>
        </div>
      </div>

      <div className="ga-divider" />

      <div className="ga-section ga-reveal">
        <div className="ga-section-left">
          <IconMap />
          <h3 className="ga-subsection-title">Sitemap</h3>
          <p className="ga-section-aside">A structured scheme that outlines the pages and content hierarchy of the platform.</p>
        </div>
        <div className="ga-section-right">
          <p className="ga-body">
            I reorganized the platform into four clear pillars, reducing the number of top-level navigation items
            and creating intuitive pathways for each user group.
          </p>
        </div>
      </div>

      <div className="ga-full-img ga-reveal">
        <img src={`${B}images/greenapple/sitemap.png`} alt="Site map" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 4: STARTING THE DESIGN (white background)
          Contains: Navigation, Homepage, Program Pages, Supporting Pages, Mobile
          ═══════════════════════════════════════════ */}
      <div className="ga-band">
        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <p className="ga-script-label">The project schematically :</p>
            <h2 className="ga-section-title">Starting the Design</h2>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              I began by designing a unified filtering system and progressive content layout that guides users
              from discovery to enrollment, then created wireframes and high-fidelity mockups for every page.
            </p>
          </div>
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconFilter />
            <h3 className="ga-subsection-title">Navigation System</h3>
            <p className="ga-section-aside">A consistent filtering approach across the entire platform.</p>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              A unified filtering system was introduced with four dimensions: Student Level, Program Type,
              Creative Gather (Events), and Learning Mode (Online / In-person). This allows users to quickly
              narrow down options from the homepage.
            </p>
          </div>
        </div>

        <div className="ga-full-img ga-reveal">
          <img src={`${B}images/greenapple/homepage-structure.png`} alt="Homepage filter UI structure" />
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconLayout />
            <h3 className="ga-subsection-title">Homepage Design</h3>
            <p className="ga-section-aside">Guiding users from discovery to action through structured content.</p>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">The homepage was redesigned to support a clear journey from exploration to conversion.</p>
            <div className="ga-numbered-grid ga-numbered-grid-4">
              <div>
                <span className="ga-circle-num">①</span>
                <h4>Discover programs</h4>
                <p>Surface key offerings immediately</p>
              </div>
              <div>
                <span className="ga-circle-num">②</span>
                <h4>Explore student work</h4>
                <p>Build trust through real results</p>
              </div>
              <div>
                <span className="ga-circle-num">③</span>
                <h4>Check events</h4>
                <p>Encourage engagement</p>
              </div>
              <div>
                <span className="ga-circle-num">④</span>
                <h4>Convert through CTA</h4>
                <p>Guide toward enrollment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ga-homepage-showcase ga-reveal">
          <img src={`${B}images/greenapple/homepage.png`} alt="Green Apple homepage design" />
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconFile />
            <h3 className="ga-subsection-title">Program Pages</h3>
            <p className="ga-section-aside">Helping users understand and choose the right program.</p>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              Programs are structured by age group, skill level, and learning goals. Each program page provides
              clear schedule selection, instructor information, required materials, and a direct enrollment CTA.
            </p>
          </div>
        </div>

        <div className="ga-img-pair ga-reveal">
          <div className="ga-full-img"><img src={`${B}images/greenapple/program-page.png`} alt="Program page wireframe" /></div>
          <div className="ga-full-img"><img src={`${B}images/greenapple/program-page-color.png`} alt="Program page final" /></div>
        </div>
        <div className="ga-img-pair ga-reveal">
          <div className="ga-full-img"><img src={`${B}images/greenapple/program-individual.png`} alt="Individual program wireframe" /></div>
          <div className="ga-full-img"><img src={`${B}images/greenapple/program-individual-color.png`} alt="Individual program final" /></div>
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconHeart />
            <h3 className="ga-subsection-title">Supporting Pages</h3>
            <p className="ga-section-aside">Building a complete learning ecosystem beyond programs.</p>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              Additional features — Student Showcase, Events, and Store — support the full learning journey,
              building trust, encouraging engagement, and simplifying material preparation.
            </p>
          </div>
        </div>

        <div className="ga-img-pair ga-reveal">
          <div className="ga-full-img"><img src={`${B}images/greenapple/showcase.png`} alt="Student showcase" /></div>
          <div className="ga-full-img"><img src={`${B}images/greenapple/shop.png`} alt="Shop page" /></div>
        </div>

        <div className="ga-full-img ga-reveal">
          <img src={`${B}images/greenapple/shop-color.png`} alt="Shop page final design" />
        </div>

        <div className="ga-divider" />

        <div className="ga-section ga-reveal">
          <div className="ga-section-left">
            <IconPhone />
            <h3 className="ga-subsection-title">Mobile Experience</h3>
            <p className="ga-section-aside">Optimized for mobile browsing with simplified layout and scroll-based navigation.</p>
          </div>
          <div className="ga-section-right">
            <p className="ga-body">
              The experience was adapted for mobile with simplified layout, scroll-based navigation, and prioritized
              content hierarchy to maintain clarity on smaller screens.
            </p>
          </div>
        </div>

        <div className="ga-full-img ga-reveal">
          <img src={`${B}images/greenapple/mobile.png`} alt="Mobile design" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 5: OUTCOME (light gray background)
          Contains: Takeaways, Impact, What I learned (NO next steps)
          ═══════════════════════════════════════════ */}
      <div className="ga-section ga-reveal">
        <div className="ga-section-left">
          <p className="ga-script-label">The project schematically :</p>
          <h2 className="ga-section-title">Outcome</h2>
        </div>
        <div className="ga-section-right">
          <p className="ga-body">
            This project strengthened my ability to design for complex content platforms,
            transforming overwhelming information into guided, decision-oriented experiences.
          </p>
        </div>
      </div>

      <div className="ga-divider" />

      <div className="ga-outcome-row ga-reveal">
        <div>
          <IconTrend />
          <h4>Takeaways</h4>
          <p>Designing information architecture for complex, multi-audience content requires deep empathy and structural thinking.</p>
        </div>
        <div>
          <IconTrend />
          <h4>Impact</h4>
          <p>The redesigned platform provides clearer navigation, faster program discovery, and a more confident enrollment experience.</p>
        </div>
        <div>
          <IconBulb />
          <h4>What I learned</h4>
          <p>Content-heavy platforms need guided journeys, not just organized pages. Scalable navigation systems are essential for growing content.</p>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="ga-back-strip">
        <button onClick={() => goToSection(2)} className="ga-back-btn">← Back to Portfolio</button>
      </div>
      <div className="ga-footer-wrap"><Footer /></div>
    </div>
  )
}
