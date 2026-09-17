import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  PlusCircle,
  X,
  Check,
  Filter,
} from 'lucide-react';
import { InsightPost, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface InsightsSectionProps {
  profile: PortfolioProfile;
  onSelectArticle: (article: InsightPost) => void;
  onAddInsight?: (newPost: InsightPost) => void;
  onOpenBooking: (topic?: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  profile,
  onSelectArticle,
  onAddInsight,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);

  // Form state for publishing new thought
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Product Strategy');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Strategy, Design, Architecture');

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const insightsList = profile.insights || [];

  // Extract all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    insightsList.forEach((item) => set.add(item.category));
    return ['all', ...Array.from(set)];
  }, [insightsList]);

  // Filtered insights
  const filteredInsights = useMemo(() => {
    return insightsList.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [insightsList, selectedCategory, searchQuery]);

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const post: InsightPost = {
      id: `insight-${Date.now()}`,
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: newSummary.trim() || newContent.slice(0, 140) + '...',
      content: newContent.trim(),
      category: newCategory,
      tags: parsedTags.length > 0 ? parsedTags : ['Insights'],
      readTime: `${Math.max(2, Math.ceil(newContent.split(' ').length / 180))} min read`,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      ctaText: `Interested in ${newCategory}? Let's schedule a session.`,
    };

    if (onAddInsight) {
      onAddInsight(post);
    }

    // Reset and close
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setIsPublishModalOpen(false);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80 relative" id="insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights & Thought Leadership</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
              Essays on systems, design economics & scale.
            </h2>
            <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
              In-depth frameworks, operational case studies, and critical perspectives on creating sustainable digital advantage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textPrimary} ${theme.surfaceHover}`}
              id="insights-publish-trigger-btn"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-emerald-400" />
              <span>Publish Thought / Article</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-zinc-800/80">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? `${theme.accent} text-white shadow-xs`
                    : `border ${theme.border} ${theme.textSecondary} hover:text-slate-900 dark:hover:text-zinc-100`
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${theme.surface} ${theme.border} ${theme.textPrimary}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Articles Grid */}
        {filteredInsights.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center space-y-3 ${theme.surface} ${theme.border}`}>
            <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
            <h3 className={`text-base font-bold ${theme.textPrimary}`}>No insights found</h3>
            <p className={`text-xs ${theme.textSecondary}`}>
              Try resetting your category or search query to explore all publications.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border ${theme.border} ${theme.textPrimary}`}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredInsights.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${theme.surface} ${theme.border}`}
                id={`article-card-${article.id}`}
              >
                <div>
                  {/* Article Cover Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs bg-slate-900/80 text-white border border-white/10`}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-2xs text-slate-500 dark:text-zinc-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold tracking-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors ${theme.textPrimary}`}>
                      {article.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${theme.textSecondary}`}>
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer: Tags & Read CTA */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`text-2xs font-mono px-2 py-0.5 rounded-md border ${theme.badgeBg} ${theme.border} text-slate-500 dark:text-zinc-400`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1 group-hover:underline">
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className={`text-2xs ${theme.textMuted}`}>
                      Includes Strategy CTA
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Quick Publish Article Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="fixed inset-0" onClick={() => setIsPublishModalOpen(false)} aria-hidden="true" />

          <div
            className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 z-10 space-y-6 ${theme.surface} ${theme.border}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="space-y-1">
                <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Publish New Insight / Article</h3>
                <p className={`text-xs ${theme.textSecondary}`}>
                  Share your perspective, breakdown a case study, or post an industry framework.
                </p>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className={`p-2 rounded-xl border cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${theme.textSecondary}`}>Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., The Hidden Cost of Design Drift in Fast-Growing Engineering Orgs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.surface} ${theme.border} ${theme.textPrimary}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block font-semibold mb-1 ${theme.textSecondary}`}>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.surface} ${theme.border} ${theme.textPrimary}`}
                  >
                    <option value="Design Systems">Design Systems</option>
                    <option value="Product Strategy">Product Strategy</option>
                    <option value="Conversion & UX">Conversion & UX</option>
                    <option value="Growth Advisory">Growth Advisory</option>
                    <option value="Commercial Photography">Commercial Photography</option>
                  </select>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${theme.textSecondary}`}>Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. UX, Strategy, Tokens"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.surface} ${theme.border} ${theme.textPrimary}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${theme.textSecondary}`}>Summary / One-Sentence Hook</label>
                <input
                  type="text"
                  placeholder="Brief hook for card preview and executive summary"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.surface} ${theme.border} ${theme.textPrimary}`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${theme.textSecondary}`}>Article Content (Markdown supported)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your article paragraphs here. Use ## for section titles, and - for bullet points."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-mono ${theme.surface} ${theme.border} ${theme.textPrimary}`}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${theme.border} ${theme.textSecondary}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer ${theme.accent} ${theme.accentHover}`}
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
