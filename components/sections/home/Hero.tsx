import { LocalTime } from '@/components/LocalTime';

import { getYearsOfExperience } from '@/lib/utils';

import './Hero.css';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          Software Engineer
        </div>
        <div className="hero-meta">
          <span className="hero-location">Warsaw, Poland</span>
          <LocalTime className="hero-time" />
        </div>
      </div>

      <h1 className="hero-title">
        <span className="title-line">I turn chaos</span>
        <span className="title-line title-highlight">into architecture</span>
        <span className="title-line">that scales.</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-subtitle">
          {getYearsOfExperience()}+ years of making teams faster. I lead frontend architecture, eliminate technical debt
          at scale, and build systems that compound velocity over time.{' '}
          <span className="highlight">Force multiplier by design.</span>
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            <span>See My Impact</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <Link href="/contact" className="btn btn-ghost">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
