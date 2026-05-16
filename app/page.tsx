import type { Metadata } from 'next';

import { Hero } from '@/components/sections/home/Hero';
import { Work } from '@/components/sections/home/Work';
import { About } from '@/components/sections/home/About';
import { Contact } from '@/components/sections/home/Contact';

export const metadata: Metadata = {
  title: 'Software Engineer',
  description:
    'Software Engineer specializing in frontend architecture, legacy modernization, and team velocity optimization.',
  keywords: ['Software Engineer', 'Tech Lead', 'Frontend Developer'],
};

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
    </>
  );
}
