'use client';

import { useEffect } from 'react';

export function ConsoleGreeting() {
  useEffect(() => {
    console.log('Hey, curious dev! Say hi → sendtoshevvy@gmail.com');
  }, []);

  return null;
}
