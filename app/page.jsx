'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingScreen from '@/components/LandingScreen';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home3');
    }, 4500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full h-screen bg-black">
      <LandingScreen />
    </div>
  );
}
