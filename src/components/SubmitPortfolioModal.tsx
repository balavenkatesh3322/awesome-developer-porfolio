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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const prLineTemplate = `{
  "id": 0,
  "name": "${name || 'Your Name'}",
  "url": "${url || 'https://your-portfolio.com'}",
  "role": "${role || 'Software Engineer'}",
  "email": "${email || ''}",
  "phone": "${phone || ''}",
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/80 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl text-slate-900 my-8">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Submit Your Portfolio Website</h2>
              <p className="text-xs text-slate-500 font-medium">Get featured on the Awesome Developer Portfolios showcase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* GitHub PR Callout Banner */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/80 rounded-2xl p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-indigo-700" />
              <h3 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Submit via GitHub Pull Request</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Fill in your details below to auto-generate the JSON entry, copy it, and paste it into the respective category file under <code className="text-indigo-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">src/data/categories/</code> in a new Pull Request!
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 shadow-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Portfolio Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://alexrivera.dev"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 shadow-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Role / Specialization</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Full Stack & AI Engineer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 shadow-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Contact Email <span className="text-slate-400 font-normal">(Optional, for notification alerts)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Contact Phone / SMS <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1-555-0192"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Generated Code Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600">Auto-Generated TypeScript Config Entry</label>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Copied Entry!' : 'Copy Entry'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-indigo-300 font-mono overflow-x-auto max-h-48 scrollbar-none">
              {prLineTemplate}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 text-xs font-bold text-slate-700 transition-colors"
          >
            Cancel
          </button>

          <a
            href="https://github.com/balavenkatesh3322/awesome-developer-porfolio/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20"
          >
            <Github className="w-4 h-4" />
            <span>Fork Repo &amp; Raise PR on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

