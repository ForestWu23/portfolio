import AnimatedGradient from './AnimatedGradient'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <AnimatedGradient color1="#ddd6f3" color2="#faaca8" speed={1300} />
      </div>
      <div className="footer-content">
        <h3 className="footer-heading">Get in Touch</h3>
        <div className="footer-links">
          <a className="footer-link" href="mailto:yangsh2569@gmail.com">
            yangsh2569@gmail.com
          </a>
          <a className="footer-link" href="https://www.linkedin.com/in/sihang-yang/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="footer-link" href="tel:2066015969">
            (206) 601-5969
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Sihang Yang. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
