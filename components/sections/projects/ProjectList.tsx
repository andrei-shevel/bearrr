'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import projectsData from '@/data/projects.json' with { type: 'json' };

import './ProjectList.css';

const StarsBackground = dynamic(() => import('./StarsBackground').then((m) => m.StarsBackground), {
  ssr: false,
});

type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  interactive?: string;
};

export function ProjectList() {
  const [starsOn, setStarsOn] = useState(false);
  const projects = projectsData.projects as Project[];

  return (
    <>
      {starsOn && <StarsBackground />}
      <ul className="projects-list">
        {projects.map((project) => {
          const isStarsToggle = project.interactive === 'stars';
          const linkLabel = isStarsToggle ? (starsOn ? 'Turn off ←' : 'Activate →') : 'GitHub →';

          const body = (
            <>
              <div className="project-item-header">
                <div className="project-item-title-row">
                  <h2 className="project-title">{project.title}</h2>
                  <span className="project-tags">{project.tags.join(' · ')}</span>
                </div>
                <span className="project-link">{linkLabel}</span>
              </div>
              <p className="project-desc">{project.description}</p>
            </>
          );

          return (
            <li key={project.slug} className="project-item">
              {isStarsToggle ? (
                <button
                  type="button"
                  className="project-item-link project-item-button"
                  onClick={() => setStarsOn((v) => !v)}
                  aria-pressed={starsOn}
                >
                  {body}
                </button>
              ) : (
                <a href={project.repoUrl} className="project-item-link" target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
