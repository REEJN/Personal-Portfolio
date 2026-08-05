import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for ambient background glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <>
      {/* TOP SCROLL PROGRESS BAR */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* AMBIENT MOUSE SPOTLIGHT GLOW */}
      <div
        className="ambient-spotlight"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight-color), transparent 80%)`
        }}
        aria-hidden="true"
      />

      {/* BREATHING DOT GRID BACKGROUND */}
      <div className="bg-grid-dots" aria-hidden="true" />

      <div className="page-container">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        <main>
          <Hero
            onOpenContact={() => setIsContactModalOpen(true)}
            showToast={showToast}
          />
          <Projects showToast={showToast} />
          <Experience />
          <Skills />
          <Contact
            isModalOpen={isContactModalOpen}
            onOpenContact={() => setIsContactModalOpen(true)}
            onCloseModal={() => setIsContactModalOpen(false)}
            showToast={showToast}
          />
        </main>

        <Footer />

        {/* QUICK FLOATING MESSAGE BUTTON */}
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: 'clamp(1rem, 4vw, 2.5rem)',
            zIndex: 90
          }}
          className="floating-action"
        >
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="btn-primary"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.8rem',
              boxShadow: '4px 4px 0px var(--fg)'
            }}
          >
            &plus; MESSAGE
          </button>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="toast-notification">
            [ {toastMessage} ]
          </div>
        )}
      </div>
    </>
  );
}

export default App;
