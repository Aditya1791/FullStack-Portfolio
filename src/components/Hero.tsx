import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, MapPin, Clock, Sparkles, CheckCircle2, ChevronDown, Calculator } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface HeroProps {
  profile: PortfolioProfile;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenBooking }) => {
  const [timeString, setTimeString] = useState<string>('');
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const clientLogos = [
    { name: 'MERN STACK', style: 'font-bold tracking-wider text-slate-500 dark:text-zinc-400' },
    { name: 'REACT.JS', style: 'font-black tracking-widest text-indigo-500 dark:text-emerald-400' },
    { name: 'NODE & EXPRESS', style: 'font-mono font-bold tracking-widest text-slate-500 dark:text-zinc-400' },
    { name: 'PYTHON & FLASK', style: 'font-bold tracking-tight text-slate-500 dark:text-zinc-400' },
    { name: 'SOCKET.IO', style: 'font-semibold tracking-wider text-slate-500 dark:text-zinc-400' },
    { name: 'DEEPFACE & OPENCV', style: 'font-bold tracking-wide text-indigo-500 dark:text-emerald-400' },
  ];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden" id="hero">
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-40">
        <div className="w-[600px] h-[350px] rounded-full blur-3xl bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-100/30 dark:from-emerald-950/20 dark:via-zinc-900/10 dark:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Metadata pill: Location & Live Clock */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full border shadow-2xs text-xs font-medium backdrop-blur-xs bg-white/80 dark:bg-zinc-900/80 border-slate-200/80 dark:border-zinc-800">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
              <span>{profile.location}</span>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Local Time: {timeString || 'Current'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{profile.availability.label}</span>
            </span>
          </div>

          {/* Main Title & Role */}
          <div className="space-y-4">
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] ${theme.textPrimary}`}>
              {profile.role.split('&')[0]}
              <span className={`block font-serif-display font-normal italic mt-2 ${theme.accentText}`}>
                {profile.role.split('&')[1] ? `& ${profile.role.split('&')[1]}` : ''}
              </span>
            </h1>

            {/* One-line Pitch */}
            <p className={`text-lg sm:text-2xl font-normal max-w-3xl mx-auto leading-relaxed pt-2 ${theme.textSecondary}`}>
              {profile.oneLinePitch}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenBooking()}
              id="hero-book-call-btn"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer ${theme.accent} ${theme.accentHover}`}
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="#calculator"
              id="hero-estimate-cta"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold border transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textPrimary} ${theme.surfaceHover}`}
            >
              <Calculator className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
              <span>Estimate Project Scope</span>
            </a>

            <a
              href="#work"
              id="hero-view-work-cta"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold border transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
            >
              <span>Selected Work (3-5 Cases)</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-10">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl border shadow-xs ${theme.surface} ${theme.border}`}>
              {profile.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`text-center space-y-1 ${
                    idx !== 0 ? 'sm:border-l sm:border-slate-200/70 sm:dark:border-zinc-800' : ''
                  }`}
                >
                  <div className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold ${theme.textSecondary}`}>
                    {stat.label}
                  </div>
                  {stat.detail && (
                    <div className={`text-xs ${theme.textMuted}`}>
                      {stat.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Client Trust Logotype Bar */}
          <div className="pt-6 space-y-3">
            <p className={`text-xs uppercase tracking-widest font-semibold ${theme.textMuted}`}>
              Core Technologies & Engineering Stack
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 py-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              {clientLogos.map((client) => (
                <span key={client.name} className={`text-sm sm:text-base ${client.style}`}>
                  {client.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
