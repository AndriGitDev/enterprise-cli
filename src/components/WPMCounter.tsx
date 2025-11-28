'use client';

import { useEffect, useState } from 'react';
import { WPMRank } from '@/types/terminal';

interface WPMCounterProps {
  wpm: number;
}

export default function WPMCounter({ wpm }: WPMCounterProps) {
  const [displayWPM, setDisplayWPM] = useState(0);
  const [rank, setRank] = useState<WPMRank>('NOVICE');
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Animate WPM counter
    setDisplayWPM(wpm);

    // Update rank
    const newRank = getRank(wpm);
    setRank(newRank);

    // Update progress bar
    const percentage = Math.min((wpm / 100) * 100, 100);
    setBarWidth(percentage);
  }, [wpm]);

  const getRank = (wpm: number): WPMRank => {
    if (wpm >= 100) return 'GODLIKE';
    if (wpm >= 81) return 'ELITE';
    if (wpm >= 61) return 'EXPERT';
    if (wpm >= 41) return 'ADVANCED';
    if (wpm >= 21) return 'INTERMEDIATE';
    return 'NOVICE';
  };

  const getRankColor = (rank: WPMRank): string => {
    switch (rank) {
      case 'GODLIKE':
        return '#ff006e';
      case 'ELITE':
        return '#ff006e';
      case 'EXPERT':
        return '#00ff9d';
      case 'ADVANCED':
        return '#00d4ff';
      case 'INTERMEDIATE':
        return '#ffbe0b';
      case 'NOVICE':
        return '#ff6b6b';
      default:
        return '#b0b0b0';
    }
  };

  const getRankEmoji = (rank: WPMRank): string => {
    switch (rank) {
      case 'GODLIKE':
        return '🔥🔥🔥';
      case 'ELITE':
        return '🔥🔥';
      case 'EXPERT':
        return '🔥';
      case 'ADVANCED':
        return '⚡';
      case 'INTERMEDIATE':
        return '💪';
      case 'NOVICE':
        return '🐢';
      default:
        return '';
    }
  };

  const getRankMessage = (rank: WPMRank): string => {
    switch (rank) {
      case 'GODLIKE':
        return 'UNSTOPPABLE!';
      case 'ELITE':
        return 'Elite Hacker';
      case 'EXPERT':
        return 'Expert Mode';
      case 'ADVANCED':
        return 'Getting Faster!';
      case 'INTERMEDIATE':
        return 'Warming Up...';
      case 'NOVICE':
        return 'Keep Typing!';
      default:
        return 'Start Typing';
    }
  };

  const rankColor = getRankColor(rank);

  return (
    <div className="wpm-counter glass p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getRankEmoji(rank)}</span>
          <div>
            <div className="text-sm text-gray-400">Words Per Minute</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold" style={{ color: rankColor }}>
                {displayWPM}
              </span>
              <span className="text-sm" style={{ color: rankColor }}>
                WPM
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-lg font-bold uppercase tracking-wider"
            style={{ color: rankColor }}
          >
            {rank}
          </div>
          <div className="text-xs text-gray-400">{getRankMessage(rank)}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out wpm-bar"
          style={{
            width: `${barWidth}%`,
            background: `linear-gradient(90deg, ${rankColor}, ${rankColor}aa)`,
            boxShadow: `0 0 10px ${rankColor}`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white z-10">
          {'█'.repeat(Math.floor(barWidth / 5))}
          {'░'.repeat(20 - Math.floor(barWidth / 5))}
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        {wpm > 0
          ? `Your typing speed ranks in top ${100 - Math.min(barWidth, 95)}% of terminal users`
          : 'Start typing to track your WPM...'}
      </div>
    </div>
  );
}
