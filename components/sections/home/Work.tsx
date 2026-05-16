import Image from 'next/image';
import { CSSProperties } from 'react';
import { format } from 'date-fns';

import cv from '@/data/cv.json' with { type: 'json' };

import './Work.css';

export function Work() {
  return (
    <section id="work" className="work">
      <div className="section-header">
        <span className="section-tag">Impact Areas</span>
        <h2 className="section-title">How I Move the Needle</h2>
      </div>

      <div className="projects-grid">
        {cv.experience.map((experience, index) => {
          if (!experience.impact) return null;
          return (
            <article key={experience.company} className="project-card">
              <div className="project-image">
                <div className="project-placeholder" style={{ '--hue': index ? 320 : 180 } as CSSProperties}>
                  <Image src={experience.impact.image} alt={experience.company} width={100} height={100} />
                </div>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {experience.impact.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{experience.impact.title}</h3>
                <p className="project-desc">{experience.impact.description}</p>
                <span className="project-link">
                  {experience.company} · {format(new Date(experience.startDate), 'MMM yyyy')} –{' '}
                  {experience.endDate ? format(new Date(experience.endDate), 'MMM yyyy') : 'Present'}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
