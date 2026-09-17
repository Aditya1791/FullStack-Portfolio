import React, { useState, useRef } from 'react';
import {
  X,
  Palette,
  Briefcase,
  Sliders,
  RotateCcw,
  Download,
  Upload,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';
import { PortfolioProfile, ThemeVibe } from '../types';
import { defaultProfile, marketingProfile, photographerProfile, architectProfile } from '../data/profiles';
import { themeMap } from '../utils/theme';

interface CustomizerDrawerProps {
  isOpen: boolean;
  profile: PortfolioProfile;
  onClose: () => void;
  onUpdateProfile: (updated: PortfolioProfile) => void;
  onResetDefault: () => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  profile,
  onClose,
  onUpdateProfile,
  onResetDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'presets'>('themes');
  const [themeCategory, setThemeCategory] = useState<'all' | 'dark' | 'light'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleThemeSelect = (vibe: ThemeVibe, label: string) => {
    const updated = { ...profile, themeVibe: vibe };
    onUpdateProfile(updated);
    showToast(`Switched to "${label}" theme!`);
  };

  const handleLoadPreset = (preset: PortfolioProfile, label: string) => {
    onUpdateProfile({ ...preset });
    showToast(`Applied "${label}" specialization!`);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Configuration exported!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.name && json.role) {
          onUpdateProfile(json);
          showToast('Configuration imported successfully!');
        } else {
          showToast('Invalid portfolio configuration file.');
        }
      } catch (err) {
        showToast('Error reading JSON configuration file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const themeVibes: {
    vibe: ThemeVibe;
    label: string;
    mode: 'dark' | 'light';
    tag: string;
    desc: string;
    previewClass: string;
    accentColorClass: string;
  }[] = [
    {
      vibe: 'modern-minimal',
      label: 'Minimalist Indigo',
      mode: 'light',
      tag: 'Clean Light',
      desc: 'Crisp white canvas with royal indigo accents and slate architecture.',
      previewClass: 'bg-white border-slate-200 text-slate-900',
      accentColorClass: 'bg-indigo-600',
    },
    {
      vibe: 'dark-obsidian',
      label: 'Dark Obsidian & Emerald',
      mode: 'dark',
      tag: 'Flagship Dark',
      desc: 'Deep titanium obsidian canvas with glowing emerald highlights.',
      previewClass: 'bg-[#0b0d11] border-zinc-800 text-zinc-100',
      accentColorClass: 'bg-emerald-500',
    },
    {
      vibe: 'cyber-neon',
      label: 'Cyberpunk Neon Cyan',
      mode: 'dark',
      tag: 'High-Tech Neon',
      desc: 'Deep space blue with luminous cyan glow for a cutting-edge dev aesthetic.',
      previewClass: 'bg-[#090b16] border-cyan-900/60 text-cyan-50',
      accentColorClass: 'bg-cyan-500',
    },
    {
      vibe: 'midnight-amethyst',
      label: 'Midnight Amethyst',
      mode: 'dark',
      tag: 'Royal Purple',
      desc: 'Lush dark violet canvas with radiant royal amethyst purple highlights.',
      previewClass: 'bg-[#0a0714] border-purple-900/60 text-purple-50',
      accentColorClass: 'bg-purple-600',
    },
    {
      vibe: 'crimson-noir',
      label: 'Crimson Noir',
      mode: 'dark',
      tag: 'Velvet Red',
      desc: 'Sleek charcoal noir canvas with vibrant rose crimson energy.',
      previewClass: 'bg-[#0f0c0e] border-rose-950/80 text-rose-50',
      accentColorClass: 'bg-rose-600',
    },
    {
      vibe: 'solar-amber',
      label: 'Solar Amber & Gold',
      mode: 'dark',
      tag: 'Warm Dark',
      desc: 'Deep midnight espresso canvas with warm gold and amber sunset tones.',
      previewClass: 'bg-[#0d0f14] border-amber-950/80 text-amber-50',
      accentColorClass: 'bg-amber-500',
    },
    {
      vibe: 'forest-matrix',
      label: 'Forest Matrix & Mint',
      mode: 'dark',
      tag: 'Botanical Cyber',
      desc: 'Deep alpine pine canvas paired with sharp mint and emerald matrix accents.',
      previewClass: 'bg-[#06110a] border-emerald-950/80 text-emerald-50',
      accentColorClass: 'bg-emerald-500',
    },
    {
      vibe: 'editorial-warm',
      label: 'Editorial Warm Sand',
      mode: 'light',
      tag: 'Warm Light',
      desc: 'Textured ivory sand canvas, espresso typography, and terracotta accents.',
      previewClass: 'bg-[#faf8f5] border-[#e7e1d7] text-[#201c18]',
      accentColorClass: 'bg-[#9a5b32]',
    },
    {
      vibe: 'bold-creative',
      label: 'Bold Electric Cobalt',
      mode: 'light',
      tag: 'High-Impact',
      desc: 'Clean icy canvas with punchy electric cobalt blue typography and layout.',
      previewClass: 'bg-[#f4f7fb] border-blue-200 text-slate-950',
      accentColorClass: 'bg-blue-600',
    },
    {
      vibe: 'nordic-frost',
      label: 'Nordic Arctic Frost',
      mode: 'light',
      tag: 'Crisp Arctic',
      desc: 'Glacial arctic snow canvas with crisp sky teal accents and modern clarity.',
      previewClass: 'bg-[#f0f9ff] border-sky-200 text-slate-900',
      accentColorClass: 'bg-sky-600',
    },
  ];

  const filteredThemes = themeVibes.filter((t) => {
    if (themeCategory === 'dark') return t.mode === 'dark';
    if (themeCategory === 'light') return t.mode === 'light';
    return true;
  });

  const presetsList = [
    {
      preset: defaultProfile,
      label: 'Full-Stack & MERN Engineering',
      badge: 'Full-Stack / Flagship',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
      role: 'Full-Stack Developer & Front-End Engineer',
      features: 'MERN stack, AI Proctoring with DeepFace/OpenCV, Socket.io Real-Time Kanban, B.Tech CSE details.',
      vibeMatch: 'modern-minimal',
    },
    {
      preset: marketingProfile,
      label: 'Frontend & UI Engineering',
      badge: 'Frontend & UI',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      role: 'Frontend & UI Engineer (React.js, TypeScript & Modern UI)',
      features: 'Warm editorial typography, component libraries, interactive design systems, and responsive layout.',
      vibeMatch: 'editorial-warm',
    },
    {
      preset: photographerProfile,
      label: 'AI & Backend Systems',
      badge: 'AI & Python',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      role: 'AI & Backend Systems Engineer (Python, Flask & Computer Vision)',
      features: 'Dark obsidian theme, DeepFace biometrics, OpenCV 68-point landmarks, Docker Compose.',
      vibeMatch: 'dark-obsidian',
    },
    {
      preset: architectProfile,
      label: 'Real-Time Web Architecture',
      badge: 'Real-Time / Sockets',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      role: 'Real-Time Full-Stack Architect (MERN & WebSockets)',
      features: 'Sub-50ms Socket.io sync, optimistic UI state rollbacks, and role-based access control.',
      vibeMatch: 'bold-creative',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Hidden file input for config import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJSON}
        accept=".json,application/json"
        className="hidden"
      />

      <div
        className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 transition-transform ${theme.surface} ${theme.border} border-l`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${theme.border}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${theme.badgeBg}`}>
              <Palette className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className={`text-base font-bold tracking-tight ${theme.textPrimary}`}>Portfolio Appearance</h3>
              <p className={`text-xs ${theme.textMuted}`}>Switch curated themes & career specializations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="px-5 py-2.5 bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className={`flex border-b px-5 pt-3 gap-6 text-xs font-semibold ${theme.border}`}>
          <button
            onClick={() => setActiveTab('themes')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'themes'
                ? `border-indigo-600 dark:border-emerald-400 text-indigo-600 dark:text-emerald-400 font-bold`
                : `border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200`
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Themes & Aesthetics ({themeVibes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'presets'
                ? `border-indigo-600 dark:border-emerald-400 text-indigo-600 dark:text-emerald-400 font-bold`
                : `border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200`
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Specialization Modes ({presetsList.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: THEMES */}
          {activeTab === 'themes' && (
            <div className="space-y-4">
              
              {/* Category Filter Pills (All / Dark / Light) */}
              <div className="space-y-2.5 pb-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.textPrimary}`}>
                    Curated Palettes
                  </span>
                  <span className={`text-2xs font-medium ${theme.textSecondary}`}>
                    {filteredThemes.length} available
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border bg-slate-100/90 dark:bg-zinc-900/90 border-slate-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setThemeCategory('all')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      themeCategory === 'all'
                        ? 'bg-indigo-600 dark:bg-emerald-500 text-white shadow-sm'
                        : `${theme.textPrimary} hover:bg-white/60 dark:hover:bg-zinc-800/60`
                    }`}
                  >
                    <span>All ({themeVibes.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setThemeCategory('dark')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      themeCategory === 'dark'
                        ? 'bg-indigo-600 dark:bg-emerald-500 text-white shadow-sm'
                        : `${theme.textPrimary} hover:bg-white/60 dark:hover:bg-zinc-800/60`
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark ({themeVibes.filter((t) => t.mode === 'dark').length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setThemeCategory('light')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      themeCategory === 'light'
                        ? 'bg-indigo-600 dark:bg-emerald-500 text-white shadow-sm'
                        : `${theme.textPrimary} hover:bg-white/60 dark:hover:bg-zinc-800/60`
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light ({themeVibes.filter((t) => t.mode === 'light').length})</span>
                  </button>
                </div>
              </div>

              {/* Themes Grid / List */}
              <div className="space-y-3">
                {filteredThemes.map((item) => {
                  const isSelected = profile.themeVibe === item.vibe;
                  return (
                    <div
                      key={item.vibe}
                      onClick={() => handleThemeSelect(item.vibe, item.label)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative group overflow-hidden ${
                        isSelected
                          ? 'ring-2 ring-indigo-600 dark:ring-emerald-400 border-indigo-600 shadow-md'
                          : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-xs'
                      } ${item.previewClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full ${item.accentColorClass} shrink-0 ring-2 ring-white/20`} />
                          <span className="text-xs font-bold">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-3xs font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 opacity-80">
                            {item.tag}
                          </span>

                          {isSelected && (
                            <div className="p-0.5 rounded-full bg-emerald-500 text-white">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-2xs opacity-80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SPECIALIZATION PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Specialization Profiles
                </span>
                <p className={`text-xs ${theme.textSecondary}`}>
                  Reconfigure your portfolio presentation for specific technical roles and interviews.
                </p>
              </div>

              <div className="space-y-3">
                {presetsList.map((item, idx) => {
                  const isCurrentActive = profile.themeVibe === item.vibeMatch && profile.role === item.preset.role;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleLoadPreset(item.preset, item.label)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isCurrentActive
                          ? `ring-2 ring-indigo-500 dark:ring-emerald-400 border-indigo-500 ${theme.badgeBg} shadow-sm`
                          : `hover:border-slate-300 dark:hover:border-zinc-700 ${theme.surface}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${theme.textPrimary}`}>{item.label}</span>
                        <span className={`text-2xs px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <div className={`text-xs font-semibold ${theme.textSecondary}`}>
                        {item.role}
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {item.features}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2 ${theme.border} ${theme.surface}`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetDefault();
                showToast('Reset to default profile & theme!');
              }}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
              title="Reset to default flagship profile"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
              title="Import JSON configuration file"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>

            <button
              onClick={handleExportJSON}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${theme.border} ${theme.textPrimary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
              title="Download portfolio configuration as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className={`py-2 px-4 rounded-lg text-xs font-semibold text-white shadow-xs cursor-pointer ${theme.accent} ${theme.accentHover}`}
          >
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
};
