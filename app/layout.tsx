import { type ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';

import { AnalyticsConsentProvider } from '@/components/analytics/AnalyticsConsentProvider';
import { MixpanelAnalytics } from '@/components/analytics/MixpanelAnalytics';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GradientOrbs } from '@/components/layout/GradientOrbs';
import { ConsoleGreeting } from '@/components/ConsoleGreeting';

import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: {
    default: 'Software Engineer | Andrei Shevel',
    template: '%s | Andrei Shevel',
  },
  description:
    'Software Engineer specializing in frontend architecture, legacy modernization, and team velocity optimization.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Andrei Shevel — Software Engineer',
    description: 'I turn chaos into architecture that scales.',
    siteName: 'Andrei Shevel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Shevel — Software Engineer',
    description: 'I turn chaos into architecture that scales.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} antialiased`}>
        <div className="noise" />
        <GradientOrbs />

        <AnalyticsConsentProvider>
          <Suspense fallback={null}>
            <MixpanelAnalytics />
          </Suspense>
          <ConsoleGreeting />
          <Header />
          <main>{children}</main>
          <Footer />
        </AnalyticsConsentProvider>
      </body>
    </html>
  );
}
