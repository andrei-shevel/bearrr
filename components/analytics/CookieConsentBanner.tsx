'use client';

import Link from 'next/link';

import './CookieConsent.css';

type CookieConsentBannerProps = {
  onAccept: () => void;
  onReject: () => void;
};

export function CookieConsentBanner({ onAccept, onReject }: CookieConsentBannerProps) {
  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="cookie-consent-content">
        <p id="cookie-consent-title" className="cookie-consent-title">
          Analytics
        </p>
        <p id="cookie-consent-description" className="cookie-consent-text">
          This site uses Mixpanel to measure page views. Accepting stores a random ID in your browser and sends
          anonymous visit data to Mixpanel. Decline keeps analytics off. See the{' '}
          <Link href="/privacy">privacy page</Link> for details.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="btn btn-primary" onClick={onAccept}>
            Accept
          </button>
          <button type="button" className="btn btn-ghost" onClick={onReject}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
