import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getApp, getApps } from '@/lib/apps';
import { AppStoreBadge } from '@/components/sections/apps/AppStoreBadge';

import './style.css';

type AppPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getApps().map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    return {};
  }

  const description = `${app.tagline} ${app.summary}`;

  return {
    title: app.name,
    description,
    openGraph: {
      title: `${app.name} — ${app.tagline}`,
      description,
      images: [{ url: app.icon }],
    },
    twitter: {
      card: 'summary',
      title: `${app.name} — ${app.tagline}`,
      description,
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    notFound();
  }

  const accentStyle = { '--app-accent': app.accent } as CSSProperties;

  return (
    <div className="app-page" style={accentStyle}>
      <section className="app-hero">
        <Image
          className="app-hero-icon"
          src={app.icon}
          alt={`${app.name} app icon`}
          width={120}
          height={120}
          priority
        />
        <h1 className="app-hero-title">{app.name}</h1>
        <p className="app-hero-tagline">{app.tagline}</p>
        <p className="app-hero-summary">{app.summary}</p>

        <div className="app-hero-cta">
          <AppStoreBadge url={app.appStoreUrl || undefined} large />
        </div>
      </section>

      <section className="app-intro">
        {app.intro.map((paragraph, i) => (
          <p key={i} className="app-intro-paragraph">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="app-shots" aria-label="Screenshots">
        <div className="app-shots-track">
          {app.screenshots.map((shot) => (
            <Image
              key={shot.src}
              className="app-shot"
              src={shot.src}
              alt={shot.alt}
              width={1284}
              height={2778}
              sizes="(max-width: 768px) 60vw, 240px"
            />
          ))}
        </div>
      </section>

      <section className="app-features">
        <span className="section-tag">Features</span>
        <div className="app-features-grid">
          {app.features.map((feature) => (
            <div key={feature.title} className="app-feature">
              <h3 className="app-feature-title">{feature.title}</h3>
              <p className="app-feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="app-footer-cta">
        <AppStoreBadge url={app.appStoreUrl || undefined} large />
        <div className="app-footer-links">
          <a href={`mailto:${app.supportEmail}`}>Support</a>
          <Link href={`/apps/${app.slug}/privacy`}>Privacy</Link>
          <Link href="/apps">All apps</Link>
        </div>
      </section>
    </div>
  );
}
