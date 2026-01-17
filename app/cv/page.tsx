import type { Metadata } from 'next';
import { format } from 'date-fns';

import cv from '@/data/cv.json' with { type: 'json' };
import { getYearsOfExperience } from '@/lib/utils';

import './style.css';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Professional experience, technical skills, and education of Andrei Shevel.',
  keywords: ['Andrei Shevel CV', 'Software Engineer', 'Tech Lead', 'Frontend Developer'],
};

export default function CV() {
  return (
    <div className="cv-main">
      <section className="cv-section">
        <h2 className="cv-section-title">Profile</h2>
        <p className="cv-profile">
          {getYearsOfExperience()}+ years building and scaling web applications. I lead frontend architecture decisions,
          mentor engineering teams, and bridge technical execution with business outcomes. My focus is on sustainable
          practices—migrations, modularization, component systems—that compound team velocity over time.
        </p>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Experience</h2>

        {cv.experience.map((item) => (
          <div key={item.company} className="cv-job">
            <div className="cv-job-header">
              <div>
                <h3>{item.position}</h3>
                <p className="cv-company">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
              </div>
              <span className="cv-date">
                {format(new Date(item.startDate), 'MMM yyyy')} —{' '}
                {item.endDate ? format(new Date(item.endDate), 'MMM yyyy') : 'Present'}
              </span>
            </div>
            <ul className="cv-list">
              {item.description.map((description) => (
                <li key={description}>{description}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Technical Skills</h2>
        <div className="cv-skills">
          {Object.entries(cv.skills).map(([group, skills]) => (
            <div key={group} className="cv-skill-group">
              <h4>{group}</h4>
              <p>{skills.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Leadership Focus</h2>
        <div className="cv-tags">
          {cv.focus.map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Education</h2>
        {cv.education.map((item) => (
          <div key={item.school} className="cv-education">
            <div>
              <h3>{item.degree}</h3>
              <p className="cv-company">
                {item.school}
                {item.location ? ` · ${item.location}` : ''}
              </p>
            </div>
            <span className="cv-date">
              {format(new Date(item.startDate), 'yyyy')} —{' '}
              {item.endDate ? format(new Date(item.endDate), 'yyyy') : 'Present'}
            </span>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Languages</h2>
        <div className="cv-languages">
          {cv.languages.map((language) => (
            <span key={language.name}>
              <strong>{language.name}</strong> — {language.level}
            </span>
          ))}
        </div>
      </section>

      <section id="contact" className="cv-contact">
        <h2 className="cv-section-title">Get in Touch</h2>
        <div className="cv-contact-links">
          <a href="mailto:sendtoshevvy@gmail.com">sendtoshevvy@gmail.com</a>
          <a href="https://www.linkedin.com/in/shevvy/" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="https://github.com/andrei-shevel" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
