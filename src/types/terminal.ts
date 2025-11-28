export interface CommandOutput {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandOutput | Promise<CommandOutput>;
  aliases?: string[];
}

export interface WPMStats {
  current: number;
  average: number;
  peak: number;
  accuracy: number;
  rank: WPMRank;
  streak: number;
}

export type WPMRank =
  | 'NOVICE'       // 0-20 WPM
  | 'INTERMEDIATE' // 21-40 WPM
  | 'ADVANCED'     // 41-60 WPM
  | 'EXPERT'       // 61-80 WPM
  | 'ELITE'        // 81+ WPM
  | 'GODLIKE';     // 100+ WPM

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface MetricsData {
  uptime: number;
  activeUsers: number;
  cpuUsage: number;
  networkTraffic: string;
  securityStatus: 'SECURED' | 'WARNING' | 'CRITICAL';
  avgWpm: number;
}

export interface TerminalSession {
  id: string;
  startTime: Date;
  commandsExecuted: number;
  charactersTyped: number;
  backspaces: number;
  wpmStats: WPMStats;
  achievements: Achievement[];
}
