import type { Metadata } from 'next';

import { AppList } from '@/components/sections/apps/AppList';

import './style.css';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Apps by Andrei Shevel — small, focused tools for iOS.',
};

export default function Apps() {
  return (
    <div className="apps-main">
      <header className="apps-header">
        <span className="section-tag">Apps</span>
        <h1 className="section-title">Apps I’ve shipped.</h1>
        <p className="apps-lede">
          Things I’ve built and released — made with care, mindful of your privacy, and designed to stay out of your
          way.
        </p>
      </header>
      <AppList />
    </div>
  );
}
