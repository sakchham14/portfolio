"use client";

import { useEffect, useRef, useState } from "react";
import "./game.css";

type ObstacleType = "cactus" | "bird";

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
  type: ObstacleType;
  y: number;
};

type GameState = {
  started: boolean;
  running: boolean;
  over: boolean;
  dinoY: number;
  velocity: number;
  obstacles: Obstacle[];
  score: number;
  highScore: number;
  speed: number;
  spawnTimer: number;
  nextId: number;
};

const GAME_WIDTH = 900;
const DINO_X = 64;
const DINO_WIDTH = 42;
const DINO_HEIGHT = 44;
const GROUND_OFFSET = 18;
const GRAVITY = 0.7;
const JUMP_POWER = 12.4;
const INITIAL_SPEED = 4.8;
const MAX_SPEED = 13.5;
const BASE_SPAWN_DELAY = 1400;

const createInitialState = (highScore = 0): GameState => ({
  started: false,
  running: false,
  over: false,
  dinoY: 0,
  velocity: 0,
  obstacles: [],
  score: 0,
  highScore,
  speed: INITIAL_SPEED,
  spawnTimer: 0,
  nextId: 1,
});

function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export default function DinoGamePage() {
  const [game, setGame] = useState<GameState>(() => createInitialState());
  const [isSaving, setIsSaving] = useState(false);
  const gameRef = useRef<HTMLDivElement | null>(null);
  const savedRef = useRef(false);

  const syncHighScore = async (score: number) => {
    try {
      const response = await fetch("/api/highscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-game-key": process.env.NEXT_PUBLIC_GAME_KEY ?? "",
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { highScore?: number };
      if (typeof data.highScore === "number") {
        setGame((prev) => ({ ...prev, highScore: data.highScore ?? prev.highScore }));
      }
    } catch {
      // Keep the game playable even if the server save fails.
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const response = await fetch("/api/highscore");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { highScore?: number };
        if (typeof data.highScore === "number") {
          setGame((prev) => ({ ...prev, highScore: data.highScore ?? prev.highScore }));
        }
      } catch {
        // Keep the default high score when the API is unavailable.
      }
    };

    void loadHighScore();
  }, []);

  useEffect(() => {
    if (!game.running) {
      return;
    }

    let animationFrame = 0;
    let lastFrame = performance.now();

    const tick = (time: number) => {
      const delta = Math.min((time - lastFrame) / 16.67, 2.5);
      lastFrame = time;

      setGame((prev) => {
        if (!prev.running) {
          return prev;
        }

        let nextVelocity = prev.velocity - GRAVITY * delta;
        let nextDinoY = prev.dinoY + nextVelocity * delta;

        if (nextDinoY < 0) {
          nextDinoY = 0;
          nextVelocity = 0;
        }

        const nextScore = Math.max(0, prev.score + delta * 0.6);
        const nextSpeed = Math.min(prev.speed + 0.02 * delta, MAX_SPEED);
        let nextSpawnTimer = prev.spawnTimer + delta * 16.67;

        let obstacles = prev.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - nextSpeed * delta * 1.8 }))
          .filter((obstacle) => obstacle.x + obstacle.width > -30);

        const obstacleInterval = Math.max(850, BASE_SPAWN_DELAY - nextScore * 1.8);
        if (nextSpawnTimer >= obstacleInterval) {
          const birdChance = Math.random() < 0.18 && nextScore > 50;
          const obstacleWidth = birdChance ? 38 : 26 + Math.random() * 20;
          const obstacleHeight = birdChance ? 24 : 28 + Math.random() * 28;
          const obstacleY = birdChance ? 82 : 0;

          obstacles = [
            ...obstacles,
            {
              id: prev.nextId,
              x: GAME_WIDTH + 40,
              width: obstacleWidth,
              height: obstacleHeight,
              type: birdChance ? "bird" : "cactus",
              y: obstacleY,
            },
          ];
          nextSpawnTimer = 0;
        }

        const dinoBox = {
          x: DINO_X,
          y: 170 - nextDinoY - DINO_HEIGHT,
          width: DINO_WIDTH,
          height: DINO_HEIGHT,
        };

        const hit = obstacles.some((obstacle) => {
          const obstacleBox = {
            x: obstacle.x,
            y: 170 - obstacle.y - obstacle.height,
            width: obstacle.width,
            height: obstacle.height,
          };

          return intersects(dinoBox, obstacleBox);
        });

        if (hit) {
          const finalScore = Math.max(0, Math.floor(nextScore));
          const nextHighScore = Math.max(prev.highScore, finalScore);
          return {
            ...prev,
            running: false,
            over: true,
            dinoY: nextDinoY,
            velocity: nextVelocity,
            obstacles,
            score: finalScore,
            highScore: nextHighScore,
            speed: nextSpeed,
            spawnTimer: nextSpawnTimer,
          };
        }

        return {
          ...prev,
          dinoY: nextDinoY,
          velocity: nextVelocity,
          obstacles,
          score: Math.floor(nextScore),
          speed: nextSpeed,
          spawnTimer: nextSpawnTimer,
          nextId: nextSpawnTimer === 0 ? prev.nextId + 1 : prev.nextId,
        };
      });

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [game.running]);

  useEffect(() => {
    if (!game.over || savedRef.current || isSaving) {
      return;
    }

    const shouldSave = game.score > game.highScore;
    if (!shouldSave) {
      savedRef.current = true;
      return;
    }

    savedRef.current = true;
    setIsSaving(true);
    void syncHighScore(game.score);
  }, [game.over, game.score, game.highScore, isSaving]);

  const startGame = () => {
    savedRef.current = false;
    setGame((prev) => ({
      ...createInitialState(prev.highScore),
      started: true,
      running: true,
    }));
  };

  const handleJump = () => {
    setGame((prev) => {
      if (prev.over) {
        return prev;
      }

      if (!prev.started || !prev.running) {
        return {
          ...createInitialState(prev.highScore),
          started: true,
          running: true,
        };
      }

      if (prev.dinoY <= 0.1) {
        return { ...prev, velocity: JUMP_POWER };
      }

      return prev;
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
        event.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Chrome Dino</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Offline Runner</h1>
          </div>
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
          >
            ← Back to portfolio
          </a>
        </div>

        <div className="game-panel">
          <div className="mb-4 flex items-center justify-between gap-4 text-sm font-semibold text-slate-200">
            <div className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5">
              Score: <span className="text-cyan-300">{game.score}</span>
            </div>
            <div className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-amber-200">
              High Score: <span>{game.highScore}</span>
            </div>
          </div>

          <div
            ref={gameRef}
            className="game-screen"
            onPointerDown={handleJump}
            role="button"
            tabIndex={0}
            aria-label="Play the dinosaur game"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleJump();
              }
            }}
          >
            <div className="sun" />
            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />

            <div className={`dino ${game.running ? "dino-running" : ""}`} style={{ bottom: `${GROUND_OFFSET + game.dinoY}px` }}>
              <span className="dino-eye" />
              <span className="dino-leg leg-a" />
              <span className="dino-leg leg-b" />
            </div>

            {game.obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                className={`obstacle ${obstacle.type}`}
                style={{
                  left: `${obstacle.x}px`,
                  width: `${obstacle.width}px`,
                  height: `${obstacle.height}px`,
                  bottom: `${GROUND_OFFSET + obstacle.y}px`,
                }}
              />
            ))}

            <div className="ground" />

            {!game.running && !game.over && (
              <div className="game-overlay">
                <div className="text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Ready</p>
                  <h2 className="mt-3 text-3xl font-black text-white">Press space to jump</h2>
                </div>
              </div>
            )}

            {game.over && (
              <div className="game-overlay">
                <div className="rounded-2xl border border-red-400/40 bg-slate-950/80 px-6 py-5 text-center shadow-2xl shadow-red-500/20">
                  <p className="text-sm uppercase tracking-[0.3em] text-red-300">Game over</p>
                  <h2 className="mt-3 text-3xl font-black text-white">Score: {game.score}</h2>
                  <p className="mt-2 text-slate-300">Best: {game.highScore}</p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      startGame();
                    }}
                    className="mt-5 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.35)] transition hover:scale-[1.02]"
                  >
                    {isSaving ? "Saving..." : "Play again"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
