import { NextRequest, NextResponse } from 'next/server';

interface WPMData {
  sessionId: string;
  characters: number;
  timeElapsed: number;
  accuracy: number;
}

interface SessionData {
  wpmHistory: number[];
  peakWpm: number;
  achievements: string[];
}

// In-memory storage (replace with Vercel KV in production)
const sessionData = new Map<string, SessionData>();

export async function POST(request: NextRequest) {
  try {
    const body: WPMData = await request.json();
    const { sessionId, characters, timeElapsed, accuracy } = body;

    // Calculate WPM
    const minutes = timeElapsed / 60;
    const wpm = Math.round((characters / 5) / minutes);

    // Get or create session data
    const session = sessionData.get(sessionId) || {
      wpmHistory: [],
      peakWpm: 0,
      achievements: [],
    };

    // Update session
    session.wpmHistory.push(wpm);
    if (wpm > session.peakWpm) {
      session.peakWpm = wpm;
    }

    // Calculate average
    const avgWpm = Math.round(
      session.wpmHistory.reduce((a: number, b: number) => a + b, 0) / session.wpmHistory.length
    );

    // Determine rank
    let rank = 'NOVICE';
    if (wpm >= 100) rank = 'GODLIKE';
    else if (wpm >= 81) rank = 'ELITE';
    else if (wpm >= 61) rank = 'EXPERT';
    else if (wpm >= 41) rank = 'ADVANCED';
    else if (wpm >= 21) rank = 'INTERMEDIATE';

    // Check for achievements
    const newAchievements = checkAchievements(wpm, session, characters, accuracy);
    const achievementsSet = new Set(session.achievements);
    newAchievements.forEach((ach: string) => achievementsSet.add(ach));
    session.achievements = Array.from(achievementsSet);

    // Save session
    sessionData.set(sessionId, session);

    return NextResponse.json({
      wpm,
      avgWpm,
      peakWpm: session.peakWpm,
      rank,
      achievements: newAchievements,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

function checkAchievements(
  wpm: number,
  session: SessionData,
  characters: number,
  accuracy: number
): string[] {
  const achievements: string[] = [];

  // Speed Demon: >80 WPM sustained
  if (wpm > 80 && !session.achievements.includes('speed_demon')) {
    achievements.push('speed_demon');
  }

  // Marathon Typer: 1000 characters
  if (characters >= 1000 && !session.achievements.includes('marathon_typer')) {
    achievements.push('marathon_typer');
  }

  // Perfect Accuracy: 100% accuracy over 100 chars
  if (accuracy === 100 && characters >= 100 && !session.achievements.includes('perfect_accuracy')) {
    achievements.push('perfect_accuracy');
  }

  return achievements;
}
