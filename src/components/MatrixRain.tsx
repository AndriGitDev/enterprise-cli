'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const charArray = chars.split('');

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    // Reinitialize drops on resize
    const handleResize = () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.removeEventListener('resize', resizeCanvas);
    window.addEventListener('resize', handleResize);

    // Track visibility state
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Draw function
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.fillStyle = '#00ff9d';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation loop with visibility check
    let lastTime = 0;
    const frameInterval = 50; // ~20fps
    let animationId: number;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      // Skip if tab is not visible
      if (!isVisible) return;

      // Throttle to ~20fps
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      draw();
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}
