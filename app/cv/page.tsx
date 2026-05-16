import type { Metadata } from 'next';

import { Profile } from '@/components/sections/cv/Profile';
import { Experience } from '@/components/sections/cv/Experience';
import { Skills } from '@/components/sections/cv/Skills';
import { Focus } from '@/components/sections/cv/Focus';
import { Education } from '@/components/sections/cv/Education';
import { Languages } from '@/components/sections/cv/Languages';
import { Contact } from '@/components/sections/cv/Contact';

import './style.css';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Professional experience, technical skills, and education of Andrei Shevel.',
  keywords: ['Andrei Shevel CV', 'Software Engineer', 'Tech Lead', 'Frontend Developer'],
};

export default function CV() {
  return (
    <div className="cv-main">
      <Profile />
      <Experience />
      <Skills />
      <Focus />
      <Education />
      <Languages />
      <Contact />
    </div>
  );
}
