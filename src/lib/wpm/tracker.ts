import { WPMStats, WPMRank } from '@/types/terminal';

export class WPMTracker {
  private startTime: number;
  private charactersTyped: number = 0;
  private backspaces: number = 0;
  private peakWPM: number = 0;
  private wpmHistory: number[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private onUpdate: (wpm: number) => void;

  constructor(onUpdate: (wpm: number) => void) {
    this.startTime = Date.now();
    this.onUpdate = onUpdate;
    this.startTracking();
  }

  private startTracking() {
    // Update WPM every 2 seconds
    this.updateInterval = setInterval(() => {
      const wpm = this.calculateCurrentWPM();
      this.wpmHistory.push(wpm);

      // Keep only last 30 readings (60 seconds)
      if (this.wpmHistory.length > 30) {
        this.wpmHistory.shift();
      }

      if (wpm > this.peakWPM) {
        this.peakWPM = wpm;
      }

      this.onUpdate(wpm);
    }, 2000);
  }

  trackKeystroke() {
    this.charactersTyped++;
  }

  trackBackspace() {
    this.backspaces++;
  }

  private calculateCurrentWPM(): number {
    const now = Date.now();
    const timeElapsed = (now - this.startTime) / 1000 / 60; // in minutes

    if (timeElapsed === 0) return 0;

    // Standard WPM calculation: (characters / 5) / time in minutes
    const wpm = Math.round((this.charactersTyped / 5) / timeElapsed);
    return wpm;
  }

  getStats(): WPMStats {
    const current = this.calculateCurrentWPM();
    const average =
      this.wpmHistory.length > 0
        ? Math.round(this.wpmHistory.reduce((a, b) => a + b, 0) / this.wpmHistory.length)
        : 0;

    const accuracy = this.calculateAccuracy();
    const rank = this.getRank(current);

    return {
      current,
      average,
      peak: this.peakWPM,
      accuracy,
      rank,
      streak: this.charactersTyped,
    };
  }

  private calculateAccuracy(): number {
    const totalKeystrokes = this.charactersTyped + this.backspaces;
    if (totalKeystrokes === 0) return 100;
    const accuracy = ((this.charactersTyped - this.backspaces) / totalKeystrokes) * 100;
    return Math.max(0, Math.round(accuracy));
  }

  getRank(wpm: number): WPMRank {
    if (wpm >= 100) return 'GODLIKE';
    if (wpm >= 81) return 'ELITE';
    if (wpm >= 61) return 'EXPERT';
    if (wpm >= 41) return 'ADVANCED';
    if (wpm >= 21) return 'INTERMEDIATE';
    return 'NOVICE';
  }

  getRankColor(rank: WPMRank): string {
    switch (rank) {
      case 'GODLIKE':
        return '#ff006e'; // Neon pink
      case 'ELITE':
        return '#ff006e'; // Neon pink
      case 'EXPERT':
        return '#00ff9d'; // Green
      case 'ADVANCED':
        return '#00d4ff'; // Cyan
      case 'INTERMEDIATE':
        return '#ffbe0b'; // Yellow
      case 'NOVICE':
        return '#ff006e'; // Red
      default:
        return '#b0b0b0'; // Gray
    }
  }

  getWPMBar(wpm: number, maxLength: number = 20): string {
    const percentage = Math.min(wpm / 100, 1);
    const filled = Math.round(percentage * maxLength);
    const empty = maxLength - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  reset() {
    this.startTime = Date.now();
    this.charactersTyped = 0;
    this.backspaces = 0;
    this.wpmHistory = [];
  }
}
