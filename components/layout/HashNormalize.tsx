'use client';

import { useEffect } from 'react';

/** Collapse malformed chained fragments (e.g. #work#about → #work) from history or bad navigations. */
export function HashNormalize() {
  useEffect(() => {
    const { hash } = window.location;
    if (hash.includes('#', 1)) {
      const first = hash.split('#')[1];
      if (first !== undefined) {
        window.location.hash = first;
      }
    }
  }, []);

  return null;
}
