import appsData from '@/data/apps.json' with { type: 'json' };

export type AppFeature = {
  title: string;
  description: string;
};

export type AppScreenshot = {
  src: string;
  alt: string;
};

export type AppPrivacySection = {
  title: string;
  body: string[];
};

export type AppPrivacyPolicy = {
  effectiveDate: string;
  collectsData: boolean;
  summary: string;
  sections: AppPrivacySection[];
};

export type App = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  platform: string;
  price: string;
  icon: string;
  accent: string;
  distribution: 'appstore' | 'direct';
  downloadUrl: string;
  appStoreId: string;
  bundleId: string;
  supportEmail: string;
  intro: string[];
  features: AppFeature[];
  highlights: string[];
  screenshots: AppScreenshot[];
  privacyPolicy: AppPrivacyPolicy;
};

const apps = appsData.apps as App[];

export function getApps(): App[] {
  return apps;
}

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}
