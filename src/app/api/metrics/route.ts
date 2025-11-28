import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate metrics data
  const metrics = {
    uptime: Math.floor(process.uptime()),
    activeUsers: Math.floor(Math.random() * 1000) + 3000,
    cpuUsage: Math.floor(Math.random() * 30) + 15,
    networkTraffic: `${(Math.random() * 100 + 50).toFixed(1)} KB/s`,
    securityStatus: 'SECURED',
    avgWpm: Math.floor(Math.random() * 50) + 30,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(metrics);
}
