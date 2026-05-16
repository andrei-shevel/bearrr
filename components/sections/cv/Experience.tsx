import { format } from 'date-fns';

import cv from '@/data/cv.json' with { type: 'json' };

import './Experience.css';

export function Experience() {
  return (
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
  );
}
