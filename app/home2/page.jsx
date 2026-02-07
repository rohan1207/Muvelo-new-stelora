'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home2Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home3');
  }, [router]);

  return null;
}
