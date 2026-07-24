import React, { useState } from 'react';
import { X, ExternalLink, Github, Check, Copy, Upload, Sparkles, Heart } from 'lucide-react';

interface SubmitPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitPortfolioModal: React.FC<SubmitPortfolioModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [role, setRole] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const prLineTemplate = `{
  "id": 0,
  "name": "${name || 'Your Name'}",
  "url": "${url || 'https://your-portfolio.com'}",
  "role": "${role || 'Software Engineer'}",
  "hostPlatform": "Vercel",
  "category": "Full Stack",
  "tags": ["React", "TypeScript", "Node.js"],
  "initials": "${(name || 'YN').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'YN'}",
  "firstLetter": "${(name || 'Y')[0].toUpperCase()}",
  "featured": true
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prLineTemplate);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900/80 border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl text-slate-100 my-8">
        
        {/* Header */}
        <div className="bg-slate-950/60 border-b border-white/10 p-4 sm:p-5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100">Submit Your Portfolio Website</h2>
              <p className="text-xs text-slate-400">Get featured on the Awesome Developer Portfolios showcase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* GitHub PR Callout Banner */}
          <div className="bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/40 rounded-2xl p-4 space-y-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Submit via GitHub Pull Request</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fill in your details below to auto-generate the JSON entry, copy it, and paste it into the respective category file under <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded border border-white/10">src/data/categories/</code> in a new Pull Request!
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Portfolio Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://alexrivera.dev"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Specialization</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Full Stack & AI Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Generated Code Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400">Auto-Generated TypeScript Config Entry</label>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-md shadow-indigo-600/30"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Copied Entry!' : 'Copy Entry'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3.5 rounded-xl border border-white/10 text-xs text-indigo-300 font-mono overflow-x-auto max-h-48 scrollbar-none">
              {prLineTemplate}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950/80 border-t border-white/10 p-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </button>

          <a
            href="https://github.com/balavenkatesh3322/awesome-developer-porfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

