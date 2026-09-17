import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface ProjectCalculatorProps {
  profile: PortfolioProfile;
  onBookWithEstimate: (estimateDetails: {
    service: string;
    scope: string;
    timeline: string;
    addons: string[];
    priceRange: string;
    estimatedMin: number;
    estimatedMax: number;
  }) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  profile,
  onBookWithEstimate,
}) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const [scopeTier, setScopeTier] = useState<'mvp' | 'standard' | 'enterprise'>('standard');
  const [urgency, setUrgency] = useState<'standard' | 'rush' | 'flexible'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const services = profile.services;
  const currentService = services[selectedServiceIndex] || services[0];

  const scopeMultipliers = {
    mvp: { label: 'Focused Sprint / MVP', mult: 0.8, timeOffset: '-1 week', desc: 'Core 3-6 key screens or targeted audit' },
    standard: { label: 'Full Product Architecture', mult: 1.0, timeOffset: 'Standard', desc: 'Complete 8-15 flows, component library & QA specs' },
    enterprise: { label: 'Multi-Squad Enterprise', mult: 1.6, timeOffset: '+2-3 weeks', desc: 'Complex workflows, cross-platform & custom design ops' },
  };

  const urgencyMultipliers = {
    flexible: { label: 'Flexible (Next Quarter)', mult: 0.95, tag: '-5% Early Booking' },
    standard: { label: 'Standard Delivery', mult: 1.0, tag: 'Most Popular' },
    rush: { label: 'Accelerated Priority Sprint', mult: 1.25, tag: '+25% Priority Queue' },
  };

  const addonsList = [
    { id: 'socket-sync', name: 'Socket.io / WebSockets Real-Time Sync Layer', price: 6500 },
    { id: 'docker-setup', name: 'Docker & Docker Compose Containerization', price: 4500 },
    { id: 'stripe-billing', name: 'Stripe Payment Gateway & Webhook Integration', price: 5500 },
    { id: 'ai-vision', name: 'DeepFace & OpenCV Computer Vision Pipeline', price: 8500 },
    { id: 'rbac-auth', name: 'Role-Based Access Control (RBAC) & JWT Security', price: 4000 },
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculation = useMemo(() => {
    const base = currentService ? currentService.startingAt : 15000;
    const scopeMult = scopeMultipliers[scopeTier].mult;
    const urgMult = urgencyMultipliers[urgency].mult;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const match = addonsList.find((a) => a.id === addonId);
      return sum + (match ? match.price : 0);
    }, 0);

    const calculatedBase = Math.round((base * scopeMult * urgMult) + addonsTotal);
    const min = Math.round(calculatedBase * 0.95);
    const max = Math.round(calculatedBase * 1.15);

    return {
      min,
      max,
      rangeStr: `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`,
    };
  }, [currentService, scopeTier, urgency, selectedAddons]);

  const handleBook = () => {
    onBookWithEstimate({
      service: currentService.title,
      scope: scopeMultipliers[scopeTier].label,
      timeline: `${currentService.timeline} (${urgencyMultipliers[urgency].label})`,
      addons: selectedAddons.map((id) => addonsList.find((a) => a.id === id)?.name || id),
      priceRange: calculation.rangeStr,
      estimatedMin: calculation.min,
      estimatedMax: calculation.max,
    });
  };

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Investment Estimator</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
            Calculate your project scope & investment in seconds.
          </h2>
          <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
            No ambiguity, no hidden surprise fees. Customize deliverables below to see a realistic estimate and delivery timeline.
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left 7 Cols) */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-8 shadow-xs ${theme.surface} ${theme.border}`}>
            
            {/* Step 1: Service Type */}
            <div className="space-y-3">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                1. Select Engagement Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((srv, idx) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedServiceIndex === idx
                        ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.badgeBg}`
                        : `border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${theme.textPrimary}`}>
                        {srv.title.split('&')[0]}
                      </span>
                      <span className={`text-xs font-semibold ${theme.textMuted}`}>
                        From ₹{srv.startingAt.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-zinc-400 block mt-1 line-clamp-1">
                      {srv.timeline}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scope Scale */}
            <div className="space-y-3">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                2. Project Scale & Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['mvp', 'standard', 'enterprise'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setScopeTier(key)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      scopeTier === key
                        ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.badgeBg}`
                        : `border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700`
                    }`}
                  >
                    <div className={`text-xs font-bold ${theme.textPrimary}`}>
                      {scopeMultipliers[key].label}
                    </div>
                    <p className="text-2xs text-slate-500 dark:text-zinc-400 mt-1 leading-snug">
                      {scopeMultipliers[key].desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Urgency & Speed */}
            <div className="space-y-3">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                3. Delivery Timeline Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['standard', 'rush', 'flexible'] as const).map((urg) => (
                  <button
                    key={urg}
                    onClick={() => setUrgency(urg)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      urgency === urg
                        ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.badgeBg}`
                        : `border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700`
                    }`}
                  >
                    <div className={`text-xs font-bold ${theme.textPrimary}`}>
                      {urgencyMultipliers[urg].label}
                    </div>
                    <span className="inline-block mt-1 text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                      {urgencyMultipliers[urg].tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div className="space-y-3">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                4. Value Add-ons (Optional)
              </label>
              <div className="space-y-2">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? `border-indigo-600 dark:border-emerald-500 ${theme.badgeBg}`
                          : `border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-indigo-600 dark:bg-emerald-500 border-indigo-600 text-white'
                              : 'border-slate-300 dark:border-zinc-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${theme.textPrimary}`}>
                          {addon.name}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold ${theme.textSecondary}`}>
                        +₹{addon.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Real-time Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-md ${theme.surface} ${theme.border}`}>
              
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Live Scope Estimate
                </span>
                <div className={`text-3xl sm:text-4xl font-black tracking-tight ${theme.textPrimary}`}>
                  {calculation.rangeStr}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Estimated range based on standard requirements. Final fixed-bid quote provided during discovery call.
                </p>
              </div>

              {/* Estimate Breakdown Details */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs">
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Selected Track:</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>{currentService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Project Scope:</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>{scopeMultipliers[scopeTier].label}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Estimated Timeline:</span>
                  <span className={`font-semibold text-emerald-600 dark:text-emerald-400`}>
                    {currentService?.timeline}
                  </span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className={theme.textMuted}>Add-ons Selected:</span>
                    <span className={`font-semibold ${theme.textPrimary}`}>{selectedAddons.length} item(s)</span>
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Transparent Fixed-Fee Milestone Terms</span>
                </div>
                <p className="text-2xs text-slate-500 dark:text-zinc-400 leading-normal">
                  50% deposit upon kickoff, 50% upon final production sign-off. Never billed for unapproved hours.
                </p>
              </div>

              {/* Book Call Action */}
              <button
                onClick={handleBook}
                id="calculator-book-estimate-btn"
                className={`w-full py-4 px-6 rounded-xl font-semibold text-sm text-white shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${theme.accent} ${theme.accentHover}`}
              >
                <span>Book Call with this Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
