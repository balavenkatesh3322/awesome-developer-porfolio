import React, { useState, useEffect } from 'react';
import { Portfolio, DeviceType, CommentItem } from '../types';
import { getRatings, saveRating, getFaviconUrl } from '../lib/portfolios';
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
  Share2,
  Check,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  Send,
  Bell,
  CheckCircle2,
  Sparkles,
  Flame,
  Briefcase,
  Code2
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
  likesCount?: number;
  isLiked?: boolean;
  onToggleLike?: (id: number) => void;
  comments?: CommentItem[];
  onAddComment?: (authorName: string, authorEmail: string, text: string) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  portfolio,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  isBookmarked,
  onToggleBookmark,
  likesCount = 0,
  isLiked = false,
  onToggleLike,
  comments = [],
  onAddComment
}) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mobile View Tab State (< lg screens)
  const [mobileTab, setMobileTab] = useState<'preview' | 'details'>('preview');

  // User Rating State
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [notesSaved, setNotesSaved] = useState(false);

  // Comment Input State
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<'comments' | 'evaluation'>('comments');

  useEffect(() => {
    if (portfolio) {
      setIframeLoaded(false);
      setMobileTab('preview');
      const savedRatings = getRatings();
      if (savedRatings[portfolio.id]) {
        setRating(savedRatings[portfolio.id].rating);
        setNotes(savedRatings[portfolio.id].notes);
      } else {
        setRating(0);
        setNotes('');
      }
      setNotesSaved(false);
      setCommentSubmitted(false);
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

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (onAddComment) {
      onAddComment(authorName, authorEmail, commentText);
      setCommentText('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 4000);
    }
  };

  const ownerEmail = portfolio.email?.trim() || '';
  const ownerPhone = portfolio.phone?.trim() || '';

  const isNew = portfolio.id > 115 || portfolio.id % 3 === 0;
  const isTrending = portfolio.featured || portfolio.id % 5 === 0;

  const getDeviceWidthClass = () => {
    switch (device) {
      case 'mobile':
        return 'w-full max-w-[375px] h-full sm:h-[667px] shadow-2xl rounded-[36px] border-[6px] sm:border-[8px] border-slate-900 mx-auto relative overflow-hidden bg-slate-950';
      case 'tablet':
        return 'w-full max-w-[768px] h-full sm:h-[800px] shadow-2xl rounded-2xl border-[6px] sm:border-[8px] border-slate-900 mx-auto relative overflow-hidden bg-slate-900';
      default:
        return 'w-full h-full rounded-b-2xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xl flex items-center justify-center p-1.5 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      
      {/* iOS iPhone Glass Style Modal Card */}
      <div className="bg-white/90 backdrop-blur-2xl border border-white/80 w-full max-w-6xl h-[97vh] sm:h-[93vh] rounded-[28px] sm:rounded-[36px] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden text-slate-900 relative">
        
        {/* Top Header: iOS Glass Bar with Prominent "Open Website" URL Capsule */}
        <div className="bg-slate-50/90 backdrop-blur-xl border-b border-slate-200/80 p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 z-20">
          
          {/* Left Brand & Portfolio Info */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => onToggleBookmark(portfolio.id)}
                className={`p-2 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-2xs'
                    : 'bg-white/80 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title="Bookmark Portfolio"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
              </button>

              <button
                onClick={() => onToggleLike && onToggleLike(portfolio.id)}
                className={`px-2.5 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
                  isLiked
                    ? 'bg-pink-100 text-pink-800 border-pink-300 shadow-2xs'
                    : 'bg-white/80 hover:bg-pink-50 text-slate-700 hover:text-pink-600 border-slate-200'
                }`}
                title="Like Portfolio"
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-500 text-pink-600' : ''}`} />
                <span className="hidden sm:inline">{likesCount}</span>
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-xs sm:text-sm font-black text-slate-900 truncate max-w-[120px] sm:max-w-[180px]">
                    {portfolio.name}
                  </h2>
                  {isNew && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-0.5 shrink-0">
                      <Sparkles className="w-2.5 h-2.5" /> NEW
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-indigo-600 font-extrabold truncate">{portfolio.role}</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 rounded-2xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Top iPhone Safari Glass Address Bar & Open Website Button */}
          <div className="w-full sm:max-w-md mx-auto flex items-center bg-slate-200/70 backdrop-blur-md hover:bg-slate-200/90 border border-slate-300/80 rounded-2xl sm:rounded-full p-1.5 transition-all shadow-inner group">
            <div className="flex items-center gap-1.5 pl-2.5 flex-1 min-w-0">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
                🔒 HTTPS
              </span>
              <span className="text-xs font-bold text-slate-700 truncate tracking-tight">
                {portfolio.url.replace(/^https?:\/\//, '')}
              </span>
            </div>

            {/* High-Contrast "Open Website" Callout CTA */}
            <a
              href={portfolio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl sm:rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-indigo-500/25 transition-all active:scale-95 shrink-0 cursor-pointer"
              title="Open website in new browser window"
            >
              <span>Open Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Controls: Device Switcher & Share & Close */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {/* Desktop Device View Switcher */}
            <div className="flex items-center gap-1 bg-white/80 border border-slate-200/80 rounded-2xl p-1 shadow-2xs">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  device === 'desktop' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  device === 'tablet' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  device === 'mobile' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-2xl bg-white/80 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
              title="Share portfolio link"
            >
              <Share2 className="w-4 h-4 text-indigo-600" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Main Tab Switcher (< lg breakpoint) */}
        <div className="flex lg:hidden bg-slate-100 border-b border-slate-200 p-1 shrink-0">
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>🌐 Website Live Preview</span>
          </button>
          <button
            onClick={() => setMobileTab('details')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'details'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>👤 Profile &amp; Comments ({comments.length})</span>
          </button>
        </div>

        {/* Modal Main Viewport Container */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Main Preview Frame Container */}
          <div
            className={`flex-1 bg-slate-100 p-2 sm:p-4 flex flex-col items-center justify-center overflow-hidden relative ${
              mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            
            {/* Toolbar Mode Switch & Prev/Next Nav */}
            <div className="w-full flex items-center justify-between text-xs text-slate-600 mb-2 px-1 sm:px-2 flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/90 text-xs font-black shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Live Interactive Preview</span>
              </div>

              {/* Mobile Viewports Selector (Inline on mobile) */}
              <div className="flex sm:hidden items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`p-1 rounded text-[10px] font-bold ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`p-1 rounded text-[10px] font-bold ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>

              {hasPrev || hasNext ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold shadow-xs cursor-pointer"
                    title="Previous Portfolio"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold shadow-xs cursor-pointer"
                    title="Next Portfolio"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {/* Frame Viewport Box */}
            <div className={`relative transition-all duration-300 bg-white flex flex-col overflow-hidden ${getDeviceWidthClass()}`}>
              
              {/* iPhone Dynamic Island notch overlay */}
              {device === 'mobile' && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3 pointer-events-none shadow-md border border-slate-800/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500/80 animate-pulse" />
                </div>
              )}
              
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-700 z-10">
                  <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Connecting to live website...</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm mt-1">
                    Loading live interactive developer portfolio frame.
                  </p>
                  <a
                    href={portfolio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Live Site Directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <iframe
                src={portfolio.url}
                title={`${portfolio.name} live portfolio`}
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />

            </div>

            {/* Mobile Direct Site External Link Bar */}
            <div className="w-full mt-2 lg:hidden">
              <a
                href={portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Open Site in Browser</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Side Comments & Evaluation Panel */}
          <div
            className={`w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between space-y-4 overflow-y-auto shrink-0 shadow-xs ${
              mobileTab === 'details' ? 'flex h-full' : 'hidden lg:flex'
            }`}
          >
            
            <div className="space-y-4">
              
              {/* Developer & Skills Profile Spotlight */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-indigo-700">
                    <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800">Developer Skills &amp; Profile</span>
                  </div>
                  {isNew ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> NEW
                    </span>
                  ) : isTrending ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600 fill-amber-500" /> HOT
                    </span>
                  ) : null}
                </div>

                {/* Role & Specialization */}
                <div>
                  <h4 className="text-sm font-black text-slate-900">{portfolio.name}</h4>
                  <p className="text-xs font-extrabold text-indigo-600 mt-0.5">{portfolio.role}</p>
                </div>

                {/* Tech Stack & Skills Visibility */}
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                    Skills &amp; Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {portfolio.tags && portfolio.tags.length > 0 ? (
                      portfolio.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white text-indigo-700 border border-indigo-200">
                        {portfolio.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Recruiter & Direct Outreach Info */}
                <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    Direct Contact for Founders &amp; Hiring
                  </span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    {ownerEmail ? (
                      <a href={`mailto:${ownerEmail}`} className="truncate font-bold text-indigo-600 hover:underline">
                        {ownerEmail}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic font-normal">Add email via PR</span>
                    )}
                  </div>
                  {ownerPhone && (
                    <div className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <a href={`tel:${ownerPhone}`} className="truncate font-bold text-emerald-700 hover:underline">
                        {ownerPhone}
                      </a>
                    </div>
                  )}
                </div>

                {(!ownerEmail || !ownerPhone) && (
                  <div className="pt-2 border-t border-slate-200">
                    <a
                      href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center justify-between gap-1 transition-colors bg-indigo-50/80 p-2 rounded-xl border border-indigo-100"
                    >
                      <span>Owner? Update skills &amp; contacts via PR</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Panel Tabs */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setRightPanelTab('comments')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    rightPanelTab === 'comments'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Comments ({comments.length})</span>
                </button>
                <button
                  onClick={() => setRightPanelTab('evaluation')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    rightPanelTab === 'evaluation'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Evaluation</span>
                </button>
              </div>

              {rightPanelTab === 'comments' ? (
                <div className="space-y-3">
                  
                  {/* Post Comment Form */}
                  <form onSubmit={handlePostComment} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
                    <label className="text-xs font-bold text-slate-900 block">Leave a Comment for Developer</label>

                    <input
                      type="text"
                      placeholder="Your Name (e.g. Alex)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
                    />

                    <input
                      type="email"
                      placeholder="Your Email (Optional for reply)"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
                    />

                    <textarea
                      placeholder="Write feedback or praise..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 resize-none shadow-2xs"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Comment &amp; Notify Owner</span>
                    </button>
                  </form>

                  {commentSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {ownerEmail
                          ? `Comment posted! Notification alert sent to ${ownerEmail}.`
                          : 'Comment posted & saved to Activity Hub!'}
                      </span>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-4">No comments yet. Be the first to leave feedback!</p>
                    ) : (
                      comments.map((c) => (
                        <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-extrabold text-slate-900">{c.authorName}</span>
                            <span className="text-slate-400 font-medium">{new Date(c.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">{c.text}</p>
                          <div className="pt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                            <Bell className="w-3 h-3 text-emerald-600" /> Owner Notified
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              ) : (
                /* Evaluation Tab */
                <div className="space-y-4">
                  {/* Evaluation Star Rating */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Your Inspiration Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
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
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
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
              )}

            </div>

            {/* Direct Visit Link Footer */}
            <div className="pt-3 border-t border-slate-200 hidden lg:block">
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
