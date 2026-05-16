import { getYearsOfExperience } from '@/lib/utils';

import './Profile.css';

export function Profile() {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Profile</h2>
      <p className="cv-profile">
        {getYearsOfExperience()}+ years building and scaling web applications. I lead frontend architecture decisions,
        mentor engineering teams, and bridge technical execution with business outcomes. My focus is on sustainable
        practices—migrations, modularization, component systems—that compound team velocity over time.
      </p>
    </section>
  );
}
