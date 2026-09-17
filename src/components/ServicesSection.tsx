import React, { useState, useMemo } from 'react';
import {
  Layout,
  Layers,
  Zap,
  ShieldCheck,
  Camera,
  Target,
  TrendingUp,
  Compass,
  Check,
  ArrowRight,
  Clock,
  Sparkles,
  Info,
  ExternalLink,
  MessageSquareQuote,
  Eye,
} from 'lucide-react';
import { Service, PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface ServicesSectionProps {
  profile: PortfolioProfile;
  onSelectService: (service: Service) => void;
  onInspectService: (service: Service) => void;
  onOpenEstimator: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  profile,
  onSelectService,
  onInspectService,
  onOpenEstimator,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />;
    }
  };

  const filteredServices = useMemo(() => {
    if (activeCategoryFilter === 'all') return profile.services;
    if (activeCategoryFilter === 'builds') {
      return profile.services.filter((s) => s.id.includes('product') || s.timeline.includes('weeks'));
    }
    if (activeCategoryFilter === 'systems') {
      return profile.services.filter((s) => s.id.includes('system') || s.deliverables.some((d) => d.toLowerCase().includes('component') || d.toLowerCase().includes('token')));
    }
    if (activeCategoryFilter === 'advisory') {
      return profile.services.filter((s) => s.id.includes('audit') || s.id.includes('advisory') || s.timeline.includes('Sprint') || s.timeline.includes('Retainer'));
    }
    return profile.services;
  }, [profile.services, activeCategoryFilter]);

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Services & Engagement Architecture</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
              Structured packages tailored to your product stage.
            </h2>
            <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
              Hover over deliverables for deep methodology tooltips, or click any package to review related case study outcomes and client endorsements.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
          >
            <span>Need a custom scope? Try Fee Estimator</span>
            <ArrowRight className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'builds', label: 'End-to-End Builds' },
            { id: 'systems', label: 'Design Systems & Scale' },
            { id: 'advisory', label: 'Audits & Advisory' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === tab.id
                  ? `${theme.accent} text-white shadow-xs`
                  : `border ${theme.border} ${theme.textSecondary} hover:text-slate-900 dark:hover:text-zinc-100`
              }`}
            >
              {tab.label}
            </button>
          ))}

          <span className="hidden sm:inline-block ml-auto text-2xs font-mono text-slate-400">
            Click card to view matching projects & testimonials
          </span>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const hasRelatedProof = (service.relatedProjectIds?.length || 0) > 0 || (service.relatedTestimonialIds?.length || 0) > 0;

            return (
              <div
                key={service.id}
                className={`relative rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-xl group ${
                  service.popular
                    ? `border-indigo-500 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.surface}`
                    : `${theme.surface} ${theme.border}`
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-2xs font-extrabold uppercase tracking-wider bg-indigo-600 dark:bg-emerald-500 text-white shadow-xs">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${theme.badgeBg} ${theme.border}`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold tracking-tight ${theme.textPrimary}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Interactive Proof Preview Pill Button */}
                  <button
                    onClick={() => onInspectService(service)}
                    className={`w-full py-2 px-3 rounded-xl border text-2xs font-bold flex items-center justify-between transition-all cursor-pointer ${theme.badgeBg} ${theme.border} ${theme.textPrimary} hover:border-indigo-500 dark:hover:border-emerald-500`}
                    title="Click to view related portfolio case studies and verified client testimonials"
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
                      <span>See Related Proof & Case Studies</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Deliverables Checklist with Interactive Tooltips */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-2xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                        What's Included:
                      </span>
                      <span className="text-2xs text-slate-400">Hover for details</span>
                    </div>

                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => {
                        const detail = service.deliverableDetails?.[item];
                        const isHovered = hoveredTooltip === `${service.id}-${idx}`;

                        return (
                          <li
                            key={idx}
                            className="relative group/item"
                            onMouseEnter={() => setHoveredTooltip(`${service.id}-${idx}`)}
                            onMouseLeave={() => setHoveredTooltip(null)}
                          >
                            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300 cursor-help">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="border-b border-dotted border-slate-300 dark:border-zinc-700 pb-0.5">
                                {item}
                              </span>
                              {detail && <Info className="w-3 h-3 text-slate-400 opacity-60 ml-auto shrink-0 mt-0.5" />}
                            </div>

                            {/* Tooltip Popup on hover */}
                            {isHovered && detail && (
                              <div className="absolute left-0 bottom-full mb-2 z-30 w-64 p-3 rounded-xl shadow-xl border bg-slate-900 text-white border-slate-700 text-2xs leading-relaxed pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                                <div className="font-bold text-indigo-300 pb-1 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>Methodology Detail</span>
                                </div>
                                <p className="text-slate-200">{detail}</p>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Pricing & CTA Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xs ${theme.textMuted}`}>Starting at</span>
                    <span className={`text-xl font-extrabold ${theme.textPrimary}`}>
                      ₹{service.startingAt.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onInspectService(service)}
                      className={`py-2 px-2.5 rounded-xl border text-2xs font-semibold text-center cursor-pointer transition-colors ${theme.border} ${theme.textSecondary} hover:bg-slate-50 dark:hover:bg-zinc-800`}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSelectService(service)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        service.popular
                          ? `${theme.accent} text-white shadow-xs hover:opacity-95`
                          : `border ${theme.border} ${theme.textPrimary} hover:bg-slate-50 dark:hover:bg-zinc-800`
                      }`}
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
