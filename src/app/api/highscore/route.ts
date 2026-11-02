import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const HIGH_SCORE_PATH = path.join(process.cwd(), "data", "highscore.json");
const MAX_SCORE = 10_000_000;
const GAME_KEY = process.env.NEXT_PUBLIC_GAME_KEY;

// Simple in-memory rate limit: 10 writes per IP per minute.
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= 10) return false;
  bucket.count += 1;
  return true;
}

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
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!GAME_KEY || request.headers.get("x-game-key") !== GAME_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Origin check to mitigate CSRF.
  const origin = request.headers.get("origin");
  if (origin && !origin.endsWith("sacam.duckdns.org") && !origin.includes("localhost")) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { score?: number };
    const incomingScore = Number(body?.score ?? 0);
    const safeScore = Number.isFinite(incomingScore)
      ? Math.min(MAX_SCORE, Math.max(0, Math.floor(incomingScore)))
      : 0;
    const previousHighScore = await readHighScore();
    const nextHighScore = Math.max(previousHighScore, safeScore);

    // Atomic write.
    const tmpPath = HIGH_SCORE_PATH + ".tmp";
    await fs.mkdir(path.dirname(HIGH_SCORE_PATH), { recursive: true });
    await fs.writeFile(tmpPath, JSON.stringify({ highScore: nextHighScore, updatedAt: new Date().toISOString() }, null, 2), "utf8");
    await fs.rename(tmpPath, HIGH_SCORE_PATH);

    return NextResponse.json({ highScore: nextHighScore });
  } catch {
    return NextResponse.json({ error: "Unable to save high score" }, { status: 500 });
  }
}