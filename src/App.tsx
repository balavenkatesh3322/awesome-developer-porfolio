import React, { useState, useMemo, useEffect } from 'react';
import { Portfolio, FilterState, ViewMode } from './types';
import {
  ALL_PORTFOLIOS,
  getBookmarks,
  toggleBookmark as toggleBookmarkStorage,
  getRatings
} from './lib/portfolios';
import { Header } from './components/Header';
import { AlphabetBar } from './components/AlphabetBar';
import { FilterBar } from './components/FilterBar';
import { PortfolioCard } from './components/PortfolioCard';
import { PreviewModal } from './components/PreviewModal';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { SubmitPortfolioModal } from './components/SubmitPortfolioModal';
import { Sparkles, RefreshCw, Bookmark, Search, Code2, Heart, ArrowUp, MessageSquare, Github } from 'lucide-react';

const INITIAL_PAGE_SIZE = 36;
const PAGE_SIZE_INCREMENT = 36;

export default function App() {
  // Filter & Search State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    platform: 'All',
    tag: 'All',
    letter: '',
    sortBy: 'featured',
    onlyBookmarks: false
  });

  // View Mode & Pagination State
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);

  // Bookmarks & Ratings State
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Record<number, { rating: number; notes: string }>>({});

  // Modals & Active Portfolio State
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize Bookmarks and Ratings on Mount
  useEffect(() => {
    setBookmarks(getBookmarks());
    setRatings(getRatings());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleBookmark = (id: number) => {
    const updated = toggleBookmarkStorage(id);
    setBookmarks(updated);
  };

  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setVisibleCount(INITIAL_PAGE_SIZE); // Reset pagination when filter changes
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      platform: 'All',
      tag: 'All',
      letter: '',
      sortBy: 'featured',
      onlyBookmarks: false
    });
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  // Filtered & Sorted Portfolios Pipeline (useMemo for lightning performance)
  const filteredPortfolios = useMemo(() => {
    let list = ALL_PORTFOLIOS;

    // 1. Search Query Filter
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query) ||
          p.url.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // 2. Category Filter
    if (filters.category !== 'All') {
      list = list.filter((p) => p.category === filters.category);
    }

    // 3. Platform Filter
    if (filters.platform !== 'All') {
      list = list.filter((p) => p.hostPlatform === filters.platform);
    }

    // 4. Tech Tag Filter
    if (filters.tag !== 'All') {
      list = list.filter((p) => p.tags.includes(filters.tag));
    }

    // 5. Letter Filter
    if (filters.letter !== '') {
      if (filters.letter === '#') {
        list = list.filter((p) => !/[A-Z]/.test(p.firstLetter));
      } else {
        list = list.filter((p) => p.firstLetter === filters.letter);
      }
    }

    // 6. Bookmarks Only Filter
    if (filters.onlyBookmarks) {
      list = list.filter((p) => bookmarks.includes(p.id));
    }

    // 7. Sorting
    list = [...list]; // Clone array for sorting
    if (filters.sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filters.sortBy === 'random') {
      // Deterministic pseudo-random seed sort
      list.sort((a, b) => (a.id * 17) % 100 - (b.id * 17) % 100);
    } else if (filters.sortBy === 'featured') {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [filters, bookmarks]);

  // Paginated visible list
  const visiblePortfolios = useMemo(() => {
    return filteredPortfolios.slice(0, visibleCount);
  }, [filteredPortfolios, visibleCount]);

  // Active Portfolio Index for Prev/Next navigation inside PreviewModal
  const selectedIndex = useMemo(() => {
    if (!selectedPortfolio) return -1;
    return filteredPortfolios.findIndex((p) => p.id === selectedPortfolio.id);
  }, [selectedPortfolio, filteredPortfolios]);

  const handleNextPortfolio = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredPortfolios.length - 1) {
      setSelectedPortfolio(filteredPortfolios[selectedIndex + 1]);
    }
  };

  const handlePrevPortfolio = () => {
    if (selectedIndex > 0) {
      setSelectedPortfolio(filteredPortfolios[selectedIndex - 1]);
    }
  };

  const handleRandomClick = () => {
    if (ALL_PORTFOLIOS.length === 0) return;
    const randomIndex = Math.floor(Math.random() * ALL_PORTFOLIOS.length);
    setSelectedPortfolio(ALL_PORTFOLIOS[randomIndex]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Glass Glow Lights */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        totalCount={ALL_PORTFOLIOS.length}
        filteredCount={filteredPortfolios.length}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleUpdateFilters({ searchQuery: q })}
      />

      {/* Alphabet Quick Jump Bar */}
      <AlphabetBar
        selectedLetter={filters.letter}
        onSelectLetter={(letter) => handleUpdateFilters({ letter })}
      />

      {/* Filter & View Mode Controls */}
      <FilterBar
        filters={filters}
        onUpdateFilters={handleUpdateFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filteredCount={filteredPortfolios.length}
        totalCount={ALL_PORTFOLIOS.length}
        onResetFilters={handleResetFilters}
      />

      {/* Main Showcase Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        
        {/* Active Filters Summary Banner */}
        {filters.onlyBookmarks && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 backdrop-blur-xl flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-amber-200">Viewing Saved Portfolios ({bookmarks.length})</h2>
                <p className="text-xs text-amber-300/80">Showing developer portfolios you bookmarked for design inspiration.</p>
              </div>
            </div>
            <button
              onClick={() => handleUpdateFilters({ onlyBookmarks: false })}
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition-all backdrop-blur-md"
            >
              Show All Portfolios
            </button>
          </div>
        )}

        {/* Portfolio Showcase Grid / List */}
        {visiblePortfolios.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5.5'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5'
            }
          >
            {visiblePortfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                isBookmarked={bookmarks.includes(portfolio.id)}
                onToggleBookmark={handleToggleBookmark}
                onSelectPortfolio={setSelectedPortfolio}
                userRating={ratings[portfolio.id]}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-xl">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100">No portfolios match your filters</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Try searching for broader keywords, clearing specific skills/tags, or resetting all filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPortfolios.length && (
          <div className="mt-12 mb-8 text-center space-y-2.5">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE_INCREMENT)}
              className="px-8 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-100 border border-white/15 text-xs font-extrabold transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 backdrop-blur-xl group"
            >
              <span className="flex items-center gap-2">
                <span>Load More Portfolios</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                  {filteredPortfolios.length - visibleCount} left
                </span>
              </span>
            </button>
            <p className="text-[11px] font-medium text-slate-400">
              Showing {visibleCount} of {filteredPortfolios.length} items
            </p>
          </div>
        )}

      </main>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-200 hover:text-white shadow-2xl shadow-indigo-600/30 transition-all duration-300 hover:scale-110 border border-white/10 backdrop-blur-xl"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Improved Multi-Column Glassmorphic Footer */}
      <footer className="bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 mt-16 transition-all relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            
            {/* Column 1: Project Identity */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-100">
                    Awesome Developer Portfolios
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-400">{ALL_PORTFOLIOS.length.toLocaleString()} Curated Developer Websites</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs max-w-md">
                A world-class showcase of developer portfolios, engineering personal sites, and UI inspirations. Filter by skills, platforms, and interactive live previews.
              </p>
            </div>

            {/* Column 2: Quick Navigation & Contribute */}
            <div className="md:col-span-5 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Contribute &amp; Links</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="text-left text-slate-300 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Submit Your Developer Portfolio</span>
                </button>
                <a
                  href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository &amp; Star on GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Credit Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p className="flex items-center gap-1.5">
              <span>Maintained with</span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 inline" />
              <span>by</span>
              <a
                href="https://balavenkatesh3322.github.io/bala_venkatesh_profile/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-slate-200 hover:text-indigo-300 underline underline-offset-2 transition-colors"
              >
                Bala Venkatesh
              </a>
            </p>

            <p>© {new Date().getFullYear()} Awesome Developer Portfolios. Open Source under MIT License.</p>
          </div>

        </div>
      </footer>

      {/* Active Portfolio Preview Modal */}
      {selectedPortfolio && (
        <PreviewModal
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          onNext={handleNextPortfolio}
          onPrev={handlePrevPortfolio}
          hasNext={selectedIndex < filteredPortfolios.length - 1}
          hasPrev={selectedIndex > 0}
          isBookmarked={bookmarks.includes(selectedPortfolio.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* GitHub Pages Deploy Guide Modal */}
      <GitHubPagesModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Submit Portfolio Modal */}
      <SubmitPortfolioModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

    </div>
  );
}
