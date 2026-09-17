import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Star,
} from 'lucide-react';
import { Project, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface FeaturedProjectSectionProps {
  profile: PortfolioProfile;
  onSelectProject: (project: Project) => void;
  onBookCallForProject: (projectName: string) => void;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({
  profile,
  onSelectProject,
  onBookCallForProject,
}) => {
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  // Find the featured project (either designated by profile.featuredProjectId or the first with featured: true, or first project)
  const featuredProject =
    profile.projects.find((p) => p.id === profile.featuredProjectId) ||
    profile.projects.find((p) => p.featured) ||
    profile.projects[0];

  if (!featuredProject) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-zinc-800/80 relative overflow-hidden" id="featured">
      {/* Subtle ambient backdrop highlight */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Flagship Highlight • Featured Project
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            Selected for exceptional quantifiable business impact
          </div>
        </div>

        {/* Heroic Featured Showcase Card */}
        <div
          className={`rounded-3xl border overflow-hidden shadow-xl transition-all duration-300 ${theme.surface} ${theme.border}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Narrative, Breakdown & Metrics (7 Cols) */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                    {featuredProject.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${theme.border} ${theme.textSecondary}`}>
                    Client: {featuredProject.client}
                  </span>
                  <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded-md ${theme.border} text-slate-400`}>
                    {featuredProject.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${theme.textPrimary}`}>
                  {featuredProject.title}
                </h3>

                {/* Summary */}
                <p className={`text-base sm:text-lg leading-relaxed ${theme.textSecondary}`}>
                  {featuredProject.summary}
                </p>

                {/* Challenge & Breakthrough Solution Compact Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className={`p-4 rounded-xl border space-y-1.5 ${theme.surface} ${theme.border}`}>
                    <span className="text-2xs font-extrabold uppercase tracking-wider text-rose-500 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      The Friction Point
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                      {featuredProject.problem}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-1.5 ${theme.surface} ${theme.border}`}>
                    <span className="text-2xs font-extrabold uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Strategic Solution
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                      {featuredProject.solution}
                    </p>
                  </div>
                </div>

                {/* Outcome Metrics Grid */}
                <div className="space-y-2 pt-2">
                  <span className={`text-2xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                    Verified Outcomes & Measured Lift:
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {featuredProject.outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border text-center space-y-1 ${theme.badgeBg} ${theme.border}`}
                      >
                        <div className={`text-xl sm:text-2xl font-black ${theme.accentText}`}>
                          {item.metric}
                        </div>
                        <div className={`text-2xs font-semibold leading-tight ${theme.textSecondary}`}>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Testimonial Snippet */}
                {featuredProject.testimonial && (
                  <div className={`p-4 rounded-xl border border-dashed flex items-start gap-3 ${theme.border} bg-slate-50/50 dark:bg-zinc-900/40`}>
                    <div className="flex gap-0.5 text-amber-400 mt-1 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs italic leading-relaxed ${theme.textSecondary}`}>
                        "{featuredProject.testimonial.quote}"
                      </p>
                      <div className={`text-2xs font-semibold ${theme.textMuted}`}>
                        — {featuredProject.testimonial.author}, {featuredProject.testimonial.role}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onSelectProject(featuredProject)}
                  className={`py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer ${theme.accent} ${theme.accentHover}`}
                  id="featured-open-casestudy-btn"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Launch Deep Case Study & Interactive Slider</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onBookCallForProject(featuredProject.title)}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${theme.surface} ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
                  id="featured-book-similar-btn"
                >
                  <span>Book Call for Similar Scope</span>
                </button>

                {featuredProject.tags && (
                  <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                    {featuredProject.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-2xs font-mono text-slate-400 dark:text-zinc-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Compelling Showcase Visual (5 Cols) */}
            <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden flex flex-col justify-between min-h-[380px] lg:min-h-full">
              
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Top Visual Floating Tag */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Staff Pick
                </span>

                {featuredProject.beforeAfter && (
                  <span className="px-2.5 py-1 rounded-md text-2xs font-semibold bg-indigo-600/90 text-white backdrop-blur-md flex items-center gap-1">
                    <Sliders className="w-3 h-3" />
                    Interactive Comparison Available
                  </span>
                )}
              </div>

              {/* Bottom Visual Overlay Callout */}
              <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs uppercase tracking-widest font-mono text-indigo-300">
                      Architecture & Execution
                    </span>
                    <span className="text-2xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Client Result
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Click "Launch Deep Case Study" to inspect the interactive before/after split slider, detailed design tokens, and engineering handoff specifications.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
