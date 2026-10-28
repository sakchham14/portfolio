import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const HIGH_SCORE_PATH = path.join(process.cwd(), "data", "highscore.json");

// Shared secret that gates high-score writes. Must match the NEXT_PUBLIC_GAME_KEY
// sent by the game client. Without it, any visitor can POST an arbitrary score.
const GAME_KEY = process.env.NEXT_PUBLIC_GAME_KEY;

async function readHighScore(): Promise<number> {
  try {
    const raw = await fs.readFile(HIGH_SCORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as { highScore?: number };
    return Number.isFinite(parsed.highScore) ? Math.max(0, Number(parsed.highScore)) : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const highScore = await readHighScore();
  return NextResponse.json({ highScore });
}

export async function POST(request: Request) {
  // Only the game client (which holds NEXT_PUBLIC_GAME_KEY) may write a score.
  if (!GAME_KEY || request.headers.get("x-game-key") !== GAME_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { score?: number };
    const incomingScore = Number(body?.score ?? 0);
    const safeScore = Number.isFinite(incomingScore) ? Math.max(0, Math.floor(incomingScore)) : 0;
    const previousHighScore = await readHighScore();
    const nextHighScore = Math.max(previousHighScore, safeScore);

    await fs.mkdir(path.dirname(HIGH_SCORE_PATH), { recursive: true });
    await fs.writeFile(
      HIGH_SCORE_PATH,
      JSON.stringify(
        {
          highScore: nextHighScore,
          updatedAt: new Date().toISOString(),
        },
        null,
        2,
      ),
      "utf8",
    );

    return NextResponse.json({ highScore: nextHighScore });
  } catch {
    return NextResponse.json({ error: "Unable to save high score" }, { status: 500 });
  }
}
