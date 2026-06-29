import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/EastsidePage.css'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL

function EBGNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`ebg-navbar${scrolled ? ' ebg-navbar--scrolled' : ''}`}>
      <div className="ebg-navbar__inner">
        <button className="ebg-navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={`${BASE}images/eastside/ebg-logo.png`} alt="Eastside Builders Group" className="ebg-navbar__logo-img" />
        </button>

        <nav className="ebg-navbar__links">
          <button onClick={() => scrollTo('ebg-services')}>Services</button>
          <button onClick={() => scrollTo('ebg-why')}>About</button>
          <button onClick={() => scrollTo('ebg-area')}>Where We Work</button>
          <button onClick={() => scrollTo('ebg-stories')}>Reviews</button>
        </nav>

        <a href="tel:4252727169" className="ebg-navbar__cta">
          Book Free Consultation
        </a>

        <button className="ebg-navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {menuOpen && (
        <div className="ebg-navbar__mobile-menu">
          <button onClick={() => scrollTo('ebg-services')}>Services</button>
          <button onClick={() => scrollTo('ebg-why')}>About</button>
          <button onClick={() => scrollTo('ebg-area')}>Where We Work</button>
          <button onClick={() => scrollTo('ebg-stories')}>Reviews</button>
          <a href="tel:4252727169" className="ebg-navbar__cta ebg-navbar__cta--mobile">
            (425) 272-7169
          </a>
        </div>
      )}
    </header>
  )
}

function EBGFooter() {
  return (
    <footer className="ebg-footer">
      <div className="ebg-footer__top">
        <div className="ebg-footer__brand">
          <img src={`${BASE}images/eastside/ebg-logo.png`} alt="Eastside Builders Group" className="ebg-footer__logo-img" />
          <p className="ebg-footer__tagline">Design with Intention.<br />Build with Precision.</p>
        </div>

        <div className="ebg-footer__col">
          <h4>Our Services</h4>
          <ul>
            <li>Kitchen Remodels</li>
            <li>Bathroom Remodels</li>
            <li>Additions</li>
            <li>ADU / DADU Construction</li>
            <li>Exterior Remodels</li>
            <li>New Build</li>
          </ul>
        </div>

        <div className="ebg-footer__col">
          <h4>Service Area</h4>
          <ul>
            <li>Kirkland · Bellevue</li>
            <li>Sammamish · Issaquah</li>
            <li>Redmond · Bothell</li>
            <li>Mercer Island · Woodinville</li>
            <li>Seattle Metro · Lynnwood</li>
            <li>Shoreline · Burien · Snohomish</li>
          </ul>
        </div>

        <div className="ebg-footer__col">
          <h4>Hours</h4>
          <ul>
            <li>Mon – Fri: 6 AM – 6 PM</li>
            <li>Saturday: 8 AM – 3 PM</li>
            <li>Sunday: Closed</li>
          </ul>
          <h4 style={{ marginTop: '24px' }}>Contact</h4>
          <ul>
            <li>
              <a href="tel:4252727169">(425) 272-7169</a>
            </li>
            <li>
              <a href="mailto:Info@Workwithebg.com">Info@Workwithebg.com</a>
            </li>
            <li>11447 120th Ave NE Unit 300<br />Kirkland WA, 98033</li>
          </ul>
        </div>
      </div>

      <div className="ebg-footer__bottom">
        <span>&copy; {new Date().getFullYear()} Eastside Builders Group. All rights reserved.</span>
        <span className="ebg-footer__note">
          This is a concept redesign — not affiliated with the official site.{' '}
          <a href="https://www.workwithebg.com" target="_blank" rel="noopener noreferrer">
            Visit workwithebg.com →
          </a>
        </span>
      </div>
    </footer>
  )
}

export default function EastsidePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('scrollable-page')
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, pageRef)

    return () => {
      ctx.revert()
      document.documentElement.classList.remove('scrollable-page')
    }
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('ebg-stories')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="eastside-page" ref={pageRef}>

      <EBGNavbar />

      {/* ═══ HERO — Window 1 ═══ */}
      <div className="window-section">
        <div className="fixed-bg bg-color-1" style={{ backgroundImage: `url(${BASE}images/eastside/ebg-hero.png)` }} />
        <div className="glass-overlay" />
        <div className="content-layer text-center items-center">
          <p className="text-[10px] tracking-[0.6em] uppercase opacity-50 mb-6">Kirkland, WA · General Contractor</p>
          <h1 className="text-8xl serif font-800 mb-6 tracking-tight leading-none">
            EASTSIDE<br />BUILDERS<br />GROUP
          </h1>
          <p className="text-base opacity-70 font-light max-w-md mb-10 leading-relaxed">
            Design with intention.<br />Build with precision.
          </p>
          <a
            href="tel:4252727169"
            className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase font-bold mb-8 inline-block"
          >
            Book a Free Consultation
          </a>
          <div className="w-px h-16 bg-white/30 mb-4" />
          <span className="text-[10px] tracking-[0.6em] uppercase opacity-40">Begin Scrolling</span>
        </div>
      </div>

      {/* ═══ OVERVIEW — White Section 1 ═══ */}
      <div className="relative bg-white text-black py-32 px-10 md:px-24 z-[50]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="accent-bar scroll-reveal" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 scroll-reveal">Who We Are</p>
            <h2 className="text-5xl serif font-700 leading-tight mb-8 scroll-reveal tracking-tight">
              A Home That Reflects Your <span className="accent">Vision</span> and Lifestyle.
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed text-sm scroll-reveal">
              At Eastside Builders Group, we understand the importance of a home that reflects your
              unique vision and lifestyle. Our sophisticated approach to design and construction ensures
              that every project embodies elegance and functionality. We transform spaces — from
              intricate <strong className="text-gray-700">kitchen remodels</strong> to expansive{' '}
              <strong className="text-gray-700">whole-house renovations</strong> — with a focus on
              high-end materials and meticulous attention to detail.
            </p>
            <div className="flex items-center gap-6 mb-10 scroll-reveal">
              <span className="px-8 py-3 bg-black text-white rounded-full text-[10px] uppercase font-bold">
                Kirkland, WA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest border-b border-black">
                (425) 272-7169
              </span>
            </div>
            <div className="flex gap-2 flex-wrap scroll-reveal">
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Kitchen Remodel</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Bathroom Remodel</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Additions</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">ADU / DADU</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Exterior Remodel</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">New Build</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl scroll-reveal">
            <img src={`${BASE}images/builder/tablet.jpg`} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </div>

      {/* ═══ Windows 2–4 ═══ */}

      {/* Window 2 — Our Services */}
      <div id="ebg-services" className="window-section stack-gap">
        <div className="fixed-bg bg-color-2" style={{ backgroundImage: `url(${BASE}images/builder/urban.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Our Services</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            Every Space,<br /><span className="accent">Every Scale.</span>
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            From a bathroom refresh to a ground-up custom home, we bring the same precision
            and craft to every project. Our teams are specialists — not generalists.
          </p>
          <div className="service-grid mb-8">
            <div className="service-pill">Kitchen</div>
            <div className="service-pill">Bathroom</div>
            <div className="service-pill">Additions</div>
            <div className="service-pill">ADU / DADU</div>
            <div className="service-pill">Exterior</div>
            <div className="service-pill">New Build</div>
          </div>
          <div className="flex gap-4">
            <a href="tel:4252727169" className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase font-bold">
              Get a Free Quote
            </a>
          </div>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 3 — Where We Work */}
      <div id="ebg-area" className="window-section stack-gap">
        <div className="fixed-bg bg-color-3" style={{ backgroundImage: `url(${BASE}images/builder/space.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Service Area</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            Where We<br />Work.
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            Based in Kirkland, WA, we serve dozens of Seattle-area neighborhoods —
            bringing craftsmanship to communities across the Eastside and beyond.
          </p>
          <div className="city-tags">
            {[
              'Kirkland', 'Bellevue', 'Sammamish', 'Issaquah', 'Redmond',
              'Bothell', 'Mercer Island', 'Woodinville', 'Newcastle',
              'Seattle Metro', 'Lynnwood', 'Shoreline', 'Burien', 'Snohomish',
            ].map((city) => (
              <span key={city} className="city-tag">{city}</span>
            ))}
          </div>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 4 — Craftsmanship */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-4" style={{ backgroundImage: `url(${BASE}images/builder/desert.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Our Approach</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            Every Detail,<br /><span className="accent">Masterful.</span>
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            Our dedicated team is committed to delivering not just structures, but masterpieces
            that stand the test of time. We prioritize collaboration with our clients, ensuring
            aspirations are at the forefront of every design decision.
          </p>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* ═══ WHY CHOOSE US — White Section 2 ═══ */}
      <div id="ebg-why" className="relative bg-white text-black py-32 px-10 md:px-24 z-[60] rounded-t-[40px] stack-gap">
        <div className="max-w-7xl mx-auto">

          <div className="mb-20">
            <div className="accent-bar scroll-reveal" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 scroll-reveal">Why Choose Us</p>
            <h2 className="text-5xl serif font-700 mb-6 scroll-reveal tracking-tight">
              A Contractor You Can <span className="accent">Actually Trust.</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-xl leading-relaxed scroll-reveal">
              We&apos;ve built our reputation on three things: honest pricing, hands-on project
              management, and putting the client first — every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">01</div>
              <h3 className="text-lg font-bold mb-3 serif">Transparent Pricing</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                You&apos;ll always receive <strong className="text-gray-600">clear, upfront estimates</strong> with
                no hidden fees. No surprise line items at the end of the project — we show you
                exactly what you&apos;re paying for and why.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">02</div>
              <h3 className="text-lg font-bold mb-3 serif">Onsite Project Managing</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                A dedicated project manager is <strong className="text-gray-600">on site every day</strong>,
                overseeing daily operations, managing timelines, and ensuring quality at every stage.
                Your one point of contact from start to finish.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">03</div>
              <h3 className="text-lg font-bold mb-3 serif">You Come First</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Your vision, your needs, and your satisfaction are our top priority. We deliver a
                <strong className="text-gray-600"> seamless, personalized experience</strong> every step
                of the way — from the first consultation to the final walkthrough.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center py-16 bg-black rounded-3xl scroll-reveal">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Ready to Start?</p>
            <h3 className="text-4xl serif font-700 text-white mb-6 tracking-tight">
              Let&apos;s Build Something <span className="accent">Remarkable.</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
              Book a free consultation and take the first step toward your dream home.
              Our team is available Monday – Friday, 6 AM – 6 PM.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <a href="tel:4252727169" className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase font-bold">
                Call (425) 272-7169
              </a>
              <a href="mailto:Info@Workwithebg.com" className="px-10 py-4 border border-white/30 text-white rounded-full text-[10px] uppercase font-bold">
                Email Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ Windows 5–6 ═══ */}

      {/* Window 5 — Impact Stats */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-5" style={{ backgroundImage: `url(${BASE}images/builder/pool.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer items-center text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">By the Numbers</p>
          <div className="flex gap-16 mb-12 flex-wrap justify-center">
            <div>
              <div className="text-5xl serif font-800">14+</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Cities Served</div>
            </div>
            <div>
              <div className="text-5xl serif font-800">4K</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Sq Ft Custom Homes</div>
            </div>
            <div>
              <div className="text-5xl serif font-800">5★</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Client Reviews</div>
            </div>
          </div>
          <p className="max-w-lg text-gray-300 font-light italic leading-relaxed text-sm">
            &ldquo;Despite unanticipated circumstances, including over half a million power outages
            causing some delays, we moved into our beautiful home — truly making this a dream come true.&rdquo;
          </p>
          <p className="text-[10px] uppercase tracking-widest opacity-30 mt-4">— Shiva N., Custom Home Client</p>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 6 — Closing CTA */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-6" style={{ backgroundImage: `url(${BASE}images/builder/villa2.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer items-center text-center">
          <h2 className="text-7xl serif font-800 mb-8 tracking-tight leading-none max-w-4xl">
            Build the Home<br />You&apos;ve Always<br /><span className="accent">Imagined.</span>
          </h2>
          <p className="max-w-lg text-gray-300 mb-10 font-light leading-relaxed text-sm">
            We&apos;re based in Kirkland, WA and serve the greater Seattle area.
            Reach out today — consultations are always free.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="tel:4252727169" className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase font-bold">
              Book a Free Consultation
            </a>
            <button onClick={scrollToContact} className="px-10 py-4 border border-white/40 text-white rounded-full text-[10px] uppercase font-bold">
              See Reviews
            </button>
          </div>
        </div>
      </div>

      {/* ═══ CUSTOMER STORIES ═══ */}
      <div id="ebg-stories" className="relative bg-white text-black py-32 px-10 md:px-24 z-[70] rounded-t-[40px] stack-gap">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="accent-bar scroll-reveal" />
              <h2 className="text-5xl serif mb-4 scroll-reveal">What Clients Say</h2>
              <p className="text-xs text-gray-400 scroll-reveal">Real reviews from homeowners across the Eastside.</p>
            </div>
            <a
              href="https://www.workwithebg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-black text-white rounded-full text-[10px] uppercase font-bold scroll-reveal"
            >
              Read More →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-modern.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-2">Jen M.</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Kitchen & Bath</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Remodel</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                &ldquo;Their pricing is competitive; their communication is quick and responsive and the project
                itself stayed close to the projected timeline. Any challenges were met with transparency
                and honesty. We would hire them again.&rdquo;
              </p>
            </div>

            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-spanish.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-2">Delicia D.</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Exterior</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Siding & Windows</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                &ldquo;Jose did an amazing job explaining the entire process and made the material selection
                process easy. We replaced all windows and redid the entire siding with Hardi.
                I would recommend them to my family.&rdquo;
              </p>
            </div>

            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-victorian.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-2">Shiva N.</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Custom Build</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">4,000 sq ft</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                &ldquo;They fixed my broken foundation, built a retaining wall for a 10-foot slope, and
                completed the structure in just 3.5 months. We moved into our beautiful home —
                truly making this a dream come true.&rdquo;
              </p>
            </div>

            <div className="bg-black text-white rounded-3xl overflow-hidden p-8 scroll-reveal flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Ready to Start?</p>
              <h3 className="text-3xl serif font-700 mb-4 tracking-tight">
                Your Story<br />Starts <span className="accent">Here.</span>
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-xs">
                Based in Kirkland, WA. Serving the greater Seattle area.
                Monday – Friday 6 AM – 6 PM · Saturday 8 AM – 3 PM.
              </p>
              <a
                href="tel:4252727169"
                className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase font-bold"
              >
                (425) 272-7169
              </a>
              <p className="text-[10px] text-gray-600 mt-4">11447 120th Ave NE Unit 300, Kirkland WA 98033</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="eastside-footer-wrap">
        <EBGFooter />
      </div>

    </div>
  )
}
