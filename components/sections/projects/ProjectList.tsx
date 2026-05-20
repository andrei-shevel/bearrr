import projectsData from '@/data/projects.json' with { type: 'json' };

import './ProjectList.css';

export function ProjectList() {
  return (
    <ul className="projects-list">
      {projectsData.projects.map((project) => (
        <li key={project.slug} className="project-item">
          <a href={project.repoUrl} className="project-item-link" target="_blank" rel="noopener noreferrer">
            <div className="project-item-header">
              <div className="project-item-title-row">
                <h2 className="project-title">{project.title}</h2>
                <span className="project-tags">{project.tags.join(' · ')}</span>
              </div>
              <span className="project-link">GitHub →</span>
            </div>
            <p className="project-desc">{project.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
