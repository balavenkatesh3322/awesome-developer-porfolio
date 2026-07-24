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
    <div className="bg-slate-100/90 backdrop-blur-md border-b border-slate-200/80 py-2.5 px-4 overflow-x-auto scrollbar-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1">
          Jump:
        </span>
        <button
          onClick={() => onSelectLetter('')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            selectedLetter === ''
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
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
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-105 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
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
