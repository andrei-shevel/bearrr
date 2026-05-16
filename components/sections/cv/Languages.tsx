import cv from '@/data/cv.json' with { type: 'json' };

import './Languages.css';

export function Languages() {
  return (
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
  );
}
