import React, { useState } from 'react';

export default function Contact({ isModalOpen, onOpenContact, onCloseModal, showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const userEmail = 'Dandan.jenreet@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    showToast('Email copied to clipboard!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onCloseModal();
      showToast('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section" style={{ borderBottom: 'none' }}>
      <div className="section-header">
        <div>
          <span className="section-number">/ 04 — CONNECT</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Have a project in mind, a question, or an opportunity to collaborate?
            Feel free to send an email or drop a message below.
          </p>

          <div className="email-copy-box">
            <span className="email-text">{userEmail}</span>
            <button type="button" className="copy-btn" onClick={handleCopyEmail}>
              COPY EMAIL
            </button>
          </div>

          <div className="social-links-grid">
            <a href="https://github.com/REEJN" target="_blank" rel="noreferrer" className="social-card">
              <span>GITHUB (@REEJN)</span>
              <span style={{ marginLeft: 'auto' }}>&#8599;</span>
            </a>
            <a href="https://linkedin.com/in/dandan-jenree-9a796a417" target="_blank" rel="noreferrer" className="social-card">
              <span>LINKEDIN</span>
              <span style={{ marginLeft: 'auto' }}>&#8599;</span>
            </a>
            <a href={`mailto:${userEmail}`} className="social-card" style={{ gridColumn: 'span 2' }}>
              <span>DIRECT MAIL ({userEmail})</span>
              <span style={{ marginLeft: 'auto' }}>&#8599;</span>
            </a>
          </div>
        </div>

        <div style={{ border: '1px solid var(--fg)', padding: '2rem', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            QUICK MESSAGE
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Send a direct message right from your browser.
          </p>
          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={onOpenContact}
          >
            OPEN MESSAGE FORM &crarr;
          </button>
        </div>
      </div>

      {/* CONTACT FORM MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={onCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="section-number">DIRECT MESSAGE</span>
                <h3 style={{ fontSize: '1.5rem' }}>Send a Message</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={onCloseModal}
                aria-label="Close message modal"
              >
                &times;
              </button>
            </div>

            {submitted ? (
              <div style={{ padding: '2rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                <h4>[ MESSAGE SENT ]</h4>
                <p style={{ marginTop: '0.5rem' }}>Thank you! I will respond promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    className="form-input"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    className="form-textarea"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    SUBMIT MESSAGE &crarr;
                  </button>
                  <button type="button" className="btn-secondary" onClick={onCloseModal}>
                    CANCEL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
