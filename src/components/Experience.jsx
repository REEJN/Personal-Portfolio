import React from 'react';

const EXPERIENCE_DATA = [
  {
    period: '2025 (1 YEAR)',
    role: 'Freelance Embedded Systems Developer',
    company: 'Client Projects & Hardware Systems',
    tags: ['Arduino', 'ESP32', 'ESP8266', 'Microcontrollers', 'Sensors', 'System Debugging'],
    bullets: [
      'Completed three client projects involving custom microcontroller-based systems.',
      'Developed and programmed embedded solutions using Arduino and ESP32 / ESP8266.',
      'Integrated sensors and electronic components, performing testing, debugging, and system optimization based on client requirements.',
      'Delivered reliable hardware-software integration and custom problem-solving solutions for external clients.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <div>
          <span className="section-number">/ 02 — CAREER &amp; PROJECTS</span>
          <h2 className="section-title">Work Experience</h2>
        </div>
      </div>

      <div className="experience-list">
        {EXPERIENCE_DATA.map((exp, index) => (
          <div key={index} className="experience-item">
            <div>
              <div className="experience-period">{exp.period}</div>
              <span className="status-badge" style={{ marginTop: '0.75rem', fontSize: '0.7rem' }}>
                CLIENT CERTIFIED
              </span>
            </div>

            <div>
              <h3 className="experience-role">{exp.role}</h3>
              <div className="experience-company">@ {exp.company}</div>

              <ul className="experience-bullets">
                {exp.bullets.map((bullet, bIndex) => (
                  <li key={bIndex}>{bullet}</li>
                ))}
              </ul>

              <div className="project-tags" style={{ marginTop: '1.25rem', gap: '0.75rem' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--fg)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
