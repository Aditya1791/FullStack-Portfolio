import React from 'react';
import { ArrowUp, Heart, Sparkles, MapPin, Globe } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface FooterProps {
  profile: PortfolioProfile;
  onOpenBooking: () => void;
  onOpenCustomizer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenBooking }) => {
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${theme.surface} ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top Tier: Brand Statement & CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-slate-100 dark:border-zinc-800">
          <div className="space-y-2 max-w-xl">
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
              {profile.brandTitle}
            </h3>
            <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>
              {profile.oneLinePitch}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-xs ${theme.accent} ${theme.accentHover} transition-all cursor-pointer`}
            >
              Book Discovery Call
            </button>
          </div>
        </div>

        {/* Middle Tier: Links & Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <span className={`font-bold uppercase tracking-wider ${theme.textMuted}`}>Navigation</span>
            <ul className="space-y-2">
              <li><a href="#work" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>Selected Work</a></li>
              <li><a href="#services" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>Services & Packages</a></li>
              <li><a href="#calculator" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>Project Fee Estimator</a></li>
              <li><a href="#about" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>Background & Philosophy</a></li>
              <li><a href="#contact" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>Contact Inquiry</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className={`font-bold uppercase tracking-wider ${theme.textMuted}`}>Channels</span>
            <ul className="space-y-2">
              <li>
                <a href={profile.contactInfo.linkedin} target="_blank" rel="noreferrer" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a href={profile.contactInfo.github} target="_blank" rel="noreferrer" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>
                  GitHub Repositories
                </a>
              </li>
              <li>
                <a href={profile.contactInfo.dribbble} target="_blank" rel="noreferrer" className={`${theme.textSecondary} hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors`}>
                  Dribbble Design Feed
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className={`font-bold uppercase tracking-wider ${theme.textMuted}`}>Engagement</span>
            <div className="space-y-2 text-slate-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>{profile.availability.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
              </div>
              <div>Standard response: Within 24 hours</div>
              <div>NDA / Mutual confidential disclosure available</div>
            </div>
          </div>

          <div className="space-y-3">
            <span className={`font-bold uppercase tracking-wider ${theme.textMuted}`}>Direct Inquiry</span>
            <p className={`leading-relaxed ${theme.textSecondary}`}>
              Email me directly at <br />
              <a href={`mailto:${profile.contactInfo.email}`} className="font-mono font-semibold text-indigo-600 dark:text-emerald-400 hover:underline">
                {profile.contactInfo.email}
              </a>
            </p>
            <p className={`text-2xs ${theme.textMuted}`}>
              Calendly integration active for direct calendar bookings.
            </p>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Back To Top */}
        <div className="pt-8 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className={theme.textMuted}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Crafted with precision for enterprise and venture-backed clients.
          </div>

          <button
            onClick={scrollToTop}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
