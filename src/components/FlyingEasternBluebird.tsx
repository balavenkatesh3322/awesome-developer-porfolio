import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';

interface FlyingEasternBluebirdProps {
  onExploreClick: () => void;
}

/**
 * Flying Eastern Bluebird (Sialia sialis) Component
 * Inspired by classic bird flight animations (e.g. birdieflies.com).
 * Features:
 * - Anatomically authentic Eastern Bluebird coloration:
 *   Deep royal/ultramarine blue upperparts (head, back, wings, tail),
 *   Warm chestnut-rust throat, breast, and flanks, and crisp white lower belly.
 * - Slender black songbird bill and expressive dark eye.
 * - High-frequency 3D wing flapping keyframes (upper and lower wing layers).
 * - Synchronized aerodynamic flight pitch and vertical bobbing.
 * - Trailing "Explore Portfolio" aerial flag banner attached behind the bird via a tether string.
 */
export const FlyingEasternBluebird: React.FC<FlyingEasternBluebirdProps> = ({ onExploreClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden pointer-events-none h-28 sm:h-32 -mb-8 z-20">
      {/* Flight Container animating across the full viewport width */}
      <motion.div
        className="absolute top-2 sm:top-3 left-0 cursor-pointer pointer-events-auto flex items-center select-none group"
        onClick={onExploreClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ x: -340, y: 12 }}
        animate={{
          x: [
            -340,
            windowWidth * 0.18,
            windowWidth * 0.42,
            windowWidth * 0.65,
            windowWidth * 0.88,
            windowWidth + 340
          ],
          y: [12, -14, 18, -12, 14, 16],
          rotate: [1, -2.5, 2.5, -2, 1.5, -1]
        }}
        transition={{
          duration: isHovered ? 12 : 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* 1. Trailing Aerial Flag Banner (POSITIONED BEHIND THE BLUEBIRD) */}
        <motion.div
          className="relative flex items-center mr-[-4px] z-10"
          animate={{
            y: [0, 5, -5, 4, 0],
            rotate: [-1.5, 2.5, -2, 1.5, -1.5]
          }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Flag Canvas / Banner */}
          <div className="relative flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-l-2xl bg-gradient-to-r from-blue-950 via-indigo-900 to-sky-600 text-white text-xs font-black shadow-2xl shadow-blue-950/60 border-y border-l border-sky-300/40 group-hover:from-blue-900 group-hover:to-sky-500 transition-all duration-300">
            {/* Waving Flag Tail Notch on Left */}
            <div
              className="absolute -left-2.5 top-0 bottom-0 w-3 bg-slate-950 opacity-90"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="flex flex-col">
              <span className="tracking-wider uppercase text-[8.5px] text-sky-200 font-extrabold leading-none">
                Interactive Directory
              </span>
              <span className="tracking-wide text-xs font-black text-white whitespace-nowrap">
                Explore Portfolio
              </span>
            </div>
            <Compass className="w-4 h-4 text-sky-200 group-hover:rotate-90 transition-transform duration-500 ml-1" />

            {/* Flag Ripple Shine Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-l-2xl pointer-events-none" />
          </div>
        </motion.div>

        {/* 2. Ribbon Tether String Connecting Flag to Eastern Bluebird's Feet/Tail */}
        <svg width="48" height="24" viewBox="0 0 48 24" className="z-10 -mr-2 overflow-visible">
          <motion.path
            d="M 0 12 Q 24 22 48 12"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="4 2"
            opacity="0.9"
            animate={{
              d: [
                "M 0 12 Q 24 22 48 12",
                "M 0 12 Q 24 2 48 12",
                "M 0 12 Q 24 22 48 12"
              ]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* 3. Anatomically Detailed Photorealistic Eastern Bluebird (Sialia sialis) */}
        <motion.div
          className="relative z-20 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(30,58,138,0.35)]"
          animate={{
            y: [0, -3.5, 3.5, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{
            duration: 0.36,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            width="115"
            height="88"
            viewBox="0 0 190 145"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform group-hover:scale-108 transition-transform duration-300 overflow-visible"
          >
            <defs>
              {/* Photorealistic Ultramarine & Royal Blue Plumage */}
              <linearGradient id="ebRoyalBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="25%" stopColor="#2563EB" />
                <stop offset="65%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>

              {/* Luminous Azure / Cobalt Crown & Spine Highlight */}
              <linearGradient id="ebAzureHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A5F3FC" />
                <stop offset="35%" stopColor="#38BDF8" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              {/* Warm Chestnut-Rust / Terracotta Orange Breast */}
              <linearGradient id="ebChestnutBreast" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A65" />
                <stop offset="30%" stopColor="#EA580C" />
                <stop offset="75%" stopColor="#C2410C" />
                <stop offset="100%" stopColor="#7C2D12" />
              </linearGradient>

              {/* Crisp White Lower Belly & Flanks */}
              <linearGradient id="ebWhiteBelly" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              {/* Primary Wing Feather Layering */}
              <linearGradient id="ebPrimaryWing" x1="0%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="25%" stopColor="#2563EB" />
                <stop offset="65%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#090D16" />
              </linearGradient>

              {/* Slender Dark Songbird Beak Gradient */}
              <linearGradient id="ebBeakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>

            {/* A. Tail Feathers (Layered Notched Retrices) */}
            <path
              d="M 38 72 L 6 84 L 18 71 L 4 77 L 16 68 L 34 64 Z"
              fill="url(#ebRoyalBlue)"
            />
            <path
              d="M 36 70 L 12 80 L 22 70 L 10 74 L 32 64 Z"
              fill="#172554"
              opacity="0.75"
            />
            {/* Blue Central Tail Covert Highlights */}
            <path
              d="M 38 68 L 18 74 L 28 66 Z"
              fill="url(#ebAzureHighlight)"
              opacity="0.85"
            />

            {/* B. Soft White Lower Belly & Flanks */}
            <path
              d="M 44 74 C 52 92, 80 96, 102 86 C 90 75, 68 70, 44 74 Z"
              fill="url(#ebWhiteBelly)"
            />

            {/* C. Warm Chestnut-Rust Breast, Throat & Side Flanks */}
            <path
              d="M 48 66 C 58 94, 98 94, 130 72 C 118 55, 90 52, 60 58 C 50 60, 46 62, 48 66 Z"
              fill="url(#ebChestnutBreast)"
            />

            {/* D. Deep Royal Blue Upper Mantle & Back Plumage */}
            <path
              d="M 55 60 C 65 44, 90 36, 124 44 C 138 50, 140 60, 128 68 C 108 54, 78 52, 55 60 Z"
              fill="url(#ebRoyalBlue)"
            />
            <path
              d="M 68 48 C 82 42, 102 42, 118 46 C 104 42, 84 42, 68 48 Z"
              fill="url(#ebAzureHighlight)"
              opacity="0.8"
            />

            {/* E. Songbird Rounded Head & Crown */}
            <path
              d="M 102 46 C 110 30, 132 32, 144 48 C 148 54, 142 63, 130 56 C 124 46, 114 40, 102 46 Z"
              fill="url(#ebRoyalBlue)"
            />
            {/* Luminous Sky Blue Cap Highlight */}
            <path
              d="M 112 38 C 122 35, 134 39, 140 46 C 130 40, 120 38, 112 38 Z"
              fill="url(#ebAzureHighlight)"
              opacity="0.95"
            />

            {/* F. Expressive Dark Eye with Ring & Glint */}
            <circle cx="132" cy="48" r="4.8" fill="#020617" />
            <circle cx="132" cy="48" r="5.6" stroke="#38BDF8" strokeWidth="0.6" opacity="0.6" />
            <circle cx="134" cy="46.5" r="1.6" fill="#FFFFFF" />

            {/* G. Slender Dark Songbird Beak */}
            <path
              d="M 140 48 L 160 52 C 158 53, 148 56, 141 55 Z"
              fill="url(#ebBeakGradient)"
            />
            <path
              d="M 140 51.5 L 158 52"
              stroke="#64748B"
              strokeWidth="0.8"
            />

            {/* H. Dark Feet (Grasping tether string) */}
            <path
              d="M 60 80 L 52 88 M 60 80 L 56 90 M 60 80 L 62 89"
              stroke="#1E293B"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* I. Articulated Primary & Secondary Wings (Photorealistic 10-Keyframe Organic Flapping) */}
            {/* Far Wing (Behind Body) */}
            <motion.path
              d="M 86 52 C 58 18, 22 8, 40 0 C 66 12, 88 32, 94 52 Z"
              fill="#172554"
              opacity="0.88"
              animate={{
                d: [
                  "M 86 52 C 58 18, 22 8, 40 0 C 66 12, 88 32, 94 52 Z",       // 0: High V Peak
                  "M 86 52 C 64 22, 32 14, 48 8 C 70 20, 90 36, 94 52 Z",      // 1: Upstroke Fold
                  "M 86 52 C 70 30, 42 22, 56 18 C 74 28, 90 40, 94 52 Z",      // 2: Midstroke Start
                  "M 86 52 C 68 40, 36 32, 52 32 C 72 38, 88 44, 94 52 Z",      // 3: Thrust Horizontal
                  "M 86 52 C 64 74, 24 98, 46 88 C 72 74, 88 62, 94 52 Z",      // 4: Downstroke Peak
                  "M 86 52 C 60 84, 20 108, 42 98 C 70 80, 87 66, 94 52 Z",     // 5: Deep Downstroke Cup
                  "M 86 52 C 68 68, 38 72, 52 68 C 72 62, 88 56, 94 52 Z",      // 6: Pulling Inward
                  "M 86 52 C 74 50, 54 46, 62 44 C 76 44, 88 48, 94 52 Z",      // 7: Torso Tuck
                  "M 86 52 C 66 26, 34 8, 50 2 C 72 14, 88 32, 94 52 Z",       // 8: Ascending Sweep
                  "M 86 52 C 60 18, 22 -10, 42 -14 C 68 4, 89 24, 94 52 Z"      // 9: Pre-Peak Return
                ]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Near Main Wing (In Front of Body) - Photorealistic 10 Keyframes */}
            <motion.path
              d="M 92 54 C 62 10, 18 -28, 44 -34 C 76 -12, 102 20, 100 54 Z"
              fill="url(#ebPrimaryWing)"
              animate={{
                d: [
                  "M 92 54 C 62 10, 18 -28, 44 -34 C 76 -12, 102 20, 100 54 Z", // 0: High V Peak
                  "M 92 54 C 68 20, 36 -12, 54 -18 C 78 -2, 98 28, 100 54 Z",   // 1: Upstroke Fold
                  "M 92 54 C 74 30, 48 0, 64 6 C 82 20, 96 36, 100 54 Z",       // 2: Midstroke Start
                  "M 92 54 C 70 42, 38 30, 56 34 C 76 42, 94 48, 100 54 Z",     // 3: Thrust Horizontal
                  "M 92 54 C 68 80, 26 112, 52 100 C 78 82, 96 66, 100 54 Z",   // 4: Downstroke Peak
                  "M 92 54 C 64 92, 22 124, 48 112 C 76 90, 95 70, 100 54 Z",   // 5: Deep Downstroke Cup
                  "M 92 54 C 72 72, 42 80, 58 74 C 78 66, 94 58, 100 54 Z",     // 6: Pulling Inward
                  "M 92 54 C 78 52, 58 48, 68 46 C 82 46, 95 50, 100 54 Z",     // 7: Torso Tuck
                  "M 92 54 C 70 28, 38 2, 56 -6 C 78 12, 96 32, 100 54 Z",      // 8: Ascending Sweep
                  "M 92 54 C 64 16, 22 -20, 46 -26 C 76 -8, 101 22, 100 54 Z"   // 9: Pre-Peak Return
                ]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Individual Primary Feather Tips on Near Wing */}
            <motion.g
              animate={{
                opacity: [1, 0.85, 0.6, 0.4, 0.2, 0.2, 0.4, 0.6, 0.85, 1]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <path
                d="M 76 26 C 84 30, 90 38, 92 46 C 86 40, 80 34, 76 26 Z"
                fill="#38BDF8"
                opacity="0.9"
              />
              <path
                d="M 68 18 C 76 22, 82 30, 84 38 C 78 32, 72 26, 68 18 Z"
                fill="#7DD3FC"
                opacity="0.8"
              />
            </motion.g>
          </svg>

          {/* Glider Air Stream Trail */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-80 pointer-events-none">
            <span className="w-3.5 h-0.5 bg-sky-300 rounded-full animate-ping" />
            <span className="w-2 h-0.5 bg-amber-300 rounded-full animate-pulse" />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
