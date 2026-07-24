import React from 'react';
import { motion } from 'motion/react';
import { Portfolio } from '../types';
import { getScreenshotUrl } from '../lib/portfolios';
import { Flame, Sparkles, ExternalLink, Eye, ArrowRight, Star } from 'lucide-react';

interface SpotlightSectionProps {
  portfolios: Portfolio[];
  onSelectPortfolio: (portfolio: Portfolio) => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  portfolios,
  onSelectPortfolio
}) => {
  // Take top 4 featured portfolios
  const featuredList = portfolios.filter((p) => p.featured).slice(0, 4);

  if (featuredList.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-6 bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-2xs relative overflow-hidden"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-2xl bg-amber-100 border border-amber-200/90 flex items-center justify-center text-amber-700 shadow-2xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Weekly Featured Portfolios
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Hand-picked developer websites with standout design &amp; engineering</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 hidden sm:inline-block">
          Curated Showcase
        </span>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredList.map((portfolio, idx) => {
          const screenshotUrl = getScreenshotUrl(portfolio.url);

          return (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onSelectPortfolio(portfolio)}
              className="group bg-white border border-slate-200/90 rounded-2xl p-3.5 hover:border-indigo-500/80 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-2.5">
                {/* Thumbnail with Subtle Hover Zoom */}
                <div className="relative aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80">
                  <img
                    src={screenshotUrl}
                    alt={portfolio.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Featured
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {portfolio.name}
                  </h3>
                  <p className="text-[11px] font-bold text-indigo-600 truncate mt-0.5">{portfolio.role}</p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-slate-600 group-hover:text-indigo-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-indigo-600" /> Live Preview
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.div>
          );
        })}
      </div>

    </motion.section>
  );
};

