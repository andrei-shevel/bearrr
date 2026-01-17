import Image from "next/image";
import { CSSProperties } from "react";
import { format } from "date-fns";

import cv from "@/data/cv.json" with { type: "json" };
import { getYearsOfExperience } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-dot"></span>
            Software Engineer
          </div>
          <h1 className="hero-title">
            <span className="title-line">I turn chaos</span>
            <span className="title-line title-highlight">
              into architecture
            </span>
            <span className="title-line">that scales.</span>
          </h1>
          <p className="hero-subtitle">
            {getYearsOfExperience()}+ years of making teams faster. I lead
            frontend architecture, eliminate technical debt at scale, and build
            systems that compound velocity over time.{" "}
            <span className="highlight">Force multiplier by design.</span>
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <span>See My Impact</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="window-title">andrei.config.ts</span>
            </div>
            <pre className="window-code">
              <code>
                <span className="code-keyword">export const</span>{" "}
                <span className="code-var">engineer</span>
                {" = {\n"}
                {"  "}
                <span className="code-prop">name</span>:{" "}
                <span className="code-string">"Andrei Shevel"</span>,{"\n"}
                {"  "}
                <span className="code-prop">role</span>:{" "}
                <span className="code-string">"Software Engineer"</span>,{"\n"}
                {"  "}
                <span className="code-prop">location</span>:{" "}
                <span className="code-string">"Warsaw, Poland"</span>,{"\n"}
                {"  "}
                <span className="code-prop">focus</span>: [{"\n"}
                {"    "}
                <span className="code-string">"Architecture"</span>,{"\n"}
                {"    "}
                <span className="code-string">"Legacy Modernization"</span>,
                {"\n"}
                {"    "}
                <span className="code-string">"Team Velocity"</span>
                {"\n"}
                {"  "}],{"\n"}
                {"  "}
                <span className="code-prop">principle</span>:{" "}
                <span className="code-string">
                  "Ship code that{"\n    "}makes others faster"
                </span>
                {"\n"}
                {"}"} <span className="code-keyword">satisfies</span>{" "}
                <span className="code-var">Engineer</span>;
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="work" className="work">
        <div className="section-header">
          <span className="section-tag">Impact Areas</span>
          <h2 className="section-title">How I Move the Needle</h2>
        </div>

        <div className="projects-grid">
          {cv.experience.map((experience, index) => {
            if (experience.impact) {
              return (
                <article key={experience.company} className="project-card">
                  <div className="project-image">
                    <div
                      className="project-placeholder"
                      style={{ "--hue": index ? 320 : 180 } as CSSProperties}
                    >
                      <Image
                        src={experience.impact.image}
                        alt={experience.company}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-tags">
                      {experience.impact.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <h3 className="project-title">{experience.impact.title}</h3>
                    <p className="project-desc">
                      {experience.impact.description}
                    </p>
                    <span className="project-link">
                      {experience.company} ·{" "}
                      {format(new Date(experience.startDate), "MMM yyyy")} –{" "}
                      {experience.endDate
                        ? format(new Date(experience.endDate), "MMM yyyy")
                        : "Present"}
                    </span>
                  </div>
                </article>
              );
            }
          })}
        </div>
      </section>

      <section id="about" className="about">
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
              I'm not just a developer—I'm a{" "}
              <span className="highlight">technical strategist</span> who
              bridges architecture decisions with business outcomes. My focus is
              on
              <span className="highlight">sustainable practices</span>:
              migrations, modularization, and component systems that compound
              team velocity over time.
            </p>
            <p>
              I've spent 14 years learning that the hardest problems aren't
              technical—they're organizational. Legacy code, circular
              dependencies, and tech debt are symptoms. The cure is architecture
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
            <Image
              className="avatar-photo"
              src="/photo.png"
              alt="Andrei Shevel"
              width={500}
              height={500}
              priority
            />
            <div className="image-decoration"></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-content">
          <div className="section-header">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">
              Scaling a team?
              <br />
              Let's talk architecture.
            </h2>
          </div>
          <p className="contact-text">
            I'm always interested in conversations about frontend architecture,
            team scaling, and legacy modernization. Whether you're facing a
            technical challenge or just want to exchange ideas—reach out.
          </p>
          <a
            href="mailto:sendtoshevvy@gmail.com"
            className="btn btn-primary btn-large"
          >
            <span>sendtoshevvy@gmail.com</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <div className="social-links">
            <a
              href="https://github.com/andrei-shevel"
              className="social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/shevvy/"
              className="social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
