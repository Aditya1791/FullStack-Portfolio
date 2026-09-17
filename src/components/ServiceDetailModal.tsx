import React from 'react';
import {
  X,
  Check,
  Clock,
  DollarSign,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Star,
  ExternalLink,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';
import { Service, PortfolioProfile, Project, Testimonial } from '../types';
import { themeMap } from '../utils/theme';

interface ServiceDetailModalProps {
  service: Service | null;
  profile: PortfolioProfile;
  onClose: () => void;
  onSelectServiceForBooking: (service: Service) => void;
  onSelectProject: (project: Project) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  profile,
  onClose,
  onSelectServiceForBooking,
  onSelectProject,
}) => {
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  if (!service) return null;

  // Find related projects
  const relatedProjects = profile.projects.filter((p) => {
    if (service.relatedProjectIds?.includes(p.id)) return true;
    // Fallback match based on tags or category
    return (
      p.category.toLowerCase().includes(service.title.split(' ')[0].toLowerCase()) ||
      p.tags.some((t) => service.title.toLowerCase().includes(t.toLowerCase()))
    );
  });

  // Find related testimonials
  const relatedTestimonials = profile.testimonials.filter((t) => {
    if (service.relatedTestimonialIds?.includes(t.id)) return true;
    if (t.serviceId === service.id) return true;
    // Fallback: match by project title
    return relatedProjects.some((p) => p.title.toLowerCase().includes(t.project.toLowerCase()));
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className={`relative w-full max-w-4xl my-8 rounded-3xl border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] ${theme.surface} ${theme.border}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md ${theme.surface}/95 ${theme.border}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-2xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                Service Architecture & Proof
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {service.timeline}
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
              {service.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Overview & Pricing Bar */}
          <div className={`p-6 rounded-2xl border space-y-4 ${theme.badgeBg} ${theme.border}`}>
            <p className={`text-sm sm:text-base leading-relaxed ${theme.textPrimary}`}>
              {service.description}
            </p>

            {service.idealFor && (
              <div className="pt-2 flex items-start gap-2 text-xs font-medium text-slate-600 dark:text-zinc-300">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className={theme.textPrimary}>Ideal For:</strong> {service.idealFor}
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200/60 dark:border-zinc-700/60 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className={`text-xs ${theme.textMuted}`}>Investment Structure:</span>
                <div className={`text-2xl font-black ${theme.accentText}`}>
                  Starting at ₹{service.startingAt.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectServiceForBooking(service);
                }}
                className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm flex items-center gap-2 cursor-pointer ${theme.accent} ${theme.accentHover}`}
              >
                <span>Select Package & Schedule Fit Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Deliverables Matrix with Expanded Explanations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className={`text-base font-bold tracking-tight ${theme.textPrimary}`}>
                Standard Deliverables & Methodology
              </h4>
              <span className={`text-2xs font-mono ${theme.textMuted}`}>
                {service.deliverables.length} core milestone phases
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.deliverables.map((item, idx) => {
                const detail = service.deliverableDetails?.[item];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-1.5 transition-all ${theme.surface} ${theme.border} hover:border-indigo-400 dark:hover:border-emerald-500`}
                  >
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={`text-xs sm:text-sm font-bold ${theme.textPrimary}`}>
                        {item}
                      </span>
                    </div>
                    {detail && (
                      <p className={`text-xs pl-6 leading-relaxed ${theme.textSecondary}`}>
                        {detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Portfolio Projects */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className={`text-base font-bold tracking-tight ${theme.textPrimary}`}>
                  Related Case Studies Executed Under This Model
                </h4>
                <p className={`text-xs ${theme.textSecondary}`}>
                  See real enterprise results and metrics achieved with this exact scope of work.
                </p>
              </div>
            </div>

            {relatedProjects.length === 0 ? (
              <p className={`text-xs italic ${theme.textMuted}`}>
                Similar engagements covered under client NDA. Request relevant anonymized artifacts during discovery.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(project);
                    }}
                    className={`group p-4 rounded-2xl border flex gap-4 items-center justify-between transition-all cursor-pointer ${theme.surface} ${theme.border} hover:border-indigo-500 dark:hover:border-emerald-500 hover:shadow-md`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-2xs font-mono text-slate-400">{project.client}</div>
                      <h5 className={`text-xs sm:text-sm font-bold truncate group-hover:text-indigo-600 dark:group-hover:text-emerald-400 ${theme.textPrimary}`}>
                        {project.title}
                      </h5>
                      <div className="flex items-center gap-2 text-2xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>{project.outcomes[0]?.metric} {project.outcomes[0]?.label}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-1 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Connected Testimonials & Endorsements */}
          {relatedTestimonials.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <h4 className={`text-base font-bold tracking-tight ${theme.textPrimary}`}>
                Client Endorsement for This Engagement
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {relatedTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border space-y-3 ${theme.badgeBg} ${theme.border}`}
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className={`text-xs sm:text-sm italic leading-relaxed ${theme.textPrimary}`}>
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';
                        }}
                      />
                      <div className="text-xs">
                        <span className={`font-bold ${theme.textPrimary}`}>{t.name}</span>
                        <span className={`text-2xs ${theme.textMuted}`}> — {t.role}, {t.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between ${theme.border} ${theme.surface}`}>
          <div className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:block">
            Includes custom NDA protection & IP copyright transfer upon final payment.
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${theme.border} ${theme.textSecondary}`}
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectServiceForBooking(service);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer ${theme.accent} ${theme.accentHover}`}
            >
              Book Call with This Package
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
