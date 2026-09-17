import { PortfolioProfile } from '../types';
import professionalAvatar from '../assets/Professional.jpg';
import resumeDocx from '../assets/Aditya_Swain_WebDev_Resume_v3.docx?url';

export const defaultProfile: PortfolioProfile = {
  name: 'Aditya Ranjan Swain',
  brandTitle: 'Aditya Ranjan Swain — Full-Stack & Front-End Engineer',
  role: 'Full-Stack Developer & Front-End Engineer',
  tagline: 'Engineering scalable MERN stack web applications, real-time collaborative workspaces, and AI-integrated systems.',
  oneLinePitch: 'B.Tech in Computer Science & Engineering & Full-Stack Developer specializing in MERN stack, React.js, Node.js, and Python/Flask with production-grade AI & real-time systems.',
  location: 'Bhubaneswar, India',
  avatar: professionalAvatar,
  resumeUrl: resumeDocx,
  availability: {
    status: 'available',
    label: 'Available for Full-Time Roles & Opportunities',
    quarter: 'Immediate Availability',
  },
  bioParagraphs: [
    'I am a Computer Science & Engineering graduate from Trident Academy of Technology, Bhubaneswar with deep practical experience building production-grade full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js) and Python/Flask.',
    'I have independently architected and shipped three production-grade web systems: an AI-integrated proctoring platform with DeepFace biometrics & OpenCV gaze tracking, a real-time collaborative Kanban workspace with Socket.io & optimistic UI rollbacks, and a multi-portal remote examination system with Chart.js analytics.',
    'Comfortable across the entire software stack: building responsive and interactive React frontends, designing robust RESTful APIs with Node.js and Express, integrating third-party services like Stripe and WebSockets, and managing MongoDB and MySQL databases. Seeking a Full-Stack or Front-End Developer role to contribute from day one.',
  ],
  stats: [
    { value: '3+', label: 'Flagship Full-Stack Apps', detail: 'Real-time, AI & MERN' },
    { value: '15+', label: 'Languages in Compiler', detail: 'Built into Proctoring App' },
    { value: '<50ms', label: 'Real-Time Sync Latency', detail: 'Socket.io state sync' },
    { value: 'B.Tech', label: 'Computer Science & Eng', detail: 'Trident Academy of Tech' },
  ],
  services: [
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Web Development (MERN & Python)',
      description: 'End-to-end architecture and development of robust web applications from modern React frontends to scalable Node.js/Express or Python/Flask backend APIs.',
      deliverables: [
        'Interactive React.js UI with Redux Toolkit state',
        'RESTful API architecture & secure JWT authentication',
        'Database schema modeling (MongoDB & MySQL)',
        'Third-party service integrations (Stripe, Cloud APIs)',
        'Responsive mobile-first layout & cross-browser QA',
      ],
      deliverableDetails: {
        'Interactive React.js UI with Redux Toolkit state': 'Modular component architecture with predictable global state management, error boundaries, and optimistic updates.',
        'RESTful API architecture & secure JWT authentication': 'Clean Express.js/Flask routing with role-based access control (RBAC), input validation, and secure session handling.',
        'Database schema modeling (MongoDB & MySQL)': 'Optimized relational and document schemas with indexing, foreign constraints, and transactional consistency.',
        'Third-party service integrations (Stripe, Cloud APIs)': 'End-to-end Stripe billing workflows, automated webhooks, email triggers, and cloud asset storage.',
        'Responsive mobile-first layout & cross-browser QA': 'Pixel-perfect mobile and desktop responsiveness tested across all modern web browsers.',
      },
      idealFor: 'Startups, organizations, or teams seeking a proactive full-stack engineer to build or enhance web platforms.',
      relatedProjectIds: ['project-proctoring', 'project-kanban', 'project-exam-portal'],
      relatedTestimonialIds: ['t-1', 't-2'],
      timeline: '2 - 6 weeks',
      startingAt: 15000,
      popular: true,
      iconName: 'Layout',
    },
    {
      id: 'realtime-systems',
      title: 'Real-Time Collaboration & WebSockets Solutions',
      description: 'Building high-concurrency interactive platforms, live Kanban boards, chat applications, and multi-user dashboards with instant bidirectional sync.',
      deliverables: [
        'Socket.io & WebSockets bidirectional event bus',
        'Optimistic UI updates with failure rollback handling',
        'Multi-tenant workspace & room management',
        'Persistent background audit logs & activity feeds',
        'State synchronization & race condition mitigation',
      ],
      deliverableDetails: {
        'Socket.io & WebSockets bidirectional event bus': 'Low-latency event emission and event listeners ensuring instant updates across all active client screens.',
        'Optimistic UI updates with failure rollback handling': 'Immediate local UI response to drag-and-drop or card edits, with graceful rollback if the API request errors.',
        'Multi-tenant workspace & room management': 'Isolated socket rooms keyed by workspace ID and user permissions to prevent data leakage.',
        'Persistent background audit logs & activity feeds': 'Complete audit history tracking timestamps, user IDs, and changed entity states in MongoDB.',
        'State synchronization & race condition mitigation': 'Conflict-free card re-ordering and position indexing across simultaneous user edits.',
      },
      idealFor: 'Teams building collaborative workspaces, productivity tools, live dashboards, or multiplayer interfaces.',
      relatedProjectIds: ['project-kanban'],
      relatedTestimonialIds: ['t-1'],
      timeline: '2 - 4 weeks',
      startingAt: 18000,
      popular: false,
      iconName: 'Layers',
    },
    {
      id: 'ai-integration',
      title: 'AI/ML Computer Vision & Intelligent Automation',
      description: 'Integrating deep learning, biometric facial verification, computer vision tracking, and intelligent automation pipelines into full-stack web applications.',
      deliverables: [
        'DeepFace biometric facial verification pipeline',
        'OpenCV & Dlib 68-point facial landmark tracking',
        'Python/Flask AI microservice endpoints',
        'Real-time video stream telemetry & anomaly logging',
        'Docker containerization for reproducible deployments',
      ],
      deliverableDetails: {
        'DeepFace biometric facial verification pipeline': 'Real-time candidate face matching against registered student biometric profiles with high confidence accuracy.',
        'OpenCV & Dlib 68-point facial landmark tracking': 'Live video processing for gaze direction analysis, multi-face presence detection, and camera absence logging.',
        'Python/Flask AI microservice endpoints': 'High-performance Flask REST API wrappers connecting computer vision models to frontend clients.',
        'Real-time video stream telemetry & anomaly logging': 'Structured JSON logs capturing timestamped suspicious events during active sessions.',
        'Docker containerization for reproducible deployments': 'Production-ready Docker and Docker Compose environments packaging OpenCV, Dlib, and C++ dependencies.',
      },
      idealFor: 'EdTech platforms, security applications, and enterprises looking to integrate AI computer vision into web portals.',
      relatedProjectIds: ['project-proctoring'],
      relatedTestimonialIds: ['t-2'],
      timeline: '3 - 6 weeks',
      startingAt: 22000,
      popular: false,
      iconName: 'Zap',
    },
    {
      id: 'frontend-engineering',
      title: 'Frontend Engineering & Interactive UI/UX',
      description: 'Crafting responsive, accessible, high-performance web applications with modern React, TypeScript, Tailwind CSS, and fluid animations.',
      deliverables: [
        'Modular component architecture in React & TypeScript',
        'Data visualization dashboards (Chart.js & Recharts)',
        'Role-based portal interfaces (Admin, Teacher, Student)',
        'Performance optimization & sub-second page loads',
        'Accessible WCAG AA standards & micro-animations',
      ],
      deliverableDetails: {
        'Modular component architecture in React & TypeScript': 'Reusable UI components with strict TypeScript types, clean props interfaces, and robust error handling.',
        'Data visualization dashboards (Chart.js & Recharts)': 'Interactive charts displaying score distributions, pass/fail ratios, time-series telemetry, and class analytics.',
        'Role-based portal interfaces (Admin, Teacher, Student)': 'Custom-tailored views and navigation flows dynamically rendered based on user authentication tokens.',
        'Performance optimization & sub-second page loads': 'Code splitting, asset compression, lazy loading, and optimized bundle sizes.',
        'Accessible WCAG AA standards & micro-animations': 'Keyboard navigation support, semantic HTML tags, high-contrast themes, and smooth micro-interactions.',
      },
      idealFor: 'Businesses needing polished, dynamic user interfaces and scalable dashboard applications.',
      relatedProjectIds: ['project-exam-portal', 'project-kanban'],
      relatedTestimonialIds: ['t-3'],
      timeline: '1 - 3 weeks',
      startingAt: 12000,
      popular: false,
      iconName: 'ShieldCheck',
    },
  ],
  projects: [
    {
      id: 'project-proctoring',
      title: 'Smart AI-Based Proctoring System',
      category: 'Full-Stack & Computer Vision AI',
      year: '2025 - 2026',
      client: 'Academic & Examination Security Platform',
      summary: 'Architected and built a full-stack AI-powered online examination system featuring DeepFace biometric verification, live OpenCV gaze tracking, online code compilation for 15+ languages, and Stripe monetization.',
      problem: 'Remote exams frequently suffer from identity impersonation, unmonitored browser cheating, and lack of real-time multi-face or gaze tracking without expensive human proctors.',
      solution: 'Implemented biometric DeepFace facial matching at exam login, live OpenCV + Dlib 68-point facial landmark gaze and multi-face tracking, multi-format exams (MCQ, subjective, 15+ language compiler), Stripe credit purchases for professors, and full Docker containerization.',
      outcomes: [
        { metric: '15+ Langs', label: 'Online Code Compiler' },
        { metric: '68-Point', label: 'Facial Landmark Proctoring' },
        { metric: '100% Docker', label: 'Containerized Deployment' },
      ],
      tags: ['Python', 'Flask', 'MySQL', 'DeepFace', 'OpenCV', 'Dlib', 'Stripe API', 'Docker', 'Bootstrap 5'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        beforeLabel: 'Vulnerable Manual Online Exam',
        afterLabel: 'AI-Proctored Biometric Portal',
      },
      testimonial: {
        quote: 'The depth of engineering in Aditya’s AI proctoring system — from biometric verification to 15+ language compilation and live gaze tracking — demonstrates exceptional full-stack and machine learning execution.',
        author: 'Prof. Academic Reviewer',
        role: 'Department of Computer Science & Engineering',
      },
      liveUrl: 'https://github.com/Aditya1791',
      githubUrl: 'https://github.com/Aditya1791',
    },
    {
      id: 'project-kanban',
      title: 'Collaborative Enterprise Project Management Workspace',
      category: 'Real-Time Full-Stack Web App',
      year: '2025',
      client: 'Team Productivity & Agile Workflow Suite',
      summary: 'Engineered a multi-user real-time project management platform featuring drag-and-drop Kanban boards, instant Socket.io state synchronization, optimistic UI updates with automatic rollbacks, and JWT-based role permissions.',
      problem: 'Distributed teams require zero-latency board updates when multiple members edit tasks simultaneously, without race conditions or disruptive page refreshes.',
      solution: 'Built fluid drag-and-drop using @hello-pangea/dnd, instant Socket.io event broadcasting server-side on card movements, optimistic UI updates with automatic database failure rollback, and a full background MongoDB audit trail.',
      outcomes: [
        { metric: '<50ms', label: 'Live Socket Sync Latency' },
        { metric: '100%', label: 'Optimistic UI Rollback Safety' },
        { metric: 'Role-Based', label: 'JWT Workspace Access Control' },
      ],
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'JWT', '@hello-pangea/dnd'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        beforeLabel: 'Static Reload-Heavy Task Lists',
        afterLabel: 'Real-Time Collaborative Kanban Board',
      },
      testimonial: {
        quote: 'Aditya’s implementation of real-time drag-and-drop with optimistic UI updates and instant Socket.io state synchronization feels as responsive and seamless as industry leaders like Trello and Linear.',
        author: 'Full-Stack Peer Review',
        role: 'Web Development Project Showcase',
      },
      liveUrl: 'https://github.com/Aditya1791',
      githubUrl: 'https://github.com/Aditya1791',
    },
    {
      id: 'project-exam-portal',
      title: 'Advanced Remote Examination & Assessment Portal',
      category: 'Full-Stack EdTech Architecture',
      year: '2024 - 2025',
      client: 'Institutional Assessment System',
      summary: 'Developed a comprehensive examination suite with 3 dedicated role-based portals (Admin, Teacher, Student), dynamic rich-text question banks, telemetry-based browser blur detection, and Chart.js performance analytics.',
      problem: 'Educational institutions require unified systems that combine flexible question authoring, cheat-detection telemetry, and automated performance analytics without high licensing costs.',
      solution: 'Constructed 3 independent role-scoped React dashboards enforced via Express JWT middleware, rich-text exam builder with automated grading algorithms, frontend browser blur/tab-switch event logging stored in MongoDB, and visual teacher analytics via Chart.js.',
      outcomes: [
        { metric: '3 Portals', label: 'Admin, Teacher & Student RBAC' },
        { metric: 'Auto-Graded', label: 'Instant Score Calculation' },
        { metric: 'Telemetry', label: 'Tab Switch & Blur Detection' },
      ],
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Redux Toolkit', 'JWT Authentication'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
      testimonial: {
        quote: 'The modular architecture and clear separation of concerns across Admin, Teacher, and Student portals makes this exam system exceptionally robust and intuitive.',
        author: 'EdTech Evaluator',
        role: 'Academic Software Showcase',
      },
      liveUrl: 'https://github.com/Aditya1791',
      githubUrl: 'https://github.com/Aditya1791',
    },
    {
      id: 'project-portfolio-system',
      title: 'Interactive 3D Personal Business Portfolio & Engine',
      category: 'Frontend & Interactive Web App',
      year: '2026',
      client: 'Production Portfolio Platform',
      summary: 'Designed and engineered an interactive, high-performance portfolio platform featuring a 3D spinning carousel navigation hub, scope fee calculator, dynamic vibe themes, and live resume profile generation.',
      problem: 'Standard developer portfolios are static, text-heavy, and fail to showcase modern UI engineering, kinetic physics, and interactive customer conversion tools.',
      solution: 'Engineered a dual-mode portfolio with an interactive 3D rotating orbit hub, full-featured scope estimator, dynamic JSON theme generator, and comprehensive case studies with before/after interactive sliders.',
      outcomes: [
        { metric: '60 FPS', label: 'Smooth 3D Motion Physics' },
        { metric: '100%', label: 'Interactive Scope Estimator' },
        { metric: '4 Themes', label: 'Dynamic Real-Time Styling' },
      ],
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion / Animation', 'Vite'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://github.com/Aditya1791',
      githubUrl: 'https://github.com/Aditya1791',
    },
  ],
  testimonials: [
    {
      id: 't-1',
      name: 'Dr. S. K. Mohapatra',
      role: 'Project Guide & Senior Faculty',
      company: 'Trident Academy of Technology',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      quote: 'Aditya exhibits remarkable dedication and deep technical proficiency in full-stack development. His real-time collaboration workspace and AI proctoring platform represent top-tier engineering standards.',
      project: 'Smart AI Proctoring & Kanban Workspace',
      rating: 5,
    },
    {
      id: 't-2',
      name: 'R. K. Verma',
      role: 'AI/ML Program Lead',
      company: 'CTTC MSME Bhubaneswar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      quote: 'Aditya demonstrated an outstanding grasp of computer vision and deep learning pipelines, seamlessly combining DeepFace and OpenCV models with full-stack Python and web microservices.',
      project: 'AI/ML Training & Biometric Integration',
      rating: 5,
    },
    {
      id: 't-3',
      name: 'Engineering Collaborator',
      role: 'Full-Stack Developer',
      company: 'Open-Source Project Peer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      quote: 'Working alongside Aditya on MERN stack architectures is a breeze. His code is cleanly structured, API endpoints are thoroughly documented, and his UI components are fast and responsive.',
      project: 'Remote Assessment & Examination Portal',
      rating: 5,
    },
  ],
  featuredProjectId: 'project-proctoring',
  skills: [
    {
      category: 'Frontend Engineering',
      items: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap 5', 'Redux Toolkit', 'Responsive Web Design', 'Component Architecture'],
      itemDetails: {
        'React.js': { description: 'Component-driven frontend architecture, custom hooks, context, state management, and virtual DOM optimization.', experience: 'Daily Pro' },
        'JavaScript (ES6+)': { description: 'Asynchronous programming, promises, closures, ES modules, and modern JavaScript standards.', experience: 'Advanced' },
        'HTML5 & CSS3': { description: 'Semantic markup, modern CSS grid & flexbox layouts, animations, and accessible web standards.', experience: 'Proficient' },
        'Tailwind CSS': { description: 'Utility-first rapid UI styling, custom design tokens, dark mode theming, and responsive utilities.', experience: 'Production' },
        'Bootstrap 5': { description: 'Grid layouts, accessible UI components, and rapid responsive styling for enterprise platforms.', experience: 'Proficient' },
        'Redux Toolkit': { description: 'Global state management, slices, async thunks, and predictable data flow.', experience: 'Advanced' },
        'Responsive Web Design': { description: 'Mobile-first fluid layouts ensuring pixel-perfect display across all device breakpoints.', experience: 'Core Focus' },
        'Component Architecture': { description: 'Modular, decoupled UI design patterns for maintainability and scalability.', experience: 'Core Focus' },
      },
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'Express.js', 'Python', 'Flask', 'RESTful APIs', 'Socket.io / WebSockets', 'JWT Authentication', 'RBAC Middleware'],
      itemDetails: {
        'Node.js': { description: 'Asynchronous event-driven runtime for building scalable server-side microservices.', experience: 'Advanced' },
        'Express.js': { description: 'RESTful API routing, custom middleware pipelines, error handling, and authentication layers.', experience: 'Advanced' },
        'Python': { description: 'Backend service programming, data manipulation, algorithm scripting, and AI model orchestration.', experience: 'Proficient' },
        'Flask': { description: 'Lightweight Python web framework, session management, Flask-WTF, and API routing.', experience: 'Production' },
        'RESTful APIs': { description: 'Designing clean, versioned, REST compliant API endpoints with standardized JSON payloads.', experience: 'Advanced' },
        'Socket.io / WebSockets': { description: 'Real-time bidirectional event communication for collaborative boards and live updates.', experience: 'Production' },
        'JWT Authentication': { description: 'Stateless token-based authentication with secure cookie storage and authorization headers.', experience: 'Advanced' },
        'RBAC Middleware': { description: 'Role-Based Access Control securing Admin, Teacher, Student, and Owner endpoints.', experience: 'Advanced' },
      },
    },
    {
      category: 'Databases & Storage',
      items: ['MongoDB & Mongoose', 'MySQL', 'Firebase Realtime DB', 'Firebase Auth', 'Geospatial Indexing', 'Data Modeling'],
      itemDetails: {
        'MongoDB & Mongoose': { description: 'Document schema design, aggregation pipelines, validation, and indexing for high performance.', experience: 'Advanced' },
        'MySQL': { description: 'Relational database schema modeling, normalized tables, joins, and ACID transactional integrity.', experience: 'Proficient' },
        'Firebase Realtime DB': { description: 'NoSQL cloud database with live data synchronization and offline caching.', experience: 'Proficient' },
        'Firebase Auth': { description: 'OAuth, email/password identity management, and secure token verification.', experience: 'Proficient' },
        'Geospatial Indexing': { description: 'Spatial indexing queries for location-based queries and mapping applications.', experience: 'Hands-on' },
        'Data Modeling': { description: 'Designing normalized relational schemas and high-throughput document structures.', experience: 'Core Focus' },
      },
    },
    {
      category: 'AI / ML & Developer Tools',
      items: ['DeepFace', 'OpenCV', 'Dlib (68-Point)', 'Docker & Compose', 'Git & GitHub', 'Postman', 'Stripe API', 'VS Code'],
      itemDetails: {
        'DeepFace': { description: 'Facial recognition, biometric identity verification, and facial representation modeling.', experience: 'Integrated' },
        'OpenCV': { description: 'Live video capture, image matrix manipulation, motion tracking, and gaze telemetry.', experience: 'Integrated' },
        'Dlib (68-Point)': { description: '68-point facial landmark shape predictor for precise eye, nose, and jawline tracking.', experience: 'Integrated' },
        'Docker & Compose': { description: 'Multi-container orchestration for Python, Node, MySQL, and Redis microservices.', experience: 'Proficient' },
        'Git & GitHub': { description: 'Branching workflows, version control, issue tracking, and repository management.', experience: 'Daily Pro' },
        'Postman': { description: 'API endpoint testing, environment variables, collection runners, and mock servers.', experience: 'Daily Pro' },
        'Stripe API': { description: 'Payment gateway integration, customer billing portal, and webhook handling.', experience: 'Integrated' },
        'VS Code': { description: 'Primary IDE with TypeScript, ESLint, Prettier, and debugging configurations.', experience: 'Daily Pro' },
      },
    },
  ],
  internships: [
    {
      role: 'AI/ML Intern',
      company: '1Stop.ai',
      period: '1 Jul - 1 Sep 2026',
      duration: '3 months',
      description: 'Completed AI/ML internship completing 3 real-world projects across machine learning modeling, computer vision pipelines, and full-stack model deployment.',
      skills: ['Python', 'Machine Learning', 'Computer Vision', 'DeepFace & OpenCV', 'Flask API'],
    },
    {
      role: 'AI/ML Training Intern',
      company: 'CTTC MSME, Bhubaneswar',
      period: '15 Jul - 15 Aug 2026',
      duration: '2 months',
      description: 'Completed intensive industrial training in deep learning, computer vision, OpenCV image processing, and AI web integration microservices.',
      skills: ['Python', 'OpenCV', 'DeepFace', 'Deep Learning', 'Computer Vision'],
    },
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Trident Academy of Technology, Bhubaneswar',
      year: '2022 - 2026',
      coursework: ['Data Structures & Algorithms', 'DBMS', 'Web Technologies', 'Operating Systems'],
      location: 'Bhubaneswar, Odisha, India',
    },
    {
      degree: 'Class XII - PCM & Computer Science (CBSE)',
      institution: 'Sainik School Bhubaneswar',
      year: '2020 - 2022',
      coursework: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science (Python & SQL)'],
      location: 'Bhubaneswar, Odisha, India',
    },
    {
      degree: 'Class X - PCM, Biology & Computer Science (CBSE)',
      institution: 'Sainik School Bhubaneswar',
      year: '2018 - 2020',
      coursework: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      location: 'Bhubaneswar, Odisha, India',
    },
  ],
  certifications: [
    {
      title: 'Full-Stack Web Development - MERN Stack',
      issuer: 'Self-Directed / GitHub Portfolio',
      year: '2024 - 2025',
    },
  ],
  achievements: [
    'Independently built and deployed three production-grade full-stack web applications - covering real-time collaboration, AI-integrated proctoring, and role-based exam management.',
    'Developed a real-world AI proctoring platform integrating biometric facial verification, live video analysis via OpenCV, code compilation for 15+ languages, and Stripe payments.',
    'Active GitHub contributor (@Aditya1791) with multiple public repositories covering MERN stack, Python/Flask, and AI-integrated web development projects.',
    'Maintained consistent academic performance throughout engineering studies at Trident Academy of Technology, Bhubaneswar.',
    'Participated in the IEEE Sustainable Solutions Hackathon (28-29 Sep 2024), collaborating in a team to design a solution under time-constrained hackathon conditions.',
  ],
  insights: [
    {
      id: 'insight-realtime-kanban',
      title: 'Architecting Real-Time Collaborative Workspaces with Socket.io & Optimistic UI',
      slug: 'architecting-realtime-collaborative-workspaces-socketio',
      category: 'Full-Stack & WebSockets',
      readTime: '6 min read',
      publishedAt: '2025',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      summary: 'A deep-dive into implementing drag-and-drop state synchronization with @hello-pangea/dnd, sub-50ms Socket.io broadcasting, and optimistic UI updates with automatic rollback handling.',
      content: `When building real-time collaborative applications like Kanban boards or shared documents, the primary challenge is balancing instant user feedback with deterministic database consistency.

## The Dual-Layer Architecture: Optimistic UI + Socket Broadcast

In a standard client-server model, the UI waits for the API response before moving a task card. In low-latency collaborative tools, this feels laggy and frustrating.

### 1. Instant Optimistic State Mutation
When a user drops a card into a new column, the frontend Redux store updates immediately. The card glides into place without waiting for the network round-trip.

### 2. Socket.io Event Broadcast
Simultaneously, a Socket.io event is emitted containing the card ID, source column, destination column, and new position index. The Express server broadcasts this event to all other clients in the same workspace room.

### 3. Graceful Rollback on Server Error
If the MongoDB write fails (e.g. due to permission revocation or network timeout), the client receives an error payload and smoothly rolls the card back to its previous position with a user-friendly toast alert.

## Managing Race Conditions & Audit Logging
Every card mutation is recorded in a background MongoDB audit log schema with timestamps and user identifiers, providing full transparency across team actions.`,
      tags: ['React.js', 'Socket.io', 'Node.js', 'MongoDB', 'Redux Toolkit'],
      relatedServiceId: 'realtime-systems',
      ctaText: 'Looking to integrate real-time collaboration into your platform?',
      ctaAction: 'booking',
    },
    {
      id: 'insight-ai-proctoring',
      title: 'Building Production AI Proctoring: Combining DeepFace Biometrics with 68-Point OpenCV Gaze Tracking',
      slug: 'production-ai-proctoring-deepface-opencv-gaze-tracking',
      category: 'AI / Computer Vision',
      readTime: '7 min read',
      publishedAt: '2025',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      summary: 'How to prevent online exam impersonation and cheating by combining biometric facial verification, continuous gaze estimation via 68-point Dlib landmarks, and Docker microservices.',
      content: `Securing remote examinations requires a multi-layered verification strategy that operates reliably across varied lighting conditions and standard student webcams.

## Step 1: Biometric Verification at Entry Gate
Before an exam session starts, the student’s live webcam frame is compared against their registered profile picture using DeepFace. Only when a cosine similarity threshold (>85%) is satisfied is the exam paper decrypted.

## Step 2: Continuous 68-Point Landmark Tracking
During the exam session, OpenCV captures video frames at fixed intervals and processes them through Dlib's 68-point facial landmark shape predictor:
- **Gaze Direction**: Calculating the relative position of the iris within the eye landmarks to detect looking off-screen.
- **Multi-Face Detection**: Flagging unauthorized persons entering the camera frame.
- **Absence Detection**: Triggering an alert if the student leaves their chair.

## Step 3: Telemetry & Stripe Exam Monetization
All suspicious activity logs are stamped with ISO timestamps and stored in MySQL for professor review. Professors can top up exam proctoring credits seamlessly via Stripe payment checkout.`,
      tags: ['Python', 'OpenCV', 'DeepFace', 'Flask', 'Docker', 'Stripe'],
      relatedServiceId: 'ai-integration',
      ctaText: 'Need computer vision or AI features in your web app?',
      ctaAction: 'booking',
    },
    {
      id: 'insight-rbac-edtech',
      title: 'Designing Role-Based Portals & Dynamic Exam Engines in the MERN Stack',
      slug: 'role-based-portals-dynamic-exam-engines-mern',
      category: 'Full-Stack Architecture',
      readTime: '5 min read',
      publishedAt: '2025',
      coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      summary: 'Structuring strict role-based access control (RBAC) across Admin, Teacher, and Student portals, with dynamic rich-text question authoring and Chart.js analytics.',
      content: `Multi-stakeholder applications require clean boundary separation at both the React routing layer and the Express middleware level.

## Scoped Portals with JWT Middleware
By attaching role claims to JWT tokens and verifying them in Express middleware, we ensure:
- Students can only access active exam submissions and their personal grades.
- Teachers can create question banks, launch exams, and view class analytics.
- Admins maintain global oversight over user accounts, permissions, and institution metrics.

## Real-Time Analytics with Chart.js
Visualizing exam metrics — including grade distributions, pass/fail ratios, and average completion durations — empowers teachers to identify struggling students and optimize question difficulty instantly.`,
      tags: ['React.js', 'MERN Stack', 'Chart.js', 'JWT', 'RBAC'],
      relatedServiceId: 'fullstack-dev',
      ctaText: 'Planning to build a role-based portal or dashboard?',
      ctaAction: 'booking',
    },
  ],
  milestones: [
    {
      year: '2026',
      role: 'AI/ML Intern',
      company: '1Stop.ai',
      description: 'Completed AI/ML internship completing 3 real-world projects in machine learning, computer vision, and model deployment (1 Jul - 1 Sep 2026, 3 months).',
    },
    {
      year: '2026',
      role: 'AI/ML Training Intern',
      company: 'CTTC MSME, Bhubaneswar',
      description: 'Industrial training in deep learning, OpenCV computer vision, and Python AI microservice pipelines (15 Jul - 15 Aug 2026, 2 months).',
    },
    {
      year: '2024 - Present',
      role: 'Full-Stack Web Developer & Project Lead',
      company: 'Independent & Portfolio Engineering',
      description: 'Architected and deployed 3 flagship production web apps: AI Proctoring System, Collaborative Real-Time Kanban Workspace, and Remote Assessment Portal.',
    },
    {
      year: '2022 - 2026',
      role: 'B.Tech in Computer Science & Engineering',
      company: 'Trident Academy of Technology, Bhubaneswar',
      description: 'Undergraduate engineering studies with focus on Data Structures & Algorithms, DBMS, Web Technologies, and Operating Systems.',
    },
    {
      year: '2018 - 2022',
      role: 'High School & Senior Secondary Scholar',
      company: 'Sainik School Bhubaneswar',
      description: 'Built foundational discipline, analytical problem solving, mathematics, and early computer science programming (Python & SQL).',
    },
  ],
  contactInfo: {
    email: 'swainaditya85@gmail.com',
    calendlyUrl: 'https://linkedin.com/in/aditya-ranjan-swain',
    linkedin: 'https://linkedin.com/in/aditya-ranjan-swain',
    twitter: 'https://github.com/Aditya1791',
    github: 'https://github.com/Aditya1791',
    dribbble: 'https://dribbble.com/swainaditya85',
    phone: '+91 78468 87605',
  },
  themeVibe: 'modern-minimal',
};

export const marketingProfile: PortfolioProfile = {
  ...defaultProfile,
  brandTitle: 'Aditya Ranjan Swain — Frontend & UI Engineering',
  role: 'Frontend & UI Engineer (React.js, TypeScript & Modern UI)',
  tagline: 'Building high-performance React frontends, accessible component architectures, and responsive digital products.',
  oneLinePitch: 'Frontend Engineer specializing in React.js, TypeScript, and modern CSS/Tailwind, transforming complex product requirements into fast, accessible, and responsive user interfaces.',
  themeVibe: 'editorial-warm',
};

export const photographerProfile: PortfolioProfile = {
  ...defaultProfile,
  brandTitle: 'Aditya Ranjan Swain — AI & Backend Systems',
  role: 'AI & Backend Systems Engineer (Python, Flask & Computer Vision)',
  tagline: 'Architecting scalable RESTful APIs, WebSockets event buses, and AI/ML computer vision microservices.',
  oneLinePitch: 'Full-stack & AI engineer specializing in Python/Flask backend APIs, DeepFace biometric authentication, OpenCV gaze tracking, and Dockerized microservices.',
  themeVibe: 'dark-obsidian',
};

export const architectProfile: PortfolioProfile = {
  ...defaultProfile,
  brandTitle: 'Aditya Ranjan Swain — Real-Time Web Architect',
  role: 'Real-Time Full-Stack Architect (MERN & WebSockets)',
  tagline: 'Engineering low-latency collaborative workspaces, optimistic UI state synchronizers, and resilient distributed databases.',
  oneLinePitch: 'MERN stack specialist with deep expertise in Socket.io bidirectional sync, optimistic state rollback mechanisms, and role-based access architectures.',
  themeVibe: 'bold-creative',
};

