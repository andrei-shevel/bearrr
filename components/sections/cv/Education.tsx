import { format } from 'date-fns';

import cv from '@/data/cv.json' with { type: 'json' };

import './Education.css';

export function Education() {
  return (
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
  );
}
