import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, CheckCircle2, TrendingUp, Sparkles, Sliders } from 'lucide-react';
import { Project, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface CaseStudyModalProps {
  project: Project | null;
  profile: PortfolioProfile;
  onClose: () => void;
  onBookCallForProject: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  profile,
  onClose,
  onBookCallForProject,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((offsetX / rect.width) * 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden z-10 my-8 transition-all ${theme.surface} ${theme.border}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme.border}`}>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
              {project.category}
            </span>
            <span className={`text-xs ${theme.textMuted}`}>
              {project.client} • {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.textPrimary}`}>
              {project.title}
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${theme.textSecondary}`}>
              {project.summary}
            </p>
          </div>

          {/* Key Measurable Outcomes Banner */}
          <div className={`p-6 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-4 ${theme.badgeBg} border-indigo-200/50 dark:border-emerald-900/40`}>
            {project.outcomes.map((item) => (
              <div key={item.label} className="text-center sm:text-left space-y-1">
                <div className={`text-3xl font-black ${theme.accentText}`}>
                  {item.metric}
                </div>
                <div className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Before/After Comparison or Main Showcase Image */}
          {project.beforeAfter ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  Interactive Before & After Comparison (Drag slider)
                </span>
                <span>{sliderPosition}% reveal</span>
              </div>

              <div
                className="relative h-72 sm:h-96 rounded-xl overflow-hidden select-none border border-slate-200 dark:border-zinc-800 cursor-ew-resize"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* AFTER Image (Bottom Layer) */}
                <img
                  src={project.beforeAfter.after}
                  alt={project.beforeAfter.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-600 text-white shadow-sm">
                  {project.beforeAfter.afterLabel} (New)
                </span>

                {/* BEFORE Image (Top Layer clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={project.beforeAfter.before}
                    alt={project.beforeAfter.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-md bg-slate-900/80 text-white shadow-sm">
                    {project.beforeAfter.beforeLabel} (Previous)
                  </span>
                </div>

                {/* Slider divider line and thumb */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-slate-300 flex items-center justify-center text-slate-700">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          )}

          {/* Problem vs Solution 2-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className={`p-5 rounded-xl border space-y-2 bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/40`}>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                The Core Challenge
              </span>
              <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                {project.problem}
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-2 bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40`}>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                The Strategic Solution
              </span>
              <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          {project.testimonial && (
            <div className={`p-6 rounded-xl border space-y-3 ${theme.surface} ${theme.border}`}>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <blockquote className={`italic text-sm sm:text-base leading-relaxed ${theme.textPrimary}`}>
                "{project.testimonial.quote}"
              </blockquote>
              <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                {project.testimonial.author} — <span className={theme.textMuted}>{project.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* Technology & Methodology Tags */}
          <div className="space-y-2 pt-2">
            <div className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted}`}>
              Disciplines & Tooling
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-3 py-1 rounded-md border ${theme.surface} ${theme.border} ${theme.textSecondary}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${theme.surface} ${theme.border}`}>
          <span className={`text-xs ${theme.textMuted}`}>
            Ready to achieve comparable metrics for your team?
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
              >
                <span>Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                onBookCallForProject(project.title);
              }}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white shadow-xs ${theme.accent} ${theme.accentHover}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Discuss Similar Project</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
