import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Portfolio, ViewMode } from '../types';
import { getFaviconUrl, getScreenshotFallbackSources } from '../lib/portfolios';
import { ExternalLink, Bookmark, Eye, Star, Heart, MessageSquare, Sparkles, Flame } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onSelectPortfolio: (portfolio: Portfolio) => void;
  userRating?: { rating: number; notes: string };
  viewMode: ViewMode;
  likesCount?: number;
  isLiked?: boolean;
  onToggleLike?: (id: number) => void;
  commentsCount?: number;
  index?: number;
  isHighlighted?: boolean;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  isBookmarked,
  onToggleBookmark,
  onSelectPortfolio,
  userRating,
  viewMode,
  likesCount = 0,
  isLiked = false,
  onToggleLike,
  commentsCount = 0,
  index = 0,
  isHighlighted = false
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  const fallbackSources = getScreenshotFallbackSources(portfolio.url);
  const currentScreenshotUrl = fallbackSources[srcIndex] || fallbackSources[0];
  const faviconUrl = getFaviconUrl(portfolio.url);

  const handleImgError = () => {
    if (srcIndex < fallbackSources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  // Computed Rating Value and Badges
  const ratingVal = userRating?.rating
    ? userRating.rating.toFixed(1)
    : (4.5 + (portfolio.id % 5) * 0.1).toFixed(1);

  const isNew = portfolio.id > 115 || portfolio.id % 3 === 0;
  const isTrending = portfolio.featured || portfolio.id % 5 === 0;

  // Platform Badge Light Theme Color Palette
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Vercel':
        return 'bg-slate-900 text-white border-slate-900';
      case 'Netlify':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Framer':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'GitHub Pages':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'is-a.dev':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (viewMode === 'compact') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        animate={
          isHighlighted
            ? {
                y: [0, -18, -4, -10, 0],
                scale: [1, 1.04, 1.01, 1.02, 1],
              }
            : {}
        }
        transition={
          isHighlighted
            ? {
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275],
              }
            : {
                duration: 0.35,
                delay: Math.min((index % 6) * 0.04, 0.2),
                ease: [0.16, 1, 0.3, 1]
              }
        }
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className={`bg-white border rounded-2xl p-3 flex items-center justify-between gap-3 group transition-all duration-300 shadow-sm relative ${
          isHighlighted
            ? 'border-indigo-500 ring-4 ring-indigo-500/40 shadow-xl shadow-indigo-500/20 z-30'
            : 'border-slate-200/90 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/10'
        }`}
      >
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -top-3 left-6 z-30 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 whitespace-nowrap animate-pulse"
          >
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Spotlight</span>
          </motion.div>
        )}
        <div
          onClick={() => onSelectPortfolio(portfolio)}
          className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-sm text-indigo-700 shrink-0 shadow-inner overflow-hidden">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              portfolio.initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 truncate transition-colors">
                {portfolio.name}
              </h3>
              {isNew ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPortfolio(portfolio);
                  }}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  title="Click to open website preview"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" /> NEW
                </span>
              ) : isTrending ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPortfolio(portfolio);
                  }}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  title="Click to open website preview"
                >
                  <Flame className="w-3 h-3 text-amber-600 fill-amber-500" /> HOT
                </span>
              ) : null}
            </div>
            <p className="text-xs text-slate-500 truncate font-medium">{portfolio.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Rating Badge Trigger */}
          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="px-2 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1 transition-all shadow-2xs"
            title="Click to open website preview & detailed ratings"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{ratingVal}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleLike) onToggleLike(portfolio.id);
            }}
            className={`px-2 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border ${
              isLiked
                ? 'bg-pink-50 text-pink-700 border-pink-200'
                : 'bg-slate-100 hover:bg-pink-50 text-slate-600 hover:text-pink-600 border-slate-200/80'
            }`}
            title="Like Portfolio"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white transition-all border border-slate-200/80"
            title="Live Preview & Comments"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(portfolio.id);
            }}
            className={`p-1.5 rounded-xl transition-all ${
              isBookmarked
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200/80'
            }`}
            title="Bookmark Portfolio"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
          </button>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-800 text-slate-500 hover:text-white transition-all border border-slate-200/80"
            title="Open Link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      animate={
        isHighlighted
          ? {
              y: [0, -22, -4, -14, 0],
              scale: [1, 1.05, 1.01, 1.03, 1],
              rotate: [0, -1.5, 1.5, -1, 0],
            }
          : {}
      }
      transition={
        isHighlighted
          ? {
              duration: 0.9,
              ease: [0.175, 0.885, 0.32, 1.275],
            }
          : {
              duration: 0.45,
              delay: Math.min((index % 4) * 0.06, 0.24),
              ease: [0.16, 1, 0.3, 1]
            }
      }
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`bg-white border rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 shadow-sm relative ${
        isHighlighted
          ? 'border-indigo-500 ring-4 ring-indigo-500/40 shadow-2xl shadow-indigo-500/25 z-30'
          : 'border-slate-200/90 hover:border-indigo-500/80 hover:shadow-xl hover:shadow-indigo-500/12'
      }`}
    >
      {isHighlighted && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.6 }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full shadow-xl border-2 border-white flex items-center gap-1.5 whitespace-nowrap animate-bounce pointer-events-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>🔥 Random Spotlight Jump!</span>
        </motion.div>
      )}
      
      {/* Live Screenshot Thumbnail Container */}
      <div
        onClick={() => onSelectPortfolio(portfolio)}
        className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer group/img border-b border-slate-100"
      >
        {!imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                <span className="text-[11px] text-slate-500 font-medium">Loading live preview...</span>
              </div>
            )}
            <img
              src={currentScreenshotUrl}
              alt={`${portfolio.name} portfolio preview`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={handleImgError}
              className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          /* Fallback Stylized Monogram Canvas */
          <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xl font-black text-indigo-700 shadow-sm mb-2">
              {portfolio.initials}
            </div>
            <span className="text-xs font-extrabold text-slate-900">{portfolio.name}</span>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">{portfolio.role}</span>
          </div>
        )}

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
          <span className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg border border-indigo-400/30">
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </span>
        </div>

        {/* Top Badges Row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {isNew ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPortfolio(portfolio);
                }}
                className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-400/50 shadow-md transition-all flex items-center gap-1 cursor-pointer"
                title="Click to open website preview"
              >
                <Sparkles className="w-3 h-3" /> NEW
              </button>
            ) : isTrending ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPortfolio(portfolio);
                }}
                className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white border border-amber-400/50 shadow-md transition-all flex items-center gap-1 cursor-pointer"
                title="Click to open website preview"
              >
                <Flame className="w-3 h-3 fill-amber-200" /> HOT
              </button>
            ) : null}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(portfolio.id);
            }}
            className={`p-1.5 rounded-xl backdrop-blur-md pointer-events-auto transition-all shadow-md ${
              isBookmarked
                ? 'bg-amber-500 text-white'
                : 'bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80'
            }`}
            title="Bookmark Portfolio"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Rating Score Badge Trigger on Thumbnail */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectPortfolio(portfolio);
          }}
          className="absolute bottom-2.5 left-2.5 bg-white/95 hover:bg-amber-50 backdrop-blur-md border border-amber-300 hover:border-amber-400 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-black text-amber-900 shadow-md transition-all cursor-pointer hover:scale-105 pointer-events-auto"
          title="Click to open website preview & detailed ratings"
        >
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{ratingVal} / 5</span>
        </button>
      </div>

      {/* Card Content Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div
          onClick={() => onSelectPortfolio(portfolio)}
          className="cursor-pointer group/title"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover/title:text-indigo-600 transition-colors line-clamp-1">
                {portfolio.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">{portfolio.role}</p>
            </div>
            
            {faviconUrl && (
              <img
                src={faviconUrl}
                alt=""
                className="w-4 h-4 rounded object-contain shrink-0 mt-1 opacity-80"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Tag Badges */}
          {portfolio.tags && portfolio.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {portfolio.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Social Actions Row */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleLike) onToggleLike(portfolio.id);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border cursor-pointer ${
                isLiked
                  ? 'bg-pink-50 text-pink-700 border-pink-200 shadow-2xs'
                  : 'bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-600 border-slate-200'
              }`}
              title="Like Portfolio"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => onSelectPortfolio(portfolio)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              title="View & Post Comments"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>{commentsCount}</span>
            </button>
          </div>

          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center gap-1 transition-colors bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-xl border border-indigo-100 cursor-pointer"
            title="Open website preview modal"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

      </div>

    </motion.div>
  );
};
