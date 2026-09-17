import React, { useState } from 'react';
import {
  User,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  ArrowUpRight,
  FileText,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  Phone,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  BookOpen,
  Code,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { PortfolioProfile } from '../types';
import { themeMap } from '../utils/theme';

interface AboutSectionProps {
  profile: PortfolioProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeSelectedSkill, setActiveSelectedSkill] = useState<string | null>(null);
  const theme = themeMap[profile.themeVibe] || themeMap['modern-minimal'];

  const handleDownloadDocx = () => {
    if (profile.resumeUrl) {
      const link = document.createElement('a');
      link.href = profile.resumeUrl;
      link.download = 'Aditya_Swain_WebDev_Resume.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
      return;
    }
    handleDownloadMarkdown();
  };

  const handleDownloadMarkdown = () => {
    const content = `
# ${profile.name} — ${profile.role}
${profile.brandTitle}
Email: ${profile.contactInfo.email} | Phone: ${profile.contactInfo.phone || '+91 78468 87605'} | Location: ${profile.location}
GitHub: ${profile.contactInfo.github} | LinkedIn: ${profile.contactInfo.linkedin} | Dribbble: ${profile.contactInfo.dribbble}

## PROFESSIONAL SUMMARY
${profile.oneLinePitch}

${profile.bioParagraphs.join('\n\n')}

## CORE METRICS & HIGHLIGHTS
${profile.stats.map((s) => `- ${s.label}: ${s.value} (${s.detail || ''})`).join('\n')}

## INTERNSHIPS
${
  profile.internships
    ?.map(
      (i) => `### ${i.role} — ${i.company} (${i.period}, ${i.duration})
- ${i.description || ''}
- Technologies: ${i.skills?.join(', ') || ''}`
    )
    .join('\n\n') || ''
}

## FLAGSHIP PROJECTS
${profile.projects
  .map(
    (p) => `### ${p.title} (${p.year})
- Category: ${p.category}
- Summary: ${p.summary}
- Problem: ${p.problem}
- Solution: ${p.solution}
- Key Metrics: ${p.outcomes.map((o) => `${o.label}: ${o.metric}`).join(', ')}
- Tech Stack: ${p.tags.join(', ')}`
  )
  .join('\n\n')}

## EDUCATION
${
  profile.education
    ?.map(
      (e) => `### ${e.degree} — ${e.institution} (${e.year})
- ${e.cgpaOrGrade || ''}
- Coursework: ${e.coursework?.join(', ') || ''}`
    )
    .join('\n\n') || ''
}

## CERTIFICATIONS
${profile.certifications?.map((c) => `- ${c.title} (${c.issuer}, ${c.year})`).join('\n') || ''}

## ACHIEVEMENTS & ACTIVITIES
${profile.achievements?.map((a) => `- ${a}`).join('\n') || ''}

## TECHNICAL SKILLS
${profile.skills.map((c) => `* ${c.category}: ${c.items.join(', ')}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-zinc-800/80" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top 2-Column: Bio & Portrait/Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Highlights (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 shadow-xl group">
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80'}
                alt={profile.name}
                className="w-full h-96 sm:h-[480px] object-cover object-top transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-indigo-300 dark:text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{profile.role}</p>

                {/* Quick Social & Contact Badges */}
                <div className="flex items-center gap-2 pt-4">
                  {profile.contactInfo.github && (
                    <a
                      href={profile.contactInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {profile.contactInfo.linkedin && (
                    <a
                      href={profile.contactInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profile.contactInfo.dribbble && (
                    <a
                      href={profile.contactInfo.dribbble}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white transition-colors"
                      title="Dribbble Design Feed"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {profile.contactInfo.email && (
                    <a
                      href={`mailto:${profile.contactInfo.email}`}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white transition-colors"
                      title="Email Direct"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {profile.contactInfo.phone && (
                    <a
                      href={`tel:${profile.contactInfo.phone.replace(/\s+/g, '')}`}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white transition-colors"
                      title="Call / WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Resume Download Pills */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleDownloadDocx}
                className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${theme.accent} text-white hover:opacity-95`}
                id="about-download-resume-docx-btn"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>Resume Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Official Resume (.docx)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className={`w-full sm:w-auto py-3.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${theme.surface} ${theme.border} ${theme.textSecondary} ${theme.surfaceHover}`}
                title="Download formatted text/markdown summary"
              >
                <FileText className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
                <span>Markdown</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
              <User className="w-3.5 h-3.5" />
              <span>Professional Summary & Background</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>
              Full-Stack Engineering with Precision & Real-World Scope.
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
              {profile.bioParagraphs.map((para, idx) => (
                <p key={idx} className={theme.textSecondary}>
                  {para}
                </p>
              ))}
            </div>

            {/* Working Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className={`p-4 rounded-xl border ${theme.surface} ${theme.border} space-y-1`}>
                <div className={`text-xs font-bold flex items-center gap-1.5 ${theme.textPrimary}`}>
                  <Code className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
                  <span>Production-Grade Architecture</span>
                </div>
                <div className={`text-xs ${theme.textMuted}`}>
                  Clean MVC architecture, role-based JWT security, and Dockerized microservices.
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${theme.surface} ${theme.border} space-y-1`}>
                <div className={`text-xs font-bold flex items-center gap-1.5 ${theme.textPrimary}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-emerald-400" />
                  <span>End-to-End Ownership</span>
                </div>
                <div className={`text-xs ${theme.textMuted}`}>
                  From responsive React interfaces and DB modeling to live AI models and Stripe payments.
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Internships & Industrial Experience */}
        {profile.internships && profile.internships.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Internships & Practical Industry Experience</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
                Industrial & AI/ML Internships
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.internships.map((internship, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-4 relative ${theme.surface} ${theme.border} transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className={`text-base sm:text-lg font-bold ${theme.textPrimary}`}>
                        {internship.role}
                      </h4>
                      <div className={`text-xs sm:text-sm font-semibold ${theme.accentText}`}>
                        {internship.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                        {internship.period}
                      </span>
                      <span className="text-3xs font-mono font-medium text-slate-500 dark:text-zinc-400">
                        {internship.duration}
                      </span>
                    </div>
                  </div>

                  {internship.description && (
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                      {internship.description}
                    </p>
                  )}

                  {internship.skills && internship.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {internship.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-3xs px-2.5 py-1 rounded-md font-medium border ${theme.badgeBg} ${theme.border} ${theme.textSecondary}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Academic Background */}
        {profile.education && profile.education.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education & Academic Foundations</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
                Academic Background
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-3 relative ${theme.surface} ${theme.border}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                      {edu.year}
                    </span>
                    <GraduationCap className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
                  </div>
                  <h4 className={`text-base font-bold ${theme.textPrimary}`}>
                    {edu.degree}
                  </h4>
                  <div className={`text-xs font-semibold ${theme.accentText}`}>
                    {edu.institution}
                  </div>
                  {edu.cgpaOrGrade && (
                    <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {edu.cgpaOrGrade}
                    </div>
                  )}
                  {edu.coursework && (
                    <div className="space-y-1 pt-1">
                      <span className={`text-3xs uppercase tracking-wider font-bold ${theme.textMuted}`}>
                        Key Coursework:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {edu.coursework.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className={`text-3xs px-2 py-0.5 rounded ${theme.badgeBg} ${theme.textSecondary}`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Key Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Certifications (6 cols) */}
          {profile.certifications && profile.certifications.length > 0 && (
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifications & Specialized Training</span>
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${theme.textPrimary}`}>
                  Verified Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {profile.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border flex items-start justify-between gap-4 ${theme.surface} ${theme.border}`}
                  >
                    <div className="space-y-1">
                      <div className={`text-sm font-bold ${theme.textPrimary}`}>{cert.title}</div>
                      <div className={`text-xs ${theme.accentText}`}>{cert.issuer}</div>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${theme.badgeBg} ${theme.badgeText}`}>
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Achievements (6 cols) */}
          {profile.achievements && profile.achievements.length > 0 && (
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Highlights & Initiatives</span>
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${theme.textPrimary}`}>
                  Notable Achievements
                </h3>
              </div>

              <div className="space-y-2.5">
                {profile.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${theme.surface} ${theme.border}`}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Career Milestones Timeline */}
        <div className="space-y-8 pt-6">
          <div className="space-y-2">
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
              Career Journey & Milestones
            </h3>
            <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
              Full-stack application architecture, AI training, and practical engineering milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-3 relative ${theme.surface} ${theme.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                    {milestone.year}
                  </span>
                  <Briefcase className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className={`text-base font-bold ${theme.textPrimary}`}>
                  {milestone.role}
                </h4>
                <div className={`text-xs font-semibold ${theme.accentText}`}>
                  {milestone.company}
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${theme.textSecondary}`}>
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Tech Stack Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary}`}>
                Technical Skills & Specialized Toolkit
              </h3>
              <p className={`text-xs ${theme.textSecondary}`}>
                Hover over any capability for detailed proficiency notes, or click to find matching case studies.
              </p>
            </div>

            {activeSelectedSkill && (
              <div className="flex items-center gap-2">
                <span className="text-2xs font-semibold text-indigo-600 dark:text-emerald-400">
                  Filtering by: <strong>{activeSelectedSkill}</strong>
                </span>
                <button
                  onClick={() => setActiveSelectedSkill(null)}
                  className="text-2xs underline cursor-pointer text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((category) => (
              <div
                key={category.category}
                className={`p-5 rounded-2xl border space-y-3 ${theme.surface} ${theme.border}`}
              >
                <div className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>
                  {category.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => {
                    const detail = category.itemDetails?.[skill];
                    const isHovered = hoveredSkill === skill;
                    const isSelected = activeSelectedSkill === skill;

                    // Check how many projects use this skill tag
                    const matchingProjects = profile.projects.filter((p) =>
                      p.tags.some((t) => t.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(t.toLowerCase()))
                    );

                    return (
                      <div
                        key={skill}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <button
                          onClick={() => {
                            if (activeSelectedSkill === skill) {
                              setActiveSelectedSkill(null);
                            } else {
                              setActiveSelectedSkill(skill);
                              // Smooth scroll to work section if clicked
                              const workEl = document.getElementById('work');
                              if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                            isSelected
                              ? `${theme.accent} text-white ring-2 ring-indigo-500/30 font-bold`
                              : `${theme.badgeBg} ${theme.border} ${theme.textSecondary} hover:border-indigo-400 dark:hover:border-emerald-400 hover:text-slate-900 dark:hover:text-zinc-100`
                          }`}
                        >
                          <span>{skill}</span>
                          {matchingProjects.length > 0 && (
                            <span className="text-3xs opacity-75 font-mono">({matchingProjects.length})</span>
                          )}
                        </button>

                        {/* Interactive Skill Tooltip */}
                        {isHovered && (
                          <div className="absolute left-0 bottom-full mb-2 z-30 w-56 p-3 rounded-xl shadow-xl border bg-slate-900 text-white border-slate-700 text-2xs leading-relaxed pointer-events-none animate-in fade-in duration-150">
                            <div className="font-bold text-indigo-300 pb-0.5 flex items-center justify-between">
                              <span>{skill}</span>
                              {detail?.experience && (
                                <span className="text-3xs text-emerald-400 font-mono">{detail.experience}</span>
                              )}
                            </div>
                            <p className="text-slate-200">
                              {detail?.description || `Key competency in ${profile.name}'s daily technical toolkit.`}
                            </p>
                            {matchingProjects.length > 0 && (
                              <div className="pt-1.5 mt-1.5 border-t border-slate-700 text-3xs text-slate-400 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>Applied in {matchingProjects.length} project(s). Click to view.</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
