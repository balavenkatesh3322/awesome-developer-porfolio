import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlyingEasternBluebird } from './FlyingEasternBluebird';
import {
  Sparkles,
  ArrowRight,
  GitFork,
  Globe,
  Award,
  Layers,
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
  const FORK_REPO_URL = "https://github.com/balavenkatesh3322/awesome-developer-porfolio/fork";

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HIGHLIGHT_ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center group">
      
      {/* Soft Blue Studio Backlight / Radial Glow Beam (Texty Design Backdrop) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-b from-blue-200/50 via-indigo-100/30 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-10 left-1/3 w-[450px] h-[300px] bg-gradient-to-r from-sky-200/40 to-blue-300/30 rounded-full blur-2xl opacity-60" />
      </div>

      {/* Flying Eastern Bluebird displaying 'Explore Portfolio' */}
      <FlyingEasternBluebird onExploreClick={onExploreClick} />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Centered Capsule Pill Badge (Texty Design Spec) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs shadow-slate-200/60 text-xs font-semibold text-slate-700 mx-auto"
        >
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-extrabold uppercase tracking-wide">
            Curated
          </span>
          <span className="text-slate-600 font-bold">{totalCount.toLocaleString()}+ Developer Websites</span>
        </motion.div>

        {/* Main Hero Headline (Texty Design Typography) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            The Fastest Way to <br />
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent font-black"
                >
                  Showcase Your Work
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Submit your developer portfolio to reach thousands of tech recruiters, founders, and fellow engineers. Get featured, stand out from the crowd, and level up your career.
          </p>
        </motion.div>

        {/* Primary Glowing Electric Blue Action Button (Texty Pill Spec) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <a
            href={FORK_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-extrabold shadow-[0_10px_28px_-6px_rgba(59,130,246,0.5)] hover:shadow-[0_14px_32px_-4px_rgba(59,130,246,0.6)] transition-all hover:scale-[1.03] active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <GitFork className="w-4 h-4" />
            <span>Share Your Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 text-sm font-bold shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Catalog ↓</span>
          </button>
        </motion.div>

        {/* Feature Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 text-left max-w-3xl mx-auto"
        >
          <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">100% Curated</span>
              <span className="text-[11px] text-slate-500 font-medium">Hand-picked developer sites</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Multi-Device Previews</span>
              <span className="text-[11px] text-slate-500 font-medium">Interactive frame testing</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Instant Slide UX</span>
              <span className="text-[11px] text-slate-500 font-medium">Slide-to-visit controls</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};




