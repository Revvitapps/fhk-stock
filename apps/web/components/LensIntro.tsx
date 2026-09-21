"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Homepage cold open: you look through a lens, the shutter fires a few times and each
 * exposure fills more of the screen, then the wall of photos twirls together and comes
 * back out as the things a church actually makes with them.
 *
 * Every content swap happens while the blades are shut, so it reads as "taken" rather
 * than faded in. Plays once per session, can be skipped, and never runs for visitors
 * who ask for reduced motion.
 */

export const INTRO_SEEN_KEY = "tm_intro";

type Phase = "wait" | "shoot" | "open" | "twirl" | "real" | "out" | "done";

const BLADES = 6;
const RB = 100; // blade outer radius in SVG units; the SVG is sized so this clears the corners
const BLADE_FILLS = ["#1b120c", "#251810", "#2e1e14"];

/** Same construction as scripts/make-icons.py, so the intro and the logo are one lens. */
function bladePath(index: number, r: number, twist: number) {
  const vertex = (i: number) => {
    const a = twist + (i * 2 * Math.PI) / BLADES;
    return { x: r * Math.cos(a), y: r * Math.sin(a), a };
  };
  const edgeEnd = (i: number) => {
    const v = vertex(i);
    const dir = v.a + (2 * Math.PI) / 3; // direction of the hexagon edge leaving this vertex
    const dx = Math.cos(dir);
    const dy = Math.sin(dir);
    const half = v.x * dx + v.y * dy;
    const t = -half + Math.sqrt(Math.max(0, half * half - (r * r - RB * RB)));
    return { x: v.x + t * dx, y: v.y + t * dy };
  };

  const v = vertex(index);
  const p = edgeEnd(index);
  const prev = edgeEnd((index + BLADES - 1) % BLADES);
  const f = (n: number) => n.toFixed(2);

  return `M${f(v.x)} ${f(v.y)} L${f(p.x)} ${f(p.y)} A${RB} ${RB} 0 0 0 ${f(prev.x)} ${f(prev.y)} Z`;
}

// Opening radius over time, as a fraction of the short side of the screen. FULL is
// swapped for "past the corners" at runtime.
const FULL = -1;
const OPENING: { at: number; until: number; from: number; to: number }[] = [
  { at: 700, until: 880, from: 0, to: 0.26 },
  { at: 1500, until: 1590, from: 0.26, to: 0 },
  { at: 1600, until: 1750, from: 0, to: 0.32 },
  { at: 2250, until: 2330, from: 0.32, to: 0 },
  { at: 2340, until: 2480, from: 0, to: 0.38 },
  { at: 2850, until: 2920, from: 0.38, to: 0 },
  { at: 2930, until: 3060, from: 0, to: 0.4 },
  { at: 3350, until: 4000, from: 0.4, to: FULL }
];

const RING = 0.44;

// stage = which exposure a tile first appears in
const WALL: { src: string; stage: 2 | 3 | 4; tilt: number; alt?: string }[] = [
  { src: "/catalog/country-church-hymn.jpg", stage: 4, tilt: -2 },
  { src: "/catalog/welcome-at-the-door.jpg", stage: 3, tilt: 1.5 },
  { src: "/catalog/baptism-sunday.jpg", stage: 4, tilt: -1 },
  { src: "/catalog/potluck-line.jpg", stage: 3, tilt: 2 },
  { src: "/catalog/lobby-after-service.jpg", stage: 2, tilt: -1.5 },
  { src: "/catalog/worship-stage-01.jpg", stage: 2, tilt: 1 },
  { src: "/catalog/voices-in-the-room.jpg", stage: 2, tilt: -2 },
  { src: "/catalog/kids-ministry-craft-table.jpg", stage: 3, tilt: 2.5 },
  { src: "/catalog/behind-the-board.jpg", stage: 4, tilt: 1 },
  { src: "/catalog/editorial-nightfall.png", stage: 3, tilt: -1, alt: "/catalog/editorial-softlight.png" },
  { src: "/catalog/youth-night.jpg", stage: 4, tilt: 2 },
  { src: "/catalog/sunday-message.jpg", stage: 4, tilt: -2.5 }
];

const FIRST_FRAME = "/catalog/worship-stage-01.jpg";

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOut(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function LensIntro() {
  const [phase, setPhase] = useState<Phase>("wait");
  const [stage, setStage] = useState(1);
  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState(0);
  const [ready, setReady] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const bladeRefs = useRef<(SVGPathElement | null)[]>([]);
  const ringRef = useRef<SVGGElement>(null);
  const timers = useRef<number[]>([]);
  const frame = useRef(0);
  const skipped = useRef(false);
  const firstRef = useRef<HTMLImageElement>(null);

  const finish = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    window.cancelAnimationFrame(frame.current);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    setPhase("out");
    timers.current.push(
      window.setTimeout(() => {
        document.documentElement.classList.remove("intro-playing");
        setPhase("done");
      }, 650)
    );
  }, []);

  // Decide whether to play at all.
  useEffect(() => {
    let seen = document.documentElement.dataset.intro === "skip";
    try {
      seen = seen || sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skipped.current = true;
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("intro-playing");
    window.scrollTo(0, 0);
    // A cached image can finish before hydration, in which case onLoad never fires.
    if (firstRef.current?.complete) setReady(true);
    // Don't hold the scene hostage to a slow first image.
    const fallback = window.setTimeout(() => setReady(true), 1800);
    return () => {
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("intro-playing");
    };
  }, []);

  // The timeline.
  useEffect(() => {
    if (!ready || skipped.current) return;
    setPhase("shoot");

    const later = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    later(480, () => setLocked(true));
    // content swaps land while the blades are closed
    later(1590, () => { setStage(2); setFlash((n) => n + 1); });
    later(2330, () => { setStage(3); setFlash((n) => n + 1); });
    later(2920, () => { setStage(4); setFlash((n) => n + 1); });
    later(3350, () => setPhase("open"));
    later(4050, () => setPhase("twirl"));
    later(4900, () => setPhase("real"));
    later(7700, finish);

    const start = performance.now();
    const svg = svgRef.current;

    const tick = (now: number) => {
      const elapsed = now - start;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const side = Math.ceil(Math.hypot(w, h)) + 8;
      const unit = side / (RB * 2);
      const short = Math.min(w, h);

      if (svg) {
        svg.style.width = `${side}px`;
        svg.style.height = `${side}px`;
      }

      let fraction = 0;
      for (const step of OPENING) {
        if (elapsed < step.at) break;
        const to = step.to === FULL ? (RB * unit) / short : step.to;
        const x = Math.min(1, (elapsed - step.at) / (step.until - step.at));
        fraction = step.from + (to - step.from) * (step.to === FULL ? easeInOut(x) : easeOut(x));
      }

      const r = Math.min(RB * 0.999, (fraction * short) / unit);
      const twist = 0.25 + (r / RB) * 1.6; // blades rotate as they open, like the real thing
      bladeRefs.current.forEach((path, index) => path?.setAttribute("d", bladePath(index, r, twist)));

      if (ringRef.current) {
        const base = (RING * short) / unit;
        const ringR = Math.max(base, r * 1.08);
        ringRef.current.style.opacity = String(Math.max(0, 1 - (ringR - base) / (base * 0.9)));
        ringRef.current.querySelectorAll("circle").forEach((circle, index) => {
          circle.setAttribute("r", (ringR + index * 2.2).toFixed(2));
        });
      }

      if (elapsed < 4100) frame.current = window.requestAnimationFrame(tick);
    };

    frame.current = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame.current);
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [ready, finish]);

  if (phase === "done") return null;

  const shooting = phase === "wait" || phase === "shoot";

  return (
    <div className="lens-intro" data-phase={phase} data-stage={stage}>
      <div className="lens-scene" aria-hidden="true">
        <div className="lens-first">
          {/* A fixed, right-sized URL: the source is 1024px wide, and a fill image here
              would be offered as a 3840w candidate that some browsers decline to paint. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={firstRef}
            src={`/_next/image?url=${encodeURIComponent(FIRST_FRAME)}&w=1080&q=75`}
            alt=""
            decoding="sync"
            fetchPriority="high"
            onLoad={() => setReady(true)}
          />
        </div>

        <div className="lens-wall">
          {WALL.map((tile, index) => (
            <div
              key={tile.src}
              className="lens-tile"
              data-stage={tile.stage}
              style={{ "--tilt": `${tile.tilt}deg`, "--i": index } as React.CSSProperties}
            >
              <Image src={tile.src} alt="" fill sizes="(max-width: 700px) 34vw, 26vw" loading="eager" />
              {tile.alt ? (
                <Image className="lens-tile-alt" src={tile.alt} alt="" fill sizes="(max-width: 700px) 34vw, 26vw" loading="eager" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="lens-real">
          <p className="lens-real-kicker">From real moments</p>
          <h2 className="lens-real-title">
            to exactly what <em>you</em> need.
          </h2>
          <div className="lens-uses">
            <figure className="lens-use use-slide">
              <div className="use-frame">
                <Image src="/catalog/church-on-the-lawn.jpg" alt="" fill sizes="(max-width: 700px) 90vw, 36vw" loading="eager" />
                <div className="use-copy">
                  <span>This Sunday</span>
                  <strong>Easter at Our Church</strong>
                  <small>Services at 9:00 &amp; 11:00</small>
                </div>
              </div>
              <figcaption>Sermon slide</figcaption>
            </figure>
            <figure className="lens-use use-social">
              <div className="use-frame">
                <div className="use-bar">
                  <i />
                  yourchurch
                </div>
                <div className="use-media">
                  <Image src="/catalog/studio-story-03.png" alt="" fill sizes="(max-width: 700px) 45vw, 20vw" loading="eager" />
                  <div className="use-copy">
                    <strong>Small groups start Tuesday.</strong>
                  </div>
                </div>
              </div>
              <figcaption>Social post</figcaption>
            </figure>
            <figure className="lens-use use-web">
              <div className="use-frame">
                <div className="use-bar">
                  <i />
                  <i />
                  <i />
                  <b>yourchurch.org</b>
                </div>
                <div className="use-media">
                  <Image src="/catalog/welcome-at-the-door.jpg" alt="" fill sizes="(max-width: 700px) 45vw, 30vw" loading="eager" />
                  <div className="use-copy">
                    <strong>Welcome home.</strong>
                    <u>Plan a visit</u>
                  </div>
                </div>
              </div>
              <figcaption>Website hero</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <svg ref={svgRef} className="lens-blades" viewBox="-100 -100 200 200" aria-hidden="true">
        {Array.from({ length: BLADES }, (_, index) => (
          <path
            key={index}
            ref={(node) => {
              bladeRefs.current[index] = node;
            }}
            d={bladePath(index, 0, 0.25)}
            fill={BLADE_FILLS[index % 3]}
            stroke="rgba(224, 168, 113, 0.4)"
            strokeWidth="0.18"
          />
        ))}
        <g ref={ringRef} className="lens-ring">
          <circle r="30" fill="none" stroke="#e0a871" strokeWidth="0.5" />
          <circle r="32.2" fill="none" stroke="rgba(224, 168, 113, 0.35)" strokeWidth="0.2" />
        </g>
      </svg>

      <div key={flash} className={flash ? "lens-flash fire" : "lens-flash"} aria-hidden="true" />

      <div className={shooting ? "lens-hud" : "lens-hud off"} aria-hidden="true">
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
        <span className={locked ? "hud-reticle locked" : "hud-reticle"} />
        <div className="hud-readout">
          <span>ƒ/1.8</span>
          <span>1/250</span>
          <span>ISO 400</span>
          <span className="hud-count">
            {String(Math.min(stage, 4)).padStart(2, "0")} / 04
          </span>
        </div>
      </div>

      <button type="button" className="lens-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
