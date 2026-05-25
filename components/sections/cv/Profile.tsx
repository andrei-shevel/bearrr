import { getYearsOfExperience } from '@/lib/utils';

import './Profile.css';

export function Profile() {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">Profile</h2>
      <p className="cv-profile">
        Full-stack engineer with {getYearsOfExperience()}+ years owning web products end to end—React/TypeScript UIs and
        accessible component systems, Node.js and Ruby on Rails services, AWS delivery, and org-wide architecture.
        Comfortable across the stack and across the lifecycle: requirements, design, implementation, deployment, and
        operation. I drive modernization, partner closely with product and design, and ship sustainable
        practices—migrations, monorepos, observability—that compound team velocity.
      </p>
    </section>
  );
}
