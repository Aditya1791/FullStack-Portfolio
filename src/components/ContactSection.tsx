import React, { useState } from 'react';
import { Mail, Copy, Check, Calendar, ArrowRight, Send, MessageSquare, Globe, ExternalLink } from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface ContactSectionProps {
  profile: PortfolioProfile;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenBooking }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [budgetTier, setBudgetTier] = useState('₹25k - ₹50k');
  const [isSent, setIsSent] = useState(false);

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setIsSent(true);
    setTimeout(() => {
      // Keep state sent
    }, 400);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate An Engagement</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
            Let's build something remarkable together.
          </h2>
          <p className={`text-base sm:text-lg ${theme.textSecondary}`}>
            Currently accepting client partnerships for {profile.availability.quarter}. Fast-track your inquiry below or schedule a direct video call.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Inquiries & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-4 shadow-xs ${theme.surface} ${theme.border}`}>
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Direct Email
                </span>
                <div className={`text-lg sm:text-xl font-mono font-bold truncate ${theme.textPrimary}`}>
                  {profile.contactInfo.email}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${profile.contactInfo.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${theme.border} ${theme.textPrimary} ${theme.surfaceHover}`}
                >
                  <span>Open Mail App</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Direct Booking CTA Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${theme.badgeBg} ${theme.border}`}>
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.accentText}`}>
                  Direct Calendar Scheduler
                </span>
                <h4 className={`text-lg font-bold ${theme.textPrimary}`}>
                  Prefer an instant conversation?
                </h4>
                <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                  Pick a 15, 30, or 45-minute slot to discuss project scope, architecture, or timelines without back-and-forth emails.
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${theme.accent} ${theme.accentHover}`}
              >
                <Calendar className="w-4 h-4" />
                <span>Open Instant Scheduler</span>
              </button>
            </div>

            {/* Direct Phone / WhatsApp Card */}
            {profile.contactInfo.phone && (
              <div className={`p-6 rounded-2xl border space-y-3 shadow-xs ${theme.surface} ${theme.border}`}>
                <div className="space-y-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                    Direct Phone / WhatsApp
                  </span>
                  <div className={`text-base sm:text-lg font-mono font-bold ${theme.textPrimary}`}>
                    {profile.contactInfo.phone}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${profile.contactInfo.phone.replace(/\s+/g, '')}`}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${theme.border} ${theme.textPrimary} ${theme.surfaceHover}`}
                  >
                    <span>Direct Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${profile.contactInfo.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100`}
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Social Links & Location */}
            <div className={`p-6 rounded-2xl border space-y-4 ${theme.surface} ${theme.border}`}>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                Connect Across The Web
              </span>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'GitHub', url: profile.contactInfo.github },
                  { label: 'LinkedIn', url: profile.contactInfo.linkedin },
                  { label: 'Dribbble', url: profile.contactInfo.dribbble },
                  { label: 'Email', url: `mailto:${profile.contactInfo.email}` },
                  { label: 'Location', url: '#about', display: profile.location },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : undefined}
                    rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between ${theme.border} ${theme.textSecondary} ${theme.surfaceHover} transition-colors`}
                  >
                    <span className="truncate">{item.display || item.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>

              <div className="pt-2 text-2xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Location: {profile.location} • Available for Full-Time & Freelance Roles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 shadow-xs ${theme.surface} ${theme.border}`}>
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className={`text-2xl font-bold ${theme.textPrimary}`}>
                  Inquiry Dispatched!
                </h3>
                <p className={`text-sm max-w-sm mx-auto ${theme.textSecondary}`}>
                  Thank you, {senderName}. I have received your message and will review your scope notes within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                  }}
                  className={`mt-4 py-2 px-5 rounded-xl text-xs font-semibold border ${theme.border} ${theme.textPrimary} ${theme.surfaceHover}`}
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="space-y-1">
                  <h3 className={`text-xl font-bold ${theme.textPrimary}`}>
                    Send a Direct Note
                  </h3>
                  <p className={`text-xs ${theme.textSecondary}`}>
                    Fill in details about your company, anticipated timeline, and objectives.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${theme.textSecondary}`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aditya Ranjan Swain"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${theme.textSecondary}`}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="swainaditya85@gmail.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                    />
                  </div>
                </div>

                {/* Anticipated Budget Range */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${theme.textSecondary}`}>
                    Anticipated Budget / Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['₹15k - ₹25k', '₹25k - ₹50k', '₹50k - ₹1L', '₹1L+'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudgetTier(tier)}
                        className={`py-2 px-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          budgetTier === tier
                            ? `border-indigo-600 dark:border-emerald-500 text-indigo-600 dark:text-emerald-400 ${theme.badgeBg}`
                            : `border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300`
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${theme.textSecondary}`}>
                    Project Brief & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you are looking to build or solve, key milestones, or links to references..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${theme.accent} ${theme.accentHover}`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
