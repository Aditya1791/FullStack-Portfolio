export type ThemeVibe =
  | 'modern-minimal'
  | 'editorial-warm'
  | 'dark-obsidian'
  | 'bold-creative'
  | 'cyber-neon'
  | 'midnight-amethyst'
  | 'crimson-noir'
  | 'solar-amber'
  | 'nordic-frost'
  | 'forest-matrix';

export interface OutcomeMetric {
  metric: string;
  label: string;
}

export interface BeforeAfterImage {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  summary: string;
  problem: string;
  solution: string;
  outcomes: OutcomeMetric[];
  tags: string[];
  featured: boolean;
  image: string;
  beforeAfter?: BeforeAfterImage;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  ndaProtected?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  deliverableDetails?: Record<string, string>; // Tooltips explaining each deliverable
  idealFor?: string; // Who this service is ideally suited for
  relatedProjectIds?: string[];
  relatedTestimonialIds?: string[];
  timeline: string;
  startingAt: number;
  popular?: boolean;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  project: string;
  serviceId?: string;
  rating: number;
}

export interface SkillCategory {
  category: string;
  items: string[];
  itemDetails?: Record<string, { description: string; experience?: string; relatedTag?: string }>;
}

export interface CareerMilestone {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface InternshipItem {
  role: string;
  company: string;
  period: string;
  duration: string;
  description?: string;
  skills?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  cgpaOrGrade?: string;
  coursework?: string[];
  location?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface InsightPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  coverImage: string;
  relatedServiceId?: string;
  ctaText?: string;
  ctaAction?: 'booking' | 'service';
}

export interface PortfolioProfile {
  name: string;
  brandTitle: string;
  role: string;
  tagline: string;
  oneLinePitch: string;
  location: string;
  avatar?: string;
  resumeUrl?: string;
  availability: {
    status: 'available' | 'limited' | 'booked';
    label: string;
    quarter: string;
  };
  bioParagraphs: string[];
  stats: {
    label: string;
    value: string;
    detail?: string;
  }[];
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  skills: SkillCategory[];
  milestones: CareerMilestone[];
  internships?: InternshipItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  achievements?: string[];
  insights: InsightPost[];
  featuredProjectId?: string;
  contactInfo: {
    email: string;
    calendlyUrl: string;
    linkedin: string;
    twitter: string;
    github: string;
    dribbble: string;
    phone?: string;
  };
  themeVibe: ThemeVibe;
}

export interface BookingSubmission {
  id: string;
  serviceTitle: string;
  durationMinutes: number;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  company: string;
  scopeSummary: string;
  estimatedBudget?: number;
  createdAt: string;
}

