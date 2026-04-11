import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/BuilderProject.css'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL

export default function BuilderProject() {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const goToSection = useCallback((index: number) => {
    navigate('/', { state: { targetSection: index } })
  }, [navigate])

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

  return (
    <div className="builder-page" ref={pageRef}>

      <Navbar goToSection={goToSection} blendMode />

      {/* ═══ HERO — Window 1 ═══ */}
      <div className="window-section">
        <div className="fixed-bg bg-color-1" style={{ backgroundImage: `url(${BASE}images/builder/villa.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer text-center items-center">
          <p className="text-[10px] tracking-[0.6em] uppercase opacity-50 mb-6">Case Study · Web Design</p>
          <h1 className="text-8xl serif font-800 mb-6 tracking-tight leading-none">
            RIDGELINE<br />HOMES
          </h1>
          <p className="text-base opacity-70 font-light max-w-md mb-10 leading-relaxed">
            Transforming a static construction website into an
            immersive, scroll-driven digital experience.
          </p>
          <div className="w-px h-20 bg-white/30 mb-4" />
          <span className="text-[10px] tracking-[0.6em] uppercase opacity-40">Begin Scrolling</span>
        </div>
      </div>

      {/* ═══ OVERVIEW — White Section 1 ═══ */}
      <div className="relative bg-white text-black py-32 px-10 md:px-24 z-[50]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="accent-bar scroll-reveal" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 scroll-reveal">Project Overview</p>
            <h2 className="text-5xl serif font-700 leading-tight mb-8 scroll-reveal tracking-tight">
              A Builder&apos;s Website Should Feel as <span className="accent">Crafted</span> as the Homes They Build.
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed text-sm scroll-reveal">
              Ridgeline Homes is a premium residential construction firm
              known for meticulous craftsmanship. Their existing site was a
              template-driven layout — static hero banners, flat grids, and stock
              photography that made them invisible among competitors. I redesigned
              it into an immersive experience using <strong className="text-gray-700">layered card architecture</strong>,
              frosted glass overlays, and fixed-background parallax that mirrors
              the process of walking through a building under construction.
            </p>
            <div className="flex items-center gap-6 mb-10 scroll-reveal">
              <span className="px-8 py-3 bg-black text-white rounded-full text-[10px] uppercase font-bold">
                Lead Designer &amp; Developer
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest border-b border-black">
                8 Weeks
              </span>
            </div>
            <div className="flex gap-2 flex-wrap scroll-reveal">
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Web Design</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Scroll Animation</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">Front-End Dev</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[8px] font-bold uppercase">GSAP</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl scroll-reveal">
            <img src={`${BASE}images/builder/tablet.jpg`} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </div>

      {/* ═══ Windows 2–4 — THREE CONSECUTIVE ═══ */}

      {/* Window 2 — The Problem */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-2" style={{ backgroundImage: `url(${BASE}images/builder/urban.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">The Problem</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            Static Pages<br />Can&apos;t Sell<br /><span className="accent">Dynamic</span> Spaces.
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            Traditional builder websites rely on flat layouts that strip away
            the emotional power of architecture. When every competitor uses the
            same template, the craftsmanship disappears.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase font-bold">See the Solution</button>
            <button className="px-8 py-3 border border-white rounded-full text-[10px] uppercase font-bold">How I Built It</button>
          </div>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 3 — The Window Effect */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-3" style={{ backgroundImage: `url(${BASE}images/builder/space.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Core Technique</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            The Window<br />Effect.
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            Each section acts as a viewport — a window into the architecture.
            Sticky positioning and fixed backgrounds make sections stack and
            cover one another as you scroll, like rooms being revealed.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-full text-[10px] uppercase font-bold">Explore the Build</button>
          </div>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 4 — Detail */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-4" style={{ backgroundImage: `url(${BASE}images/builder/desert.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Craftsmanship</p>
          <h2 className="text-7xl serif font-800 mb-6 tracking-tight leading-none">
            Every Detail,<br /><span className="accent">Refined.</span>
          </h2>
          <p className="max-w-md text-gray-300 mb-8 font-light leading-relaxed text-sm">
            From the subtle shadow separating each layer to the precise
            transparency of glass overlays — every pixel serves the experience.
            The rounded corners echo the curves of modern architecture.
          </p>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* ═══ PROCESS — White Section 2 ═══ */}
      <div className="relative bg-white text-black py-32 px-10 md:px-24 z-[60] rounded-t-[40px] stack-gap">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-20">
            <div className="accent-bar scroll-reveal" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 scroll-reveal">Design &amp; Engineering Process</p>
            <h2 className="text-5xl serif font-700 mb-6 scroll-reveal tracking-tight">
              From <span className="accent">Template</span> to Immersive.
            </h2>
            <p className="text-sm text-gray-400 max-w-xl leading-relaxed scroll-reveal">
              This wasn&apos;t just a visual redesign — it was a ground-up
              rethinking of how a builder&apos;s story unfolds through scroll-driven
              interaction. Every design decision was backed by a deliberate
              engineering strategy.
            </p>
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-10 mb-24">
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-10 scroll-reveal">
              <span className="px-4 py-1.5 bg-gray-200 rounded-full text-[9px] font-bold uppercase text-gray-500 inline-block mb-8">Before — The Old Website</span>
              <ul className="space-y-5 text-sm text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="text-red-300 mt-0.5 text-lg">✗</span>
                  <span><strong className="text-gray-600">Static hero banner</strong> with stock photography — zero visual impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 mt-0.5 text-lg">✗</span>
                  <span><strong className="text-gray-600">Flat grid gallery</strong> with no depth, hierarchy, or storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 mt-0.5 text-lg">✗</span>
                  <span><strong className="text-gray-600">No scroll interaction</strong> — the page feels lifeless and forgettable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 mt-0.5 text-lg">✗</span>
                  <span><strong className="text-gray-600">Poor readability</strong> — text competing with busy backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 mt-0.5 text-lg">✗</span>
                  <span><strong className="text-gray-600">Template layout</strong> — identical to every competitor online</span>
                </li>
              </ul>
            </div>
            <div className="bg-black text-white rounded-3xl overflow-hidden p-10 scroll-reveal">
              <span className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-bold uppercase text-white inline-block mb-8">After — The Redesign</span>
              <ul className="space-y-5 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="accent mt-0.5 text-lg">✓</span>
                  <span><strong className="text-white">Sticky card stacking</strong> with window reveal parallax effect</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="accent mt-0.5 text-lg">✓</span>
                  <span><strong className="text-white">Full-bleed backgrounds</strong> with fixed attachment for depth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="accent mt-0.5 text-lg">✓</span>
                  <span><strong className="text-white">GSAP ScrollTrigger</strong> — silky smooth content reveals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="accent mt-0.5 text-lg">✓</span>
                  <span><strong className="text-white">Frosted glass overlays</strong> — crisp text on any photograph</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="accent mt-0.5 text-lg">✓</span>
                  <span><strong className="text-white">Layered card architecture</strong> — cinematic depth and progression</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Engineering Deep Dive */}
          <div className="mb-16">
            <div className="accent-bar scroll-reveal" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 scroll-reveal">Engineering Deep Dive</p>
            <h3 className="text-5xl serif font-700 mb-3 scroll-reveal tracking-tight">
              A Front-End <span className="accent">Engineer&apos;s</span> Mindset,<br />Not Just a Designer&apos;s Eye.
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mb-14 scroll-reveal leading-relaxed">
              Every visual technique required deliberate engineering — from CSS
              architecture and compositing layers to animation performance and
              scroll physics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">01</div>
              <h3 className="text-lg font-bold mb-3 serif">Sticky Card Stacking</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Each section uses <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">position: sticky; top: 0</code> to
                stack through the browser&apos;s natural rendering. The 40px border-radius
                and deep box-shadow create a physical card illusion — <strong className="text-gray-600">pure CSS,
                no JavaScript positioning.</strong>
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">02</div>
              <h3 className="text-lg font-bold mb-3 serif">Fixed Background Parallax</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">background-attachment: fixed</code> pins
                each background to the viewport. Combined with overflow: hidden,
                this creates the &ldquo;window reveal&rdquo; illusion — <strong className="text-gray-600">the frame moves
                but the world behind stands still.</strong>
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">03</div>
              <h3 className="text-lg font-bold mb-3 serif">Frosted Glass System</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">backdrop-filter: blur()</code> with
                semi-transparent overlay ensures text readability against complex
                photography. <strong className="text-gray-600">An accessibility decision that maintains
                WCAG contrast ratios</strong> while preserving immersion.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">04</div>
              <h3 className="text-lg font-bold mb-3 serif">GSAP ScrollTrigger</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                GSAP drives content animations — fading text in with y-offset as
                sections enter the viewport. <strong className="text-gray-600">toggleActions enables reverse
                on scroll-back</strong> for a tactile, responsive experience connected
                to user input.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">05</div>
              <h3 className="text-lg font-bold mb-3 serif">Performance Engineering</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                GPU-accelerated transforms, <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">will-change</code> hints,
                and efficient composite layers <strong className="text-gray-600">maintain 60fps</strong> even with
                multiple sticky sections and effects running simultaneously.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 scroll-reveal border border-gray-100">
              <div className="eng-number">06</div>
              <h3 className="text-lg font-bold mb-3 serif">Cinematic Typography</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                A dual-font system pairs <strong className="text-gray-600">League Spartan</strong> for
                bold headlines with Inter for body text. Responsive <code className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">clamp()</code> sizing
                ensures fluid adaptation across every breakpoint.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ Windows 5–6 ═══ */}

      {/* Window 5 — Results */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-5" style={{ backgroundImage: `url(${BASE}images/builder/pool.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer items-center text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">Impact</p>
          <div className="flex gap-16 mb-12">
            <div>
              <div className="text-5xl serif font-800">3.2×</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Session Duration</div>
            </div>
            <div>
              <div className="text-5xl serif font-800">67%</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">More Inquiries</div>
            </div>
            <div>
              <div className="text-5xl serif font-800">45%</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Lower Bounce</div>
            </div>
          </div>
          <p className="max-w-lg text-gray-300 font-light italic leading-relaxed text-sm">
            &ldquo;Our website finally feels like walking into one of our model
            homes. Clients tell us they were impressed before they even picked
            up the phone.&rdquo;
          </p>
          <p className="text-[10px] uppercase tracking-widest opacity-30 mt-4">— Project Stakeholder</p>
        </div>
        <div className="side-text uppercase">Scroll Down</div>
      </div>

      {/* Window 6 — Closing Quote */}
      <div className="window-section stack-gap">
        <div className="fixed-bg bg-color-6" style={{ backgroundImage: `url(${BASE}images/builder/villa2.jpg)` }} />
        <div className="glass-overlay" />
        <div className="content-layer items-center text-center">
          <h2 className="text-7xl serif font-800 mb-8 tracking-tight leading-none max-w-4xl">
            Architecture Is the<br />Thoughtful Making<br />of <span className="accent">Space.</span>
          </h2>
          <p className="max-w-lg text-gray-300 mb-10 font-light leading-relaxed text-sm">
            The same should be true of the web. This project proves that great
            web design requires both a designer&apos;s eye and an engineer&apos;s rigor.
          </p>
          <button onClick={() => goToSection(0)} className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase font-bold">
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* ═══ CUSTOMER STORIES ═══ */}
      <div className="relative bg-white text-black py-32 px-10 md:px-24 z-[70] rounded-t-[40px] stack-gap">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl serif mb-4 scroll-reveal">Customer Stories</h2>
              <p className="text-xs text-gray-400 scroll-reveal">Each project reflects a unique vision brought to life through precision craftsmanship.</p>
            </div>
            <span className="px-6 py-2 bg-black text-white rounded-full text-[10px] uppercase font-bold scroll-reveal">Read More →</span>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-spanish.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-4">Casa Esperanza</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Residential</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Los Angeles</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Spanish Revival</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">A lovingly restored 1930s Spanish Colonial with original archways, terra cotta tile, and a courtyard garden that bridges indoor-outdoor living.</p>
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-modern.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-4">Mirador Residence</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Luxury</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Coastal</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Modern</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">A contemporary coastal home featuring floor-to-ceiling glass, cantilevered volumes, and an infinity pool that dissolves into the horizon line.</p>
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-mixed.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-4">Eastwood Farmhouse</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Custom Build</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Suburban</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Contemporary</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">A ground-up custom build combining warm cedar cladding, stacked stone, and expansive glazing — modern farmhouse living with urban sophistication.</p>
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden p-8 scroll-reveal">
              <img src={`${BASE}images/builder/story-victorian.png`} className="w-full h-64 object-cover rounded-2xl mb-8" alt="" />
              <h3 className="text-2xl font-bold mb-4">Painted Row Collection</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Heritage</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">San Francisco</span>
                <span className="px-3 py-1 bg-white rounded-full text-[8px] font-bold uppercase border">Victorian</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">A meticulous preservation of iconic Victorian row houses — restoring ornamental millwork, period-correct color palettes, and structural integrity for the next century.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="builder-footer-wrap">
        <Footer />
      </div>

    </div>
  )
}
