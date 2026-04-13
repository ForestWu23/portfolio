import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export default function NotFound() {
  const navigate = useNavigate()

  const goHome = useCallback(() => {
    navigate('/', { state: { targetSection: 0 } })
  }, [navigate])

  return (
    <div className="nf-container">
      <div className="nf-content">
        <h1 className="nf-code">404</h1>
        <p className="nf-message">Page not found</p>
        <p className="nf-detail">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="nf-btn" onClick={goHome}>
          Back to Portfolio
        </button>
      </div>
    </div>
  )
}
