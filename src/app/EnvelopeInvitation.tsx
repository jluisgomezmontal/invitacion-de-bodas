"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { weddingConfig } from "./wedding-config";
import type { ItineraryIconKey } from "./wedding-config";

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

const WEDDING_DATE = new Date(weddingConfig.date.iso);

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
        {weddingConfig.countdown.label}
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
            {weddingConfig.couple.bride}
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
            {weddingConfig.couple.groom}
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
            {weddingConfig.card.inviteMain}
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
            {weddingConfig.card.inviteSub}
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
            {weddingConfig.date.dayOfWeek}
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
            {weddingConfig.date.cardDate}
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
            {weddingConfig.date.cardTime}
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
            {weddingConfig.venues.card.name}
            <br />
            <span style={{ fontSize: 11, color: "#6a3030" }}>{weddingConfig.venues.card.city}</span>
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
            {weddingConfig.card.buttonLabel}
          </button>
        </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Envelope component
───────────────────────────────────────── */
type Phase = "closed" | "opening" | "revealed" | "photo" | "details" | "itinerary" | "gallery" | "farewell";

export function EnvelopeInvitation() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [sealSpinning, setSealSpinning] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  useEffect(() => {
    if (phase === "photo") {
      const t = setTimeout(() => setPhase("details"), 6000);
      return () => clearTimeout(t);
    }
    if (phase === "details") {
      const t = setTimeout(() => setPhase("itinerary"), 7000);
      return () => clearTimeout(t);
    }
    if (phase === "itinerary") {
      const t = setTimeout(() => setPhase("gallery"), 8000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "gallery") return;
    const last = weddingConfig.gallery.photoCount - 1;
    if (galleryIndex < last) {
      const t = setTimeout(() => setGalleryIndex((i) => i + 1), 4000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("farewell"), 4000);
      return () => clearTimeout(t);
    }
  }, [phase, galleryIndex]);

  const handleOpen = () => {
    if (phase !== "closed") return;
    setSealSpinning(true);
    setTimeout(() => setPhase("opening"), 400);
    setTimeout(() => setPhase("revealed"), 1600);
  };

  const envelopeOpen = phase !== "closed";

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
              {weddingConfig.couple.bride}
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
              {weddingConfig.couple.groom}
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
              {weddingConfig.date.photoDisplay}
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
            {weddingConfig.photo.tagline}
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
            phase === "closed" || phase === "opening"
              ? "translate(-50%, -50%)"
              : "translate(-50%, 130%)",
          opacity: phase === "closed" || phase === "opening" ? 1 : 0,
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
            {weddingConfig.envelope.hint}
          </p>
        )}
      </div>

      {/* ── Details / Event info scene ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: phase === "details" ? "translateY(0)" : "translateY(100%)",
          opacity: phase === "details" ? 1 : 0,
          transition: "transform 1s cubic-bezier(0.34, 1.05, 0.64, 1), opacity 0.6s ease",
          background: "radial-gradient(ellipse at 50% 40%, #6B0F1A 0%, #4a0a12 55%, #2e0509 100%)",
          zIndex: 35,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px 48px",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "160%",
            height: 260,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.32) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        {/* Gold glow bottom */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "160%",
            height: 260,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.32) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 52,
            animation: phase === "details" ? "fadeIn 1s ease 0.2s both" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 40,
              color: "#F5F0E8",
              lineHeight: 1.3,
              textShadow: "0 2px 20px rgba(0,0,0,0.45)",
            }}
          >
            {weddingConfig.details.title1}
          </p>
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 40,
              color: "#F5F0E8",
              lineHeight: 1.3,
              textShadow: "0 2px 20px rgba(0,0,0,0.45)",
            }}
          >
            {weddingConfig.details.title2}
          </p>
        </div>

        {/* Event items */}
        <div style={{ width: "100%", maxWidth: 310, display: "flex", flexDirection: "column", gap: 36 }}>

          {/* Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              animation: phase === "details" ? "fadeIn 1s ease 0.5s both" : "none",
            }}
          >
            <div style={{ flexShrink: 0, color: "rgba(232,201,122,0.9)" }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="8 14 10.5 16.5 16 11" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 18,
                color: "#F5F0E8",
                lineHeight: 1.45,
                letterSpacing: "0.03em",
              }}
            >
              {weddingConfig.date.detailsLine1}
              <br />
              <span style={{ fontSize: 15, color: "rgba(232,201,122,0.75)", letterSpacing: "0.05em" }}>{weddingConfig.date.detailsLine2}</span>
            </p>
          </div>

          {/* Church */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              animation: phase === "details" ? "fadeIn 1s ease 0.75s both" : "none",
            }}
          >
            <div style={{ flexShrink: 0, color: "rgba(232,201,122,0.9)" }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="10" y1="4" x2="14" y2="4" />
                <path d="M5 22 V11 L12 6 L19 11 V22 Z" />
                <path d="M10 22 V17 Q10 15 12 15 Q14 15 14 17 V22" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 18,
                color: "#F5F0E8",
                lineHeight: 1.45,
                letterSpacing: "0.03em",
              }}
            >
              {weddingConfig.venues.church.line1}
              <br />
              <span style={{ fontSize: 15, color: "rgba(232,201,122,0.75)", letterSpacing: "0.05em" }}>{weddingConfig.venues.church.line2}</span>
            </p>
          </div>

          {/* Reception */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              animation: phase === "details" ? "fadeIn 1s ease 1s both" : "none",
            }}
          >
            <div style={{ flexShrink: 0, color: "rgba(232,201,122,0.9)" }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3 L5 9 L8.5 13 L1.5 13 Z" />
                <line x1="5" y1="13" x2="5" y2="19" />
                <line x1="3" y1="19" x2="7" y2="19" />
                <path d="M19 3 L19 9 L22.5 13 L15.5 13 Z" />
                <line x1="19" y1="13" x2="19" y2="19" />
                <line x1="17" y1="19" x2="21" y2="19" />
                <line x1="8.5" y1="7" x2="15.5" y2="5" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 18,
                color: "#F5F0E8",
                lineHeight: 1.45,
                letterSpacing: "0.03em",
              }}
            >
              {weddingConfig.venues.reception.line1}
              <br />
              <span style={{ fontSize: 15, color: "rgba(232,201,122,0.75)", letterSpacing: "0.05em" }}>{weddingConfig.venues.reception.line2}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Itinerary scene ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: phase === "itinerary" ? "translateY(0)" : "translateY(100%)",
          opacity: phase === "itinerary" ? 1 : 0,
          transition: "transform 1s cubic-bezier(0.34, 1.05, 0.64, 1), opacity 0.6s ease",
          background: "radial-gradient(ellipse at 50% 40%, #6B0F1A 0%, #4a0a12 55%, #2e0509 100%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "56px 28px 48px",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top */}
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: "160%", height: 260, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.32) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* Gold glow bottom */}
        <div style={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", width: "160%", height: 260, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.32) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Title */}
        <p
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: 48,
            color: "#F5F0E8",
            textShadow: "0 2px 20px rgba(0,0,0,0.45)",
            marginBottom: 36,
            animation: phase === "itinerary" ? "fadeIn 1s ease 0.2s both" : "none",
          }}
        >
          {weddingConfig.itinerary.title}
        </p>

        {/* Timeline */}
        <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
          {/* Vertical center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.65) 5%, rgba(201,168,76,0.65) 95%, transparent)",
              boxShadow: "0 0 5px rgba(201,168,76,0.2)",
            }}
          />

          {[
            {
              side: "left" as const,
              lines: ["Ceremonia", "Religiosa"],
              time: "5:00 PM",
              delay: "0.45s",
              icon: (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="10" y1="4" x2="14" y2="4" />
                  <path d="M5 22 V11 L12 6 L19 11 V22 Z" />
                  <path d="M10 22 V17 Q10 15 12 15 Q14 15 14 17 V22" />
                </svg>
              ),
            },
            {
              side: "right" as const,
              lines: ["Ceremonia", "Civil"],
              time: "7:00 PM",
              delay: "0.7s",
              icon: (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 17 C12 17 9.5 15.5 9.5 13.5 C9.5 12 10.5 11.5 11.3 12.1 C11.7 12.4 12 12.7 12 12.7 C12 12.7 12.3 12.4 12.7 12.1 C13.5 11.5 14.5 12 14.5 13.5 C14.5 15.5 12 17 12 17 Z" fill="currentColor" opacity="0.55" stroke="none" />
                </svg>
              ),
            },
            {
              side: "left" as const,
              lines: ["Recepción"],
              time: "8:00 PM",
              delay: "0.95s",
              icon: (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3 L5 9 L8.5 13 L1.5 13 Z" />
                  <line x1="5" y1="13" x2="5" y2="19" />
                  <line x1="3" y1="19" x2="7" y2="19" />
                  <path d="M19 3 L19 9 L22.5 13 L15.5 13 Z" />
                  <line x1="19" y1="13" x2="19" y2="19" />
                  <line x1="17" y1="19" x2="21" y2="19" />
                  <line x1="8.5" y1="7" x2="15.5" y2="5" />
                </svg>
              ),
            },
            {
              side: "right" as const,
              lines: ["Comienza", "el baile"],
              time: "9:00 PM",
              delay: "1.2s",
              icon: (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <circle cx="12" cy="13" r="8" />
                  <ellipse cx="12" cy="13" rx="4" ry="8" />
                  <line x1="4" y1="9" x2="20" y2="9" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                  <line x1="9" y1="3" x2="15" y2="3" />
                </svg>
              ),
            },
          ].map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 110,
                marginBottom: i < arr.length - 1 ? 4 : 0,
                animation: phase === "itinerary" ? `fadeIn 1s ease ${item.delay} both` : "none",
              }}
            >
              {/* Left slot */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  paddingRight: 22,
                  opacity: item.side === "left" ? 1 : 0,
                }}
              >
                <div style={{ color: "rgba(232,201,122,0.9)" }}>{item.icon}</div>
                <div style={{ textAlign: "center" }}>
                  {item.lines.map((line) => (
                    <p key={line} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 15, color: "#F5F0E8", lineHeight: 1.4 }}>{line}</p>
                  ))}
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 14, color: "#C9A84C", marginTop: 3, letterSpacing: "0.05em" }}>{item.time}</p>
                </div>
              </div>

              {/* Center dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#C9A84C",
                  boxShadow: "0 0 0 3px rgba(201,168,76,0.18), 0 0 12px rgba(201,168,76,0.7)",
                  flexShrink: 0,
                }}
              />

              {/* Right slot */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  paddingLeft: 22,
                  opacity: item.side === "right" ? 1 : 0,
                }}
              >
                <div style={{ color: "rgba(232,201,122,0.9)" }}>{item.icon}</div>
                <div style={{ textAlign: "center" }}>
                  {item.lines.map((line) => (
                    <p key={line} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 15, color: "#F5F0E8", lineHeight: 1.4 }}>{line}</p>
                  ))}
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 14, color: "#C9A84C", marginTop: 3, letterSpacing: "0.05em" }}>{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery scene ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: phase === "gallery" ? "translateY(0)" : "translateY(100%)",
          opacity: phase === "gallery" ? 1 : 0,
          transition: "transform 1s cubic-bezier(0.34, 1.05, 0.64, 1), opacity 0.6s ease",
          zIndex: 45,
          overflow: "hidden",
        }}
      >
        {/* Photo layers — crossfade */}
        {Array.from({ length: weddingConfig.gallery.photoCount }, (_, i) => i + 1).map((n, i) => (
          <div
            key={n}
            style={{
              position: "absolute",
              inset: 0,
              opacity: galleryIndex === i ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          >
            <Image
              src={`/assets/${n}.jpg`}
              alt={`Foto ${n}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 62%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "58px 36px 0",
            textAlign: "center",
            zIndex: 2,
            animation: phase === "gallery" ? "fadeIn 1.2s ease 0.4s both" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 38,
              color: "#F5F0E8",
              lineHeight: 1.3,
              textShadow: "0 2px 24px rgba(0,0,0,0.75)",
            }}
          >
            {weddingConfig.gallery.title1}
          </p>
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 38,
              color: "#F5F0E8",
              lineHeight: 1.3,
              textShadow: "0 2px 24px rgba(0,0,0,0.75)",
            }}
          >
            {weddingConfig.gallery.title2}
          </p>
        </div>

        {/* Progress dots */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            zIndex: 2,
          }}
        >
          {Array.from({ length: weddingConfig.gallery.photoCount }, (_, i) => i).map((i) => (
            <div
              key={i}
              style={{
                height: 4,
                width: galleryIndex === i ? 24 : 6,
                borderRadius: 2,
                background: galleryIndex === i ? "#C9A84C" : "rgba(255,255,255,0.35)",
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Farewell scene ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: phase === "farewell" ? "translateY(0)" : "translateY(100%)",
          opacity: phase === "farewell" ? 1 : 0,
          transition: "transform 1.2s cubic-bezier(0.34, 1.05, 0.64, 1), opacity 0.8s ease",
          background: "radial-gradient(ellipse at 50% 40%, #6B0F1A 0%, #4a0a12 55%, #2e0509 100%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top */}
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: "160%", height: 280, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.28) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* Gold glow bottom */}
        <div style={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", width: "160%", height: 280, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.28) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Botanical ornament */}
        <div
          style={{
            marginBottom: 28,
            animation: phase === "farewell" ? "fadeIn 1.2s ease 0.2s both" : "none",
          }}
        >
          <svg width="64" height="60" viewBox="0 0 64 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 56 C32 42 31 26 30 10" stroke="rgba(201,168,76,0.75)" strokeWidth="1.3" />
            <path d="M30 16 C24 10 16 11 13 18 Q21 14 30 22" stroke="rgba(201,168,76,0.7)" strokeWidth="1.1" fill="rgba(201,168,76,0.12)" />
            <path d="M30 10 C36 4 44 5 47 12 Q39 8 30 16" stroke="rgba(201,168,76,0.7)" strokeWidth="1.1" fill="rgba(201,168,76,0.12)" />
            <path d="M31 30 C25 24 17 25 14 32 Q22 28 31 36" stroke="rgba(201,168,76,0.65)" strokeWidth="1.1" fill="rgba(201,168,76,0.09)" />
            <path d="M31 26 C37 20 45 21 48 28 Q40 24 31 30" stroke="rgba(201,168,76,0.65)" strokeWidth="1.1" fill="rgba(201,168,76,0.09)" />
            <path d="M31 44 C25 38 17 40 14 46 Q22 42 31 48" stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="rgba(201,168,76,0.07)" />
            <path d="M31 40 C37 34 45 36 48 42 Q40 38 31 44" stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="rgba(201,168,76,0.07)" />
          </svg>
        </div>

        {/* Names */}
        <div
          style={{
            textAlign: "center",
            animation: phase === "farewell" ? "fadeIn 1.2s ease 0.45s both" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.28em",
              color: "#F5F0E8",
              textTransform: "uppercase",
            }}
          >
            {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            maxWidth: 260,
            margin: "16px 0",
            animation: phase === "farewell" ? "fadeIn 1.2s ease 0.6s both" : "none",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.4)" }} />
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(232,201,122,0.7)",
              textTransform: "uppercase",
            }}
          >
            {weddingConfig.farewell.tagline}
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.4)" }} />
        </div>

        {/* Quote */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 300,
            animation: phase === "farewell" ? "fadeIn 1.4s ease 0.85s both" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 28,
              color: "#F5F0E8",
              lineHeight: 1.55,
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            {weddingConfig.farewell.quote}
          </p>
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 32,
            animation: phase === "farewell" ? "fadeIn 1.2s ease 1.2s both" : "none",
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(201,168,76,0.4)" }} />
          <div style={{ width: 5, height: 5, transform: "rotate(45deg)", background: "rgba(201,168,76,0.7)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(201,168,76,0.9)" }} />
          <div style={{ width: 5, height: 5, transform: "rotate(45deg)", background: "rgba(201,168,76,0.7)" }} />
          <div style={{ width: 40, height: 1, background: "rgba(201,168,76,0.4)" }} />
        </div>
      </div>

    </div>
  );
}
