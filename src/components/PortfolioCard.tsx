import React, { useState } from 'react';
import { Portfolio, ViewMode } from '../types';
import { getFaviconUrl, getScreenshotUrl } from '../lib/portfolios';
import { ExternalLink, Bookmark, Eye, Star, Layers, CheckCircle2 } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onSelectPortfolio: (portfolio: Portfolio) => void;
  userRating?: { rating: number; notes: string };
  viewMode: ViewMode;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  isBookmarked,
  onToggleBookmark,
  onSelectPortfolio,
  userRating,
  viewMode
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const screenshotUrl = getScreenshotUrl(portfolio.url);
  const faviconUrl = getFaviconUrl(portfolio.url);

  // Platform Badge Color Palette
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Vercel':
        return 'bg-black text-white border-slate-700';
      case 'Netlify':
        return 'bg-teal-950 text-teal-300 border-teal-800';
      case 'Framer':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'GitHub Pages':
        return 'bg-slate-800 text-slate-200 border-slate-700';
      case 'is-a.dev':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  if (viewMode === 'compact') {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 rounded-2xl p-3 flex items-center justify-between gap-3 group transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5">
        <div
          onClick={() => onSelectPortfolio(portfolio)}
          className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900/80 to-slate-900/80 border border-white/10 flex items-center justify-center font-bold text-sm text-indigo-200 shrink-0 shadow-inner overflow-hidden backdrop-blur-md">
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
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 truncate transition-colors">
                {portfolio.name}
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getPlatformBadge(portfolio.hostPlatform)}`}>
                {portfolio.hostPlatform}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">{portfolio.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all backdrop-blur-md border border-white/10"
            title="Live Preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(portfolio.id);
            }}
            className={`p-1.5 rounded-xl transition-all backdrop-blur-md ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-white/10'
            }`}
            title="Bookmark Portfolio"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all backdrop-blur-md border border-white/10"
            title="Open Link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1">
      
      {/* Live Screenshot Thumbnail Container */}
      <div
        onClick={() => onSelectPortfolio(portfolio)}
        className="relative aspect-[16/10] bg-slate-950/80 overflow-hidden cursor-pointer group/img"
      >
        {!imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-slate-900/80 animate-pulse flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <span className="text-[11px] text-slate-400">Loading live preview...</span>
              </div>
            )}
            <img
              src={screenshotUrl}
              alt={`${portfolio.name} portfolio preview`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          /* Fallback Stylized Monogram Canvas */
          <div className="w-full h-full bg-gradient-to-br from-indigo-950/80 via-slate-900/80 to-purple-950/80 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-300 shadow-inner mb-2 backdrop-blur-md">
              {portfolio.initials}
            </div>
            <span className="text-xs font-bold text-slate-100">{portfolio.name}</span>
            <span className="text-[11px] text-slate-400 mt-0.5">{portfolio.role}</span>
          </div>
        )}

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/40 border border-white/20">
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-md backdrop-blur-md ${getPlatformBadge(portfolio.hostPlatform)}`}>
            {portfolio.hostPlatform}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(portfolio.id);
            }}
            className={`p-1.5 rounded-xl backdrop-blur-md pointer-events-auto transition-all shadow-md ${
              isBookmarked
                ? 'bg-amber-500/90 text-white'
                : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-white/10'
            }`}
            title="Bookmark Portfolio"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* User Rating Score Badge */}
        {userRating && userRating.rating > 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-300 shadow-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{userRating.rating}/5</span>
          </div>
        )}
      </div>

      {/* Card Content Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                {portfolio.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{portfolio.role}</p>
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
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/50 text-slate-300 border border-white/10 font-medium backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Site</span>
          </button>

          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 font-semibold flex items-center gap-1 transition-colors"
            title="Open website in new tab"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

    </div>
  );
};
