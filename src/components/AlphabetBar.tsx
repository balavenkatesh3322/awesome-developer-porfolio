import React from 'react';
import { ALPHABET } from '../lib/portfolios';

interface AlphabetBarProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
}

export const AlphabetBar: React.FC<AlphabetBarProps> = ({
  selectedLetter,
  onSelectLetter
}) => {
  return (
    <div className="bg-slate-950/40 backdrop-blur-md border-b border-white/10 py-2.5 px-4 overflow-x-auto scrollbar-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
          Jump:
        </span>
        <button
          onClick={() => onSelectLetter('')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            selectedLetter === ''
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
          }`}
        >
          All
        </button>

        {ALPHABET.map((char) => {
          const active = selectedLetter === char;
          return (
            <button
              key={char}
              onClick={() => onSelectLetter(active ? '' : char)}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                active
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
};
