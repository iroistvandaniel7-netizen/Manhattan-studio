"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/*
 * The canvas works at a fixed internal resolution and is stretched by CSS, so
 * nothing has to be repainted on resize and every coordinate is converted the
 * same way: client pixels × (W / displayed width).
 */
const W = 1200;
const H = 720;
const BRUSH = 40;
const DURATION = 20_000;

/* Progress is counted on a coarse grid, not by reading pixels back. */
const GX = 60;
const GY = 36;
const CELL_W = W / GX;
const CELL_H = H / GY;

type Phase = "idle" | "playing" | "done";
type Point = { x: number; y: number };
type Bubble = { x: number; y: number; r: number; vx: number; vy: number; life: number };

/** Deterministic, so the window is equally dirty for everyone. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function paintDirt(ctx: CanvasRenderingContext2D) {
  const rand = seeded(42);
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "rgba(112, 100, 78, 0.9)";
  ctx.fillRect(0, 0, W, H);

  /* Blotches: darker grime and lighter dried water spots. */
  for (let i = 0; i < 140; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = 18 + rand() * 80;
    const dark = rand() > 0.45;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, dark ? "rgba(70, 60, 44, 0.55)" : "rgba(170, 160, 135, 0.45)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Rain streaks running down the glass. */
  ctx.lineCap = "round";
  for (let i = 0; i < 46; i++) {
    const x = rand() * W;
    const y = rand() * H * 0.6;
    ctx.strokeStyle = `rgba(80, 70, 52, ${0.25 + rand() * 0.3})`;
    ctx.lineWidth = 2 + rand() * 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + rand() * 8, y + 60, x - rand() * 8, y + 120, x + rand() * 6, y + 90 + rand() * 160);
    ctx.stroke();
  }

  /* Speckles. */
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = rand() > 0.5 ? "rgba(55, 46, 32, 0.55)" : "rgba(190, 180, 155, 0.5)";
    ctx.beginPath();
    ctx.arc(rand() * W, rand() * H, 0.8 + rand() * 2.6, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Somebody has already written on it, as somebody always has. */
  ctx.save();
  ctx.translate(W * 0.5, H * 0.52);
  ctx.rotate(-0.07);
  ctx.font = "800 96px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(200, 192, 168, 0.55)";
  ctx.fillText("Tisztíts meg!", 0, 0);
  ctx.restore();
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const spongeRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [percent, setPercent] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [best, setBest] = useState<number | null>(null);

  const phaseRef = useRef<Phase>("idle");
  const grid = useRef<Uint8Array>(new Uint8Array(GX * GY));
  const cleaned = useRef(0);
  const last = useRef<Point | null>(null);
  const pressed = useRef(false);
  const keyPos = useRef<Point>({ x: W / 2, y: H / 2 });
  const startedAt = useRef(0);
  const bubbles = useRef<Bubble[]>([]);
  const frame = useRef(0);

  /* Paint the grime once on mount. */
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) paintDirt(ctx);
  }, []);

  const percentNow = () => Math.min(100, Math.round((cleaned.current / (GX * GY)) * 100));

  const finish = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    phaseRef.current = "done";
    const final = percentNow();
    setPercent(final);
    setBest((b) => (b === null ? final : Math.max(b, final)));
    setPhase("done");
    pressed.current = false;
    last.current = null;
    if (spongeRef.current) spongeRef.current.style.opacity = "0";
  }, []);

  /** Mark grid cells under the brush at one point. */
  const mark = (p: Point) => {
    const r = BRUSH;
    const x0 = Math.max(0, Math.floor((p.x - r) / CELL_W));
    const x1 = Math.min(GX - 1, Math.floor((p.x + r) / CELL_W));
    const y0 = Math.max(0, Math.floor((p.y - r) / CELL_H));
    const y1 = Math.min(GY - 1, Math.floor((p.y + r) / CELL_H));
    for (let gy = y0; gy <= y1; gy++) {
      for (let gx = x0; gx <= x1; gx++) {
        const cx = (gx + 0.5) * CELL_W;
        const cy = (gy + 0.5) * CELL_H;
        if ((cx - p.x) ** 2 + (cy - p.y) ** 2 <= r * r) {
          const i = gy * GX + gx;
          if (!grid.current[i]) {
            grid.current[i] = 1;
            cleaned.current++;
          }
        }
      }
    }
  };

  const wipe = (from: Point, to: Point) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(distance / (BRUSH / 3)));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      mark({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
    }

    /* Soap bubbles off the sponge, a few per stroke. */
    if (bubbles.current.length < 80 && Math.random() < 0.6) {
      bubbles.current.push({
        x: to.x + (Math.random() - 0.5) * BRUSH,
        y: to.y + (Math.random() - 0.5) * BRUSH,
        r: 5 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -1 - Math.random() * 2.2,
        life: 1,
      });
    }

    if (cleaned.current >= GX * GY) finish();
  };

  /* One loop drives the clock, the score readout and the bubbles. */
  useEffect(() => {
    if (phase !== "playing") return;

    const tick = () => {
      const remaining = Math.max(0, DURATION - (performance.now() - startedAt.current));
      setLeft(remaining);
      setPercent(percentNow());

      const fx = fxRef.current?.getContext("2d");
      if (fx) {
        fx.clearRect(0, 0, W, H);
        bubbles.current = bubbles.current.filter((b) => b.life > 0);
        for (const b of bubbles.current) {
          b.x += b.vx;
          b.y += b.vy;
          b.life -= 0.012;
          fx.globalAlpha = Math.max(0, b.life);
          fx.strokeStyle = "#ffffff";
          fx.lineWidth = 2.5;
          fx.beginPath();
          fx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          fx.stroke();
          fx.fillStyle = "rgba(255,255,255,0.18)";
          fx.fill();
          fx.fillStyle = "rgba(255,255,255,0.9)";
          fx.beginPath();
          fx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, Math.PI * 2);
          fx.fill();
        }
        fx.globalAlpha = 1;
      }

      if (remaining <= 0) {
        finish();
        return;
      }
      if (phaseRef.current === "playing") frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [phase, finish]);

  /* Clear leftover bubbles once the round is over. */
  useEffect(() => {
    if (phase === "playing") return;
    bubbles.current = [];
    fxRef.current?.getContext("2d")?.clearRect(0, 0, W, H);
  }, [phase]);

  const start = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) paintDirt(ctx);
    grid.current = new Uint8Array(GX * GY);
    cleaned.current = 0;
    last.current = null;
    keyPos.current = { x: W / 2, y: H / 2 };
    startedAt.current = performance.now();
    phaseRef.current = "playing";
    setPercent(0);
    setLeft(DURATION);
    setPhase("playing");
    requestAnimationFrame(() => canvasRef.current?.focus({ preventScroll: true }));
  };

  /* --- Input ------------------------------------------------------------ */

  const toCanvas = (event: React.PointerEvent): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * W,
      y: ((event.clientY - rect.top) / rect.height) * H,
    };
  };

  const moveSponge = (p: Point) => {
    const node = spongeRef.current;
    if (!node) return;
    node.style.left = `${(p.x / W) * 100}%`;
    node.style.top = `${(p.y / H) * 100}%`;
    node.style.opacity = "1";
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    pressed.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = toCanvas(event);
    last.current = p;
    wipe(p, p);
    moveSponge(p);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    const p = toCanvas(event);
    moveSponge(p);
    /* A mouse wipes just by moving; a finger or pen has to be down. */
    if (event.pointerType !== "mouse" && !pressed.current) return;
    if (last.current) wipe(last.current, p);
    last.current = p;
  };

  const onPointerEnd = () => {
    pressed.current = false;
    last.current = null;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    const step = 46;
    const moves: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const from = keyPos.current;
    const to = {
      x: Math.min(W, Math.max(0, from.x + move.x)),
      y: Math.min(H, Math.max(0, from.y + move.y)),
    };
    keyPos.current = to;
    wipe(from, to);
    moveSponge(to);
  };

  const result = [...GAME.results].reverse().find((r) => percent >= r.min) ?? GAME.results[0];
  const seconds = Math.ceil(left / 1000);

  return (
    <section id="jatek" className="relative isolate overflow-hidden bg-accent-soft py-section" aria-labelledby="game-title">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>{GAME.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="game-title" className="mt-5 text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95]">
              {GAME.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{GAME.lead}</p>
          </Reveal>
          <Reveal delay={190}>
            <p className="mt-6 border-l-2 border-sky pl-4 text-[0.8125rem] leading-relaxed text-slate-500">
              {GAME.keyboardHint}
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <p className="game-bare rounded-[1.75rem] border border-line bg-white p-7 text-sm leading-relaxed text-slate-600">
            {GAME.noScript}
          </p>

          <div className="game-board rounded-[1.75rem] bg-ink p-4 text-white sm:p-6">
            {/* Scoreboard */}
            <div className="flex items-center justify-between gap-4 px-2 pb-4 sm:px-3">
              <div className="flex gap-8">
                <div>
                  <p className="label text-white/55">{GAME.time}</p>
                  <p className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl" aria-live="off">
                    {seconds}s
                  </p>
                </div>
                <div>
                  <p className="label text-white/55">{GAME.clean}</p>
                  <p className="font-display text-2xl font-extrabold tabular-nums text-accent-lift sm:text-3xl">
                    {percent}%
                  </p>
                </div>
              </div>
              {best !== null ? (
                <div className="text-right">
                  <p className="label text-white/55">{GAME.best}</p>
                  <p className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl">{best}%</p>
                </div>
              ) : null}
            </div>

            {/* Clock strip */}
            <div className="mx-2 mb-4 h-1.5 overflow-hidden rounded-full bg-white/10 sm:mx-3">
              <div
                className="h-full rounded-full bg-accent-lift"
                style={{ width: `${(left / DURATION) * 100}%` }}
              />
            </div>

            {/* The window: a view, the grime over it, bubbles over that. */}
            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border-[10px] border-white bg-white shadow-[inset_0_0_0_2px_rgba(11,45,91,0.1)]">
              <WindowView />
              {/* Mullions */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-2.5 -translate-x-1/2 bg-white" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-2.5 -translate-y-1/2 bg-white" />

              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                tabIndex={phase === "playing" ? 0 : -1}
                role="img"
                aria-label={GAME.canvasLabel}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
                onPointerLeave={onPointerEnd}
                onKeyDown={onKeyDown}
                className={`absolute inset-0 z-10 size-full focus:outline-none ${
                  phase === "playing" ? "cursor-none touch-none" : ""
                }`}
              />
              <canvas
                ref={fxRef}
                width={W}
                height={H}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 size-full"
              />

              {/* The sponge, following the pointer. */}
              <div
                ref={spongeRef}
                aria-hidden="true"
                className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-150"
              >
                <div className="relative h-10 w-14 rotate-[-12deg] rounded-lg bg-[#ffd447] shadow-lg sm:h-12 sm:w-16">
                  <div className="absolute inset-x-0 bottom-0 h-3.5 rounded-b-lg bg-[#2f9e5b]" />
                  <span className="absolute left-2 top-2 size-1.5 rounded-full bg-[#e8b520]" />
                  <span className="absolute left-7 top-3 size-1 rounded-full bg-[#e8b520]" />
                  <span className="absolute right-3 top-1.5 size-1.5 rounded-full bg-[#e8b520]" />
                </div>
              </div>

              {/* Start and result overlays */}
              {phase !== "playing" ? (
                <div className="absolute inset-0 z-50 grid place-items-center bg-ink/55 p-6 backdrop-blur-[2px]">
                  {phase === "idle" ? (
                    <button
                      type="button"
                      onClick={start}
                      className="group/btn label inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-accent shadow-xl transition-transform duration-200 hover:scale-105"
                    >
                      {GAME.start}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </button>
                  ) : (
                    <div className="pop-in max-w-md text-center" role="status">
                      <p className="font-display text-[clamp(3.5rem,11vw,6rem)] font-extrabold leading-none tracking-[-0.04em] text-accent-lift">
                        {percent}%
                      </p>
                      <h3 className="mt-3 text-2xl sm:text-3xl">{result.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">{result.text}</p>
                      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                          href="#kapcsolat"
                          className="label inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-accent transition-colors duration-200 hover:bg-accent-soft"
                        >
                          {GAME.cta} <span aria-hidden="true">→</span>
                        </a>
                        <button
                          type="button"
                          onClick={start}
                          className="label rounded-full border-2 border-white/60 px-6 py-3.5 text-white transition-colors duration-200 hover:border-white"
                        >
                          {GAME.again}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** What is behind the glass: a bright morning over the rooftops. */
function WindowView() {
  return (
    <svg
      viewBox="0 0 500 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="kt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5aa7ff" />
          <stop offset="1" stopColor="#d9ecff" />
        </linearGradient>
      </defs>
      <rect width="500" height="300" fill="url(#kt-sky)" />
      <circle cx="390" cy="70" r="34" fill="#fff6c8" />
      <circle cx="390" cy="70" r="52" fill="#fff6c8" opacity="0.3" />
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="110" cy="62" rx="46" ry="14" />
        <ellipse cx="140" cy="52" rx="30" ry="14" />
        <ellipse cx="270" cy="96" rx="40" ry="11" />
      </g>
      <path d="M0 230 Q90 180 190 214 T380 200 T500 210 V300 H0Z" fill="#9ccaff" />
      <g fill="#1b63d6">
        <rect x="30" y="196" width="40" height="104" />
        <rect x="78" y="170" width="32" height="130" />
        <rect x="118" y="210" width="50" height="90" />
        <rect x="300" y="186" width="36" height="114" />
        <rect x="344" y="156" width="30" height="144" />
        <rect x="382" y="204" width="54" height="96" />
        <rect x="444" y="182" width="40" height="118" />
      </g>
      <g fill="#144aa3">
        <path d="M168 300V236l40-22 40 22v64Z" />
        <path d="M232 300v-50l34-20 34 20v50Z" />
      </g>
      <g fill="#cfe6ff">
        {[86, 98, 110, 122, 134, 146].map((y) => (
          <g key={y}>
            <rect x="84" y={y + 76} width="6" height="6" />
            <rect x="98" y={y + 76} width="6" height="6" />
            <rect x="350" y={y + 62} width="6" height="6" />
            <rect x="362" y={y + 62} width="6" height="6" />
          </g>
        ))}
      </g>
    </svg>
  );
}
