import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa6';
import resumePdf from '../assets/documents/Jenree_Dandan_Resume.pdf';

export default function Header({ theme, toggleTheme, onOpenContact }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#" className="brand-logo" aria-label="Portfolio Home">
        <span className="brand-dot"></span>
        <span>REEJN</span>
      </a>

      <nav aria-label="Main Navigation" className={`site-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <ul className="nav-links">
          <li><a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
          <li><a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
          <li><a href="#experience" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experience</a></li>
          <li><a href="#skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skills</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <a
          href={resumePdf}
          download="Jenree_Dandan_Resume.pdf"
          className="theme-toggle-btn"
          title="Download Resume PDF"
          style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <FaDownload style={{ fontSize: '0.7rem' }} />
          <span>RESUME</span>
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? 'MODE: LIGHT' : 'MODE: DARK'}
        </button>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
