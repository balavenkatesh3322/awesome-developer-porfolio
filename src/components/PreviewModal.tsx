import React, { useState, useEffect } from 'react';
import { Portfolio, DeviceType } from '../types';
import { getMicrolinkScreenshot, getScreenshotUrl, getRatings, saveRating } from '../lib/portfolios';
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Star,
  Bookmark,
  RefreshCw,
  Share2,
  AlertTriangle,
  Check,
  Code,
  Layers,
  Sparkles
} from 'lucide-react';

interface PreviewModalProps {
  portfolio: Portfolio | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  portfolio,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  isBookmarked,
  onToggleBookmark
}) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [useScreenshotMode, setUseScreenshotMode] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // User Rating State
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setIframeLoaded(false);
      setUseScreenshotMode(false);
      const savedRatings = getRatings();
      if (savedRatings[portfolio.id]) {
        setRating(savedRatings[portfolio.id].rating);
        setNotes(savedRatings[portfolio.id].notes);
      } else {
        setRating(0);
        setNotes('');
      }
      setNotesSaved(false);
    }
  }, [portfolio]);

  if (!portfolio) return null;

  const handleSaveNotes = () => {
    saveRating(portfolio.id, rating, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolio.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDeviceWidthClass = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] h-[667px] shadow-2xl rounded-2xl border-4 border-slate-900';
      case 'tablet':
        return 'w-[768px] h-[800px] shadow-2xl rounded-xl border-4 border-slate-900';
      default:
        return 'w-full h-full rounded-b-xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      
      {/* Modal Card Box */}
      <div className="bg-white border border-slate-200/80 w-full max-w-6xl h-[92vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Header Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shrink-0">
          
          {/* Portfolio Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md">
              {portfolio.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-slate-900 truncate">{portfolio.name}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-200/80 text-slate-800 border border-slate-300">
                  {portfolio.hostPlatform}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate font-medium">{portfolio.role} • {portfolio.url}</p>
            </div>
          </div>

          {/* Viewport Switcher Controls */}
          <div className="hidden md:flex items-center bg-slate-200/80 border border-slate-300 rounded-lg p-0.5">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
                device === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
                device === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
                device === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(portfolio.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-200/80 hover:bg-slate-300/80 text-slate-700'
              }`}
              title="Bookmark Portfolio"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <a
              href={portfolio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-200/80 hover:bg-red-100 hover:text-red-700 text-slate-600 transition-colors ml-1"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Main Split Content (Iframe Stage + Evaluation Panel) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100">
          
          {/* Main Viewport Stage */}
          <div className="flex-1 relative flex flex-col items-center justify-center p-4 overflow-auto bg-slate-100">
            
            {/* Mode Switch Helper Header */}
            <div className="w-full flex items-center justify-between text-xs text-slate-600 mb-2 px-2">
              <div className="flex items-center gap-2">
                <span>Rendering Mode:</span>
                <button
                  onClick={() => setUseScreenshotMode(!useScreenshotMode)}
                  className="text-indigo-600 hover:text-indigo-800 font-extrabold underline transition-colors"
                >
                  {useScreenshotMode ? 'Switch to Live Iframe' : 'Switch to Screenshot View'}
                </button>
              </div>

              {hasPrev || hasNext ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold shadow-xs"
                    title="Previous Portfolio"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold shadow-xs"
                    title="Next Portfolio"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {/* Frame Viewport */}
            <div className={`relative transition-all duration-300 bg-white flex flex-col overflow-hidden ${getDeviceWidthClass()}`}>
              
              {!useScreenshotMode ? (
                <>
                  {!iframeLoaded && (
                    <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-700 z-10">
                      <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-sm font-bold text-slate-900">Connecting to live website...</p>
                      <p className="text-xs text-slate-500 max-w-sm mt-1">
                        If the developer&apos;s site blocks embedded frames (X-Frame-Options), you can switch to high-res screenshot view below.
                      </p>
                      <button
                        onClick={() => setUseScreenshotMode(true)}
                        className="mt-4 px-4 py-2 bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm"
                      >
                        Load Screenshot View
                      </button>
                    </div>
                  )}

                  <iframe
                    src={portfolio.url}
                    title={`${portfolio.name} live portfolio`}
                    onLoad={() => setIframeLoaded(true)}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </>
              ) : (
                <div className="w-full h-full overflow-y-auto bg-slate-100 flex flex-col">
                  <img
                    src={getScreenshotUrl(portfolio.url)}
                    alt={`${portfolio.name} screenshot`}
                    className="w-full h-auto min-h-full object-cover object-top"
                  />
                </div>
              )}

            </div>

          </div>

          {/* Right Side Review & Evaluation Panel */}
          <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-4 flex flex-col justify-between space-y-4 overflow-y-auto shrink-0 shadow-xs">
            
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Portfolio Inspector</span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{portfolio.name}</h3>
                <p className="text-xs text-slate-500 font-semibold">{portfolio.role}</p>
              </div>

              {/* Tag List */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Tech & Categories</label>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                    {portfolio.category}
                  </span>
                  {portfolio.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evaluation Star Rating */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Your Inspiration Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  ))}
                  <span className="text-xs text-amber-700 font-extrabold ml-2">
                    {rating > 0 ? `${rating} / 5` : 'Rate'}
                  </span>
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Inspiration Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Clean typography, elegant grid alignment, slick page transitions..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 resize-none shadow-xs"
                />
                <button
                  onClick={handleSaveNotes}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  {notesSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Notes Saved!</span>
                    </>
                  ) : (
                    <span>Save Evaluation Notes</span>
                  )}
                </button>
              </div>

            </div>

            {/* Direct Visit Link Footer */}
            <div className="pt-3 border-t border-slate-200">
              <a
                href={portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200/80"
              >
                <span>Open Full Site in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
