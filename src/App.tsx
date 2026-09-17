import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProfile, Project, Service, InsightPost } from './types';
import { defaultProfile } from './data/profiles';
import { themeMap } from './utils/theme';
import { Header } from './components/Header';
import { HomepageRing } from './components/HomepageRing';
import { Hero } from './components/Hero';
import { FeaturedProjectSection } from './components/FeaturedProjectSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { InsightsSection } from './components/InsightsSection';
import { ArticleModal } from './components/ArticleModal';
import { ProjectCalculator } from './components/ProjectCalculator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Sparkles, Compass, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Layers, CheckCircle2, BookOpen, Calculator, User, Calendar, Check } from 'lucide-react';

const STORAGE_KEY = 'aditya_ranjan_swain_portfolio_v6';

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load profile from storage:', e);
    }
    return defaultProfile;
  });

  // Track the active page/section
  // 'home' displays the interactive spinning ring portal with profile picture on center-left
  const [activePage, setActivePage] = useState<string>(() => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      const valid = ['featured', 'work', 'services', 'insights', 'calculator', 'about', 'contact', 'all'];
      if (hash && valid.includes(hash)) {
        return hash;
      }
    } catch (e) {
      // fallback
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightPost | null>(null);
  const [inspectedService, setInspectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceTitle, setBookingServiceTitle] = useState<string | undefined>(undefined);
  const [bookingScopeDetails, setBookingScopeDetails] = useState<{ scope?: string; priceRange?: string } | undefined>(undefined);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to storage:', e);
    }
  }, [profile]);

  // Synchronize browser history / hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const valid = ['featured', 'work', 'services', 'insights', 'calculator', 'about', 'contact', 'all'];
      if (hash && valid.includes(hash)) {
        setActivePage(hash);
      } else if (hash === '' || hash === 'home') {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    if (pageId === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = pageId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (updated: PortfolioProfile) => {
    setProfile(updated);
  };

  const handleResetDefault = () => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleOpenBooking = (serviceTitle?: string) => {
    setBookingServiceTitle(serviceTitle);
    setBookingScopeDetails(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: Service) => {
    setBookingServiceTitle(service.title);
    setBookingScopeDetails({
      scope: service.deliverables.slice(0, 2).join(', '),
      priceRange: `Starting at ₹${service.startingAt.toLocaleString('en-IN')}`,
    });
    setIsBookingOpen(true);
  };

  const handleInspectService = (service: Service) => {
    setInspectedService(service);
  };

  const handleAddInsight = (newPost: InsightPost) => {
    setProfile((prev) => ({
      ...prev,
      insights: [newPost, ...(prev.insights || [])],
    }));
  };

  const handleBookWithEstimate = (estimateDetails: {
    service: string;
    scope: string;
    timeline: string;
    addons: string[];
    priceRange: string;
    estimatedMin: number;
    estimatedMax: number;
  }) => {
    setBookingServiceTitle(estimateDetails.service);
    setBookingScopeDetails({
      scope: `${estimateDetails.scope} • ${estimateDetails.timeline}`,
      priceRange: estimateDetails.priceRange,
    });
    setIsBookingOpen(true);
  };

  const handleBookCallForProject = (projectName: string) => {
    setBookingServiceTitle(`Case Study Discussion: ${projectName}`);
    setBookingScopeDetails({
      scope: `Interested in outcomes similar to ${projectName}`,
    });
    setIsBookingOpen(true);
  };

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  // Map of next sections for linear exploration
  const pageSequence = ['featured', 'work', 'services', 'insights', 'calculator', 'about', 'contact'];
  const currentIndex = pageSequence.indexOf(activePage);
  const nextSectionId = currentIndex !== -1 ? pageSequence[(currentIndex + 1) % pageSequence.length] : 'featured';
  const prevSectionId = currentIndex !== -1 ? pageSequence[(currentIndex - 1 + pageSequence.length) % pageSequence.length] : 'contact';

  const journeySteps = [
    { id: 'featured', number: 1, shortLabel: 'Case Study', fullLabel: 'Featured Case Study' },
    { id: 'work', number: 2, shortLabel: 'Projects', fullLabel: 'Selected Work & Projects' },
    { id: 'services', number: 3, shortLabel: 'Services', fullLabel: 'Services & Scope' },
    { id: 'insights', number: 4, shortLabel: 'Insights', fullLabel: 'Insights & Articles' },
    { id: 'calculator', number: 5, shortLabel: 'Estimator', fullLabel: 'Scope & Fee Estimator' },
    { id: 'about', number: 6, shortLabel: 'About', fullLabel: 'About & Principles' },
    { id: 'contact', number: 7, shortLabel: 'Contact', fullLabel: 'Contact & Fit Call' },
  ];

  const currentStepNumber = currentIndex !== -1 ? currentIndex + 1 : 0;
  const progressPercent = activePage === 'all' ? 100 : currentIndex !== -1 ? Math.round(((currentIndex + 1) / pageSequence.length) * 100) : 0;

  const sectionLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    featured: { label: 'Featured Case Study', icon: <Sparkles className="w-4 h-4 text-indigo-500" /> },
    work: { label: 'Selected Work & Projects', icon: <Layers className="w-4 h-4 text-blue-500" /> },
    services: { label: 'Services & Scope', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    insights: { label: 'Insights & Thought Leadership', icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
    calculator: { label: 'Scope & Fee Estimator', icon: <Calculator className="w-4 h-4 text-violet-500" /> },
    about: { label: 'About, Principles & Skills', icon: <User className="w-4 h-4 text-rose-500" /> },
    contact: { label: 'Contact & Fit Call', icon: <Calendar className="w-4 h-4 text-emerald-500" /> },
    all: { label: 'Full Portfolio (All Sections)', icon: <Compass className="w-4 h-4 text-indigo-500" /> },
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 selection:bg-indigo-500 selection:text-white ${theme.bg}`}>
      {/* Top Header */}
      <Header
        profile={profile}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Page Content */}
      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            /* ======================================================== */
            /* HOMEPAGE VIEW: ORBIT RING PORTAL (SCROLL ROTATES ORBIT)   */
            /* ======================================================== */
            <motion.div
              key="orbit-homepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomepageRing
                profile={profile}
                onNavigate={handleNavigate}
                onOpenBooking={(topic) => handleOpenBooking(topic)}
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
                onViewAllSections={() => handleNavigate('all')}
              />
            </motion.div>
          ) : (
            /* ======================================================== */
            /* DEDICATED REDIRECTED PAGE VIEW                          */
            /* ======================================================== */
            <motion.div
              key={`page-${activePage}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Top Breadcrumb & Return Bar with Visual Journey Progress Indicator */}
            <div className={`sticky top-20 z-30 border-b backdrop-blur-md transition-colors ${theme.surface}/95 ${theme.border}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-2">
                {/* Upper Row: Return button, Step Pill, Label, and Navigation Controls */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 min-w-0">
                    <button
                      onClick={() => handleNavigate('home')}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs shrink-0 ${theme.surface} ${theme.border} ${theme.textPrimary} hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-emerald-400`}
                      id="breadcrumb-return-orbit-hub"
                      title="Return to the Spinning Orbit Ring Hub"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <Compass className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                      <span className="inline">Orbit Ring</span>
                    </button>

                    <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline">/</span>

                    {/* Visual Journey Step Indicator Badge */}
                    {activePage === 'all' ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-emerald-950/80 text-indigo-700 dark:text-emerald-300 border border-indigo-200 dark:border-emerald-800 shrink-0 shadow-2xs">
                        <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                        <span>Full Portfolio (All Sections)</span>
                      </div>
                    ) : currentIndex !== -1 ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-emerald-950/80 text-indigo-700 dark:text-emerald-300 border border-indigo-200 dark:border-emerald-800 shrink-0 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-emerald-400 animate-pulse" />
                        <span>Step {currentStepNumber} of {pageSequence.length}</span>
                        <span className="text-indigo-500 dark:text-emerald-400 font-semibold">({progressPercent}%)</span>
                      </div>
                    ) : null}

                    {activePage !== 'all' && (
                      <div className={`flex items-center gap-2 text-xs sm:text-sm font-extrabold ${theme.textPrimary} shrink-0`}>
                        {sectionLabels[activePage]?.icon}
                        <span>{sectionLabels[activePage]?.label || 'Section'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs shrink-0">
                    {activePage !== 'all' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleNavigate(prevSectionId)}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-2xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${theme.surface} ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
                          title={`Previous Step: ${sectionLabels[prevSectionId]?.label}`}
                          id="breadcrumb-prev-step-btn"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Prev</span>
                        </button>

                        <button
                          onClick={() => handleNavigate(nextSectionId)}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-2xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${theme.surface} ${theme.border} ${theme.textPrimary} hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-emerald-400`}
                          title={`Next Step: ${sectionLabels[nextSectionId]?.label}`}
                          id="breadcrumb-next-step-btn"
                        >
                          <span className="hidden sm:inline">Next ({journeySteps[pageSequence.indexOf(nextSectionId)]?.shortLabel})</span>
                          <span className="sm:hidden text-3xs font-bold">Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => handleNavigate(activePage === 'all' ? 'home' : 'all')}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-2xs font-semibold transition-all cursor-pointer ${theme.surface} ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
                      title={activePage === 'all' ? 'Return to Orbit View' : 'View all 7 sections sequentially on one page'}
                    >
                      <Layers className="w-3 h-3 text-indigo-500 dark:text-emerald-400" />
                      <span className="hidden sm:inline">{activePage === 'all' ? 'Orbit View' : 'View Full Site'}</span>
                    </button>
                  </div>
                </div>

                {/* Visual Journey Stepper Track: 7-Segment Interactive Progress Stepper */}
                {activePage !== 'all' && (
                  <div className="pt-1 pb-0.5" id="portfolio-journey-stepper">
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 items-center">
                      {journeySteps.map((step, idx) => {
                        const isCurrent = step.id === activePage;
                        const isCompleted = idx < currentIndex;

                        return (
                          <button
                            key={step.id}
                            onClick={() => handleNavigate(step.id)}
                            className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-[1.03] text-left focus:outline-none"
                            title={`Step ${step.number}: ${step.fullLabel} (${isCurrent ? 'Current' : isCompleted ? 'Completed' : 'Upcoming'})`}
                            id={`journey-step-node-${step.id}`}
                          >
                            {/* Segment Bar with fill animations */}
                            <div className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden bg-slate-200/80 dark:bg-zinc-800/80 transition-all">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  isCurrent
                                    ? 'bg-indigo-600 dark:bg-emerald-400 shadow-sm'
                                    : isCompleted
                                    ? 'bg-indigo-500/75 dark:bg-emerald-500/70'
                                    : 'bg-transparent'
                                }`}
                              />
                            </div>

                            {/* Step Micro-Label (visible on tablet/desktop for high-end polish) */}
                            <div className="hidden md:flex items-center gap-1 mt-1 text-3xs font-medium">
                              <span
                                className={`font-mono text-4xs font-bold transition-colors ${
                                  isCurrent
                                    ? 'text-indigo-600 dark:text-emerald-400'
                                    : isCompleted
                                    ? 'text-indigo-500/70 dark:text-emerald-500/60'
                                    : 'text-slate-400 dark:text-zinc-600'
                                }`}
                              >
                                {step.number}
                              </span>
                              <span
                                className={`truncate max-w-[70px] lg:max-w-[85px] transition-colors ${
                                  isCurrent
                                    ? 'font-bold text-slate-900 dark:text-zinc-100'
                                    : isCompleted
                                    ? 'text-slate-600 dark:text-zinc-400'
                                    : 'text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300'
                                }`}
                              >
                                {step.shortLabel}
                              </span>
                              {isCompleted && (
                                <Check className="w-2.5 h-2.5 text-indigo-500 dark:text-emerald-400 shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Edge Visual Progress Line along the bottom of the sticky bar */}
              <div className="w-full h-[2px] bg-slate-200/50 dark:bg-zinc-800/50 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-500"
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Render Target Page Component */}
            {activePage === 'featured' && (
              <FeaturedProjectSection
                profile={profile}
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenBooking={(topic) => handleOpenBooking(topic)}
              />
            )}

            {activePage === 'work' && (
              <ProjectsSection
                profile={profile}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            )}

            {activePage === 'services' && (
              <ServicesSection
                profile={profile}
                onSelectService={handleSelectService}
                onInspectService={handleInspectService}
                onOpenEstimator={() => handleNavigate('calculator')}
              />
            )}

            {activePage === 'insights' && (
              <InsightsSection
                profile={profile}
                onSelectArticle={(article) => setSelectedArticle(article)}
                onAddInsight={handleAddInsight}
                onOpenBooking={(topic) => handleOpenBooking(topic)}
              />
            )}

            {activePage === 'calculator' && (
              <ProjectCalculator
                profile={profile}
                onBookWithEstimate={handleBookWithEstimate}
              />
            )}

            {activePage === 'about' && (
              <AboutSection
                profile={profile}
              />
            )}

            {activePage === 'contact' && (
              <ContactSection
                profile={profile}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            {/* If 'all' is active, render the full multi-section experience */}
            {activePage === 'all' && (
              <div className="space-y-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                  <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${theme.surface} ${theme.border}`}>
                    <div className="space-y-2 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-100 dark:bg-emerald-950/80 text-indigo-700 dark:text-emerald-300 border border-indigo-200 dark:border-emerald-800">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Full Portfolio (All Sections)</span>
                      </div>
                      <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme.textPrimary}`}>
                        End-to-End Portfolio & Complete Architecture Showcase
                      </h2>
                      <p className={`text-xs sm:text-sm max-w-2xl ${theme.textSecondary}`}>
                        Explore all 7 specialized portfolio milestones sequentially: from AI computer vision systems and real-time collaboration platforms to interactive fee estimation and engineering principles.
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavigate('home')}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm cursor-pointer transition-all ${theme.accent} ${theme.accentHover} text-white shrink-0`}
                    >
                      <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                      <span>Return to Orbit Ring View</span>
                    </button>
                  </div>
                </div>

                <Hero
                  profile={profile}
                  onOpenBooking={() => handleOpenBooking()}
                />
                <FeaturedProjectSection
                  profile={profile}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                  onOpenBooking={(topic) => handleOpenBooking(topic)}
                />
                <ProjectsSection
                  profile={profile}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                />
                <ServicesSection
                  profile={profile}
                  onSelectService={handleSelectService}
                  onInspectService={handleInspectService}
                  onOpenEstimator={() => {
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <InsightsSection
                  profile={profile}
                  onSelectArticle={(article) => setSelectedArticle(article)}
                  onAddInsight={handleAddInsight}
                  onOpenBooking={(topic) => handleOpenBooking(topic)}
                />
                <ProjectCalculator
                  profile={profile}
                  onBookWithEstimate={handleBookWithEstimate}
                />
                <AboutSection
                  profile={profile}
                />
                <ContactSection
                  profile={profile}
                  onOpenBooking={() => handleOpenBooking()}
                />
              </div>
            )}

            {/* Bottom Next Orbit Callout */}
            {activePage !== 'all' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 ${theme.surface} ${theme.border}`}>
                  <div className="space-y-2 text-center sm:text-left max-w-xl">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-emerald-950/60 text-indigo-700 dark:text-emerald-300 border border-indigo-200/80 dark:border-emerald-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-emerald-400 animate-pulse" />
                        Step {currentStepNumber} of 8 ({progressPercent}% Completed)
                      </span>
                    </div>

                    <h4 className={`text-base sm:text-lg font-bold ${theme.textPrimary}`}>
                      Next Milestone: {sectionLabels[nextSectionId]?.label}
                    </h4>

                    {/* Compact progress bar */}
                    <div className="w-full max-w-xs h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden mx-auto sm:mx-0">
                      <div
                        className="h-full bg-indigo-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <p className={`text-xs ${theme.textSecondary}`}>
                      Continue sequentially through all 7 curated portfolio milestones or return to the Orbit Ring Hub.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
                    <button
                      onClick={() => handleNavigate('home')}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${theme.surface} ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
                    >
                      <Compass className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
                      <span>Orbit Ring Hub</span>
                    </button>

                    <button
                      onClick={() => handleNavigate(nextSectionId)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95 ${theme.accent} ${theme.accentHover}`}
                    >
                      <span>Continue to Step {pageSequence.indexOf(nextSectionId) + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <Footer
              profile={profile}
              onOpenBooking={() => handleOpenBooking()}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* Deep-Dive Case Study Modal with Interactive Slider */}
      <CaseStudyModal
        project={selectedProject}
        profile={profile}
        onClose={() => setSelectedProject(null)}
        onBookCallForProject={handleBookCallForProject}
      />

      {/* Full Interactive Article / Thought Leadership Modal */}
      <ArticleModal
        article={selectedArticle}
        profile={profile}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={(topic) => handleOpenBooking(topic)}
        onSelectService={(serviceId) => {
          const matched = profile.services.find((s) => s.id === serviceId);
          if (matched) {
            handleSelectService(matched);
          } else {
            handleOpenBooking(serviceId);
          }
        }}
      />

      {/* Interactive Service Detail & Connected Proof Modal */}
      <ServiceDetailModal
        service={inspectedService}
        profile={profile}
        onClose={() => setInspectedService(null)}
        onSelectServiceForBooking={(service) => handleSelectService(service)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Interactive Calendly-Style Booking & Schedule Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        profile={profile}
        initialServiceTitle={bookingServiceTitle}
        initialScopeDetails={bookingScopeDetails}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Live Customizer & Industry Presets Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        profile={profile}
        onClose={() => setIsCustomizerOpen(false)}
        onUpdateProfile={handleUpdateProfile}
        onResetDefault={handleResetDefault}
      />

      {/* Floating Buttons in Bottom Corner */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* If on a redirected page, show quick floating button to return to the Orbit Ring */}
        {activePage !== 'home' && (
          <button
            onClick={() => handleNavigate('home')}
            className={`p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl border flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md bg-slate-900 text-white border-indigo-500`}
            title="Return to Orbit Ring Homepage"
            id="floating-orbit-return-btn"
          >
            <Compass className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="hidden sm:inline text-xs font-bold">Orbit Hub</span>
          </button>
        )}

        {/* Floating Quick Customizer Button */}
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className={`p-3 sm:px-3.5 sm:py-3 rounded-full shadow-xl border flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md ${theme.surface} ${theme.border} ${theme.textPrimary}`}
          title="Customize Portfolio (Switch Presets, Theme, or edit text)"
          id="floating-customizer-btn"
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-emerald-400" />
          <span className="hidden md:inline text-xs font-bold">Customize Site</span>
        </button>
      </div>
    </div>
  );
}
