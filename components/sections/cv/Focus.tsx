import cv from '@/data/cv.json' with { type: 'json' };

import './Focus.css';

export function Focus() {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Leadership Focus</h2>
      <div className="cv-tags">
        {cv.focus.map((focus) => (
          <span key={focus}>{focus}</span>
        ))}
      </div>
    </section>
  );
}
