import AnimatedGradient from './AnimatedGradient'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <AnimatedGradient color1="#ddd6f3" color2="#faaca8" speed={1300} />
      </div>
      <div className="footer-content">
        <h3 className="footer-heading">
          <span className="footer-heading-gradient">Get in Touch</span>
        </h3>
        <div className="footer-icons">
          <a className="footer-icon" href="mailto:yangsh2569@gmail.com" aria-label="Email">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          <a className="footer-icon" href="tel:2066015969" aria-label="Phone">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <a className="footer-icon footer-icon-linkedin" href="https://www.linkedin.com/in/sihang-yang/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Sihang Yang. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
