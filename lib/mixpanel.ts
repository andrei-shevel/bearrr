'use client';

import mixpanel from 'mixpanel-browser';

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let initialized = false;

export function initMixpanel() {
  if (!token || initialized || typeof window === 'undefined') {
    return;
  }

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: false,
    persistence: 'localStorage',
    ...(process.env.NEXT_PUBLIC_MIXPANEL_API_HOST ? { api_host: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST } : {}),
  });

  initialized = true;
}

export function trackPageView(path: string) {
  if (!token || !initialized) {
    return;
  }

  mixpanel.track('$pageview', { path });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!token || !initialized) {
    return;
  }

  mixpanel.track(name, properties);
}
