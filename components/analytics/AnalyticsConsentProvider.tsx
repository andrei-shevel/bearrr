'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { CookieConsentBanner } from '@/components/analytics/CookieConsentBanner';
import {
  clearAnalyticsConsent,
  getAnalyticsConsent,
  hasAnalyticsConfigured,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from '@/lib/analytics-consent';

type AnalyticsConsentContextValue = {
  consent: AnalyticsConsent;
  grantConsent: () => void;
  denyConsent: () => void;
  resetConsent: () => void;
};

const AnalyticsConsentContext = createContext<AnalyticsConsentContextValue | null>(null);

export function useAnalyticsConsent() {
  const context = useContext(AnalyticsConsentContext);

  if (!context) {
    throw new Error('useAnalyticsConsent must be used within AnalyticsConsentProvider');
  }

  return context;
}

export function AnalyticsConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<AnalyticsConsent>(null);
  const [mounted, setMounted] = useState(false);
  const analyticsEnabled = hasAnalyticsConfigured();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getAnalyticsConsent());
    setMounted(true);
  }, []);

  const grantConsent = useCallback(() => {
    setAnalyticsConsent('granted');
    setConsent('granted');
  }, []);

  const denyConsent = useCallback(() => {
    setAnalyticsConsent('denied');
    setConsent('denied');
  }, []);

  const resetConsent = useCallback(() => {
    clearAnalyticsConsent();
    setConsent(null);
  }, []);

  return (
    <AnalyticsConsentContext.Provider value={{ consent, grantConsent, denyConsent, resetConsent }}>
      {children}
      {mounted && analyticsEnabled && consent === null && (
        <CookieConsentBanner onAccept={grantConsent} onReject={denyConsent} />
      )}
    </AnalyticsConsentContext.Provider>
  );
}
