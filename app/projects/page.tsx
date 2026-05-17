import type { Metadata } from 'next';

import './style.css';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects by Andrei Shevel.',
};

export default function Projects() {
  return (
    <div className="projects-main">
      <header className="projects-header">
        <span className="section-tag">Projects</span>
        <h1 className="section-title">Personal projects and experiments.</h1>
        <p className="projects-lede">
          What I build outside of work — small tools, prototypes, and explorations driven by curiosity rather than a
          roadmap. <span className="highlight">Coming soon.</span>
        </p>
      </header>
    </div>
  );
}
