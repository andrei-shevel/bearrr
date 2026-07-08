import { getYearsOfExperience } from '@/lib/utils';

import './Profile.css';

export function Profile() {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Profile</h2>
      <p className="cv-profile">
        Full-stack software engineer with {getYearsOfExperience()}+ years shipping scalable products across the
        JavaScript/TypeScript stack—React on the front end, Node.js services, REST APIs, and Postgres/Mongo data layers
        on the back end. Strong in architecture, monorepos, performance tooling, and large-scale modernization across
        engineering orgs of up to 20 people, with end-to-end ownership from API and data design through UI and AWS
        delivery.
      </p>
    </section>
  );
}
