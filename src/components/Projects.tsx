import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import '../styles/Projects.css'

export default function Projects() {
  return (
    <section className="projects">
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="project-card-thumbnail">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span className="project-card-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </span>
              )}
            </div>
            <div className="project-card-overlay">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-subtitle">{project.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
