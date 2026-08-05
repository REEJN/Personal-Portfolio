import React, { useState, useEffect, useCallback } from 'react';

const DEFAULT_USERNAME = 'REEJN';

// Fallback projects in case of offline/API limit
const FALLBACK_PROJECTS = [
  {
    id: 101,
    name: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'React',
    year: '2026',
    description: 'Modern minimalist developer portfolio built with React 19, Vite, and modern breathing grid dot background.',
    longDescription: 'High-performance monochrome personal web portfolio featuring dynamic GitHub API project synchronization, customizable light/dark themes, and responsive layout grids.',
    tags: ['React', 'JavaScript', 'Vite', 'CSS Grid', 'GitHub API'],
    stars: 1,
    forks: 0,
    openIssues: 0,
    githubUrl: 'https://github.com/REEJN',
    homepage: null,
    license: 'MIT'
  },
  {
    id: 102,
    name: 'fullstack-web-app',
    title: 'Full-Stack Web App',
    category: 'Node.js',
    year: '2025',
    description: 'Full-stack application architecture built with Node.js, Express backend, and MongoDB database.',
    longDescription: 'Robust web application engineered with RESTful APIs, JWT authentication, and modern database schema design for scalable microservices.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    stars: 0,
    forks: 0,
    openIssues: 0,
    githubUrl: 'https://github.com/REEJN',
    homepage: null,
    license: null
  },
  {
    id: 103,
    name: 'embedded-esp32-controller',
    title: 'Embedded ESP32 Controller',
    category: 'C++',
    year: '2025',
    description: 'Computer engineering embedded systems project utilizing ESP32 microcontroller and sensor telemetry.',
    longDescription: 'Hardware-software co-design implementing real-time sensor monitoring, wireless telemetry, and Arduino/C++ firmware optimization.',
    tags: ['C++', 'Arduino', 'ESP32', 'Embedded'],
    stars: 0,
    forks: 0,
    openIssues: 0,
    githubUrl: 'https://github.com/REEJN',
    homepage: null,
    license: null
  }
];

export default function Projects({ showToast }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCopyClone = (githubUrl, repoName) => {
    const cloneCmd = `git clone ${githubUrl}.git`;
    navigator.clipboard.writeText(cloneCmd);
    if (showToast) showToast(`Copied clone command for ${repoName}!`);
  };
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchGitHubRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${DEFAULT_USERNAME}/repos?sort=updated&per_page=30`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${DEFAULT_USERNAME}" not found.`);
        } else if (response.status === 403) {
          throw new Error(`GitHub API rate limit exceeded. Displaying featured repositories.`);
        } else {
          throw new Error(`GitHub API returned status ${response.status}`);
        }
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response payload from GitHub');
      }

      if (data.length === 0) {
        setProjects([]);
        setError(`No public repositories found for @${DEFAULT_USERNAME}.`);
        setLoading(false);
        return;
      }

      const formattedRepos = data.map(repo => {
        const titleFormatted = repo.name
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        const primaryTag = repo.language || 'Software';
        const allTags = Array.from(new Set([primaryTag, ...(repo.topics || [])]));

        return {
          id: repo.id,
          name: repo.name,
          title: titleFormatted,
          category: primaryTag,
          year: repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : '2026',
          description: repo.description || 'Open-source software repository built with clean architecture and modern development standards.',
          longDescription: repo.description 
            ? `${repo.description} (Maintained by @${repo.owner.login} on GitHub).`
            : `Open-source project ${repo.name} created by @${repo.owner.login}. Inspect source code and commit history on GitHub.`,
          tags: allTags,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          githubUrl: repo.html_url,
          homepage: repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : null,
          isFork: repo.fork,
          license: repo.license ? (repo.license.spdx_id || repo.license.name) : null,
          updatedAt: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null
        };
      });

      setProjects(formattedRepos);
    } catch (err) {
      console.warn('GitHub API fetch notice:', err.message);
      setError(err.message);
      setProjects(FALLBACK_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubRepos();
  }, [fetchGitHubRepos]);

  // Extract unique categories for filtering
  const availableCategories = ['ALL', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  // Filter projects by category and search term
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'ALL' || project.category.toUpperCase() === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section">
      <div className="section-header">
        <div>
          <span className="section-number">/ 01 — REPOSITORIES</span>
          <h2 className="section-title">GitHub Projects</h2>
        </div>

        {/* SEARCH & REPO COUNTER CONTROL BAR */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span 
            className="tag-badge"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--fg)', borderColor: 'var(--border-light)' }}
          >
            @REEJN / PUBLIC REPOS
          </span>

          <input 
            type="text" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              padding: '0.4rem 0.75rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-light)',
              color: 'var(--fg)',
              width: '200px'
            }}
          />
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {availableCategories.map(cat => (
          <button
            key={cat}
            type="button"
            className="tag-badge"
            style={{
              cursor: 'pointer',
              backgroundColor: filter.toUpperCase() === cat.toUpperCase() ? 'var(--fg)' : 'transparent',
              color: filter.toUpperCase() === cat.toUpperCase() ? 'var(--bg)' : 'var(--fg)',
              transition: 'all 0.15s ease'
            }}
            onClick={() => setFilter(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* STATUS & LOADING STATES */}
      {loading ? (
        <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          <div className="status-pulse" style={{ margin: '0 auto 1rem auto', width: '12px', height: '12px' }}></div>
          <p>[ FETCHING LIVE REPOSITORIES FROM GITHUB API (@{DEFAULT_USERNAME}) ... ]</p>
        </div>
      ) : (
        <>
          {error && (
            <div style={{ 
              border: '1px solid var(--border-light)', 
              backgroundColor: 'var(--surface)', 
              padding: '1rem 1.25rem', 
              marginBottom: '2rem', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>⚠️ {error}</span>
              <button 
                type="button" 
                onClick={() => fetchGitHubRepos()}
                className="link-btn"
                style={{ fontSize: '0.75rem' }}
              >
                RETRY ↻
              </button>
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div style={{ padding: '3rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)', border: '1px dashed var(--border-light)' }}>
              <p>[ No repositories found matching filter criteria ]</p>
              <button 
                type="button" 
                onClick={() => { setFilter('ALL'); setSearchQuery(''); }}
                className="btn-secondary"
                style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-card">
                  <div>
                    <div className="project-meta">
                      <span style={{ fontWeight: 600, color: 'var(--fg)' }}>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="project-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {project.title}
                      {project.isFork && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--fg-muted)', border: '1px solid var(--border-light)', padding: '0.1rem 0.3rem' }}>
                          fork
                        </span>
                      )}
                    </h3>

                    <p className="project-desc">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.slice(0, 5).map(tag => (
                        <span key={tag} className="tag-badge">{tag}</span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="tag-badge" style={{ opacity: 0.7 }}>+{project.tags.length - 5}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      fontSize: '0.8rem', 
                      fontFamily: 'var(--font-mono)', 
                      color: 'var(--fg-muted)',
                      marginBottom: '1rem' 
                    }}>
                      <span>⭐ {project.stars}</span>
                      <span>🍴 {project.forks}</span>
                      {project.license && <span>📜 {project.license}</span>}
                    </div>

                    <div className="project-footer">
                      <button
                        type="button"
                        className="link-btn"
                        onClick={() => setSelectedProject(project)}
                      >
                        DETAILS &rarr;
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-btn"
                      >
                        GITHUB &#8599;
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="section-number">
                  {selectedProject.year} / {selectedProject.category}
                </span>
                <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{selectedProject.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {selectedProject.longDescription}
            </p>

            {/* REPO STATS GRID */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '0.75rem', 
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--fg-muted)', display: 'block', fontSize: '0.7rem' }}>STARS</span>
                <strong>⭐ {selectedProject.stars}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--fg-muted)', display: 'block', fontSize: '0.7rem' }}>FORKS</span>
                <strong>🍴 {selectedProject.forks}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--fg-muted)', display: 'block', fontSize: '0.7rem' }}>ISSUES</span>
                <strong>🐛 {selectedProject.openIssues}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--fg-muted)', display: 'block', fontSize: '0.7rem' }}>LICENSE</span>
                <strong>{selectedProject.license || 'N/A'}</strong>
              </div>
            </div>

            {/* TAGS */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                TECHNOLOGY & TOPICS
              </h4>
              <div className="project-tags">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="tag-badge" style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                VIEW ON GITHUB &#8599;
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleCopyClone(selectedProject.githubUrl, selectedProject.name)}
              >
                CLONE CMD 📋
              </button>
              {selectedProject.homepage && (
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  LIVE DEMO &#8599;
                </a>
              )}
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedProject(null)}
                style={{ marginLeft: 'auto' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
