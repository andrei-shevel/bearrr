import type { Metadata } from 'next';

import './style.css';

const lastUpdated = 'May 17, 2026';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How bearrr.io handles your data. Short version: almost nothing — no cookies, no analytics, no third-party trackers.',
};

export default function Privacy() {
  return (
    <div className="privacy-main">
      <header className="privacy-header">
        <span className="section-tag">Privacy</span>
        <h1 className="section-title">
          What this site does
          <br />
          with your data.
        </h1>
        <p className="privacy-lede">
          Short version: <span className="highlight">almost nothing</span>. No cookies, no analytics, no third-party
          trackers. The long version is below.
        </p>
      </header>

      <section className="privacy-section">
        <h2 className="privacy-section-title">In your browser</h2>
        <p>
          Loading this site does <strong>not</strong> set any cookies and does not write to <code>localStorage</code> or{' '}
          <code>sessionStorage</code>. No analytics scripts run — no Google Analytics, Plausible, Umami, PostHog,
          Sentry, or anything similar. Fonts are downloaded at build time and served from this domain, so your browser
          doesn't talk to Google Fonts at runtime either.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section-title">On the server</h2>
        <p>
          The site is self-hosted on a Debian VPS in the EU behind nginx. Access logs are disabled, so visitor IPs and
          request URLs are <strong>not written to disk</strong>. Your IP address is still seen transiently at the
          network layer in order to deliver the page to you, but it isn't stored, sold, or shared.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section-title">Third parties</h2>
        <p>
          No third-party scripts are embedded on this site. The Contact section links out to GitHub and LinkedIn — if
          you follow those links, you're subject to the privacy policies of those services. The same applies when you
          click the email link and reply from a third-party mail provider.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section-title">If you email me</h2>
        <p>
          Email sent to <a href="mailto:sendtoshevvy@gmail.com">sendtoshevvy@gmail.com</a> is delivered to a personal
          Gmail account, hosted by Google. I'll keep your message for as long as I need it to reply and follow up. You
          can ask me to delete it at any time.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section-title">Your rights (GDPR)</h2>
        <p>
          Under the GDPR you have the right to ask what data I hold about you, request a copy, ask for it to be
          corrected or deleted, and object to processing. Since nothing is collected from your visit itself, in practice
          this only applies to messages you've sent me. To exercise any of these rights, email{' '}
          <a href="mailto:sendtoshevvy@gmail.com">sendtoshevvy@gmail.com</a>.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section-title">Contact</h2>
        <p>
          This site is operated by Andrei Shevel, based in Warsaw, Poland. The only contact channel is{' '}
          <a href="mailto:sendtoshevvy@gmail.com">sendtoshevvy@gmail.com</a>.
        </p>
      </section>

      <p className="privacy-updated">Last updated: {lastUpdated}</p>
    </div>
  );
}
