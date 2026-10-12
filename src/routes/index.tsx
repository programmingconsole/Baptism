import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import bgImage from "@/assets/baptism-bg.png";
import songAsset from "@/assets/music1.mp3.asset.json";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  CalendarPlus,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shalet Maria Sanju — Holy Baptism Invitation" },
      {
        name: "description",
        content:
          "With joyous hearts, Sanju Saju & Angela Alappat invite you to celebrate the Holy Baptism of their beloved son Shalet Maria Sanju on Friday, 6th November 2026 in Sharjah.",
      },
      { property: "og:title", content: "Shalet Maria Sanju — Holy Baptism Invitation" },
      {
        property: "og:description",
        content:
          "Join Sanju Saju & Angela Alappat to celebrate the Holy Baptism of Shalet Maria Sanju at St. Michael's Catholic Church and reception at Asian Empire Venue on 6th November 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/thumbnail.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/thumbnail.jpg" },
      { name: "twitter:title", content: "Shalet Maria Sanju — Holy Baptism Invitation" },
      {
        name: "twitter:description",
        content:
          "Holy Baptism of Shalet Maria Sanju on 6th November 2026 at St. Michael's Catholic Church, Sharjah.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!opened) return;
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.65;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [opened]);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  // Use the newly added song from public/baptism-song.mp3
  const audioSrc = "/baptism-song.mp3";

  return (
    <div className="min-h-screen w-full bg-[#f8f5ee] flex justify-center items-stretch overflow-x-hidden font-serif-body selection:bg-gold/30 selection:text-navy-deep">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {/* Fixed/Adjustable Background aligned to the centered column */}
      <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-md sm:max-w-lg pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5ee]/40 via-[#f8f5ee]/10 to-[#f8f5ee]/50 backdrop-blur-[1px]" />
      </div>

      <div className="relative w-full max-w-md sm:max-w-lg min-h-screen text-navy-deep shadow-2xl flex flex-col z-10 border-x border-gold-dark/25 bg-cream/70 backdrop-blur-[2px]">
        {/* Content wrapper */}
        <div className="relative z-10 flex-1 flex flex-col">
          {!opened ? (
            <Cover onOpen={() => setOpened(true)} showButton />
          ) : (
            <div className="relative z-10 flex-1 flex flex-col">
              <FloatingSparklesAndPetals />
              <CardContent playing={playing} onToggle={toggleMusic} />
            </div>
          )}
        </div>
      </div>

      {/* Floating music toggle button */}
      <button
        onClick={opened ? toggleMusic : () => setOpened(true)}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy-deep text-gold shadow-[0_8px_25px_-4px_rgba(22,35,59,0.5)] border border-gold/60 transition-transform duration-300 hover:scale-110 active:scale-95 animate-glow-pulse sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        {playing ? (
          <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
        )}
        {playing && (
          <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping-slow pointer-events-none" />
        )}
      </button>
    </div>
  );
}

function FloatingSparklesAndPetals() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 5.9) % 100;
        const duration = 9 + ((i * 1.6) % 8);
        const delay = (i * 0.7) % 10;
        const size = 10 + ((i * 2.3) % 11);
        const drift = i % 2 === 0 ? "petal-drift-a" : "petal-drift-b";
        return (
          <span
            key={i}
            className={`absolute -top-6 ${drift}`}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
            }}
          >
            {i % 4 === 0 ? (
              /* Delicate floating flower blossom */
              <svg viewBox="0 0 24 24" className="h-full w-full text-gold-dark/65 drop-shadow-sm">
                <path
                  d="M12 3 C10 7, 14 7, 12 3 Z M19 12 C15 10, 15 14, 19 12 Z M12 21 C14 17, 10 17, 12 21 Z M5 12 C9 14, 9 10, 5 12 Z"
                  fill="currentColor"
                />
                <circle cx="12" cy="12" r="2.8" fill="#FAF7F2" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            ) : i % 4 === 1 ? (
              /* Soft falling flower petal */
              <svg viewBox="0 0 20 20" className="h-full w-full text-gold/60">
                <path
                  d="M10 2 C14 6, 16 12, 10 18 C4 12, 6 6, 10 2 Z"
                  fill="currentColor"
                />
              </svg>
            ) : i % 4 === 2 ? (
              /* Celestial Star sparkle */
              <svg viewBox="0 0 24 24" className="h-full w-full text-gold-dark/60 drop-shadow">
                <path
                  d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              /* Soft golden dew point */
              <svg viewBox="0 0 20 20" className="h-full w-full text-gold/50">
                <circle cx="10" cy="10" r="4.5" fill="currentColor" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Detailed botanical corner frame with blooming flowers, leaves, and vine spirals.
 */
function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer corner framing border lines */}
      <path d="M 6 6 L 68 6 M 6 6 L 6 68" strokeWidth="1.2" opacity="0.65" strokeLinecap="round" />
      <path d="M 12 12 L 48 12 M 12 12 L 12 48" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />

      {/* Graceful vine trails extending along horizontal & vertical border lines */}
      <path
        d="M 18 18 Q 48 20, 78 10 T 132 6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 18 18 Q 20 48, 10 78 T 6 132"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Leaves branching along top border */}
      <path d="M 46 16 C 54 8, 66 10, 62 19 C 56 22, 48 20, 46 16 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.8" />
      <path d="M 82 10 C 92 4, 102 6, 96 15 C 89 17, 83 14, 82 10 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.8" />
      <path d="M 112 7 C 120 2, 128 5, 124 11 C 117 13, 112 10, 112 7 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />

      {/* Leaves branching along left border */}
      <path d="M 16 46 C 8 54, 10 66, 19 62 C 22 56, 20 48, 16 46 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.8" />
      <path d="M 10 82 C 4 92, 6 102, 15 96 C 17 89, 14 83, 10 82 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.8" />
      <path d="M 7 112 C 2 120, 5 128, 11 124 C 13 117, 10 112, 7 112 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />

      {/* Primary Blooming Flower nestled right in the corner hub (around 32, 32) */}
      <g transform="translate(32, 32)">
        {/* Flower petals (layer 1 - diagonal) */}
        <path d="M 0 0 C -8 -16, -18 -8, 0 0 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />
        <path d="M 0 0 C 16 -8, 8 -18, 0 0 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />
        <path d="M 0 0 C 8 18, 18 8, 0 0 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />
        <path d="M 0 0 C -18 8, -8 18, 0 0 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.9" />

        {/* Flower petals (layer 2 - cardinal blooming) */}
        <path d="M 0 0 C -7 -18, 7 -18, 0 0 Z" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />
        <path d="M 0 0 C 18 -7, 18 7, 0 0 Z" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />
        <path d="M 0 0 C 7 18, -7 18, 0 0 Z" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />
        <path d="M 0 0 C -18 7, -18 -7, 0 0 Z" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />

        {/* Flower center */}
        <circle cx="0" cy="0" r="4.8" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.2" fill="#FAF7F2" />
      </g>

      {/* Secondary Flower on the top horizontal border branch (around 95, 11) */}
      <g transform="translate(95, 11) scale(0.72)">
        <path d="M 0 -10 C 6 -14, 10 -8, 0 0 C -10 -8, -6 -14, 0 -10 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M 10 0 C 14 6, 8 10, 0 0 C 8 -10, 14 -6, 10 0 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M 0 10 C -6 14, -10 8, 0 0 C 10 8, 6 14, 0 10 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M -10 0 C -14 -6, -8 -10, 0 0 C -8 10, -14 6, -10 0 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <circle cx="0" cy="0" r="3.2" fill="currentColor" fillOpacity="0.85" />
        <circle cx="0" cy="0" r="1.4" fill="#FAF7F2" />
      </g>

      {/* Secondary Flower on the left vertical border branch (around 11, 95) */}
      <g transform="translate(11, 95) scale(0.72)">
        <path d="M 0 -10 C 6 -14, 10 -8, 0 0 C -10 -8, -6 -14, 0 -10 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M 10 0 C 14 6, 8 10, 0 0 C 8 -10, 14 -6, 10 0 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M 0 10 C -6 14, -10 8, 0 0 C 10 8, 6 14, 0 10 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <path d="M -10 0 C -14 -6, -8 -10, 0 0 C -8 10, -14 6, -10 0 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
        <circle cx="0" cy="0" r="3.2" fill="currentColor" fillOpacity="0.85" />
        <circle cx="0" cy="0" r="1.4" fill="#FAF7F2" />
      </g>

      {/* Petite flower buds at the tips of border lines */}
      <circle cx="134" cy="6" r="2.2" fill="currentColor" fillOpacity="0.75" />
      <circle cx="6" cy="134" r="2.2" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

/**
 * Botanical flower garland divider for border accents and section breaks.
 */
function FloralBorderGarland({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative z-10 mx-auto flex w-full max-w-sm items-center justify-center px-3 py-2 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-dark/40 to-gold-dark/80" />

      <div className="mx-2.5 flex items-center gap-1.5 text-gold-dark">
        {/* Left leaf sprig */}
        <svg width="28" height="16" viewBox="0 0 32 18" fill="currentColor" className="opacity-80">
          <path d="M 30 9 Q 16 8, 2 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M 22 8 C 18 2, 13 4, 17 8 Z" opacity="0.65" />
          <path d="M 14 9 C 10 15, 5 13, 10 9 Z" opacity="0.65" />
          <path d="M 7 8 C 4 3, 0 5, 4 8 Z" opacity="0.75" />
          <circle cx="2" cy="9" r="1.5" />
        </svg>

        {/* Small side flower */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="opacity-85">
          <path d="M 10 2 C 8 6, 12 6, 10 2 Z M 18 10 C 14 8, 14 12, 18 10 Z M 10 18 C 12 14, 8 14, 10 18 Z M 2 10 C 6 12, 6 8, 2 10 Z" />
          <circle cx="10" cy="10" r="2.5" fill="#FAF7F2" />
        </svg>

        {/* Center blooming flower */}
        <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" className="drop-shadow-sm">
          {/* Main petals */}
          <path d="M 16 3 C 12 9, 20 9, 16 3 Z" opacity="0.9" />
          <path d="M 27 10 C 21 10, 24 18, 27 10 Z" opacity="0.9" />
          <path d="M 27 22 C 24 14, 21 22, 27 22 Z" opacity="0.9" />
          <path d="M 16 29 C 20 23, 12 23, 16 29 Z" opacity="0.9" />
          <path d="M 5 22 C 11 22, 8 14, 5 22 Z" opacity="0.9" />
          <path d="M 5 10 C 8 18, 11 10, 5 10 Z" opacity="0.9" />
          {/* Inner core */}
          <circle cx="16" cy="16" r="4.2" fill="currentColor" />
          <circle cx="16" cy="16" r="2" fill="#FAF7F2" />
        </svg>

        {/* Small side flower right */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="opacity-85">
          <path d="M 10 2 C 8 6, 12 6, 10 2 Z M 18 10 C 14 8, 14 12, 18 10 Z M 10 18 C 12 14, 8 14, 10 18 Z M 2 10 C 6 12, 6 8, 2 10 Z" />
          <circle cx="10" cy="10" r="2.5" fill="#FAF7F2" />
        </svg>

        {/* Right leaf sprig */}
        <svg width="28" height="16" viewBox="0 0 32 18" fill="currentColor" className="scale-x-[-1] opacity-80">
          <path d="M 30 9 Q 16 8, 2 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M 22 8 C 18 2, 13 4, 17 8 Z" opacity="0.65" />
          <path d="M 14 9 C 10 15, 5 13, 10 9 Z" opacity="0.65" />
          <path d="M 7 8 C 4 3, 0 5, 4 8 Z" opacity="0.75" />
          <circle cx="2" cy="9" r="1.5" />
        </svg>
      </div>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-dark/40 to-gold-dark/80" />
    </div>
  );
}

function HolyCross({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width="34"
        height="48"
        viewBox="0 0 34 48"
        fill="none"
        className="text-gold-dark drop-shadow-sm transition-transform duration-500 hover:scale-105"
      >
        {/* Ornate Cross */}
        <path
          d="M17 2 L17 46 M7 14 L27 14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Inner delicate line */}
        <path
          d="M17 6 L17 42 M10 14 L24 14"
          stroke="#FAF7F2"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* End caps */}
        <circle cx="17" cy="2" r="2.2" fill="currentColor" />
        <circle cx="17" cy="46" r="2.2" fill="currentColor" />
        <circle cx="7" cy="14" r="2.2" fill="currentColor" />
        <circle cx="27" cy="14" r="2.2" fill="currentColor" />
        {/* Central ray aura */}
        <circle cx="17" cy="14" r="5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      </svg>
    </div>
  );
}

function Cover({ onOpen, showButton = true }: { onOpen: () => void; showButton?: boolean }) {
  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-between px-5 py-10 text-center animate-fade-scale sm:min-h-screen sm:px-8 sm:py-12">
      {/* Botanical floral corner borders */}
      <FloralCorner className="pointer-events-none absolute left-2 top-2 h-16 w-16 text-gold-dark sm:left-3 sm:top-3 sm:h-24 sm:w-24" />
      <FloralCorner className="pointer-events-none absolute right-2 top-2 h-16 w-16 scale-x-[-1] text-gold-dark sm:right-3 sm:top-3 sm:h-24 sm:w-24" />
      <FloralCorner className="pointer-events-none absolute bottom-2 left-2 h-16 w-16 scale-y-[-1] text-gold-dark sm:bottom-3 sm:left-3 sm:h-24 sm:w-24" />
      <FloralCorner className="pointer-events-none absolute bottom-2 right-2 h-16 w-16 scale-x-[-1] scale-y-[-1] text-gold-dark sm:bottom-3 sm:right-3 sm:h-24 sm:w-24" />

      {/* Top Header */}
      <div className="w-full pt-4 flex flex-col items-center">
        <HolyCross className="mb-3 animate-float-up" />
        <p className="tracking-[0.32em] text-[10px] uppercase text-gold-dark font-medium animate-float-up delay-100 sm:tracking-[0.45em] sm:text-xs">
          With Heavenly Blessings
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-gold-dark/50" />
          <p className="tracking-[0.24em] text-[11px] uppercase text-navy-deep/80 font-semibold animate-float-up delay-200 sm:tracking-[0.35em] sm:text-xs">
            The Holy Baptism of
          </p>
          <span className="h-px w-8 bg-gold-dark/50" />
        </div>
      </div>

      {/* Center Baby Name & Parents */}
      <div className="my-auto py-6 flex flex-col items-center animate-float-up delay-500 w-full">
        <div className="relative px-2">
          <h1
            className="text-navy-deep tracking-[0.04em] font-semibold text-center drop-shadow-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 7.5vw, 3.2rem)",
              lineHeight: 1.15,
            }}
          >
            SHALET MARIA
            <br />
            <span className="text-gold-dark font-medium">SANJU</span>
          </h1>
        </div>

        <FloralBorderGarland className="my-5" />

        <div className="flex flex-col items-center">
          <p className="tracking-[0.24em] text-[10px] uppercase text-gold-dark font-semibold sm:text-xs sm:tracking-[0.32em]">
            Beloved Son of
          </p>
          <p
            className="mt-1 text-xl sm:text-2xl text-navy-deep italic tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Sanju Saju &amp; Angela Alappat
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1 rounded-full border border-gold-dark/40 bg-cream/70 px-6 py-2.5 shadow-sm backdrop-blur-sm animate-float-up delay-700">
          <p className="tracking-[0.28em] text-xs font-semibold text-navy-deep sm:tracking-[0.38em] sm:text-sm">
            06 &middot; 11 &middot; 2026
          </p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-gold-dark font-medium sm:text-[10px]">
            Friday &middot; Sharjah, UAE
          </p>
        </div>
      </div>

      {/* Bottom Open Invitation Button */}
      {showButton && (
        <div className="w-full pb-3 flex flex-col items-center">
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-gold-dark/60 bg-navy-deep px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] text-gold shadow-lg shadow-navy-deep/20 transition-all duration-300 hover:scale-105 hover:bg-navy-deep/90 hover:shadow-xl active:scale-95 animate-float-up delay-1000 sm:px-10 sm:text-xs sm:tracking-[0.35em]"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold group-hover:rotate-12 transition-transform" />
            <span>Open Invitation</span>
          </button>
        </div>
      )}
    </div>
  );
}

function CardContent({
  playing: _playing,
  onToggle: _onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `You're cordially invited to the Holy Baptism of Shalet Maria Sanju (son of Sanju Saju & Angela Alappat) on Friday, 6th November 2026 in Sharjah.\n\nView Invitation:\n${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: "Holy Baptism of Shalet Maria Sanju",
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Google Calendar URL generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Holy Baptism of Shalet Maria Sanju"
  )}&dates=20261106T110000Z/20261106T180000Z&details=${encodeURIComponent(
    "Baptism Ceremony at 3:00 PM at St. Michael's Catholic Church, Sharjah. Reception from 7:00 PM at Asian Empire Venue, Mubarak Center, Rolla, Sharjah."
  )}&location=${encodeURIComponent(
    "St. Michael's Catholic Church, Al Yarmook, Sharjah, UAE"
  )}`;

  return (
    <div className="relative z-10 mx-auto w-full max-w-md sm:max-w-lg animate-card-rise px-3.5 py-6 sm:px-5 sm:py-8 space-y-8">
      {/* SECTION 1: SACRED INVITATION & BABY CELEBRATION */}
      <section className="relative flex flex-col items-center justify-center text-center w-full min-h-[85vh] py-2">
        <div className="relative w-full rounded-2xl border-2 border-gold-dark/60 bg-cream/80 px-4 py-8 shadow-lg backdrop-blur-md sm:px-8 sm:py-10 flex flex-col items-center justify-center gap-2 ring-1 ring-gold/40 ring-offset-2 ring-offset-cream">
          {/* Floral Border Corners */}
          <FloralCorner className="pointer-events-none absolute -left-1.5 -top-1.5 h-16 w-16 text-gold-dark sm:-left-2 sm:-top-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -right-1.5 -top-1.5 h-16 w-16 scale-x-[-1] text-gold-dark sm:-right-2 sm:-top-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-16 w-16 scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-left-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-16 w-16 scale-x-[-1] scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-right-2 sm:h-22 sm:w-22" />

          {/* Cross & Scripture */}
          <HolyCross className="mb-1 animate-float-up" />

          <p className="mt-1 font-serif-body italic text-[14px] text-navy-deep/80 sm:text-[16px] max-w-xs animate-float-up delay-100">
            &ldquo;Every good and perfect gift is from above.&rdquo;
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold-dark font-semibold animate-float-up delay-200">
            — James 1:17 —
          </p>

          <FloralBorderGarland className="my-2" />

          {/* Formal wording */}
          <p className="font-serif-body text-[14px] sm:text-[15px] leading-relaxed text-navy-deep/90 max-w-sm animate-float-up delay-300">
            With hearts full of praise and gratitude to Almighty God, we warmly invite you to celebrate the Sacrament of Holy Baptism of our beloved son
          </p>

          {/* Child's Name */}
          <div className="my-3 flex flex-col items-center animate-float-up delay-400">
            <h2
              className="tracking-[0.06em] font-bold text-navy-deep drop-shadow-sm px-2"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.5rem, 6.2vw, 2.2rem)",
                lineHeight: 1.2,
              }}
            >
              SHALET MARIA SANJU
            </h2>
            <div className="mt-2.5 mx-auto flex w-full max-w-[180px] items-center justify-center gap-2">
              <span className="h-[1px] flex-1 bg-gold-dark/40" />
              <span className="h-2 w-2 rotate-45 border border-gold-dark/60 bg-gold/20" />
              <span className="h-[1px] flex-1 bg-gold-dark/40" />
            </div>
            <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-gold-dark font-semibold sm:text-xs">
              Son of
            </p>
            <p className="text-base sm:text-lg italic font-medium text-navy-deep">
              Sanju Saju &amp; Angela Alappat
            </p>
          </div>

          {/* Quick-glance two arches */}
          <div className="relative mx-auto mt-2 grid w-full max-w-[340px] grid-cols-2 items-stretch gap-2.5 animate-float-up delay-600 sm:max-w-[380px] sm:gap-3.5">
            {/* Baptism Ceremony */}
            <div className="flex min-w-0 flex-col items-center justify-between rounded-2xl border border-gold-dark/50 bg-[#faf6ee] px-2.5 py-4 shadow-sm sm:px-4 sm:py-5">
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep/10 text-navy-deep">
                  <Clock className="h-4 w-4 text-navy-deep" />
                </div>
                <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-gold-dark sm:text-[10px]">
                  BAPTISM
                </p>
                <span
                  className="text-navy-deep font-bold leading-tight my-1 text-center"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.15rem, 5vw, 1.45rem)" }}
                >
                  3:00 PM
                </span>
                <p className="text-[10px] font-semibold text-navy-deep/90 sm:text-xs">
                  Friday, Nov 6
                </p>
              </div>
              <p className="mt-2 text-[9px] text-center font-medium tracking-wide text-navy-deep/75 border-t border-gold-dark/20 pt-1.5 w-full">
                St. Michael&apos;s Church
              </p>
            </div>

            {/* Reception */}
            <div className="flex min-w-0 flex-col items-center justify-between rounded-2xl border border-gold-dark/50 bg-[#faf6ee] px-2.5 py-4 shadow-sm sm:px-4 sm:py-5">
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep/10 text-navy-deep">
                  <Sparkles className="h-4 w-4 text-navy-deep" />
                </div>
                <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-gold-dark sm:text-[10px]">
                  RECEPTION
                </p>
                <span
                  className="text-navy-deep font-bold leading-tight my-1 text-center"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.15rem, 5vw, 1.45rem)" }}
                >
                  7:00 PM
                </span>
                <p className="text-[10px] font-semibold text-navy-deep/90 sm:text-xs">
                  Onwards
                </p>
              </div>
              <p className="mt-2 text-[9px] text-center font-medium tracking-wide text-navy-deep/75 border-t border-gold-dark/20 pt-1.5 w-full">
                Asian Empire Venue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CEREMONY & RECEPTION VENUE DETAILS */}
      <section className="relative flex flex-col items-center justify-center text-center w-full py-2">
        <div className="relative w-full rounded-2xl border-2 border-gold-dark/60 bg-cream/80 px-4 py-8 shadow-lg backdrop-blur-md sm:px-7 sm:py-10 flex flex-col gap-6 ring-1 ring-gold/40 ring-offset-2 ring-offset-cream">
          {/* Floral Border Corners */}
          <FloralCorner className="pointer-events-none absolute -left-1.5 -top-1.5 h-16 w-16 text-gold-dark sm:-left-2 sm:-top-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -right-1.5 -top-1.5 h-16 w-16 scale-x-[-1] text-gold-dark sm:-right-2 sm:-top-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-16 w-16 scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-left-2 sm:h-22 sm:w-22" />
          <FloralCorner className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-16 w-16 scale-x-[-1] scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-right-2 sm:h-22 sm:w-22" />

          {/* Heading */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dark font-semibold">
              Event Itinerary &amp; Locations
            </p>
            <h3
              className="mt-1 text-2xl font-bold text-navy-deep sm:text-3xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Order of Events
            </h3>
            <FloralBorderGarland className="mt-1" />
          </div>

          {/* Venue Card 1: St Michael's Church */}
          <div className="relative rounded-xl border border-gold-dark/45 bg-[#fbf8f2] p-4 text-left shadow-sm transition-all hover:border-gold-dark/75 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-navy-deep/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy-deep">
                  Baptism Ceremony &middot; 3:00 PM
                </span>
                <h4
                  className="mt-2 text-lg sm:text-xl font-bold text-navy-deep"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  St. Michael&apos;s Catholic Church
                </h4>
                <p className="mt-1 text-xs text-navy-deep/75 leading-relaxed">
                  Al Yarmook, Sharjah, United Arab Emirates
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-navy-deep border border-gold-dark/30">
                <MapPin className="h-5 w-5 text-gold-dark" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://maps.google.com/?q=St.+Michael%27s+Catholic+Church,+Sharjah"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-deep/40 bg-navy-deep px-4 py-2 text-[10px] uppercase tracking-wider text-gold shadow-sm transition-all hover:bg-navy-deep/90 hover:scale-[1.02] active:scale-95"
              >
                <MapPin className="h-3 w-3" />
                <span>Directions to Church</span>
              </a>
            </div>
          </div>

          {/* Venue Card 2: Asian Empire Venue */}
          <div className="relative rounded-xl border border-gold-dark/45 bg-[#fbf8f2] p-4 text-left shadow-sm transition-all hover:border-gold-dark/75 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-gold/25 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy-deep">
                  Celebration Reception &middot; From 7:00 PM
                </span>
                <h4
                  className="mt-2 text-lg sm:text-xl font-bold text-navy-deep"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Asian Empire Venue
                </h4>
                <p className="mt-1 text-xs text-navy-deep/75 leading-relaxed">
                  Mubarak Center, Rolla, Al Sharq Street, Sharjah, UAE
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-navy-deep border border-gold-dark/30">
                <Sparkles className="h-5 w-5 text-gold-dark" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3e5f5b1e13d7bd9d:0x964ef1263c7e9c20?entry=s&sa=X&ved=2ahUKEwi-3dDCpq-XAxWy_rsIHckUHSIQ4kB6BAgWEAA&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-deep/40 bg-navy-deep px-4 py-2 text-[10px] uppercase tracking-wider text-gold shadow-sm transition-all hover:bg-navy-deep/90 hover:scale-[1.02] active:scale-95"
              >
                <MapPin className="h-3 w-3" />
                <span>Directions to Reception</span>
              </a>
            </div>
          </div>

          {/* COUNTDOWN */}
          <div className="w-full pt-2">
            <Countdown target="2026-11-06T15:00:00" />
          </div>

          {/* Action Buttons: Add to Calendar & Share */}
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold-dark/50 bg-cream px-5 py-2.5 text-[10px] uppercase tracking-wider text-navy-deep shadow-sm transition-all hover:bg-navy-deep hover:text-gold active:scale-95"
            >
              <CalendarPlus className="h-3.5 w-3.5 text-gold-dark" />
              <span>Add to Calendar</span>
            </a>

            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold-dark/50 bg-cream px-5 py-2.5 text-[10px] uppercase tracking-wider text-navy-deep shadow-sm transition-all hover:bg-navy-deep hover:text-gold active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-gold-dark" />
                  <span>Share Invitation</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Blessing */}
          <div className="pt-3 border-t border-gold-dark/25 flex flex-col items-center">
            <p
              className="text-lg italic text-navy-deep sm:text-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              &ldquo;May the Lord bless him and keep him, and make His face shine upon him.&rdquo;
            </p>
            <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-gold-dark font-semibold">
              With Love &amp; Blessings &middot; Sanju &amp; Angela
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Countdown({ target }: { target: string }) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetTime - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const items = [
    { label: "DAYS", value: days },
    { label: "HOURS", value: hours },
    { label: "MINS", value: minutes },
    { label: "SECS", value: seconds },
  ];

  return (
    <div className="w-full">
      <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-gold-dark font-semibold sm:mb-4 sm:text-xs sm:tracking-[0.35em]">
        Counting down to the blessed celebration
      </p>
      <div className="grid w-full grid-cols-4 items-stretch justify-center gap-1.5 sm:gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex min-w-0 flex-col items-center rounded-xl border border-gold-dark/40 bg-[#faf6ee] px-1.5 py-2.5 shadow-sm backdrop-blur-sm sm:px-3 sm:py-3.5"
          >
            <span
              className="text-navy-deep font-bold leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.4rem, 6.5vw, 2.2rem)",
              }}
            >
              {String(it.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[8px] font-semibold tracking-[0.14em] text-gold-dark sm:text-[9px] sm:tracking-[0.2em]">
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
