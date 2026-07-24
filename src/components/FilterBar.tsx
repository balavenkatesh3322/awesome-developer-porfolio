import React from 'react';
import {
  CATEGORIES,
  HOST_PLATFORMS,
  POPULAR_TAGS
} from '../lib/portfolios';
import { FilterState, ViewMode } from '../types';
import { LayoutGrid, List, Layers, Tag, ArrowUpDown, RotateCcw, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filteredCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
  onResetFilters
}) => {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.platform !== 'All' ||
    filters.tag !== 'All' ||
    filters.letter !== '' ||
    filters.searchQuery !== '' ||
    filters.onlyBookmarks;

  return (
    <div className="bg-slate-950/60 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-6 shadow-2xl transition-all relative z-20">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Row 1: Category Scrollable Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const active = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onUpdateFilters({ category: cat })}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 backdrop-blur-md ${
                  active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/50'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 2: Dropdown Controls Grid / Flex */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Dropdown Filters Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full md:w-auto flex-1 max-w-3xl">
            
            {/* Host Platform Filter Dropdown */}
            <div className="relative flex items-center bg-slate-900/80 border border-white/15 rounded-xl backdrop-blur-md focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
              <Layers className="w-4 h-4 text-indigo-400 ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.platform}
                onChange={(e) => onUpdateFilters({ platform: e.target.value })}
                className="bg-transparent text-slate-100 focus:outline-none cursor-pointer pl-2 pr-8 py-2.5 text-xs font-bold appearance-none w-full truncate"
                aria-label="Filter by Platform"
              >
                <option value="All" className="bg-slate-950 text-slate-100 font-semibold">All Platforms</option>
                {HOST_PLATFORMS.filter(p => p !== 'All').map((p) => (
                  <option key={p} value={p} className="bg-slate-950 text-slate-100 font-semibold">{p}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Tech Tag / Skills Filter Dropdown */}
            <div className="relative flex items-center bg-slate-900/80 border border-white/15 rounded-xl backdrop-blur-md focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
              <Tag className="w-4 h-4 text-pink-400 ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.tag}
                onChange={(e) => onUpdateFilters({ tag: e.target.value })}
                className="bg-transparent text-slate-100 focus:outline-none cursor-pointer pl-2 pr-8 py-2.5 text-xs font-bold appearance-none w-full truncate"
                aria-label="Filter by Skill or Tag"
              >
                <option value="All" className="bg-slate-950 text-slate-100 font-semibold">All Skills / Tags</option>
                {POPULAR_TAGS.filter(t => t !== 'All').map((t) => (
                  <option key={t} value={t} className="bg-slate-950 text-slate-100 font-semibold">{t}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-slate-900/80 border border-white/15 rounded-xl backdrop-blur-md focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
              <ArrowUpDown className="w-4 h-4 text-amber-400 ml-3 shrink-0 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent text-slate-100 focus:outline-none cursor-pointer pl-2 pr-8 py-2.5 text-xs font-bold appearance-none w-full truncate"
                aria-label="Sort order"
              >
                <option value="featured" className="bg-slate-950 text-slate-100 font-semibold">Featured First</option>
                <option value="name-asc" className="bg-slate-950 text-slate-100 font-semibold">Name (A to Z)</option>
                <option value="name-desc" className="bg-slate-950 text-slate-100 font-semibold">Name (Z to A)</option>
                <option value="random" className="bg-slate-950 text-slate-100 font-semibold">Random Order</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

          </div>

          {/* View Mode & Reset Controls Group */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-white/5">
            
            {/* Filter Status Badge & Reset Button */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">
                <strong className="text-slate-100 font-extrabold">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} sites
              </span>
              
              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                  title="Reset all active filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900/80 border border-white/15 rounded-xl p-1 backdrop-blur-md">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('compact')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'compact'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
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
  );
};

