import { useRef, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '../data/projects'
import { checkAuth } from './AuthGate'
import '../styles/Projects.css'

const TILT_MAX = 4
const IMG_SHIFT = 8
const SCALE_CARD = 1.03
const SCALE_IMG = 1.05

const HASH = '2d6c50388f532bd1bbe52e5a25fad2a7fd3955bb2855b0b72cd28765e78b62e9'
const STORAGE_KEY = 'pf_auth'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function PasswordModal({
  project,
  onClose,
  onSuccess,
}: {
  project: Project
  onClose: () => void
  onSuccess: () => void
}) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const isFakeProtected = !!project.passwordProtected

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isFakeProtected) {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }
    const h = await sha256(password)
    if (h === HASH) {
      sessionStorage.setItem(STORAGE_KEY, HASH)
      onSuccess()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <motion.div
      className="pw-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className={`pw-modal${shaking ? ' pw-shake' : ''}`}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button className="pw-modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="pw-modal-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h3 className="pw-modal-title">{project.title}</h3>
        <p className="pw-modal-desc">
          {isFakeProtected
            ? 'This project is password-protected. Please contact the portfolio owner to request access.'
            : 'This project is password-protected. Please enter the password to view.'}
        </p>
        <form onSubmit={handleSubmit} className="pw-modal-form">
          <input
            type="password"
            className={`pw-modal-input${error ? ' pw-input-error' : ''}`}
            placeholder="Enter password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            autoFocus
          />
          {error && <span className="pw-modal-error">Incorrect password. Please try again.</span>}
          <button type="submit" className="pw-modal-submit">Unlock</button>
        </form>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  onProtectedClick,
}: {
  project: Project
  index: number
  onProtectedClick: (p: Project) => void
}) {
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
    if (project.comingSoon) return
    if (project.passwordProtected) {
      onProtectedClick(project)
    } else if (project.detailPath) {
      if (checkAuth()) {
        navigate(project.detailPath)
      } else {
        onProtectedClick(project)
      }
    }
  }, [project, navigate, onProtectedClick])

  const showLock = project.passwordProtected || project.detailPath

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
        {showLock && (
          <span className="project-card-lock">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [protectedProject, setProtectedProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  const handleSuccess = useCallback(() => {
    if (protectedProject?.detailPath) {
      navigate(protectedProject.detailPath)
      setProtectedProject(null)
    }
  }, [protectedProject, navigate])

  return (
    <section className="projects">
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onProtectedClick={setProtectedProject}
          />
        ))}
      </div>
      <AnimatePresence>
        {protectedProject && (
          <PasswordModal
            project={protectedProject}
            onClose={() => setProtectedProject(null)}
            onSuccess={handleSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
