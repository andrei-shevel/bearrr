export const CONSENT_STORAGE_KEY = 'analytics-consent';

export type AnalyticsConsent = 'granted' | 'denied' | null;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(CONSENT_STORAGE_KEY);

  if (value === 'granted' || value === 'denied') {
    return value;
  }

  return null;
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  localStorage.setItem(CONSENT_STORAGE_KEY, consent);
}

export function clearAnalyticsConsent() {
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function hasAnalyticsConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}
