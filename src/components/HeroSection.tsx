import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlyingEasternBluebird } from './FlyingEasternBluebird';
import {
  Layers,
  Award,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Globe
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HIGHLIGHT_ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 shadow-2xs group"
    >
      
      {/* Interactive Ambient Gradient Glow Mesh with Parallax */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Parallax Gradient Blob 1 */}
        <motion.div
          animate={{
            x: [mousePos.x * 30, mousePos.x * -20, mousePos.x * 30],
            y: [mousePos.y * 30, mousePos.y * -20, mousePos.y * 30],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut"
          }}
          className="absolute -top-32 left-1/4 w-[550px] h-[380px] bg-gradient-to-r from-indigo-300/30 via-purple-300/25 to-sky-200/30 rounded-full blur-3xl opacity-75"
        />

        {/* Parallax Gradient Blob 2 */}
        <motion.div
          animate={{
            x: [mousePos.x * -40, mousePos.x * 25, mousePos.x * -40],
            y: [mousePos.y * -40, mousePos.y * 25, mousePos.y * -40],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut"
          }}
          className="absolute -top-20 right-1/4 w-[480px] h-[320px] bg-gradient-to-r from-violet-300/30 via-pink-300/25 to-amber-200/25 rounded-full blur-3xl opacity-65"
        />

        {/* Fine Architectural Grid Pattern with Radial Gradient Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Real-Time Flying Eastern Bluebird displaying 'Explore Portfolio' */}
      <FlyingEasternBluebird onExploreClick={onExploreClick} />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Headline & Action Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-2xl"
          >
            {/* Title with Animated Rotating Role Pill & Dynamic Gradient Sweep */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Showcase Your Work &amp; Get Discovered <br className="hidden sm:inline" />
              <span className="inline-block relative mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 16, filter: 'blur(6px)', scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(6px)', scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 bg-clip-text text-transparent block sm:inline font-black"
                  >
                    {HIGHLIGHT_ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Description with Clean Typographic Hierarchy */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Submit your developer portfolio to reach thousands of tech recruiters, founders, and fellow engineers. Get featured, stand out from the crowd, and level up your career.
            </p>
          </motion.div>

          {/* Marketing Metrics & Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-4 shrink-0"
          >
            
            {/* Live Metrics Card with Animated Glass Frame */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="grid grid-cols-3 gap-3 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-center w-full sm:w-auto min-w-[295px] relative overflow-hidden group/metrics"
            >
              {/* Shimmer Light Beam Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/30 to-transparent -translate-x-full group-hover/metrics:animate-[shimmer_1.5s_ease-in-out]" />

              <div className="px-3 py-1">
                <span className="text-lg font-black text-slate-900 block tracking-tight">{totalCount.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Sites</span>
              </div>
              <div className="px-3 py-1 border-x border-slate-200/80">
                <span className="text-lg font-black text-indigo-600 block tracking-tight">100%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Curated</span>
              </div>
              <div className="px-3 py-1">
                <span className="text-lg font-black text-emerald-600 block tracking-tight">Instant</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Previews</span>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Interactive Trust Value Proposition Grid with Hover Lift & Accent Glows */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200/60"
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="group/card flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-indigo-300/80 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200/90 flex items-center justify-center text-indigo-700 shrink-0 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-colors duration-200 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 group-hover/card:text-indigo-600 transition-colors">
                100% Curated Websites
              </h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                Hand-evaluated by senior engineers &amp; designers for quality, UI polish, and speed.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="group/card flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-purple-300/80 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-200 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200/90 flex items-center justify-center text-purple-700 shrink-0 group-hover/card:bg-purple-600 group-hover/card:text-white transition-colors duration-200 shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 group-hover/card:text-purple-600 transition-colors">
                Multi-Device Live Previews
              </h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                Test real-time desktop, tablet, and mobile layouts in an interactive frame.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="group/card flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-emerald-300/80 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-200 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200/90 flex items-center justify-center text-emerald-700 shrink-0 group-hover/card:bg-emerald-600 group-hover/card:text-white transition-colors duration-200 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 group-hover/card:text-emerald-600 transition-colors">
                Social Proof &amp; Benchmarking
              </h3>
              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                Like, bookmark, review, and comment on standout developer portfolios.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};



