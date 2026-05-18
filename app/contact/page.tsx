import type { Metadata } from 'next';

import { Contact } from '@/components/sections/contact/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Andrei Shevel about frontend architecture, team scaling, legacy modernization, and technical leadership.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
