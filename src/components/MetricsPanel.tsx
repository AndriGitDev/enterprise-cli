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
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;

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
    <div className="metrics-panel glass p-4 rounded-lg mb-4">
      <div className="border-b border-cyber-green/30 pb-2 mb-3">
        <h3 className="text-cyber-green font-bold text-sm tracking-wider">[LIVE METRICS]</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <div className="metric-item">
          <div className="text-gray-400">⚡ WPM</div>
          <div className="text-cyber-cyan font-bold text-lg">{wpm || '--'}</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400">⏱ Uptime</div>
          <div className="text-cyber-cyan font-bold text-lg">
            {formatUptime(metrics.uptime)}
          </div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400">👥 Active</div>
          <div className="text-cyber-cyan font-bold text-lg">
            {metrics.activeUsers.toLocaleString()}
          </div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400">🔥 Streak</div>
          <div className="text-cyber-cyan font-bold text-lg">{streak}</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400">💾 CPU</div>
          <div className="text-cyber-cyan font-bold text-lg">{metrics.cpuUsage}%</div>
        </div>

        <div className="metric-item">
          <div className="text-gray-400">🔒 Status</div>
          <div
            className="font-bold text-sm"
            style={{ color: getStatusColor(metrics.securityStatus) }}
          >
            {metrics.securityStatus}
          </div>
        </div>
      </div>

      {streak > 5 && (
        <div className="mt-3 p-2 bg-cyber-pink/10 border border-cyber-pink/30 rounded text-center">
          <span className="text-cyber-pink font-bold text-xs">
            🔥 ON FIRE! {streak} commands at expert speed!
          </span>
        </div>
      )}
    </div>
  );
}
