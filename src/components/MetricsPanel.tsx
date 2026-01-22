'use client';

import { useEffect, useState } from 'react';
import { MetricsData } from '@/types/terminal';

interface MetricsPanelProps {
  wpm?: number;
}

export default function MetricsPanel({ wpm = 0 }: MetricsPanelProps) {
  const [metrics, setMetrics] = useState<MetricsData>({
    uptime: 0,
    activeUsers: 0,
    cpuUsage: 0,
    networkTraffic: '0 KB/s',
    securityStatus: 'SECURED',
    avgWpm: 0,
  });

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateMetrics = () => {
      const uptime = Math.floor((Date.now() - startTime) / 1000);

      setMetrics({
        uptime,
        activeUsers: Math.floor(Math.random() * 1000) + 3000, // Simulated
        cpuUsage: Math.floor(Math.random() * 30) + 15, // 15-45%
        networkTraffic: `${(Math.random() * 100 + 50).toFixed(1)} KB/s`,
        securityStatus: 'SECURED',
        avgWpm: wpm,
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, [wpm]);

  useEffect(() => {
    if (wpm > 60) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  }, [wpm]);

  const formatUptime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'SECURED':
        return '#00ff9d';
      case 'WARNING':
        return '#ffbe0b';
      case 'CRITICAL':
        return '#ff006e';
      default:
        return '#b0b0b0';
    }
  };

  return (
    <div className="metrics-panel glass p-2 rounded-lg">
      <div className="border-b border-cyber-green/30 pb-1 mb-2">
        <h3 className="text-cyber-green font-bold text-xs tracking-wider">[LIVE METRICS]</h3>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">⚡ WPM</div>
          <div className="text-cyber-cyan font-bold text-sm">{wpm || '--'}</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">⏱ Uptime</div>
          <div className="text-cyber-cyan font-bold text-sm">
            {formatUptime(metrics.uptime)}
          </div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">👥 Active</div>
          <div className="text-cyber-cyan font-bold text-sm">
            {metrics.activeUsers.toLocaleString()}
          </div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">🔥 Streak</div>
          <div className="text-cyber-cyan font-bold text-sm">{streak}</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">💾 CPU</div>
          <div className="text-cyber-cyan font-bold text-sm">{metrics.cpuUsage}%</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400 text-[10px]">🔒 Status</div>
          <div
            className="font-bold text-[11px]"
            style={{ color: getStatusColor(metrics.securityStatus) }}
          >
            {metrics.securityStatus}
          </div>
        </div>
      </div>

      {streak > 5 && (
        <div className="mt-2 p-1 bg-cyber-pink/10 border border-cyber-pink/30 rounded text-center">
          <span className="text-cyber-pink font-bold text-[10px]">
            🔥 ON FIRE! {streak} commands at expert speed!
          </span>
        </div>
      )}
    </div>
  );
}
