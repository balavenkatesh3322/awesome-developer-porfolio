import React, { useState } from 'react';
import { X, Copy, Check, Globe, Github, Terminal, Rocket, FileCode } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedYaml, setCopiedYaml] = useState(false);

  if (!isOpen) return null;

  const packageJsonSnippet = `{
  "homepage": "https://<your-github-username>.github.io/<repository-name>",
  "scripts": {
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}`;

  const ghActionsYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - id: deployment
        uses: actions/deploy-pages@v3`;

  const handleCopy = (text: string, type: 'script' | 'yaml') => {
    navigator.clipboard.writeText(text);
    if (type === 'script') {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedYaml(true);
      setTimeout(() => setCopiedYaml(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900/80 border border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl text-slate-100 my-8">
        
        {/* Header */}
        <div className="bg-slate-950/60 border-b border-white/10 p-4 sm:p-5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100">Deploy to GitHub Pages Guide</h2>
              <p className="text-xs text-slate-400">Step-by-step instructions to deploy this showcase SPA online</p>
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Method 1: Automated gh-pages package */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                Quick Deploy via `gh-pages` CLI
              </h3>
            </div>

            <p className="text-xs text-slate-400 pl-8">
              1. Install the <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">gh-pages</code> package in your repository terminal:
            </p>
            <div className="pl-8">
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
                npm install --save-dev gh-pages
              </pre>
            </div>

            <p className="text-xs text-slate-400 pl-8">
              2. Add these properties to your <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">package.json</code>:
            </p>
            <div className="pl-8 relative">
              <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto">
                {packageJsonSnippet}
              </pre>
              <button
                onClick={() => handleCopy(packageJsonSnippet, 'script')}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 pl-8">
              3. Run the one-command deployment:
            </p>
            <div className="pl-8">
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-indigo-300 font-mono">
                npm run deploy
              </pre>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Method 2: GitHub Actions Automated CI/CD */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                Automated Deployment via GitHub Actions
              </h3>
            </div>

            <p className="text-xs text-slate-400 pl-8">
              Create <code className="text-violet-300 bg-slate-950 px-1.5 py-0.5 rounded">.github/workflows/deploy.yml</code> in your repository for automatic deployment on push:
            </p>

            <div className="pl-8 relative">
              <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-48">
                {ghActionsYaml}
              </pre>
              <button
                onClick={() => handleCopy(ghActionsYaml, 'yaml')}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              >
                {copiedYaml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedYaml ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 flex items-center justify-between text-xs text-slate-400">
          <span>Documentation saved under <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded">/doc/GITHUB_PAGES_DEPLOYMENT.md</code></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
