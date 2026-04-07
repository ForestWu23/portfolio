import { motion } from 'framer-motion'
import '../styles/Highlights.css'

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    title: 'UX & Interaction Design',
    desc: 'Designing intuitive, user-centered interfaces across web, mobile, and interactive platforms with 6+ years of hands-on experience in wireframing, prototyping, and design systems.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Branding & Visual Design',
    desc: 'Crafting cohesive visual identities and refined design systems that communicate brand values with clarity, consistency, and lasting impact across every touchpoint.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Product Strategy',
    desc: 'Bridging user research insights with business goals to define product roadmaps, validate concepts, and drive measurable growth outcomes through thoughtful design decisions.',
  },
]

interface HighlightsProps {
  isActive: boolean
}

export default function Highlights({ isActive }: HighlightsProps) {
  return (
    <section className="highlights">
      <div className="highlights-inner">
        <div className="highlights-grid">
          {highlights.map((item, i) => (
            <motion.div
              className="highlight-card"
              key={item.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{
                delay: i * 0.18,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="highlight-icon">{item.icon}</div>
              <h3 className="highlight-card-title">{item.title}</h3>
              <p className="highlight-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
