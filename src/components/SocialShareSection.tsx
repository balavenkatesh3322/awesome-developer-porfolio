import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Share2,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Globe
} from 'lucide-react';

export const SocialShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'x' | 'linkedin' | 'whatsapp'>('x');

  const OFFICIAL_WEBSITE_URL = 'https://balavenkatesh3322.github.io/awesome-developer-porfolio/';
  const shareUrl = OFFICIAL_WEBSITE_URL;

  const tweetText = `Awesome Developer Portfolios — Showcase Your Work & Get Discovered! Explore top developer sites, gain visibility with recruiters, and level up your engineering career 🔥\n\nSubmit your portfolio via Pull Request on GitHub:`;
  const linkedinTitle = `Awesome Developer Portfolios — Showcase Your Work & Get Discovered`;
  const whatsappText = `Check out Awesome Developer Portfolios — Showcase Your Work & Get Discovered! Explore top developer sites with live website previews: ${shareUrl}`;

  const xShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
  const redditShareLink = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(linkedinTitle)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-indigo-500/20 relative overflow-hidden my-8">
      
      {/* Background Decorative Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/3 w-[450px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-[400px] h-[250px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-5" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        
        {/* Header Statement & Badge */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Spread the Word on Social Media</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Help Developers Get Discovered Worldwide 🚀
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Sharing this catalog helps fellow software engineers, designers, and open-source creators gain visibility with tech recruiters, founders, and peer developers. Share the link on <strong className="text-indigo-300">𝕏 (Twitter)</strong>, <strong className="text-indigo-300">LinkedIn</strong>, and <strong className="text-emerald-300">WhatsApp</strong>!
          </p>
        </div>

        {/* Interactive 1-Click Social Share Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
          
          {/* 𝕏 (Twitter) Button */}
          <a
            href={xShareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-black text-white text-xs font-extrabold border border-slate-700/80 hover:border-slate-500 transition-all shadow-md hover:scale-[1.03] active:scale-95 group"
          >
            <span className="text-base font-black font-mono group-hover:scale-110 transition-transform">𝕏</span>
            <span>Share on 𝕏</span>
            <ExternalLink className="w-3 h-3 text-slate-400 opacity-70 group-hover:opacity-100" />
          </a>

          {/* LinkedIn Button */}
          <a
            href={linkedinShareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold border border-blue-600 transition-all shadow-md hover:scale-[1.03] active:scale-95 group"
          >
            <span className="text-sm font-black font-sans group-hover:scale-110 transition-transform">in</span>
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-blue-200 opacity-70 group-hover:opacity-100" />
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappShareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold border border-emerald-500 transition-all shadow-md hover:scale-[1.03] active:scale-95 group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>WhatsApp</span>
            <ExternalLink className="w-3 h-3 text-emerald-200 opacity-70 group-hover:opacity-100" />
          </a>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold border transition-all shadow-md hover:scale-[1.03] active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-indigo-600/30 hover:bg-indigo-600/50 border-indigo-400/40 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-300" />
                <span>Copy Link</span>
              </>
            )}
          </button>

        </div>

        {/* Live Social Card Preview Box */}
        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-inner space-y-3">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-bold">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Live Social Media Card Preview (𝕏, LinkedIn &amp; WhatsApp)</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('x')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  activeTab === 'x' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                𝕏 Card
              </button>
              <button
                onClick={() => setActiveTab('linkedin')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  activeTab === 'linkedin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                LinkedIn
              </button>
            </div>
          </div>

          {/* Preview Card Mockup */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-xl overflow-hidden shadow-lg group/card hover:border-indigo-500/50 transition-all">
            
            {/* Banner Thumbnail */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden border-b border-slate-800 flex flex-col justify-between p-5">
              
              {/* Background Glows & Pattern */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10" />
              </div>

              {/* Image Overlay */}
              <img
                src="/og-image.png"
                alt="Social Media Preview Banner"
                className="absolute inset-0 w-full h-full object-cover z-10 group-hover/card:scale-102 transition-transform duration-500"
                onError={(e) => {
                  // If image fails to load, gracefully hide img element so stylized fallback canvas displays
                  (e.target as HTMLElement).style.opacity = '0';
                }}
              />

              {/* Fallback Rich Visual Canvas (renders seamlessly behind or if image fails) */}
              <div className="relative z-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    &lt;/&gt;
                  </div>
                  <span className="text-xs font-black text-indigo-300 tracking-wider uppercase bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                    Developer Showcase
                  </span>
                </div>
                <h3 className="text-lg font-black text-white leading-tight">
                  Awesome Developer Portfolios
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Showcase Your Work &amp; Get Discovered
                </p>
              </div>

              {/* Verified Badge Overlay */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-indigo-400/30">
                  <Share2 className="w-3 h-3 text-amber-300" />
                  <span>Verified Social Card Preview</span>
                </div>
                <div className="flex gap-1.5 text-[10px] font-bold text-slate-300">
                  <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">Full Stack</span>
                  <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">AI / ML</span>
                </div>
              </div>

            </div>

            {/* Social Card Content */}
            <div className="p-3.5 space-y-1.5 bg-slate-950">
              <span className="text-[10px] font-mono font-extrabold text-indigo-400 uppercase tracking-wider block truncate">
                balavenkatesh3322.github.io/awesome-developer-porfolio
              </span>
              <h4 className="text-sm font-extrabold text-white group-hover/card:text-indigo-400 transition-colors line-clamp-1">
                Awesome Developer Portfolios — Showcase Your Work &amp; Get Discovered
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                Showcase Your Work &amp; Get Discovered! Explore top developer portfolios, software engineering personal sites, and UI inspirations with live interactive previews.
              </p>
            </div>

          </div>

          {/* Social Statement Toast Notice */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold p-2.5 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Link &amp; Social Statement Copied! Paste directly onto X, LinkedIn, or Discord!</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
