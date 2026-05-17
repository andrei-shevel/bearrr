'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import './Header.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav className="nav">
      <Link href="/" className="logo">
        AS<span className="logo-dot">.</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">
        <Link href="/#work">Impact</Link>
        <Link href="/#about">Philosophy</Link>
        <Link href="/cv">CV</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/#contact" className="nav-cta">
          Let's Talk
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link href="/#work" onClick={handleLinkClick}>
            Impact
          </Link>
          <Link href="/#about" onClick={handleLinkClick}>
            Philosophy
          </Link>
          <Link href="/cv" onClick={handleLinkClick}>
            CV
          </Link>
          <Link href="/projects" onClick={handleLinkClick}>
            Projects
          </Link>
          <Link href="/#contact" className="nav-cta" onClick={handleLinkClick}>
            Let's Talk
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className="mobile-menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
}
