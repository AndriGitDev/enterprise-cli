'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import MatrixRain from '@/components/MatrixRain';
import LoadingScreen from '@/components/LoadingScreen';
import WPMCounter from '@/components/WPMCounter';
import MetricsPanel from '@/components/MetricsPanel';

// Dynamic import for Terminal to avoid SSR issues with xterm
const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-cyber-green">Loading terminal...</div>
    </div>
  ),
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [showMatrix, setShowMatrix] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleWPMUpdate = (wpm: number) => {
    setCurrentWPM(wpm);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main className="relative min-h-screen bg-cyber-dark overflow-hidden">
      {/* Matrix rain background */}
      {showMatrix && <MatrixRain />}

      {/* Main container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Terminal - 80% of screen */}
        <div className="h-[80vh] p-4 md:p-6 pb-0">
          <div className="h-full glass rounded-lg overflow-hidden">
            <Terminal onWPMUpdate={handleWPMUpdate} />
          </div>
        </div>

        {/* Bottom Panel - 20% of screen */}
        <div className="h-[20vh] flex flex-col px-4 md:px-6 py-3 space-y-2 overflow-y-auto">
          {/* Metrics and WPM in compact layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MetricsPanel wpm={currentWPM} />
            <WPMCounter wpm={currentWPM} />
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 py-1">
            <p>
              © 2025 ANDRI.IS - All rights reserved |{' '}
              <a
                href="https://andri.is"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-green hover:text-cyber-cyan transition-colors"
              >
                Main Portfolio
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
