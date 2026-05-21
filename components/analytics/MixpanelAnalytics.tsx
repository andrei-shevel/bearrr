'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAnalyticsConsent } from '@/components/analytics/AnalyticsConsentProvider';
import { initMixpanel, trackPageView } from '@/lib/mixpanel';

export function MixpanelAnalytics() {
  const pathname = usePathname();
  const { consent } = useAnalyticsConsent();

  useEffect(() => {
    if (consent === 'granted') {
      initMixpanel();
    }
  }, [consent]);

  useEffect(() => {
    if (consent === 'granted') {
      trackPageView(pathname);
    }
  }, [consent, pathname]);

  return null;
}
