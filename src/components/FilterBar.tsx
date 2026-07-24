import React from 'react';
import {
  CATEGORIES,
  HOST_PLATFORMS,
  POPULAR_TAGS
} from '../lib/portfolios';
import { FilterState, ViewMode } from '../types';
import { LayoutGrid, List, Layers, Tag, ArrowUpDown, RotateCcw, ChevronDown, Sparkles } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filteredCount: number;
  totalCount: number;
  onResetFilters: () => void;
  onTriggerJump?: () => void;
  autoJumpEnabled?: boolean;
  onToggleAutoJump?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
  onResetFilters,
  onTriggerJump,
  autoJumpEnabled = true,
  onToggleAutoJump
}) => {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.platform !== 'All' ||
    filters.tag !== 'All' ||
    filters.letter !== '' ||
    filters.searchQuery !== '' ||
    filters.onlyBookmarks;

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2.5 sm:py-3.5 px-3 sm:px-6 shadow-xs transition-all relative z-20">
      <div className="max-w-7xl mx-auto space-y-2.5 sm:space-y-3.5">
        
        {/* Row 1: Category Scrollable Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 touch-pan-x">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 shrink-0 mr-0.5 sm:mr-1">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const active = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onUpdateFilters({ category: cat })}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/20 border border-indigo-600'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 2: Dropdown Controls Grid / Flex */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 text-xs">
          
          {/* Dropdown Filters Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full md:w-auto flex-1 max-w-3xl">
            
            {/* Host Platform Filter Dropdown */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-2xs">
              <Layers className="w-4 h-4 text-indigo-600 ml-2.5 sm:ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.platform}
                onChange={(e) => onUpdateFilters({ platform: e.target.value })}
                className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pl-2 pr-7 py-2 text-xs font-bold appearance-none w-full truncate"
                aria-label="Filter by Platform"
              >
                <option value="All" className="bg-white text-slate-900 font-semibold">All Platforms</option>
                {HOST_PLATFORMS.filter(p => p !== 'All').map((p) => (
                  <option key={p} value={p} className="bg-white text-slate-900 font-semibold">{p}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Tech Tag / Skills Filter Dropdown */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-2xs">
              <Tag className="w-4 h-4 text-purple-600 ml-2.5 sm:ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.tag}
                onChange={(e) => onUpdateFilters({ tag: e.target.value })}
                className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pl-2 pr-7 py-2 text-xs font-bold appearance-none w-full truncate"
                aria-label="Filter by Skill or Tag"
              >
                <option value="All" className="bg-white text-slate-900 font-semibold">All Skills / Tags</option>
                {POPULAR_TAGS.filter(t => t !== 'All').map((t) => (
                  <option key={t} value={t} className="bg-white text-slate-900 font-semibold">{t}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-2xs">
              <ArrowUpDown className="w-4 h-4 text-amber-600 ml-2.5 sm:ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pl-2 pr-7 py-2 text-xs font-bold appearance-none w-full truncate"
                aria-label="Sort order"
              >
                <option value="featured" className="bg-white text-slate-900 font-semibold">Featured First</option>
                <option value="name-asc" className="bg-white text-slate-900 font-semibold">Name (A to Z)</option>
                <option value="name-desc" className="bg-white text-slate-900 font-semibold">Name (Z to A)</option>
                <option value="random" className="bg-white text-slate-900 font-semibold">Random Order</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

          </div>

          {/* View Mode & Reset Controls Group */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
            
            {/* Filter Status Badge & Reset Button */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                <strong className="text-slate-900 font-extrabold">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} sites
              </span>
              
              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold flex items-center gap-1 transition-all"
                  title="Reset all active filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Random Jump Attention Button & View Mode Switcher */}
            <div className="flex items-center gap-2">
              {onTriggerJump && (
                <button
                  onClick={onTriggerJump}
                  className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-600 hover:to-indigo-700 text-white text-[11px] font-black flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer group/jump"
                  title="Trigger a random card jump animation to discover portfolios!"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200 group-hover/jump:rotate-45 transition-transform" />
                  <span>Surprise Jump</span>
                </button>
              )}

              {onToggleAutoJump && (
                <button
                  onClick={onToggleAutoJump}
                  className={`px-2 py-1.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                    autoJumpEnabled
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                  title={autoJumpEnabled ? 'Auto Spotlight Jumps active (click to pause)' : 'Auto Spotlight Jumps paused (click to resume)'}
                >
                  {autoJumpEnabled ? '⚡ Auto-Jump ON' : '⏸️ Auto-Jump OFF'}
                </button>
              )}

              {/* View Mode Switcher */}
              <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Cards Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('compact')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'compact'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Compact Grid View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

