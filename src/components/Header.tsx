import React, { useState } from 'react';
import { Menu, X, Calendar, Sparkles, SlidersHorizontal, ArrowUpRight, Compass } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface HeaderProps {
  profile: PortfolioProfile;
  activePage?: string;
  onNavigate?: (page: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenCustomizer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activePage = 'home',
  onNavigate,
  onOpenBooking,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const navLinks = [
    { label: 'Featured', id: 'featured' },
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'Insights', id: 'insights' },
    { label: 'Estimator', id: 'calculator' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${theme.surface}/90 ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex flex-col focus:outline-none text-left cursor-pointer"
              id="header-brand-link"
              title="Return to Orbit Ring Homepage"
            >
              <div className="flex items-center gap-2">
                <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${theme.textPrimary}`}>
                  {profile.name}
                </span>
                {activePage === 'home' && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-3xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-emerald-950/60 text-indigo-600 dark:text-emerald-400">
                    <Compass className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '8s' }} />
                    Orbit Hub
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium tracking-wide ${theme.textMuted}`}>
                {profile.role.split('&')[0].trim()}
              </span>
            </button>
          </div>

          {/* Elongated Availability Banner */}
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-2xs backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-slate-200/80 dark:border-zinc-800 shrink-0 max-w-2xl mx-auto">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-zinc-200 truncate">
              <span className="font-bold text-slate-900 dark:text-white">Immediate Availability:</span>{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Available for Full-Time Roles & Opportunities</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Customizer / Edit profile button */}
            <button
              onClick={onOpenCustomizer}
              id="header-customize-btn"
              className={`hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
              title="Customize Name, Bio, Services, or switch industry presets"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
              <span>Customize Site</span>
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={() => onOpenBooking()}
              id="header-book-call-btn"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg text-white shadow-sm transition-all transform active:scale-95 cursor-pointer ${theme.accent} ${theme.accentHover}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Discovery Call</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border cursor-pointer ${theme.border} ${theme.textSecondary}`}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 ${theme.surface} ${theme.border}`}>
          <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Immediate Availability: Available for Full-Time Roles & Opportunities</span>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                activePage === 'home'
                  ? 'bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-emerald-400 font-semibold'
                  : `${theme.surfaceHover} ${theme.textSecondary}`
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Orbit Ring Hub</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className={`w-full py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 ${theme.border} ${theme.textSecondary}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Customize Details & Theme</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className={`w-full py-2.5 px-3 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-2 ${theme.accent}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Discovery Call</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
