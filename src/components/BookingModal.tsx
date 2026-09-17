import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, ArrowRight, Download, ExternalLink, Sparkles } from 'lucide-react';
import { PortfolioProfile, BookingSubmission } from '../types';
import { themeMap } from '../utils/theme';

interface BookingModalProps {
  isOpen: boolean;
  profile: PortfolioProfile;
  initialServiceTitle?: string;
  initialScopeDetails?: {
    scope?: string;
    priceRange?: string;
  };
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  profile,
  initialServiceTitle,
  initialScopeDetails,
  onClose,
}) => {
  const [duration, setDuration] = useState<number>(30);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [scopeBrief, setScopeBrief] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingSubmission | null>(null);

  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  // Generate the next 10 business days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (dates.length < 10) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Weekday
        dates.push({
          dateStr: current.toISOString().split('T')[0],
          dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
          monthDay: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].dateStr);
    }
    if (!selectedTime) {
      setSelectedTime('10:00 AM');
    }
  }, [availableDates, selectedDate, selectedTime]);

  useEffect(() => {
    if (initialServiceTitle) {
      setScopeBrief(
        `Inquiring about ${initialServiceTitle}${
          initialScopeDetails?.priceRange ? ` (Estimated range: ${initialScopeDetails.priceRange})` : ''
        }`
      );
    }
  }, [initialServiceTitle, initialScopeDetails]);

  if (!isOpen) return null;

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: BookingSubmission = {
        id: `bk_${Date.now()}`,
        serviceTitle: initialServiceTitle || 'General Discovery & Strategy',
        durationMinutes: duration,
        date: selectedDate,
        timeSlot: selectedTime,
        name,
        email,
        company,
        scopeSummary: scopeBrief,
        createdAt: new Date().toISOString(),
      };
      setBookingConfirmed(submission);
      setIsSubmitting(false);
    }, 600);
  };

  const handleDownloadICS = () => {
    if (!bookingConfirmed) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aditya Swain Design//Discovery Session//EN
BEGIN:VEVENT
SUMMARY:Discovery Session with ${profile.name}
DESCRIPTION:Strategy and product discovery call with ${bookingConfirmed.name}. Service: ${bookingConfirmed.serviceTitle}
LOCATION:Google Meet (Simulated link)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting_${profile.name.toLowerCase().replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 my-8 transition-all ${theme.surface} ${theme.border}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme.border}`}>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-emerald-400" />
            <h3 className={`text-base font-bold ${theme.textPrimary}`}>
              {bookingConfirmed ? 'Meeting Confirmed' : 'Schedule Discovery Session'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${theme.border} ${theme.textSecondary} hover:bg-slate-100 dark:hover:bg-zinc-800`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {bookingConfirmed ? (
            /* Confirmation Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className={`text-2xl font-bold ${theme.textPrimary}`}>
                  Discovery Call Confirmed!
                </h4>
                <p className={`text-sm max-w-md mx-auto ${theme.textSecondary}`}>
                  A calendar invite and Google Meet link have been prepared for{' '}
                  <span className="font-semibold text-indigo-600 dark:text-emerald-400">{bookingConfirmed.email}</span>.
                </p>
              </div>

              {/* Call Details Summary */}
              <div className={`p-4 rounded-xl border max-w-md mx-auto text-left space-y-2.5 text-xs ${theme.badgeBg} ${theme.border}`}>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Partner:</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>{profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Topic:</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>{bookingConfirmed.serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Date & Time:</span>
                  <span className={`font-semibold text-emerald-600 dark:text-emerald-400`}>
                    {bookingConfirmed.date} at {bookingConfirmed.timeSlot} ({bookingConfirmed.durationMinutes} min)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.textMuted}>Location:</span>
                  <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-emerald-400">
                    <Video className="w-3.5 h-3.5" /> Google Meet Video
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadICS}
                  className={`w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer ${theme.surface} ${theme.border} ${theme.textPrimary} hover:bg-slate-50 dark:hover:bg-zinc-800`}
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Download .ics Calendar Invite</span>
                </button>

                <button
                  onClick={onClose}
                  className={`w-full sm:w-auto py-2.5 px-6 rounded-xl text-xs font-semibold text-white shadow-xs cursor-pointer ${theme.accent} ${theme.accentHover}`}
                >
                  <span>Done</span>
                </button>
              </div>

              {/* Alternate direct Calendly fallback link */}
              <div className="pt-2">
                <a
                  href={profile.contactInfo.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1"
                >
                  <span>Or open official Calendly schedule page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* Interactive Booking Scheduler Form */
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              {/* Duration Select */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Select Meeting Focus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mins: 15, label: '15m Quick Fit' },
                    { mins: 30, label: '30m Project Scope' },
                    { mins: 45, label: '45m UX Teardown' },
                  ].map((item) => (
                    <button
                      key={item.mins}
                      type="button"
                      onClick={() => setDuration(item.mins)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        duration === item.mins
                          ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 dark:ring-emerald-500/20 ${theme.badgeBg}`
                          : `border-slate-200 dark:border-zinc-800 hover:border-slate-300`
                      }`}
                    >
                      <div className={`text-xs font-bold ${theme.textPrimary}`}>{item.label}</div>
                      <span className="text-2xs text-slate-500">Video Sync</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Horizontal Picker */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Choose a Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`shrink-0 w-18 py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === item.dateStr
                          ? `border-indigo-600 dark:border-emerald-500 ring-2 ring-indigo-500/20 ${theme.badgeBg}`
                          : `border-slate-200 dark:border-zinc-800 hover:border-slate-300`
                      }`}
                    >
                      <span className="block text-2xs uppercase text-slate-500 font-bold">{item.dayName}</span>
                      <span className={`block text-xs font-extrabold mt-0.5 ${theme.textPrimary}`}>{item.monthDay}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  Available Time Slot ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedTime === slot
                          ? `border-indigo-600 dark:border-emerald-500 text-indigo-600 dark:text-emerald-400 ${theme.badgeBg}`
                          : `border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300`
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visitor Contact Info */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${theme.textSecondary}`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aditya Ranjan Swain"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${theme.textSecondary}`}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="swainaditya85@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme.textSecondary}`}>
                    Company / Website (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech (acme.com)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme.textSecondary}`}>
                    Project Context or Objectives
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell me a bit about the product goals, target dates, or current friction..."
                    value={scopeBrief}
                    onChange={(e) => setScopeBrief(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs ${theme.surface} ${theme.border} ${theme.textPrimary} focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${theme.accent} ${theme.accentHover}`}
              >
                {isSubmitting ? (
                  <span>Securing Calendar Slot...</span>
                ) : (
                  <>
                    <span>Confirm {duration}m Discovery Video Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
