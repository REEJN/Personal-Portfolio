import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div>
        &copy; {new Date().getFullYear()} JENREE. ALL RIGHTS RESERVED.
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <span>LOCAL TIME: {time || '00:00:00'}</span>
        <span>•</span>
        <button 
          type="button" 
          onClick={scrollToTop} 
          className="link-btn"
          style={{ textTransform: 'uppercase' }}
        >
          BACK TO TOP &uarr;
        </button>
      </div>
    </footer>
  );
}
