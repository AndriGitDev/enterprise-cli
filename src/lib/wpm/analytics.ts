import { Achievement } from '@/types/terminal';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Type at >80 WPM for 1 minute',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'marathon_typer',
    name: 'Marathon Typer',
    description: 'Type 1000 characters without stopping',
    icon: '🏃',
    unlocked: false,
  },
  {
    id: 'perfect_accuracy',
    name: 'Perfect Accuracy',
    description: '100 characters with no backspaces',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Use terminal between 2-4 AM',
    icon: '🦉',
    unlocked: false,
  },
  {
    id: 'script_master',
    name: 'Script Master',
    description: 'Run all available commands',
    icon: '📜',
    unlocked: false,
  },
  {
    id: 'godlike',
    name: 'Godlike Typer',
    description: 'Achieve 100+ WPM',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'persistent',
    name: 'Persistent',
    description: 'Use terminal for 30 minutes straight',
    icon: '💪',
    unlocked: false,
  },
];

export function checkNightOwl(): boolean {
  const hour = new Date().getHours();
  return hour >= 2 && hour < 4;
}

export function checkScriptMaster(commandsRun: Set<string>): boolean {
  const requiredCommands = [
    'help',
    'about',
    'skills',
    'services',
    'projects',
    'work',
    'contact',
  ];
  return requiredCommands.every((cmd) => commandsRun.has(cmd));
}

export function getAchievementMessage(achievementId: string): string {
  const messages: { [key: string]: string } = {
    speed_demon: '⚡ ACHIEVEMENT UNLOCKED: Speed Demon! You are a typing machine!',
    marathon_typer: '🏃 ACHIEVEMENT UNLOCKED: Marathon Typer! Impressive endurance!',
    perfect_accuracy:
      '🎯 ACHIEVEMENT UNLOCKED: Perfect Accuracy! Flawless execution!',
    night_owl: '🦉 ACHIEVEMENT UNLOCKED: Night Owl! Burning the midnight oil!',
    script_master:
      '📜 ACHIEVEMENT UNLOCKED: Script Master! You have mastered the terminal!',
    godlike: '🔥 ACHIEVEMENT UNLOCKED: Godlike Typer! You are unstoppable!',
    persistent: '💪 ACHIEVEMENT UNLOCKED: Persistent! Dedication pays off!',
  };

  return messages[achievementId] || 'Achievement unlocked!';
}
