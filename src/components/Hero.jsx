import React, { useState, useEffect } from 'react';
import meHeroImg from '../assets/me/MeHERO.png';
import resumePdf from '../assets/documents/Jenree_Dandan_Resume.pdf';
import { FaDownload } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';

export default function Hero({ onOpenContact, showToast }) {
  const [activeTab, setActiveTab] = useState('config.ts');
  const [ghStats, setGhStats] = useState(null);

  // Fetch live GitHub profile stats
  useEffect(() => {
    fetch('https://api.github.com/users/REEJN')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setGhStats({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            avatar: data.avatar_url,
            bio: data.bio,
            createdAt: new Date(data.created_at).getFullYear()
          });
        }
      })
      .catch(() => {});
  }, []);

  const configSnippet = `{
  "developer": "Jenree",
  "handle": "@REEJN",
  "degree": "Computer Engineering",
  "location": "Montalban, Rizal, PH",
  "frontend": ["React 19", "Vite", "HTML5/CSS3"],
  "backend": ["Node.js", "Express", "REST APIs"],
  "database": ["MongoDB"],
  "hardware": ["Arduino", "ESP32 / ESP8266"],
  "status": "Available for Select Projects"
}`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(configSnippet);
    if (showToast) showToast('Developer config copied to clipboard!');
  };

  return (
    <section id="about" className="hero-section">
      <div className="hero-container-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="status-badge">
              <span className="status-pulse"></span>
              <span>Available for select opportunities</span>
            </div>
            <a 
              href="https://github.com/REEJN" 
              target="_blank" 
              rel="noreferrer"
              className="status-badge" 
              style={{ borderColor: 'var(--fg-muted)', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
            >
              <SiGithub style={{ fontSize: '0.85rem' }} />
              <span>@REEJN &#8599;</span>
            </a>
            {ghStats && (
              <span className="status-badge" style={{ borderColor: 'var(--border-light)', color: 'var(--fg-muted)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--fg)' }}>{ghStats.repos}</span> repos · <span style={{ color: 'var(--fg)' }}>{ghStats.followers}</span> followers · <span style={{ color: 'var(--fg)' }}>{ghStats.following}</span> following
              </span>
            )}
            <span className="status-badge" style={{ borderColor: 'var(--border-light)', color: 'var(--fg-muted)' }}>
              📍 Montalban, Rizal, Philippines
            </span>
          </div>

          <h1 className="hero-title">
            Hi, I'm Jenree<br />
            <span style={{ fontSize: '0.45em', fontWeight: 600, color: 'var(--fg-muted)', display: 'block', marginTop: '0.25rem' }}>
              Computer Engineering Student &amp; <br />Full-Stack Web Developer
            </span>
          </h1>

          <p className="hero-subtitle">
            Passionate about building modern full-stack web applications with React, Vite, Node.js, and MongoDB.
            Expanding expertise in TypeScript, backend architecture, embedded systems (Arduino &amp; ESP32), and Artificial Intelligence.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              VIEW GITHUB PROJECTS &rarr;
            </a>
            <button type="button" onClick={onOpenContact} className="btn-secondary">
              SEND MESSAGE &crarr;
            </button>
            <a 
              href={resumePdf} 
              download="Jenree_Dandan_Resume.pdf"
              onClick={() => {
                if (showToast) showToast('Downloading Jenree_Dandan_Resume.pdf...');
              }}
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '0.5rem 0.9rem',
                borderColor: 'var(--border-light)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              title="Download Resume PDF"
            >
              <FaDownload style={{ fontSize: '0.7rem' }} />
              <span>RESUME</span>
            </a>
          </div>

          {/* LIVE STATS HIGHLIGHT BAR */}
          <div className="hero-stats-bar">
            <div className="hero-stat-item">
              <span className="hero-stat-number">{ghStats ? ghStats.repos : '—'}</span>
              <span className="hero-stat-label">Public Repos</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">3+</span>
              <span className="hero-stat-label">Client Hardware Projects</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">{ghStats ? `Since ${ghStats.createdAt}` : 'CpE'}</span>
              <span className="hero-stat-label">{ghStats ? 'On GitHub' : 'Computer Engineering'}</span>
            </div>
          </div>
        </div>

        {/* PROFILE AVATAR & INTERACTIVE TERMINAL WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="hero-avatar-wrapper">
            <div className="hero-avatar-frame">
              <img
                src={meHeroImg}
                alt="Jenree — Computer Engineering Student & Full-Stack Developer"
                className="hero-avatar-img"
              />
            </div>
            <div className="hero-avatar-caption">
              [ JENREE / SOFTWARE DEV ]
            </div>
          </div>

          {/* INTERACTIVE DEVELOPER TERMINAL BOX */}
          <div className="hero-code-box">
            <div className="hero-code-header">
              <div className="hero-code-dots">
                <span style={{ backgroundColor: '#ff5f56' }}></span>
                <span style={{ backgroundColor: '#ffbd2e' }}></span>
                <span style={{ backgroundColor: '#27c93f' }}></span>
              </div>
              <span className="hero-code-title">REEJN.config.json</span>
              <button 
                type="button" 
                onClick={handleCopyConfig}
                className="hero-code-copy-btn"
                aria-label="Copy developer config"
              >
                COPY 📋
              </button>
            </div>
            <pre className="hero-code-body">
              <code>{configSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
