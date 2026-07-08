import Image from 'next/image';

import cv from '@/data/cv.json' with { type: 'json' };

import { getYearsOfExperience } from '@/lib/utils';

import './About.css';

export function About() {
  return (
    <section className="about">
      <div className="about-content">
        <div className="section-header">
          <span className="section-tag">Philosophy</span>
          <h2 className="section-title">
            The best code
            <br />
            makes teams faster.
          </h2>
        </div>
        <div className="about-text">
          <p>
            I’m not just a developer—I’m a <span className="highlight">technical strategist</span> who bridges
            architecture decisions with business outcomes. My focus is on
            <span className="highlight">sustainable practices</span>: migrations, modularization, and component systems
            that compound team velocity over time.
          </p>
          <p>
            I’ve spent {getYearsOfExperience()} years learning that the hardest problems aren’t technical—they’re
            organizational. Legacy code, circular dependencies, and tech debt are symptoms. The cure is architecture
            that serves humans, not just machines.
          </p>
        </div>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Leadership</h4>
            <ul>
              {cv.focus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h4>Frontend</h4>
            <ul>
              {cv.skills.Frontend.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h4>Backend</h4>
            <ul>
              {cv.skills.Backend.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="about-image">
        <div className="image-frame">
          <Image className="avatar-photo" src="/photo.png" alt="Andrei Shevel" width={500} height={500} priority />
          <div className="image-decoration"></div>
        </div>
      </div>
    </section>
  );
}
