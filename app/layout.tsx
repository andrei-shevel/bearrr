import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';

import { Header } from '@/components/Header';
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
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />

        <ConsoleGreeting />
        <Header />
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-content">
            <span>© {new Date().getFullYear()} Andrei Shevel. Built with passion.</span>
            <span className="footer-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Warsaw, Poland
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
