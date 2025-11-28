'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const bootSequence = [
    '[ESTABLISHING SECURE CONNECTION...]',
    '[INITIALIZING TERMINAL INTERFACE...]',
    '[LOADING PORTFOLIO DATA...]',
    '[CALIBRATING WPM TRACKER...]',
    '[SECURITY PROTOCOLS ACTIVE...]',
    '[SYSTEM READY]',
  ];

  useEffect(() => {
    const steps = [
      { delay: 500, action: () => setCurrentStep(1) },
      { delay: 1000, action: () => setCurrentStep(2) },
      { delay: 1500, action: () => setCurrentStep(3) },
      { delay: 2000, action: () => setCurrentStep(4) },
      { delay: 2500, action: () => setCurrentStep(5) },
      { delay: 3000, action: () => setShowLogo(true) },
      { delay: 4000, action: onComplete },
    ];

    const timeouts = steps.map(({ delay, action }) => setTimeout(action, delay));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="text-center max-w-2xl px-4">
        {!showLogo ? (
          <div className="space-y-2">
            {bootSequence.slice(0, currentStep + 1).map((step, i) => (
              <div
                key={i}
                className={`text-cyber-green font-mono text-sm transition-opacity duration-300 ${
                  i === currentStep ? 'opacity-100 glow' : 'opacity-50'
                }`}
              >
                {step}
              </div>
            ))}
            <div className="mt-4">
              <div className="inline-block">
                <span className="text-cyber-cyan cursor">█</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glitch">
            <pre className="text-cyber-green text-xs md:text-sm leading-tight">
{`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     █████╗ ███╗   ██╗██████╗ ██████╗ ██╗    ██╗███████╗      ║
║    ██╔══██╗████╗  ██║██╔══██╗██╔══██╗██║    ██║██╔════╝      ║
║    ███████║██╔██╗ ██║██║  ██║██████╔╝██║ █╗ ██║███████╗      ║
║    ██╔══██║██║╚██╗██║██║  ██║██╔══██╗██║███╗██║╚════██║      ║
║    ██║  ██║██║ ╚████║██████╔╝██║  ██║╚███╔███╔╝███████║      ║
║    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝      ║
║                                                                ║
║                  TERMINAL INTERFACE v2.0                       ║
║                    Simplify IT                                 ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
