import "./style.css";

export default function CV() {
  return (
    <div className="cv-main">
      <section className="cv-section">
        <h2 className="cv-section-title">Profile</h2>
        <p className="cv-profile">
          14+ years building and scaling web applications. I lead frontend
          architecture decisions, mentor engineering teams, and bridge technical
          execution with business outcomes. My focus is on sustainable
          practices—migrations, modularization, component systems—that compound
          team velocity over time.
        </p>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Experience</h2>

        <div className="cv-job">
          <div className="cv-job-header">
            <div>
              <h3>Senior Frontend Developer</h3>
              <p className="cv-company">Apollo.io · Warsaw, Poland</p>
            </div>
            <span className="cv-date">Jun 2024 — Present</span>
          </div>
          <ul className="cv-list">
            <li>
              Technical lead for modularization initiative—defined architecture
              vision, drove org-wide adoption of monorepo structure
            </li>
            <li>
              Established frontend platform standards: eslint config, TypeScript
              patterns, and package isolation strategies
            </li>
            <li>
              Led codebase modernization at scale: eliminated legacy libraries
              (jQuery, moment.js, prop-types)
            </li>
            <li>
              Reduced technical debt by 90% in circular dependencies, unblocking
              teams and improving build reliability
            </li>
            <li>
              Designed and implemented performance observability system enabling
              proactive regression detection across teams
            </li>
            <li>
              Drove react-router migration strategy—created proxy component
              patterns adopted org-wide
            </li>
            <li>
              Active member of Frontend Strategy Group, influencing technical
              direction and architectural decisions
            </li>
            <li>
              Mentoring engineers across teams; top code contributor while
              maintaining focus on force-multiplying work
            </li>
          </ul>
        </div>

        <div className="cv-job">
          <div className="cv-job-header">
            <div>
              <h3>Director of Engineering</h3>
              <p className="cv-company">INDY · Warsaw, Poland</p>
            </div>
            <span className="cv-date">2016 — 2024</span>
          </div>
          <ul className="cv-list">
            <li>
              Progressed Senior Developer → Frontend Lead → Director, building
              and scaling the engineering organization
            </li>
            <li>
              Architected and executed TypeScript migration across the entire
              frontend codebase, improving DX and reducing runtime errors
            </li>
            <li>
              Built frontend component library adopted across all product teams,
              accelerating feature development
            </li>
            <li>
              Designed AWS infrastructure for frontend deployments—CI/CD
              pipelines, CDN configuration, and monitoring
            </li>
            <li>
              Led cross-functional initiative to resolve critical domain
              blocking issue, restoring service availability
            </li>
            <li>
              Transitioned to backend team to unblock delivery and developed
              comprehensive migration plan for legacy codebase
            </li>
            <li>
              Owned technical roadmap, architecture reviews, and engineering
              hiring process
            </li>
          </ul>
        </div>

        <div className="cv-job">
          <div className="cv-job-header">
            <div>
              <h3>Software Engineer → Team Lead</h3>
              <p className="cv-company">Itransition</p>
            </div>
            <span className="cv-date">2012 — 2016</span>
          </div>
          <ul className="cv-list">
            <li>
              Grew from junior developer to team lead over 4 years, shipping
              frontend, backend, and mobile solutions
            </li>
            <li>
              Established team education program—structured code reviews,
              knowledge sharing sessions, and onboarding processes
            </li>
            <li>
              Served as primary technical point of contact for enterprise
              clients, managing requirements and delivery
            </li>
            <li>
              Developed expertise across full stack: frontend interfaces,
              backend APIs, and mobile applications
            </li>
          </ul>
        </div>

        <div className="cv-job">
          <div className="cv-job-header">
            <div>
              <h3>Full Stack Developer</h3>
              <p className="cv-company">Freelance</p>
            </div>
            <span className="cv-date">2011 — 2012</span>
          </div>
          <ul className="cv-list">
            <li>
              Delivered end-to-end web solutions—from requirements gathering to
              deployment and maintenance
            </li>
            <li>
              Handled design adaptation for web, translating visual designs into
              responsive implementations
            </li>
            <li>
              Managed direct client relationships, building foundation for
              future leadership roles
            </li>
          </ul>
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Technical Skills</h2>
        <div className="cv-skills">
          <div className="cv-skill-group">
            <h4>Core</h4>
            <p>TypeScript, JavaScript, HTML, CSS, SASS</p>
          </div>
          <div className="cv-skill-group">
            <h4>Frontend</h4>
            <p>React, Webpack, Component Systems</p>
          </div>
          <div className="cv-skill-group">
            <h4>Backend</h4>
            <p>Node.js, NestJS, MongoDB</p>
          </div>
          <div className="cv-skill-group">
            <h4>Platform</h4>
            <p>AWS, Docker, CI/CD</p>
          </div>
          <div className="cv-skill-group">
            <h4>Practices</h4>
            <p>TDD, Jest, Architecture</p>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Leadership Focus</h2>
        <div className="cv-tags">
          <span>Architecture & Tech Strategy</span>
          <span>Team Building & Mentorship</span>
          <span>Cross-team Collaboration</span>
          <span>Legacy Modernization</span>
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Education</h2>
        <div className="cv-education">
          <div>
            <h3>BSc Applied Mathematics</h3>
            <p className="cv-company">
              Yanka Kupala State University · Grodno, Belarus
            </p>
          </div>
          <span className="cv-date">2004 — 2009</span>
        </div>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Languages</h2>
        <div className="cv-languages">
          <span>
            <strong>English</strong> — Professional
          </span>
          <span>
            <strong>Russian</strong> — Native
          </span>
        </div>
      </section>

      <section id="contact" className="cv-contact">
        <h2 className="cv-section-title">Get in Touch</h2>
        <div className="cv-contact-links">
          <a href="mailto:sendtoshevvy@gmail.com">sendtoshevvy@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/shevvy/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/andrei-shevel"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
