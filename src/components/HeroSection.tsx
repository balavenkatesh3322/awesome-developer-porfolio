import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  Layers,
  Award,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  totalCount: number;
  filteredCount: number;
  onExploreClick: () => void;
}

const HIGHLIGHT_ROLES = [
  'World-Class Developers',
  'AI & Data Scientists',
  'Full-Stack Engineers',
  'Open Source Creators',
  'UI / UX Craftsmen'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalCount,
  onExploreClick
}) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HIGHLIGHT_ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 shadow-2xs">
      
      {/* Animated Light Mesh Glowing Orbs Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Animated Gradient Blob 1 */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 left-1/4 w-[500px] h-[350px] bg-gradient-to-r from-indigo-200/40 via-purple-200/30 to-sky-200/40 rounded-full blur-3xl opacity-70"
        />

        {/* Animated Gradient Blob 2 */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 right-1/4 w-[450px] h-[300px] bg-gradient-to-r from-violet-200/40 via-pink-200/30 to-amber-200/30 rounded-full blur-3xl opacity-60"
        />

        {/* Fine Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Badges, Headline & Action Buttons Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-4 max-w-2xl"
          >
            {/* Title with Animated Rotating Role Pill */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Showcase Your Work &amp; Get Discovered <br className="hidden sm:inline" />
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35 }}
                    className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 bg-clip-text text-transparent block sm:inline"
                  >
                    {HIGHLIGHT_ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Submit your developer portfolio to reach thousands of tech recruiters, founders, and fellow engineers. Get featured, stand out from the crowd, and level up your career.
            </p>
          </motion.div>

          {/* Marketing Metrics & Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-4 shrink-0"
          >
            
            {/* Live Metrics Card */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-2xs text-center w-full sm:w-auto min-w-[280px]">
              <div className="px-3 py-1">
                <span className="text-base font-black text-slate-900 block">{totalCount.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Sites</span>
              </div>
              <div className="px-3 py-1 border-x border-slate-200">
                <span className="text-base font-black text-indigo-600 block">100%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Curated</span>
              </div>
              <div className="px-3 py-1">
                <span className="text-base font-black text-emerald-600 block">Instant</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Previews</span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-black flex items-center justify-center gap-2.5 shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
            >
              <span>Explore Catalog</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </motion.button>

          </motion.div>

        </div>

        {/* Marketing Trust Value Proposition Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100"
        >
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200/80 flex items-center justify-center text-indigo-700 shrink-0">
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">100% Curated Websites</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">Hand-evaluated by senior engineers &amp; designers for quality, UI polish, and speed.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-200/80 flex items-center justify-center text-purple-700 shrink-0">
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">Multi-Device Live Previews</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">Test real-time desktop, tablet, and mobile layouts in an iPhone glass window.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">Social Proof &amp; Benchmarking</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">Like, bookmark, review, and comment on standout developer portfolios.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


