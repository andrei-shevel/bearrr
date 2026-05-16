import cv from '@/data/cv.json' with { type: 'json' };

import './Skills.css';

export function Skills() {
  return (
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
  );
}
