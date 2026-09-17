import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  BookOpen,
  Calculator,
  User,
  MessageSquareQuote,
  Calendar,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Compass,
  MapPin,
  Clock,
  SlidersHorizontal,
  ChevronRight,
  MousePointerClick,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

export interface RingSectionItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  badge: string;
  iconName: string;
  statHighlight: string;
  previewUrl?: string;
  colorScheme: string;
}

interface HomepageRingProps {
  profile: PortfolioProfile;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (topic?: string) => void;
  onOpenCustomizer: () => void;
  onViewAllSections: () => void;
}

export const HomepageRing: React.FC<HomepageRingProps> = ({
  profile,
  onNavigate,
  onOpenBooking,
  onOpenCustomizer,
  onViewAllSections,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Rotation angle in radians
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>('');

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  // Keep live local clock updated
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

  // Define the 8 portfolio destination pages mapped on the ring
  const ringSections: RingSectionItem[] = useMemo(() => [
    {
      id: 'featured',
      title: 'Featured Project: AI Proctoring',
      shortTitle: 'Featured',
      category: 'AI & Full-Stack System',
      description: 'Smart AI-Based Proctoring System with DeepFace facial verification, OpenCV gaze tracking & 15+ language compiler.',
      badge: 'DeepFace & OpenCV',
      iconName: 'Sparkles',
      statHighlight: '15+ Language Compiler',
      previewUrl: profile.projects[0]?.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'work',
      title: 'Selected Work & Projects',
      shortTitle: 'Portfolio',
      category: 'Full-Stack Applications',
      description: 'Real-Time Kanban with Socket.io, Remote Assessment Portal with RBAC, and AI platforms.',
      badge: `${profile.projects.length} Flagship Projects`,
      iconName: 'Layers',
      statHighlight: 'MERN & Python Stack',
      previewUrl: profile.projects[1]?.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'services',
      title: 'Technical Services & Capabilities',
      shortTitle: 'Services',
      category: 'Development Capabilities',
      description: 'Full-stack web apps, real-time Socket.io systems, AI/ML computer vision, and interactive React UI.',
      badge: `Starting at ₹${(profile.services[0]?.startingAt || 15000).toLocaleString('en-IN')}`,
      iconName: 'CheckCircle2',
      statHighlight: '4 Core Service Offerings',
      previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'insights',
      title: 'Technical Insights & Articles',
      shortTitle: 'Articles',
      category: 'Engineering Architecture',
      description: 'Deep dives on Socket.io optimistic UI rollbacks, DeepFace biometrics, and RBAC exam engines.',
      badge: `${profile.insights?.length || 3} Technical Articles`,
      iconName: 'BookOpen',
      statHighlight: 'System Design & Code',
      previewUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-amber-500 to-orange-600',
    },
    {
      id: 'calculator',
      title: 'Scope & Project Fee Estimator',
      shortTitle: 'Estimator',
      category: 'Interactive Calculator',
      description: 'Estimate engineering scope, sprint velocity, and custom add-ons like Docker & AI integrations.',
      badge: 'Interactive Tool',
      iconName: 'Calculator',
      statHighlight: 'Transparent Budget Matrix',
      previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-violet-500 to-pink-600',
    },
    {
      id: 'about',
      title: 'About, Education & Skills',
      shortTitle: 'About Me',
      category: 'Background & Toolkit',
      description: 'B.Tech CSE student at Trident Academy. Education, certifications, achievements, and tech stack.',
      badge: 'Resume & Academic Background',
      iconName: 'User',
      statHighlight: '30+ Specialized Skills',
      previewUrl: profile.avatar,
      colorScheme: 'from-rose-500 to-red-600',
    },
    {
      id: 'contact',
      title: 'Schedule Discovery Call',
      shortTitle: 'Contact',
      category: 'Start a Project',
      description: 'Book a 30-min strategy alignment session to review your roadmap and explore fit.',
      badge: `${profile.availability.label}`,
      iconName: 'Calendar',
      statHighlight: 'Quick 24h Response',
      previewUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      colorScheme: 'from-emerald-600 to-green-700',
    },
  ], [profile]);

  const totalSections = ringSections.length;
  const angleStep = (2 * Math.PI) / totalSections;

  // Determine which section is currently closest to the active target angle (e.g. at 0 radians / right focal point)
  // Target focal angle: 0 (rightmost point of the ring arc)
  const normalizedAngle = ((rotationAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  
  // Calculate active index
  const activeIndex = useMemo(() => {
    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < totalSections; i++) {
      const nodeAngle = ((rotationAngle + i * angleStep) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      let diff = Math.abs(nodeAngle - 0);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    return closestIdx;
  }, [rotationAngle, angleStep, totalSections]);

  const activeSection = ringSections[activeIndex] || ringSections[0];

  // Helper to snap to a specific section
  const handleSnapToSection = (index: number) => {
    const targetAngle = -index * angleStep;
    setRotationAngle(targetAngle);
  };

  // Keyboard navigation (Arrow keys rotate the ring)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setRotationAngle((prev) => prev - angleStep);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setRotationAngle((prev) => prev + angleStep);
      } else if (e.key === 'Enter') {
        if (activeSection?.id) {
          onNavigate(activeSection.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [angleStep, onNavigate, activeSection]);

  // Scroll wheel rotates the orbit ring directly
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent browser default and rotate the orbit
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80) * 0.003;
      setRotationAngle((prev) => (prev - delta) % (2 * Math.PI));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch swipe rotates the orbit ring on mobile devices
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diffY = startY - currentY;
      startY = currentY;
      const delta = diffY * 0.003;
      setRotationAngle((prev) => (prev - delta) % (2 * Math.PI));
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Continuous smooth, rock-steady auto-spin orbital motion using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      // Clamp delta to prevent fast acceleration after tab blur or frame delays
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;

      // Steady gentle orbital velocity (approx 1 full revolution every ~45s)
      const speed = 0.00014;
      setRotationAngle((prev) => (prev - speed * delta) % (2 * Math.PI));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Helper to get Lucide icon component
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Calculator':
        return <Calculator className={className} />;
      case 'User':
        return <User className={className} />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote className={className} />;
      case 'Calendar':
        return <Calendar className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  // Dimensions of the Tony Stark Inverted Möbius Quantum Strip adapted to viewport
  // radiusY is carefully calibrated to prevent vertical clipping on any screen height
  const [dimensions, setDimensions] = useState<{ radiusX: number; radiusY: number }>({
    radiusX: 520,
    radiusY: 195,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ radiusX: 200, radiusY: 90 });
      } else if (w < 1024) {
        setDimensions({ radiusX: 350, radiusY: 140 });
      } else {
        setDimensions({ radiusX: 520, radiusY: 195 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { radiusX, radiusY } = dimensions;

  // Transverse coordinate tick markers connecting inner and outer rails around the Oval Orbit
  const orbitCrosslines = useMemo(() => {
    const count = 36;
    const lines = [];
    const cx = 575;
    const cy = 290;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 2 * Math.PI;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const px = radiusX * cosT;
      const py = radiusY * sinT;

      // Normal vector on ellipse: tangent is (-radiusX*sinT, radiusY*cosT), normal is (radiusY*cosT, radiusX*sinT)
      const nx0 = radiusY * cosT;
      const ny0 = radiusX * sinT;
      const len = Math.hypot(nx0, ny0) || 1;
      const nx = nx0 / len;
      const ny = ny0 / len;

      lines.push({
        x1: cx + px + nx * 14,
        y1: cy + py + ny * 14,
        x2: cx + px - nx * 14,
        y2: cy + py - ny * 14,
        highlight: i % 4 === 0,
      });
    }
    return lines;
  }, [radiusX, radiusY]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-[calc(100vh-80px)] min-h-[640px] max-h-[1080px] overflow-hidden flex flex-col justify-between ${theme.bg} select-none`}
      id="homepage-orbital-portal"
    >
      {/* Background ambient lighting and Stark Quantum particle auras */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Quantum cyan & indigo glow */}
        <div className="absolute left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-3xl opacity-35 bg-gradient-to-tr from-cyan-400/20 via-indigo-500/25 to-purple-600/20 dark:from-cyan-950/40 dark:via-indigo-950/40 dark:to-transparent" />
        <div className="absolute left-[68%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-500/20 via-cyan-400/20 to-emerald-500/15 dark:from-indigo-950/30 dark:via-cyan-950/20 dark:to-transparent" />
        {/* Subtle geometric holographic grid circles */}
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-slate-200/40 dark:border-cyan-800/15 opacity-25" />
      </div>

      {/* Top Notification Bar / Quick status helper */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-2xs text-2xs font-medium backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-slate-200/80 dark:border-zinc-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-slate-600 dark:text-zinc-300">
            {profile.availability.quarter}: <strong className="text-cyan-600 dark:text-cyan-400">{profile.availability.label}</strong>
          </span>
          <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline">•</span>
          <span className="text-slate-500 dark:text-zinc-400 hidden sm:flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-500" />
            {timeString || profile.location}
          </span>
        </div>

        {/* Quick controls: View All Sections button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onViewAllSections}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${theme.surface} ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
            title="Browse traditional long-scroll page with all sections"
          >
            <span>View All Sections</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-6 my-auto">
        
        {/* ========================================================= */}
        {/* LEFT: EXPANDED PROFILE PIC, NAME & SHIPPED SYSTEMS PANEL */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[46%] xl:w-[48%] z-20 space-y-5 my-auto py-2 relative pointer-events-auto"
        >
          {/* Top Hero Identity Row: Larger Arc-Reactor Profile Avatar & Titles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative group shrink-0"
            >
              {/* Pulsating Quantum Arc Reactor Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.35, 0.6, 0.35],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-400/40 via-indigo-500/40 to-blue-500/40 blur-xl group-hover:blur-2xl transition-all"
              />

              {/* Stark Arc Reactor Holographic Ring Accent */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full p-1.5 border-2 border-cyan-400/70 dark:border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-white dark:bg-slate-950 overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Status Indicator Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 500, damping: 18 }}
                className="absolute bottom-1 right-1 px-2 py-0.5 bg-slate-900 text-cyan-400 rounded-full shadow-lg border border-cyan-500/50 flex items-center gap-1.5 text-3xs font-mono font-bold"
              >
                <span className="block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>ONLINE</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5 min-w-0"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-3xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-3 h-3 text-cyan-500" />
                <span>Full-Stack & Systems Developer</span>
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none ${theme.textPrimary}`}>
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-cyan-400">
                {profile.role}
              </p>
              <div className="flex items-center gap-3 text-2xs text-slate-500 dark:text-zinc-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  {profile.location}
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Available for Hire
                </span>
              </div>
            </motion.div>
          </div>

          {/* EXPANDED SHIPPED SYSTEMS & VALUE PROPOSITION HERO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 sm:p-5 rounded-3xl border shadow-xl space-y-4 backdrop-blur-xl ${theme.surface}/95 ${theme.border}`}
          >
            {/* Value Pitch */}
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${theme.textSecondary}`}>
              "{profile.oneLinePitch}"
            </p>

            {/* Shipped Systems Showcase Badges */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-2xs">
                <span className="font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Flagship Shipped Systems</span>
                </span>
                <span className="text-3xs font-mono text-slate-400">Production Ready</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-2xl bg-indigo-50/70 dark:bg-zinc-900/80 border border-indigo-100 dark:border-zinc-800 space-y-0.5">
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 truncate">
                    AI Proctoring
                  </div>
                  <div className="text-3xs text-slate-500 dark:text-zinc-400 truncate">
                    DeepFace & 15+ Compilers
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-cyan-50/70 dark:bg-zinc-900/80 border border-cyan-100 dark:border-zinc-800 space-y-0.5">
                  <div className="text-xs font-bold text-cyan-700 dark:text-cyan-300 truncate">
                    Real-Time Kanban
                  </div>
                  <div className="text-3xs text-slate-500 dark:text-zinc-400 truncate">
                    Socket.io & Optimistic UI
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-zinc-900/80 border border-emerald-100 dark:border-zinc-800 space-y-0.5">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 truncate">
                    Assessment Portal
                  </div>
                  <div className="text-3xs text-slate-500 dark:text-zinc-400 truncate">
                    RBAC & Anti-Cheat
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center justify-between text-3xs font-mono text-slate-500 dark:text-zinc-400 pt-1">
              <span>★ 100% SATISFACTION</span>
              <span>•</span>
              <span>30+ TECH SKILLS</span>
              <span>•</span>
              <span>B.TECH CSE</span>
            </div>
          </motion.div>

          {/* Action Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBooking()}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-98 ${theme.accent} ${theme.accentHover}`}
              id="ring-schedule-call-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCustomizer}
              className={`px-4 py-3 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors ${theme.surface} ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
              title="Customize Name, Bio, or switch industry role preset"
              id="ring-customize-btn"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-500" />
              <span>Customize Site</span>
            </motion.button>
          </motion.div>

        </motion.div>

        {/* ========================================================================= */}
        {/* RIGHT: TONY STARK INVERTED MÖBIUS STRIP TIME-TRAVEL NAVIGATION MODEL     */}
        {/* ========================================================================= */}
        <motion.div
          ref={ringRef}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[68%] lg:-ml-36 xl:-ml-44 h-[380px] sm:h-[460px] lg:h-[540px] relative flex items-center justify-center pointer-events-auto z-10 -translate-y-6 sm:-translate-y-10 lg:-translate-y-14"
        >
          {/* Holographic Glowing 3D Oval Orbit SVG Ribbon */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 1150 580"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Quantum Cyan Stark Glow */}
              <linearGradient id="starkQuantumGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#8b5cf6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
              </linearGradient>

              {/* Holographic Secondary Orbit Rail Gradient */}
              <linearGradient id="starkRibbonRail" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
              </linearGradient>

              <radialGradient id="eigenvalueNexusAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>

              {/* Stark Hologram Bloom Filter */}
              <filter id="starkBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="1.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central Orbital Nexus Ambient Glow */}
            <ellipse cx="575" cy="290" rx="340" ry="170" fill="url(#eigenvalueNexusAura)" className="animate-pulse" style={{ animationDuration: '6s' }} />

            {/* Transverse Coordinate Crossbars connecting the Oval rails */}
            {orbitCrosslines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.highlight ? '#38bdf8' : 'currentColor'}
                strokeWidth={line.highlight ? '1.8' : '0.8'}
                className={line.highlight ? 'opacity-80' : 'text-slate-300 dark:text-cyan-900 opacity-35'}
              />
            ))}

            {/* OUTER OVAL RAIL */}
            <ellipse
              cx="575"
              cy="290"
              rx={radiusX + 16}
              ry={radiusY + 12}
              stroke="url(#starkRibbonRail)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              className="opacity-60"
            />

            {/* INNER OVAL RAIL */}
            <ellipse
              cx="575"
              cy="290"
              rx={radiusX - 16}
              ry={radiusY - 12}
              stroke="url(#starkRibbonRail)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              className="opacity-60"
            />

            {/* MAIN GLOWING 3D CORE OVAL STRIP */}
            <ellipse
              cx="575"
              cy="290"
              rx={radiusX}
              ry={radiusY}
              stroke="url(#starkQuantumGlow)"
              strokeWidth="3.5"
              strokeDasharray="12 6"
              filter="url(#starkBloom)"
              className="opacity-95"
            />

            {/* Solid Ultra-Fine Center Superconducting Filament */}
            <ellipse
              cx="575"
              cy="290"
              rx={radiusX}
              ry={radiusY}
              stroke="#ffffff"
              strokeWidth="0.8"
              className="opacity-50 dark:opacity-40"
            />

            {/* Dynamic Quantum Ray to Active Section Node */}
            {(() => {
              const activeAngle = rotationAngle + activeIndex * angleStep;
              const activeX = 575 + Math.cos(activeAngle) * radiusX;
              const activeY = 290 + Math.sin(activeAngle) * radiusY;
              return (
                <g>
                  {/* Glowing wide laser ray */}
                  <line
                    x1="575"
                    y1="290"
                    x2={activeX}
                    y2={activeY}
                    stroke="url(#starkQuantumGlow)"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    className="opacity-40 animate-pulse"
                  />
                  {/* Sharp central ray */}
                  <line
                    x1="575"
                    y1="290"
                    x2={activeX}
                    y2={activeY}
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    className="opacity-70"
                  />
                  {/* Target Reticle */}
                  <circle cx={activeX} cy={activeY} r="16" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-70 animate-spin" style={{ animationDuration: '8s' }} />
                </g>
              );
            })()}

            {/* Central Eigenvalue Spectral Nexus Core */}
            <g className="transition-transform duration-700">
              <circle cx="575" cy="290" r="32" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="575" cy="290" r="20" fill="url(#starkQuantumGlow)" className="opacity-30 animate-pulse" />
              <circle cx="575" cy="290" r="8.5" fill="url(#starkQuantumGlow)" />
              <circle cx="575" cy="290" r="3.5" fill="#ffffff" />
            </g>
          </svg>

          {/* Central Holographic Telemetry HUD Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 pointer-events-none text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 space-y-1 min-w-[210px] sm:min-w-[250px] max-w-[290px] block"
          >
            <div className="p-3 sm:p-4 rounded-2xl backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border-2 border-cyan-500/50 dark:border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.3)] space-y-1.5">
              <div className="flex items-center justify-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  EXPLORE PORTFOLIO
                </span>
              </div>
              <span className="text-sm sm:text-base font-black block truncate text-slate-900 dark:text-white">
                {activeSection.title}
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-700/60 text-[11px] sm:text-xs font-mono font-bold text-cyan-800 dark:text-cyan-200">
                <span>SECTION 0{activeIndex + 1} OF 0{totalSections}</span>
                <span>•</span>
                <span className="truncate max-w-[90px]">{activeSection.category}</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Sleek & Compact Rotating Nodes along the 3D Oval Orbit */}
          <div className="absolute inset-0 pointer-events-none">
            {ringSections.map((section, idx) => {
              // Calculate mathematical angle along the Oval Orbit
              const angle = rotationAngle + idx * angleStep;
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);

              // Screen container coordinates based on 1150x580 viewport with safe margins
              const leftPercent = 50 + ((cosA * radiusX) / 575) * 48;
              const topPercent = 50 + ((sinA * radiusY) / 290) * 38;

              const isCurrentActive = idx === activeIndex;

              // 3D Depth calculation based on vertical sinA (lower arc is foreground, upper arc is background)
              const depthFactor = (sinA + 1) / 2; // 0 (back) to 1 (front)
              // Sleek, compact scale factors
              const scale = isCurrentActive ? 1.05 : 0.74 + depthFactor * 0.16;
              const opacity = isCurrentActive ? 1 : 0.72 + depthFactor * 0.28;
              
              // If node is rotating in the upper-left quadrant (cosA < -0.15 and sinA < 0), keep zIndex below profile card (z-20)
              const zIndex = isCurrentActive
                ? (cosA < -0.2 && sinA < 0 ? 18 : 35)
                : (cosA < -0.15 && sinA < 0 ? 12 : Math.round(depthFactor * 15) + 20);

              return (
                <motion.div
                  key={section.id}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Smooth scroll to target section if present or navigate
                    const targetEl = document.getElementById(section.id);
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                    onNavigate(section.id);
                  }}
                  id={`ring-node-${section.id}`}
                  className="absolute transition-transform duration-150 ease-out cursor-pointer group pointer-events-auto"
                  title={`Click to open ${section.title}`}
                >
                  {/* Ambient Quantum Glow Aura behind active node */}
                  {isCurrentActive && (
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400/40 via-indigo-500/30 to-purple-500/40 blur-md -z-10 animate-pulse" />
                  )}

                  {/* Compact, Sleek Badge Node */}
                  <div
                    className={`relative p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border shadow-lg backdrop-blur-xl flex items-center gap-2 transition-all ${
                      isCurrentActive
                        ? `bg-slate-900/95 dark:bg-slate-950/95 text-white border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)]`
                        : `${theme.surface}/90 ${theme.border} ${theme.textPrimary} hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-xl hover:bg-white dark:hover:bg-zinc-800`
                    }`}
                  >
                    {/* Pulsing indicator on active node */}
                    {isCurrentActive && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 ring-1 ring-white dark:ring-slate-900" />
                      </span>
                    )}

                    {/* Compact Node Icon with gradient frame */}
                    <div
                      className={`p-1 sm:p-1.5 rounded-lg text-white bg-gradient-to-br ${section.colorScheme} shadow-xs shrink-0 ring-1 ring-white/20`}
                    >
                      {renderIcon(section.iconName, 'w-3 h-3 sm:w-3.5 sm:h-3.5')}
                    </div>

                    {/* Compact Node Content */}
                    <div className="min-w-0 pr-0.5">
                      <div className="flex items-center gap-1">
                        <span className={`text-4xs font-mono font-extrabold ${isCurrentActive ? 'text-cyan-300' : 'text-slate-400 dark:text-zinc-500'}`}>
                          0{idx + 1}
                        </span>
                        <span className="text-2xs sm:text-xs font-extrabold tracking-tight truncate max-w-[75px] sm:max-w-[95px]">
                          {section.shortTitle}
                        </span>
                      </div>
                      <span className={`text-4xs font-medium block truncate max-w-[75px] sm:max-w-[95px] ${isCurrentActive ? 'text-cyan-200/90' : 'text-slate-500 dark:text-zinc-400'}`}>
                        {section.category}
                      </span>
                    </div>

                    {/* Right click arrow indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-0.5 duration-150">
                      <ChevronRight className={`w-3 h-3 ${isCurrentActive ? 'text-cyan-300' : 'text-cyan-500'}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* ========================================================= */}
        {/* FLOATING SPOTLIGHT PREVIEW CARD FOR CURRENT ACTIVE NODE   */}
        {/* Positioned low at the stage bottom-right to never overlap */}
        {/* ========================================================= */}
        <div className="absolute bottom-1 sm:bottom-2 right-2 sm:right-6 lg:right-8 z-30 max-w-[300px] sm:max-w-[330px] w-full pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl space-y-2.5 ${theme.surface}/95 ${theme.border}`}
            >
              
              <div className="flex items-start justify-between gap-2.5">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-4xs font-extrabold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300">
                      {activeSection.category}
                    </span>
                    <span className="text-4xs font-mono text-slate-400">
                      0{activeIndex + 1}/0{totalSections}
                    </span>
                  </div>
                  <h3 className={`text-xs sm:text-sm font-bold tracking-tight truncate ${theme.textPrimary}`}>
                    {activeSection.title}
                  </h3>
                </div>

                <div className={`p-1.5 sm:p-2 rounded-xl text-white bg-gradient-to-br ${activeSection.colorScheme} shrink-0`}>
                  {renderIcon(activeSection.iconName, 'w-3.5 h-3.5 sm:w-4 sm:h-4')}
                </div>
              </div>

              <p className={`text-3xs sm:text-2xs leading-relaxed line-clamp-2 ${theme.textSecondary}`}>
                {activeSection.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800 text-3xs sm:text-2xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[130px]">
                  {activeSection.badge}
                </span>

                {/* The Primary Redirect Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate(activeSection.id)}
                  id={`redirect-to-${activeSection.id}`}
                  className={`py-1.5 px-3 rounded-xl text-2xs sm:text-xs font-bold text-white shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${theme.accent} ${theme.accentHover}`}
                >
                  <span>Enter {activeSection.shortTitle}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Floating Navigation Toolbar & Ring Status */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex items-center justify-between text-2xs z-20">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
          <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Interactive Portfolio Navigator</span>
          <span className="text-slate-300 dark:text-zinc-700">•</span>
          <span>Click any node to navigate</span>
        </div>

        <div className="flex items-center gap-2">
          {ringSections.map((sec, i) => (
            <button
              key={sec.id}
              onClick={() => handleSnapToSection(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                i === activeIndex
                  ? 'w-6 bg-cyan-500 dark:bg-cyan-400'
                  : 'bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400'
              }`}
              title={`Switch to ${sec.title}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

