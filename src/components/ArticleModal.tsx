import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen,
  User,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { InsightPost, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface ArticleModalProps {
  article: InsightPost | null;
  profile: PortfolioProfile;
  onClose: () => void;
  onOpenBooking: (topic?: string) => void;
  onSelectServiceById: (serviceId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  profile,
  onClose,
  onOpenBooking,
  onSelectServiceById,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedService = article.relatedServiceId
    ? profile.services.find((s) => s.id === article.relatedServiceId)
    : undefined;

  // Split content into paragraphs for clean typography rendering
  const paragraphs = article.content.split('\n\n');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className={`relative w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] ${theme.surface} ${theme.border}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Top Bar */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md ${theme.surface}/95 ${theme.border}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-semibold cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights</span>
            </button>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors`}
              title="Copy link to article"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors`}
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Header & Meta */}
          <div className="space-y-4 pb-6 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${theme.textPrimary}`}>
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-indigo-700 dark:text-emerald-400">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className={`text-xs font-bold ${theme.textPrimary}`}>
                  {profile.name}
                </div>
                <div className={`text-2xs ${theme.textMuted}`}>
                  {profile.role}
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image if available */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-md">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-56 sm:h-72 object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          )}

          {/* Executive Summary Callout */}
          <div className={`p-5 rounded-2xl border-l-4 border-indigo-600 dark:border-emerald-400 ${theme.badgeBg} space-y-1.5`}>
            <span className={`text-2xs font-extrabold uppercase tracking-wider ${theme.textMuted}`}>
              Executive Takeaway:
            </span>
            <p className={`text-sm sm:text-base italic leading-relaxed ${theme.textPrimary} font-medium`}>
              "{article.summary}"
            </p>
          </div>

          {/* Article Editorial Body */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
            {paragraphs.map((p, index) => {
              // Check if paragraph is a heading like "## Something" or "### Something"
              if (p.startsWith('### ')) {
                return (
                  <h3 key={index} className={`text-lg sm:text-xl font-bold tracking-tight pt-4 ${theme.textPrimary}`}>
                    {p.replace('### ', '')}
                  </h3>
                );
              }
              if (p.startsWith('## ')) {
                return (
                  <h2 key={index} className={`text-xl sm:text-2xl font-extrabold tracking-tight pt-6 ${theme.textPrimary}`}>
                    {p.replace('## ', '')}
                  </h2>
                );
              }
              if (p.startsWith('- ') || p.startsWith('* ')) {
                const listItems = p.split('\n');
                return (
                  <ul key={index} className="space-y-2 my-4 pl-4 border-l-2 border-indigo-300 dark:border-emerald-600">
                    {listItems.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm">
                        {item.replace(/^[-*]\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {p}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-2">
            <span className={`text-2xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
              Related Topics & Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border ${theme.badgeBg} ${theme.border} ${theme.textSecondary}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded Call To Action Box */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${theme.surface} ${theme.border} relative overflow-hidden`}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Putting This Into Practice</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
                {article.ctaText || 'Ready to implement this framework in your product?'}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                Schedule a 30-minute discovery call with {profile.name} to diagnose your product's architecture, discuss your roadmap, or evaluate engagement models.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(`Discussion: ${article.title}`);
                }}
                className={`py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer ${theme.accent} ${theme.accentHover}`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book 30-Min Strategy Call</span>
              </button>

              {relatedService && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectServiceById(relatedService.id);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 transition-all cursor-pointer ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
                >
                  <BookOpen className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
                  <span>View Package: {relatedService.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
