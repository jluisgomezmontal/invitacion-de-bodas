"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function generateParticles(): Particle[] {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.7 + 0.3,
  }));
}

const WEDDING_DATE = new Date("2026-07-30T18:00:00");

function calcTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

/* ─────────────────────────────────────────
   Countdown to wedding day
───────────────────────────────────────── */
function Countdown({ light = false }: { light?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calcTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DÍAS", value: timeLeft?.days },
    { label: "HORAS", value: timeLeft?.hours },
    { label: "MIN", value: timeLeft?.minutes },
    { label: "SEG", value: timeLeft?.seconds },
  ];

  return (
    <div
      style={{
        background: light
          ? "rgba(0, 0, 0, 0.35)"
          : "linear-gradient(135deg, #2e0509 0%, #3a0a10 100%)",
        border: `1px solid ${light ? "rgba(232,201,122,0.4)" : "rgba(201,168,76,0.35)"}`,
        borderRadius: 3,
        padding: "18px 16px 14px",
        backdropFilter: light ? "blur(10px)" : undefined,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: light ? "rgba(232,201,122,0.9)" : "rgba(201,168,76,0.7)",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        Faltan
      </p>
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {units.map(({ label, value }) => (
          <div
            key={label}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
          >
            <div
              style={{
                background: light ? "rgba(255,255,255,0.1)" : "rgba(201,168,76,0.08)",
                border: `1px solid ${light ? "rgba(232,201,122,0.25)" : "rgba(201,168,76,0.2)"}`,
                borderRadius: 2,
                padding: "7px 4px",
                width: "100%",
                textAlign: "center",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 26,
                fontWeight: 600,
                color: light ? "#F5F0E8" : "#E8C97A",
                lineHeight: 1,
                minWidth: 0,
              }}
            >
              {value !== undefined ? String(value).padStart(2, "0") : "--"}
            </div>
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 8,
                letterSpacing: "0.15em",
                color: light ? "rgba(245,240,232,0.6)" : "rgba(201,168,76,0.55)",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Wax seal SVG (♥ monogram)
───────────────────────────────────────── */
function WaxSeal({ spinning }: { spinning: boolean }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-20 cursor-pointer"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        style={{
          transition: "transform 0.6s ease",
          transform: spinning ? "rotate(360deg) scale(1.12)" : "rotate(0deg) scale(1)",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))",
        }}
      >
        <defs>
          <radialGradient id="sealGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="45%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#7A5520" />
          </radialGradient>
        </defs>
        <circle cx="36" cy="36" r="34" fill="url(#sealGrad)" />
        <circle cx="36" cy="36" r="29" fill="none" stroke="#A07830" strokeWidth="1.5" opacity="0.6" />
        <text
          x="36"
          y="44"
          textAnchor="middle"
          fontSize="24"
          fontFamily="Georgia, serif"
          fill="#4a0a12"
          opacity="0.85"
          style={{ userSelect: "none" }}
        >
          ♥
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Invitation Card (standalone, no envelope coupling)
───────────────────────────────────────── */
function InvitationCard({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      style={{
        background: "linear-gradient(160deg, #faf7f0 0%, #f0ead8 100%)",
        borderRadius: "2px",
        padding: "36px 28px 28px",
        width: 268,
        boxShadow: "0 12px 60px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.2)",
        border: "1px solid rgba(201,168,76,0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
        {/* torn-paper top edge effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "radial-gradient(circle at 5% 0, #faf7f0 5px, transparent 5px)," +
              "radial-gradient(circle at 15% 0, #faf7f0 4px, transparent 4px)," +
              "radial-gradient(circle at 25% 0, #faf7f0 6px, transparent 6px)," +
              "radial-gradient(circle at 35% 0, #faf7f0 4px, transparent 4px)," +
              "radial-gradient(circle at 45% 0, #faf7f0 5px, transparent 5px)," +
              "radial-gradient(circle at 55% 0, #faf7f0 3px, transparent 3px)," +
              "radial-gradient(circle at 65% 0, #faf7f0 5px, transparent 5px)," +
              "radial-gradient(circle at 75% 0, #faf7f0 4px, transparent 4px)," +
              "radial-gradient(circle at 85% 0, #faf7f0 6px, transparent 6px)," +
              "radial-gradient(circle at 95% 0, #faf7f0 4px, transparent 4px)",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* content */}
        <div>
          {/* names */}
          <div
            className="text-center mb-2"
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 48,
              lineHeight: 1.15,
              color: "#1a0505",
              letterSpacing: "0.02em",
            }}
          >
            Luisa
          </div>
          <div
            className="text-center"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 22,
              color: "#C9A84C",
              letterSpacing: "0.18em",
              marginBottom: 4,
            }}
          >
            &amp;
          </div>
          <div
            className="text-center mb-5"
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 48,
              lineHeight: 1.15,
              color: "#1a0505",
            }}
          >
            Axel
          </div>

          {/* ornament line */}
          <div className="flex items-center gap-2 mb-5" style={{ opacity: 0.6 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: 10 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          {/* body text */}
          <p
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 15,
              fontWeight: 400,
              color: "#2a1010",
              lineHeight: 1.7,
              letterSpacing: "0.06em",
            }}
          >
            Tenemos el honor de invitarte
          </p>
          <p
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 13,
              color: "#4a2020",
              lineHeight: 1.7,
              letterSpacing: "0.04em",
            }}
          >
            a celebrar nuestra unión en matrimonio
          </p>

          {/* second ornament */}
          <div className="flex items-center gap-2 mb-5" style={{ opacity: 0.5 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontSize: 8 }}>❧</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          {/* date */}
          <div
            className="text-center mb-1"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "#C9A84C",
              textTransform: "uppercase",
            }}
          >
            Sábado
          </div>
          <div
            className="text-center mb-1"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#1a0505",
              letterSpacing: "0.04em",
            }}
          >
            14 · Junio · 2025
          </div>
          <div
            className="text-center mb-6"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 13,
              color: "#4a2020",
              letterSpacing: "0.12em",
            }}
          >
            6:00 PM
          </div>

          {/* venue */}
          <div
            className="text-center"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 12,
              color: "#3a1515",
              lineHeight: 1.6,
              letterSpacing: "0.06em",
            }}
          >
            Hacienda San Miguel
            <br />
            <span style={{ fontSize: 11, color: "#6a3030" }}>Guadalajara, Jalisco</span>
          </div>
        </div>

        {/* ornament + continue button */}
        <div className="flex items-center gap-2" style={{ opacity: 0.45, marginTop: 20, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <span style={{ color: "#C9A84C", fontSize: 10 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <button
            onClick={onContinue}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "#6B0F1A",
              textTransform: "uppercase",
              background: "transparent",
              border: "1px solid rgba(107,15,26,0.35)",
              padding: "9px 24px",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            Ver más
          </button>
        </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Envelope component
───────────────────────────────────────── */
type Phase = "closed" | "opening" | "revealed" | "photo";

export function EnvelopeInvitation() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [sealSpinning, setSealSpinning] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  const handleOpen = () => {
    if (phase !== "closed") return;
    setSealSpinning(true);
    setTimeout(() => setPhase("opening"), 400);
    setTimeout(() => setPhase("revealed"), 1600);
  };

  const envelopeOpen = phase === "opening" || phase === "revealed";

  const envelopeW = 300;
  const envelopeH = 200;

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen select-none overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #6B0F1A 0%, #4a0a12 55%, #2e0509 100%)",
      }}
    >
      {/* ── Glitter layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, #E8C97A, #C9A84C)`,
              opacity: p.opacity,
              animation: `glitterFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,168,76,0.8)`,
            }}
          />
        ))}
        {/* gold diagonal streaks top-right */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -80,
            width: 420,
            height: 160,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)",
            transform: "rotate(-18deg)",
          }}
        />
        {/* gold diagonal streaks bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -80,
            width: 420,
            height: 160,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)",
            transform: "rotate(-18deg)",
          }}
        />
      </div>

      {/* ── Card scene — independently centered ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform:
            phase === "revealed"
              ? "translate(-50%, -50%)"
              : phase === "photo"
              ? "translate(-50%, calc(-50% - 40px))"
              : "translate(-50%, calc(-50% + 60px))",
          opacity: phase === "revealed" ? 1 : 0,
          transition: "transform 0.9s cubic-bezier(0.34, 1.2, 0.64, 1) 0.35s, opacity 0.7s ease 0.35s",
          pointerEvents: phase === "revealed" ? "auto" : "none",
          zIndex: 20,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        className="no-scrollbar"
      >
        <InvitationCard onContinue={() => setPhase("photo")} />
      </div>

      {/* ── Full-screen photo + countdown scene ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase === "photo" ? 1 : 0,
          transition: "opacity 1.2s ease",
          pointerEvents: phase === "photo" ? "auto" : "none",
          zIndex: 25,
        }}
      >
        <Image
          src="/assets/samantha-gades-2TdhwS6Y3pU-unsplash.jpg"
          alt="Luisa & Axel"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(46,5,9,0.70) 0%, rgba(46,5,9,0.25) 40%, rgba(46,5,9,0.35) 65%, rgba(46,5,9,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "60px 32px 48px",
          }}
        >
          {/* Names */}
          <div style={{ textAlign: "center", animation: phase === "photo" ? "fadeIn 1.2s ease 0.3s both" : "none" }}>
            <div
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: 64,
                color: "#F5F0E8",
                lineHeight: 1.1,
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              Luisa
            </div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 22,
                color: "#C9A84C",
                letterSpacing: "0.2em",
                margin: "4px 0",
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: 64,
                color: "#F5F0E8",
                lineHeight: 1.1,
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              Axel
            </div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 11,
                color: "rgba(232,201,122,0.9)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginTop: 14,
              }}
            >
              30 · Julio · 2026
            </div>
          </div>

          {/* Countdown */}
          <div
            style={{
              width: "100%",
              maxWidth: 320,
              animation: phase === "photo" ? "fadeIn 1.2s ease 0.6s both" : "none",
            }}
          >
            <Countdown light />
          </div>

          {/* Bottom */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 11,
              letterSpacing: "0.26em",
              color: "rgba(232,201,122,0.55)",
              textTransform: "uppercase",
              animation: phase === "photo" ? "fadeIn 1.2s ease 0.9s both" : "none",
            }}
          >
            Con todo nuestro amor
          </p>
        </div>
      </div>

      {/* ── Envelope scene — independently centered ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform:
            phase === "revealed" || phase === "photo"
              ? "translate(-50%, 130%)"
              : "translate(-50%, -50%)",
          opacity: phase === "revealed" || phase === "photo" ? 0 : 1,
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease",
          zIndex: 10,
        }}
      >
        {/* envelope body */}
        <div
          className="relative cursor-pointer"
          style={{
            width: envelopeW,
            height: envelopeH,
            animation: phase === "closed" ? "envelopePulse 3s ease-in-out infinite" : "none",
          }}
          onClick={handleOpen}
        >
          {/* ── Back body ── */}
          <svg
            width={envelopeW}
            height={envelopeH}
            viewBox={`0 0 ${envelopeW} ${envelopeH}`}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="envBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0ece0" />
                <stop offset="100%" stopColor="#ddd5bb" />
              </linearGradient>
              <filter id="envShadow">
                <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.4" />
              </filter>
            </defs>
            {/* main rect */}
            <rect
              x="0"
              y="0"
              width={envelopeW}
              height={envelopeH}
              rx="4"
              fill="url(#envBodyGrad)"
              filter="url(#envShadow)"
            />
            {/* bottom V flap (inside) */}
            <polygon
              points={`0,${envelopeH} ${envelopeW},${envelopeH} ${envelopeW / 2},${envelopeH * 0.55}`}
              fill="#e8e0cc"
            />
            {/* left triangle */}
            <polygon
              points={`0,0 0,${envelopeH} ${envelopeW / 2},${envelopeH * 0.55}`}
              fill="#e0d8c4"
            />
            {/* right triangle */}
            <polygon
              points={`${envelopeW},0 ${envelopeW},${envelopeH} ${envelopeW / 2},${envelopeH * 0.55}`}
              fill="#ddd5bb"
            />
            {/* fold lines */}
            <line x1="0" y1="0" x2={envelopeW / 2} y2={envelopeH * 0.55} stroke="#c8c0a8" strokeWidth="0.8" opacity="0.6" />
            <line x1={envelopeW} y1="0" x2={envelopeW / 2} y2={envelopeH * 0.55} stroke="#c8c0a8" strokeWidth="0.8" opacity="0.6" />
          </svg>

          {/* ── Top flap (animated) ── */}
          <div
            className="absolute top-0 left-0 w-full overflow-visible"
            style={{
              height: envelopeH * 0.52,
              transformOrigin: "top center",
              transform: envelopeOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: envelopeOpen ? 1 : 5,
              perspective: 800,
            }}
          >
            <svg
              width={envelopeW}
              height={envelopeH * 0.52}
              viewBox={`0 0 ${envelopeW} ${envelopeH * 0.52}`}
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5f1e6" />
                  <stop offset="100%" stopColor="#e8e0cc" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,0 ${envelopeW},0 ${envelopeW / 2},${envelopeH * 0.52}`}
                fill="url(#flapGrad)"
              />
              <line
                x1="0"
                y1="0"
                x2={envelopeW / 2}
                y2={envelopeH * 0.52}
                stroke="#ccc4aa"
                strokeWidth="0.6"
                opacity="0.5"
              />
              <line
                x1={envelopeW}
                y1="0"
                x2={envelopeW / 2}
                y2={envelopeH * 0.52}
                stroke="#ccc4aa"
                strokeWidth="0.6"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* ── Wax seal ── */}
          {phase === "closed" && (
            <WaxSeal spinning={sealSpinning} />
          )}
        </div>

        {/* tap hint */}
        {phase === "closed" && (
          <p
            className="mt-8 text-center"
            style={{
              position: "absolute",
              top: "calc(100% + 24px)",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 13,
              letterSpacing: "0.18em",
              color: "rgba(201,168,76,0.75)",
              textTransform: "uppercase",
              animation: "fadeIn 1.5s ease 1s both",
            }}
          >
            Toca para abrir
          </p>
        )}
      </div>

    </div>
  );
}
