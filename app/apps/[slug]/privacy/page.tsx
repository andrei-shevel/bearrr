import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getApp, getApps } from '@/lib/apps';

import './style.css';

type PrivacyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getApps().map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    return {};
  }

  return {
    title: `${app.name} Privacy Policy`,
    description: app.privacyPolicy.summary,
  };
}

export default async function AppPrivacyPage({ params }: PrivacyPageProps) {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    notFound();
  }

  const { privacyPolicy } = app;

  return (
    <div className="app-privacy-main">
      <header className="app-privacy-header">
        <span className="section-tag">Privacy</span>
        <h1 className="section-title">{app.name} Privacy Policy</h1>
        <p className="app-privacy-lede">{privacyPolicy.summary}</p>
      </header>

      {privacyPolicy.sections.map((section) => (
        <section key={section.title} className="app-privacy-section">
          <h2 className="app-privacy-section-title">{section.title}</h2>
          {section.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      ))}

      <div className="app-privacy-back">
        <Link href={`/apps/${app.slug}`}>← Back to {app.name}</Link>
      </div>

      <p className="app-privacy-updated">Effective date: {privacyPolicy.effectiveDate}</p>
    </div>
  );
}
