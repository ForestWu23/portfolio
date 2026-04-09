import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import '../styles/Projects.css'

const TILT_MAX = 4
const IMG_SHIFT = 8
const SCALE_CARD = 1.03
const SCALE_IMG = 1.05

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef<number>(0)
  const navigate = useNavigate()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      const img = imgRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateY = (x - 0.5) * TILT_MAX * 2
      const rotateX = (0.5 - y) * TILT_MAX * 2

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE_CARD})`

      if (img) {
        const shiftX = (x - 0.5) * IMG_SHIFT
        const shiftY = (y - 0.5) * IMG_SHIFT
        img.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(${SCALE_IMG})`
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const card = cardRef.current
    const img = imgRef.current
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
    if (img) {
      img.style.transform = 'translate(0px, 0px) scale(1)'
    }
  }, [])

  const handleClick = useCallback(() => {
    if (project.detailPath) {
      navigate(project.detailPath)
    }
  }, [project.detailPath, navigate])

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="project-card-thumbnail">
        {project.thumbnail ? (
          <img
            ref={imgRef}
            src={import.meta.env.BASE_URL + project.thumbnail}
            alt={project.title}
            className="project-card-img"
          />
        ) : (
          <div className="project-card-coming-soon">
            <span className="coming-soon-label">Coming Soon</span>
          </div>
        )}
      </div>
      <div className="project-card-shadow" />
      <div className="project-card-overlay">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-subtitle">{project.subtitle}</p>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
