import { motion } from 'framer-motion'
import AnimatedGradient from './AnimatedGradient'
import '../styles/About.css'

const specsLeft = [
  'Product Design',
  'Interaction Design',
  'User Flows',
  'User Research',
]

const specsRight = [
  'Front-end Development',
  'Prototyping',
  'Design Systems',
  'AI Coding',
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
          <img
            src={import.meta.env.BASE_URL + 'images/aboutphoto.jpg'}
            alt="Sihang Yang"
            className="about-photo-img"
          />
          <div className="about-photo-fade" />
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
            I'm Sihang Yang, a UI/UX and visual designer with a front-end
            engineer's mindset. I don't just design interfaces, I bring them
            to life, from first wireframe to live site.
          </p>

          <p className="about-text">
            My approach is simple: clarity first, emotion always. Every
            decision has a reason, but the experience should feel effortless.
          </p>

          <p className="about-text">
            When I'm not behind a screen, I'm probably chasing speed, on a
            snowboard or a tennis court.
          </p>

          <p className="about-specs-label">Specialization</p>
          <div className="about-specs-grid">
            <ul className="about-specs-col">
              {specsLeft.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <ul className="about-specs-col">
              {specsRight.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
