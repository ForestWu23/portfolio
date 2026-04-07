import { motion } from 'framer-motion'
import AnimatedGradient from './AnimatedGradient'
import '../styles/About.css'

const specializations = [
  'UIUX Design',
  'Interaction Design',
  'Branding',
  'User Research',
  'Product Strategy',
  'Visual Storytelling',
  'Design Systems',
  'Interactive Media',
]

interface AboutProps {
  isActive: boolean
}

export default function About({ isActive }: AboutProps) {
  return (
    <section className="about">
      <div className="about-bg">
        <AnimatedGradient color1="#ddd6f3" color2="#faaca8" speed={1300} />
      </div>

      <div className="about-inner">
        <div className="about-photo">
          <div className="about-photo-placeholder">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Photo</span>
          </div>
        </div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="about-name">Sihang Yang</p>

          <h2 className="about-title">
            Where Strategy Meets Artistry — A Designer Driven by Logic and Emotion
          </h2>

          <p className="about-text">
            I'm Sihang Yang, an Interactive, UI/UX, and Graphic Designer
            driven by both logic and emotion. With experience spanning digital
            media, branding, and spatial design, I craft user-centered
            experiences that balance form, function, and sustainability.
          </p>

          <p className="about-text">
            My design philosophy blends purity and practicality: every visual
            decision serves purpose, every interface tells a story. From
            intuitive product flows to visually refined identities, I aim to
            create work that endures — aesthetically, emotionally, and
            ethically.
          </p>

          <p className="about-text">
            When I'm not designing, you'll find me snowboarding down fresh
            powder or serving aces on the tennis court, always chasing balance
            between motion, mindfulness, and creativity.
          </p>

          <p className="about-specs-label">Specialization &amp; Accomplishments</p>
          <ul className="about-specs">
            {specializations.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
