import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Syne } from "next/font/google";

import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrei Shevel — Software Engineer",
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

        <nav className="nav">
          <Link href="/" className="logo">
            AS<span className="logo-dot">.</span>
          </Link>
          <div className="nav-links">
            <Link href="/#work">Impact</Link>
            <Link href="/#about">Philosophy</Link>
            <Link href="/cv">CV</Link>
            <Link href="/#contact" className="nav-cta">
              Let's Talk
            </Link>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-content">
            <span>
              © {new Date().getFullYear()} Andrei Shevel. Built with passion.
            </span>
            <span className="footer-location">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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
