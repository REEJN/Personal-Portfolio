import React, { useState } from 'react';
import { 
  SiHtml5, SiJavascript, SiReact, SiVite, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiCplusplus, SiPython,
  SiDotnet, SiArduino, SiEspressif, SiGithub, SiSupabase
} from 'react-icons/si';
import { FaServer, FaCubes, FaBrain, FaStar, FaCss3Alt } from 'react-icons/fa6';
import { TbBrandVscode } from 'react-icons/tb';

const SKILL_CATEGORIES = [
  {
    title: 'FRONTEND DEVELOPMENT',
    skills: [
      { name: 'HTML5', icon: <SiHtml5 style={{ color: '#E34F26' }} /> },
      { name: 'CSS3 & Flexbox/Grid', icon: <FaCss3Alt style={{ color: '#1572B6' }} /> },
      { name: 'JavaScript (ESNext)', icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
      { name: 'React 19', icon: <SiReact style={{ color: '#61DAFB' }} /> },
      { name: 'Vite', icon: <SiVite style={{ color: '#646CFF' }} /> },
      { name: 'TypeScript (Learning)', icon: <SiTypescript style={{ color: '#3178C6' }} /> }
    ]
  },
  {
    title: 'BACKEND & DATABASE',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs style={{ color: '#5FA04E' }} /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <SiMongodb style={{ color: '#47A248' }} /> },
      { name: 'REST APIs', icon: <FaServer style={{ color: '#009688' }} /> },
      { name: 'Backend Architecture', icon: <FaCubes style={{ color: '#7952B3' }} /> },
      { name: 'Supabase', icon: <SiSupabase style={{ color: '#3ecf8e' }} /> }
    ]
  },
  {
    title: 'LANGUAGES & EMBEDDED',
    skills: [
      { name: 'C++', icon: <SiCplusplus style={{ color: '#00599C' }} /> },
      { name: 'Python', icon: <SiPython style={{ color: '#3776AB' }} /> },
      { name: 'JavaScript', icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
      { name: 'VB.NET', icon: <SiDotnet style={{ color: '#512BD4' }} /> },
      { name: 'Arduino', icon: <SiArduino style={{ color: '#00979D' }} /> },
      { name: 'ESP32 / ESP8266', icon: <SiEspressif style={{ color: '#E7352C' }} /> }
    ]
  },
  {
    title: 'TOOLS & FUTURE GOALS',
    skills: [
      { name: 'Git & GitHub', icon: <SiGithub /> },
      { name: 'VS Code', icon: <TbBrandVscode style={{ color: '#007ACC' }} /> },
      { name: 'Artificial Intelligence (Learning)', icon: <FaBrain style={{ color: '#FF4081' }} /> },
      { name: 'Open Source Contribution', icon: <FaStar style={{ color: '#FFD700' }} /> }
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  const filteredCategories = activeCategory === 'ALL'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.title.includes(activeCategory));

  return (
    <section id="skills" className="section">
      <div className="section-header">
        <div>
          <span className="section-number">/ 03 — CAPABILITIES ({totalSkillsCount} SKILLS)</span>
          <h2 className="section-title">Technical Stack &amp; Skills</h2>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'FRONTEND', 'BACKEND', 'EMBEDDED', 'TOOLS'].map(catTab => (
            <button
              key={catTab}
              type="button"
              className="tag-badge"
              style={{
                cursor: 'pointer',
                backgroundColor: activeCategory === catTab ? 'var(--fg)' : 'transparent',
                color: activeCategory === catTab ? 'var(--bg)' : 'var(--fg)',
                transition: 'all 0.15s ease'
              }}
              onClick={() => setActiveCategory(catTab)}
            >
              {catTab}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {filteredCategories.map((cat, idx) => (
          <div key={idx} className="skill-category">
            <h3 className="category-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{cat.title}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>[{cat.skills.length}]</span>
            </h3>
            <div className="skill-list">
              {cat.skills.map((skill, sIdx) => {
                const isSelected = selectedSkill === skill.name;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    className="skill-pill"
                    onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                    style={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: isSelected ? 'var(--fg)' : 'var(--surface)',
                      color: isSelected ? 'var(--bg)' : 'var(--fg)',
                      borderColor: isSelected ? 'var(--fg)' : 'var(--border-light)'
                    }}
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
