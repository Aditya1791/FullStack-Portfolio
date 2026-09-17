import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface TestimonialsSectionProps {
  profile: PortfolioProfile;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ profile }) => {
  const [activeReviewIdx, setActiveReviewIdx] = useState<number>(0);
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const testimonials = profile.testimonials;
  const currentTestimonial = testimonials[activeReviewIdx] || testimonials[0];

  const handleNext = () => {
    setActiveReviewIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveReviewIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Social Proof & Client Validation</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
              Endorsements from founders & product leaders.
            </h2>
            <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
              Direct reviews and feedback from academic faculty, AI/ML instructors, and engineering collaborators.
            </p>
          </div>

          {/* Average Rating Scorecard */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-4 ${theme.surface} ${theme.border}`}>
            <div className="text-3xl font-black text-amber-500">5.0</div>
            <div className="space-y-1">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                100% Client Satisfaction Score
              </div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Highlight Card */}
        <div className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden shadow-sm ${theme.surface} ${theme.border}`}>
          <Quote className="absolute -top-4 -left-4 w-32 h-32 opacity-5 pointer-events-none text-slate-900 dark:text-zinc-100" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${theme.border} hover:bg-slate-100 dark:hover:bg-zinc-800 ${theme.textSecondary}`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className={`text-xs font-mono font-medium ${theme.textMuted}`}>
                  {activeReviewIdx + 1} / {testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${theme.border} hover:bg-slate-100 dark:hover:bg-zinc-800 ${theme.textSecondary}`}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quote Body */}
            <blockquote className={`text-xl sm:text-2xl lg:text-3xl font-normal leading-relaxed ${theme.textPrimary}`}>
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author Details */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/20"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';
                }}
              />
              <div>
                <div className={`text-base font-bold ${theme.textPrimary}`}>
                  {currentTestimonial.name}
                </div>
                <div className={`text-xs sm:text-sm ${theme.textSecondary}`}>
                  {currentTestimonial.role}, <span className="font-semibold">{currentTestimonial.company}</span>
                </div>
                <div className={`text-2xs mt-0.5 inline-flex items-center gap-1 ${theme.textMuted}`}>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Verified Engagement: {currentTestimonial.project}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Testimonials Grid Pills for Quick Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveReviewIdx(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeReviewIdx === idx
                  ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.badgeBg}`
                  : `border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 ${theme.surface}`
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';
                  }}
                />
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${theme.textPrimary}`}>{t.name}</div>
                  <div className={`text-2xs truncate ${theme.textMuted}`}>{t.company}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
