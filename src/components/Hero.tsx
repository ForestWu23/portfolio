import { motion } from 'framer-motion'
import AnimatedGradient from './AnimatedGradient'
import '../styles/Hero.css'

interface HeroProps {
  goToSection: (index: number) => void
  isActive: boolean
}

const twistVariants = {
  hidden: {
    opacity: 0,
    rotateY: 20,
    rotateZ: -4,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    rotateZ: 0,
    transition: {
      duration: 1,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 2, ease: [0.16, 1, 0.3, 1] },
  },
}

const actionsVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero({ goToSection, isActive }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <AnimatedGradient />
      </div>

      <div className="hero-content">
        <motion.div
          variants={twistVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          style={{ perspective: 800 }}
        >
          <h1 className="hero-title">
            <span className="hero-hello-wrap">
              <strong>Hello!</strong>
              <svg
                className={`hero-squiggle ${isActive ? 'hero-squiggle-animate' : ''}`}
                role="presentation"
                viewBox="-347 -30.1947 694 96.19"
                preserveAspectRatio="none"
                key={isActive ? 'active' : 'inactive'}
              >
                <path
                  className="hero-squiggle-path"
                  d="M-335,54 C-335,54 -171,-58 -194,-3 C-217,52 -224.12,73.55 -127,11 C-68,-27 -137,50 -33,42 C31.44,37.04 147.15,-29.31 335,2"
                  stroke="#000000"
                  pathLength="1"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{' '}
            This is Sihang.
          </h1>
        </motion.div>

        <motion.p
          className="hero-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          Product &amp; UX Designer with 10+ years of hands-on experience
          in UI/UX, branding, and interactive media — turning complex
          business goals into clear, intuitive digital experiences.
        </motion.p>

        <motion.div
          className="hero-actions"
          variants={actionsVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          <button className="hero-btn hero-btn-primary" onClick={() => goToSection(2)}>
            View work
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={() => goToSection(4)}>
            Grab my resume
          </button>
        </motion.div>
      </div>
    </section>
  )
}
