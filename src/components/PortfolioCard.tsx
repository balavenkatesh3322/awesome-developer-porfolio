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
      <div className="bg-white border border-slate-200/90 hover:border-indigo-500/60 rounded-2xl p-3 flex items-center justify-between gap-3 group transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5">
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
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 truncate transition-colors">
                {portfolio.name}
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getPlatformBadge(portfolio.hostPlatform)}`}>
                {portfolio.hostPlatform}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate font-medium">{portfolio.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white transition-all border border-slate-200/80"
            title="Live Preview"
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
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 hover:border-indigo-500/60 rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      
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

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${getPlatformBadge(portfolio.hostPlatform)}`}>
            {portfolio.hostPlatform}
          </span>

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

        {/* User Rating Score Badge */}
        {userRating && userRating.rating > 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-800 shadow-sm">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{userRating.rating}/5</span>
          </div>
        )}
      </div>

      {/* Card Content Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
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

        {/* Card Actions */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => onSelectPortfolio(portfolio)}
            className="text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Site</span>
          </button>

          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1 transition-colors"
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
