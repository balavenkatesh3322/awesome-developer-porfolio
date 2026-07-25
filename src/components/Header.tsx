import React from 'react';
import {
  Code2,
  Github,
  Search,
  Plus,
  Star,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSubmitModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSubmitModal
}) => {
  const GITHUB_REPO_URL = "https://github.com/balavenkatesh3322/awesome-developer-porfolio";
  const FORK_REPO_URL = "https://github.com/balavenkatesh3322/awesome-developer-porfolio/fork";

  return (
    <header className="sticky top-0 z-50 pt-3 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Rounded-Full Glass Capsule Header */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-full px-4 sm:px-6 py-2.5 shadow-lg shadow-slate-200/40 flex items-center justify-between gap-3 transition-all">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 p-0.5 shadow-md shadow-blue-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Code2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900">
                Developer Portfolios
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] font-extrabold text-blue-600">
                Curated
              </span>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-sm mx-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search portfolios, skills..."
                className="w-full pl-8 pr-12 py-1.5 bg-slate-50 focus:bg-white border border-slate-200/80 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-block text-[9px] font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded-md border border-slate-300/50">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Star Repo Link */}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
              title="Star this repository on GitHub"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>Star Repo</span>
            </a>

            {/* Direct GitHub Submit Portfolio Button */}
            <a
              href={FORK_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-[0_6px_20px_-3px_rgba(59,130,246,0.4)] hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="Navigate to GitHub to fork repository & submit portfolio PR"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Submit Portfolio</span>
              <span className="sm:hidden">Submit</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* GitHub Repo Icon */}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
              title="View & Star on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};


