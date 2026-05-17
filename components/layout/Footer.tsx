import Link from 'next/link';

import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span>© {new Date().getFullYear()} Andrei Shevel. Built with passion.</span>
          <Link href="/privacy" className="footer-link">
            Privacy
          </Link>
        </div>
        <span className="footer-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Warsaw, Poland
        </span>
      </div>
    </footer>
  );
}
