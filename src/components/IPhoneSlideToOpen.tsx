import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ExternalLink, Check, ArrowRight, Globe, Compass, Sparkles } from 'lucide-react';

interface IPhoneSlideToOpenProps {
  url: string;
  label?: string;
  compact?: boolean;
  autoNudge?: boolean;
}

/**
 * iPhone "SLIDE TO VISIT" Interactive UX Slider
 * Features:
 * - Web-relevant ArrowRight / ExternalLink icon instead of phone icon
 * - Auto-slide teaser animation nudge that triggers periodically to guide the user
 * - Drag-to-unlock gesture with real-time emerald/teal gradient reveal
 * - Shimmering animated iOS text sweep
 * - Tactile success trigger with window.open()
 */
export const IPhoneSlideToOpen: React.FC<IPhoneSlideToOpenProps> = ({
  url,
  label = "SLIDE TO VISIT",
  compact = false,
  autoNudge = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState<number>(180);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  // Motion value for smooth drag tracking
  const x = useMotionValue(0);

  // Measure container width and calculate max drag distance
  useEffect(() => {
    const updateMaxDrag = () => {
      if (containerRef.current) {
        const knobWidth = compact ? 34 : 40;
        const padding = 8; // 4px padding on each side
        const available = containerRef.current.clientWidth - knobWidth - padding;
        setMaxDrag(Math.max(40, available));
      }
    };

    updateMaxDrag();
    window.addEventListener('resize', updateMaxDrag);
    return () => window.removeEventListener('resize', updateMaxDrag);
  }, [compact]);

  // Automated Teaser Slide Nudge to guide the user visually
  useEffect(() => {
    if (!autoNudge || isUserInteracting || isSuccess) return;

    // Random initial delay so all cards don't nudge in synchronized unison
    const initialDelay = Math.random() * 2000 + 1000;
    
    let intervalId: ReturnType<typeof setInterval>;

    const triggerNudge = () => {
      if (isUserInteracting || isSuccess) return;
      const nudgeDistance = Math.min(38, maxDrag * 0.25);
      
      // Animate knob rightward 38px and smoothly snap back
      animate(x, [0, nudgeDistance, 0], {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      });
    };

    const timer = setTimeout(() => {
      triggerNudge();
      // Repeat teaser nudge every 5.5 seconds
      intervalId = setInterval(triggerNudge, 5500);
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoNudge, isUserInteracting, isSuccess, maxDrag, x]);

  // Derived transforms for fill opacity and text opacity
  const textOpacity = useTransform(x, [0, maxDrag * 0.6], [1, 0.1]);

  const handleDragStart = () => {
    setIsUserInteracting(true);
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX >= maxDrag * 0.7) {
      // Trigger Open Website in separate tab
      setIsSuccess(true);
      
      // Open in new window
      window.open(url, '_blank');

      // Reset after brief success feedback
      setTimeout(() => {
        setIsSuccess(false);
        setIsUserInteracting(false);
        x.set(0);
      }, 1800);
    } else {
      // Snap back to origin
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 28 });
      setTimeout(() => setIsUserInteracting(false), 500);
    }
  };

  const handleDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserInteracting(true);
    setIsSuccess(true);
    window.open(url, '_blank');
    setTimeout(() => {
      setIsSuccess(false);
      setIsUserInteracting(false);
      x.set(0);
    }, 1800);
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className={`relative w-full overflow-hidden select-none transition-all duration-300 ${
        compact ? 'h-9 rounded-xl p-1' : 'h-11 rounded-2xl p-1'
      } bg-slate-900/95 border border-slate-800/90 shadow-inner flex items-center group/slider`}
    >
      {/* 1. iOS Active Green Gradient Reveal Fill */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-2xl pointer-events-none"
        style={{
          width: useTransform(x, (val) => `${val + (compact ? 36 : 44)}px`)
        }}
      />

      {/* 2. Shimmering Animated iOS Text Label */}
      <motion.div
        style={{ opacity: textOpacity }}
        onClick={handleDirectClick}
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer z-10 px-10"
      >
        <span className="relative text-[11px] sm:text-xs font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-white to-slate-300 animate-shimmer whitespace-nowrap flex items-center gap-1.5 drop-shadow-sm">
          <span>{isSuccess ? "Opening Website..." : label}</span>
          {!isSuccess && (
            <span className="inline-block animate-pulse text-emerald-400 font-extrabold text-xs">
              ››
            </span>
          )}
        </span>
      </motion.div>

      {/* 3. iOS iPhone Slide Knob Button with Web/Visit Icon */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.05}
        dragSnapToOrigin={!isSuccess}
        style={{ x }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.05 }}
        className={`relative z-20 shrink-0 cursor-grab active:cursor-grabbing flex items-center justify-center transition-shadow shadow-lg ${
          compact ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 rounded-xl'
        } ${
          isSuccess
            ? 'bg-emerald-500 text-white shadow-emerald-500/50'
            : 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white hover:from-emerald-300 hover:to-teal-500 border border-emerald-300/40 shadow-emerald-950/50'
        }`}
        title="Slide right to open portfolio website in new tab"
      >
        {isSuccess ? (
          <Check className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} stroke-[3] animate-bounce`} />
        ) : (
          <div className="flex items-center justify-center gap-0.5">
            <ArrowRight className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} stroke-[2.5] animate-pulse`} />
          </div>
        )}
      </motion.div>

      {/* Right Target External Link Icon Indicator */}
      <div
        onClick={handleDirectClick}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-500 group-hover/slider:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
        title="Click to open website in new tab"
      >
        <ExternalLink className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} opacity-80 group-hover/slider:opacity-100 transition-opacity`} />
      </div>
    </div>
  );
};
