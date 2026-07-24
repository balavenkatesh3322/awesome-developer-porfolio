import React from 'react';
import {
  Code2,
  Github,
  Search,
  Star
} from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 text-slate-100 shadow-2xl shadow-slate-950/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950/80 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                    Awesome Developer Portfolios
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {totalCount.toLocaleString()} Curated
                  </span>
                </div>
                <p className="text-xs text-emerald-400/90 font-medium tracking-wide">
                  Explore top developer websites &amp; submit your portfolio!
                </p>
              </div>
            </div>

            {/* Mobile GitHub Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 backdrop-blur-md"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
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
                className="w-full pl-10 pr-16 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded-lg bg-slate-800/80 border border-white/10 backdrop-blur-md transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {/* GitHub Repository Link Button */}
            <a
              href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25 border border-indigo-400/40 backdrop-blur-md hover:scale-105"
              title="Visit repository on GitHub & contribute"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
