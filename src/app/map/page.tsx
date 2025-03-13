'use client';
import dynamic from 'next/dynamic';

// Désactiver SSR pour la carte
const RunningTracker = dynamic(() => import("../components/RunningTracker"), { ssr: false });

export default function MapPage() {
  return <RunningTracker />;
}
