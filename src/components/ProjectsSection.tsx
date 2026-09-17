import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, TrendingUp, Layers, Sliders } from 'lucide-react';
import { Project, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface ProjectsSectionProps {
  profile: PortfolioProfile;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  profile,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(profile.projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? profile.projects
    : profile.projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work & Case Studies</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
              Proven impact across product, systems & revenue.
            </h2>
            <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
              Every engagement is engineered for quantifiable commercial outcomes — higher retention, reduced support overhead, and rapid feature delivery.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? `${theme.accent} text-white shadow-xs`
                    : `border ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col ${theme.surface} ${theme.border}`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                  }}
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-950/80 backdrop-blur-md text-white">
                    {project.client}
                  </span>
                  {project.beforeAfter && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-600/90 text-white backdrop-blur-md">
                      <Sliders className="w-3 h-3" />
                      <span>Interactive Before/After</span>
                    </span>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-lg bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>View In-Depth Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted}`}>
                      {project.category} • {project.year}
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${theme.accentText}`}>
                      Read Case
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors ${theme.textPrimary}`}>
                    {project.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                    {project.summary}
                  </p>
                </div>

                {/* Metrics Highlight Pills */}
                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center gap-3">
                  {project.outcomes.slice(0, 2).map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${theme.badgeBg}`}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-extrabold text-slate-900 dark:text-zinc-100">{item.metric}</span>
                      <span className="text-slate-600 dark:text-zinc-400">{item.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
