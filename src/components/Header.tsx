import React from 'react';
import {
  Code2,
  Github,
  Search,
  PlusCircle,
  Share2
} from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSubmitModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  searchQuery,
  onSearchChange,
  onOpenSubmitModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 text-slate-900 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Awesome Developer Portfolios
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {totalCount.toLocaleString()} Curated
                  </span>
                </div>
                <p className="text-xs text-emerald-600 font-medium tracking-wide">
                  Explore top developer websites &amp; submit your portfolio!
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              {onOpenSubmitModal && (
                <button
                  onClick={onOpenSubmitModal}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Share Portfolio</span>
                </button>
              )}
              <a
                href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search developers by name, role (e.g. React, AI, Full Stack)..."
                className="w-full pl-10 pr-16 py-2 bg-slate-100/80 focus:bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded-lg bg-slate-200/80 border border-slate-300 transition-colors font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {onOpenSubmitModal && (
              <button
                onClick={onOpenSubmitModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-md hover:shadow-indigo-500/25 border border-indigo-500 hover:scale-[1.02] cursor-pointer"
                title="Share or submit your developer portfolio"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Share Your Portfolio</span>
              </button>
            )}

            <a
              href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs font-bold flex items-center gap-1.5 transition-all"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
