'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { useLenis } from './Providers'

const ALL_TAGS = ['All', 'Next.js', 'React.js', 'Node.js', 'TypeScript', 'AI']

const projects = [
  {
    id: 1,
    tags: ['Next.js', 'React.js', 'TypeScript'],
    title: 'SkillBridge Frontend',
    subtitle: 'Modern Tutoring Platform',
    coverImage: '/project1/1.png',
    description:
      'Online tutoring had a coordination problem — students, tutors, and admins each needed a completely different interface, but most platforms serve everyone the same page. SkillBridge solves this with parallel Next.js routes per role, Stripe-gated bookings, and a Groq-powered AI tutor that answers questions without exposing the API key to the client.',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Framer Motion', 'Stripe.js', 'Groq SDK'],
    features: [
      'Role-based parallel routes for Student, Tutor, and Admin dashboards',
      'Stripe payment flow: PaymentIntent → CheckoutPage → server-side confirmation',
      'Google & GitHub OAuth via Next.js Route Handlers with httpOnly JWT cookies',
      'AI Tutor chatbot (Groq Llama 3.3-70b) with typing indicator and cooldown',
      'Course listing with search, price filter, and client-side pagination',
      'Admin dashboard: ban/unban users, manage categories, view platform stats',
    ],
    challenges: [
      'Implementing role-based parallel routes (@student, @tutor, @admin) so the correct dashboard renders on the server without any client-side role checks.',
      'Integrating the Stripe PaymentIntent flow end-to-end — creating the intent server-side, rendering <PaymentElement>, and verifying the result before marking a booking as PAID.',
      'Managing the AI Tutor rate limit with a 5-second send cooldown and differentiating authenticated vs. guest UI states without exposing the Groq API key to the client.',
    ],
    futureImprovements: [
      'Replace polling-based notifications with WebSocket push for real-time booking status updates.',
      'Add a React Native mobile app so students can join Jitsi classrooms from their phones.',
      'Introduce async video lesson uploads so tutors can offer pre-recorded sessions alongside live bookings.',
    ],
    liveLink: 'https://skillbridge-frontend-ruby.vercel.app',
    githubLink: 'https://github.com/rahyanakil/SkillBridge-FrontEnd-',
    snapshots: [
      '/project1/1.png',
      '/project1/2.png',
      '/project1/3.png',
      '/project1/4.png',
      '/project1/5.png',
      '/project1/6.png',
      '/project1/7.png',
      '/project1/8.png',
      '/project1/9.png',
      '/project1/10.png',
      '/project1/11.png',
    ],
  },
  {
    id: 2,
    tags: ['Next.js', 'TypeScript', 'AI'],
    title: 'SmartRetail AI',
    subtitle: 'AI-Powered Retail Management Platform',
    coverImage: '/project2/1.png',
    description:
      'Most retail owners manage stock on spreadsheets and make restock decisions on instinct. SmartRetail AI changes that — a Gemini-powered copilot grounded in live store data via 6 parallel DB queries so it cannot hallucinate numbers. One dashboard for sales, inventory, staff activity, and AI-ranked restock urgency.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'TanStack Query', 'Recharts', 'Gemini AI', 'Zustand'],
    features: [
      'Role-based access (Admin / Owner / Cashier) enforced at Next.js Edge Middleware before any React code runs',
      'AI Insights: Business Health Score (0–100 donut ring), 7-day revenue forecast with pessimistic/expected/optimistic bands, and urgency-ranked restock recommendations',
      'AI Copilot: SSE-streamed chat grounded in live store data via 6 parallel DB queries injected as the Gemini system instruction — the AI cannot hallucinate numbers',
      'Analytics dashboard with Recharts — revenue trend, top products by revenue, sales volume — dark-mode aware via useChartColors() hook returning explicit HSL values',
      'POS terminal with real-time cart and atomic checkout (stock decrement, receipt, and sale record in a single DB transaction)',
      'Inventory management with ADD / REMOVE / SET stock adjustments that write a permanent StockLog audit trail',
      'TanStack Query throughout — staleTime 2 min for live data, 15 min for AI results. No retry on 401/403/404.',
      'Public marketing site, /explore product catalog preview, and demo quick-fill buttons for all three roles',
    ],
    challenges: [
      'Edge Middleware JWT verification required jose instead of jsonwebtoken (Edge Runtime incompatibility). Role guards now run before React hydrates, completely eliminating flash of protected content.',
      'Recharts SVG attributes do not support CSS variables. Built a useChartColors() hook that reads resolvedTheme and returns explicit HSL strings so charts render correctly in both light and dark mode.',
      'Grounding Gemini AI in live data: the Copilot backend assembles a real-time snapshot via 6 parallel Prisma queries and injects it as the system instruction, preventing hallucinated numbers while keeping latency acceptable.',
    ],
    futureImprovements: [
      'Replace TanStack Query polling with WebSocket push for real-time KPI updates across multiple open tabs.',
      'Add a Cashier PWA with offline support — queue sales in IndexedDB and sync when connectivity returns.',
      'Introduce multi-currency support and a supplier integration layer for automated purchase order generation from the restock recommendations.',
    ],
    liveLink: 'https://smart-retail-ai-snowy.vercel.app',
    githubLink: 'https://github.com/rahyanakil/Smart-Retail-AI',
    snapshots: [
      '/project2/1.png',
      '/project2/2.png',
      '/project2/3.png',
      '/project2/4.png',
      '/project2/5.png',
      '/project2/6.png',
      '/project2/7.png',
      '/project2/8.png',
      '/project2/9.png',
      '/project2/10.png',
      '/project2/11.png',
      '/project2/12.png',
      '/project2/13.png',
      '/project2/14.png',
    ],
  },
  {
    id: 3,
    tags: ['Next.js', 'TypeScript'],
    title: 'PropertySmart',
    subtitle: 'Real Estate Marketplace Frontend',
    coverImage: '/project3/1.png',
    description:
      'Vercel silently drops session cookies when frontend and backend live on different domains — users log in, get redirected, then hit 401 immediately. PropertySmart fixes this with a dual-auth strategy: JWT stored in localStorage with an Axios interceptor as the reliable path, cookie as fallback. Framer Motion UI, Stripe checkout, and role-based dashboards for Buyers, Agents, and Admins.',
    techStack: ['Next.js 15', 'TypeScript 5', 'Tailwind CSS', 'Framer Motion', 'TanStack Query v5', 'Stripe', 'React Hook Form', 'Zod', 'Recharts', 'Lenis'],
    features: [
      'Dual-auth strategy (Bearer token + cookie fallback) — solves Vercel cross-origin session loss that caused the login-flicker bug on production',
      'Role-based dashboards: Buyer (bookings, favorites), Agent (listings, analytics, booking management), Admin (users, payments, platform controls)',
      'Premium Framer Motion UI: mouse-parallax hero, 3D card tilt (±6° with perspective 800), word-by-word text reveal, magnetic buttons, CountUp stats',
      'Stripe Elements checkout — PaymentIntent flow from /payment to /payment/success with confirmation',
      'TanStack Query v5 data layer — staleTime tuned per endpoint (2 min live data, 15 min AI), optimistic cache invalidation on mutations',
      'Lenis smooth scroll with LenisFramerSync (dispatches native scroll events so useScroll reads correct virtual position) and route reset on navigation',
      'Animated property listing — AnimatePresence mode="wait" grid transitions between filter changes, progressive skeleton stagger, floating empty state',
      'Recharts Agent analytics: views bar chart, bookings pie chart, conversion rate stats — dark-mode aware',
    ],
    challenges: [
      'Cross-origin cookie blocking on Vercel (frontend and backend on different domains caused GET /auth/me to silently drop the session cookie, immediately logging users out). Solved with dual-auth: login stores accessToken + refreshToken in a SSR-safe TokenStore, Axios request interceptor attaches Authorization: Bearer on every call — browser cookie policy becomes irrelevant.',
      'Keeping Framer Motion useScroll accurate while Lenis hijacks native wheel events. LenisFramerSync dispatches a synthetic native "scroll" event on every Lenis RAF tick, so Framer\'s scroll reading stays in sync with the virtual scroll position used for the Navbar glass effect.',
      'useSearchParams() causing next build prerender failures. Every page component that reads search params is wrapped in <Suspense> so the parent page can be statically rendered — discovered via build-time errors and fixed before deployment.',
    ],
    futureImprovements: [
      'Replace localStorage token storage with a BFF (Backend-For-Frontend) pattern — httpOnly cookie set by a Next.js Route Handler so tokens are never accessible to JavaScript.',
      'Add WebSocket support for real-time booking status updates and agent notifications without polling.',
      'Build a React Native companion app using the same API layer for mobile property browsing and agent management.',
    ],
    liveLink: 'https://property-smart-frontend.vercel.app',
    githubLink: 'https://github.com/rahyanakil/Property-Smart-Frontend',
    snapshots: [
      '/project3/1.png',
      '/project3/2.png',
      '/project3/3.png',
      '/project3/4.png',
      '/project3/5.png',
      '/project3/6.png',
      '/project3/7.png',
      '/project3/8.png',
      '/project3/9.png',
      '/project3/10.png',
      '/project3/11.png',
      '/project3/12.png',
    ],
  },
  {
    id: 4,
    tags: ['React.js', 'Node.js'],
    title: 'Cambrian School & College',
    subtitle: 'Educational Platform',
    coverImage: '/project4/1.png',
    description:
      'Cambrian School & College was managing appointment bookings by phone and paper — no confirmation, no tracking, high no-show rate. This platform digitizes the entire flow: online booking, service categorization, MongoDB-backed workflows, and Nodemailer email confirmations triggered at each booking state change.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Nodemailer'],
    features: [
      'Appointment booking and service categorization system',
      'Database-driven workflows for bookings and notifications',
      'Email notification functionality for appointment tracking',
      'Scalable data models for content management',
      'Service categorization and scheduling logic',
    ],
    challenges: [
      'Designing database workflows that handle appointment conflicts reliably.',
      'Implementing email notification triggers across different booking states.',
      'Building a flexible content management structure for different service categories.',
    ],
    futureImprovements: [
      'Add a student portal with online fee payment integration.',
      'Implement SMS notifications alongside email alerts.',
      'Build a real-time appointment analytics dashboard for administrators.',
    ],
    liveLink: 'https://www.cambrian.edu.bd/',
    githubLink: 'https://github.com/rahyanakil',
    snapshots: [
      '/project4/1.png',
      '/project4/2.png',
      '/project4/3.png',
      '/project4/4.png',
    ],
  },
]

// ── Shared image with graceful fallback ──────────────────────────────────────
function ProjectImage({ src, alt, className = '', fill = false }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}>
        <i className="bx bx-image text-4xl text-zinc-400 dark:text-zinc-600" />
      </div>
    )
  }
  if (src.startsWith('http')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} onError={() => setErrored(true)} className={`w-full h-full object-cover ${className}`} />
    )
  }
  return <Image src={src} alt={alt} fill={fill} onError={() => setErrored(true)} className={`object-cover ${className}`} />
}

// ── Full-screen lightbox ─────────────────────────────────────────────────────
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
      >
        {src.startsWith('http') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Screenshot" className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl" />
        ) : (
          <div className="relative w-full h-[80vh]">
            <Image src={src} alt="Screenshot" fill className="object-contain rounded-2xl" />
          </div>
        )}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <i className="bx bx-x text-xl" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
        <i className={`bx ${icon} text-accent text-base`} />
      </div>
      <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-[0.18em]">{label}</h3>
      <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
    </div>
  )
}

// ── Animation variants ───────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  const [lightbox, setLightbox] = useState(null)
  const lenisRef = useLenis()

  // Stop Lenis so background page doesn't scroll behind the modal
  useEffect(() => {
    lenisRef?.current?.stop()
    return () => lenisRef?.current?.start()
  }, [lenisRef])

  // Escape to close (only when lightbox is not open)
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && !lightbox) onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lightbox])

  return (
    <>
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
        />

        {/* Panel — fixed bounds, flex column: sticky header + scrollable body */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, y: 64, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 64, scale: 0.95 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-50 inset-x-3 sm:inset-x-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl top-[4vh] bottom-[4vh] flex flex-col bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.4)] overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50"
        >
          {/* ── Sticky hero header ── */}
          <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden">
            <ProjectImage src={project.snapshots[0]} alt={project.title} fill className="brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 border border-white/15 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <i className="bx bx-x text-xl" />
            </motion.button>

            {/* Title block */}
            <div className="absolute bottom-5 left-5 right-16">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-accent text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5"
              >
                {project.subtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          {/* ── Scrollable body — data-lenis-prevent stops Lenis intercepting wheel events ── */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
            data-lenis-prevent
          >
            <div className="p-5 sm:p-7 space-y-8">

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm border-l-2 border-accent/50 pl-4 py-1"
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <div>
                <SectionHeader icon="bx-code-alt" label="Tech Stack" />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="flex flex-wrap gap-2"
                >
                  {project.techStack.map((t) => (
                    <motion.span
                      key={t}
                      variants={fadeUp}
                      className="px-3 py-1 bg-gradient-to-br from-accent/15 to-accent/5 text-accent border border-accent/25 rounded-full text-xs font-semibold hover:border-accent/60 transition-colors cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Key Features */}
              <div>
                <SectionHeader icon="bx-list-check" label="Key Features" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid sm:grid-cols-2 gap-2.5"
                >
                  {project.features.map((f) => (
                    <motion.li
                      key={f}
                      variants={fadeUp}
                      className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/40 hover:border-accent/30 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="bx bx-check text-accent text-xs" />
                      </span>
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Challenges */}
              <div>
                <SectionHeader icon="bx-target-lock" label="Challenges" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="space-y-3"
                >
                  {project.challenges.map((c, i) => (
                    <motion.li
                      key={c}
                      variants={fadeUp}
                      className="flex gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/40"
                    >
                      <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-accent/30">
                        {i + 1}
                      </span>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{c}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Future Improvements */}
              <div>
                <SectionHeader icon="bx-rocket" label="Future Improvements" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="space-y-2.5"
                >
                  {project.futureImprovements.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <i className="bx bx-right-arrow-alt text-accent text-lg flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-1">
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-2xl font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/45 transition-shadow"
                >
                  <i className="bx bx-link-external text-base" /> Live Site
                </motion.a>
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 dark:bg-zinc-700 text-white rounded-2xl font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors"
                >
                  <i className="bx bxl-github text-base" /> GitHub
                </motion.a>
              </div>

              {/* Screenshots */}
              <div>
                <SectionHeader icon="bx-images" label="Screenshots" />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {project.snapshots.map((src, i) => (
                    <motion.button
                      key={i}
                      variants={fadeUp}
                      onClick={() => setLightbox(src)}
                      className="relative h-28 sm:h-32 rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2"
                    >
                      <ProjectImage
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        fill
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <i className="bx bx-zoom-in text-white text-3xl drop-shadow-lg" />
                        </motion.span>
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] text-white/70 font-medium bg-black/30 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
                        {i + 1}/{project.snapshots.length}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox — above modal (z-60) */}
      <AnimatePresence>
        {lightbox && <Lightbox key="lightbox" src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  )
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const [imgHovered, setImgHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef(null)

  // 3-D tilt
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 120, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 120, damping: 22 })

  // Cursor spotlight
  const spotXPct = useTransform(mouseX, [0, 1], [0, 100])
  const spotYPct = useTransform(mouseY, [0, 1], [0, 100])
  const spotX = useMotionTemplate`${spotXPct}%`
  const spotY = useMotionTemplate`${spotYPct}%`
  const spotBg = useMotionTemplate`radial-gradient(280px circle at ${spotX} ${spotY}, rgba(249,20,96,0.08), transparent 70%)`

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setImgHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setImgHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="group relative flex flex-col h-full"
    >
      {/* Glow halo behind card */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-sm" />

      {/* Tilt wrapper */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group-hover:border-accent/50 bg-white dark:bg-zinc-900 shadow-lg group-hover:shadow-[0_24px_64px_rgba(249,20,96,0.18)] transition-all duration-300"
      >
        {/* Cursor spotlight */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotBg }}
        />

        {/* Corner brackets */}
        <span className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/70 rounded-tl transition-all duration-300 z-20 pointer-events-none" />
        <span className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-accent/0 group-hover:border-accent/70 rounded-tr transition-all duration-300 z-20 pointer-events-none" />
        <span className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-accent/0 group-hover:border-accent/70 rounded-bl transition-all duration-300 z-20 pointer-events-none" />
        <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/70 rounded-br transition-all duration-300 z-20 pointer-events-none" />

        {/* ── Image ── */}
        <div
          className="relative h-56 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800 flex-shrink-0"
          onClick={() => onOpen(project)}
        >
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center">
              <i className="bx bx-image text-5xl text-zinc-300 dark:text-zinc-700" />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <motion.img
              src={project.coverImage}
              alt={project.title}
              onError={() => setImgError(true)}
              animate={{ y: imgHovered ? '-42%' : '0%', scale: imgHovered ? 1.04 : 1 }}
              transition={{ duration: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '175%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          )}

          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Scanning line */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none z-10"
            animate={imgHovered ? { top: ['0%', '110%'], opacity: [0, 1, 1, 0] } : { top: '0%', opacity: 0 }}
            transition={imgHovered ? { duration: 1.6, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
          />

          {/* Hover tint */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: imgHovered ? 1 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ background: 'rgba(249,20,96,0.13)', backdropFilter: 'blur(2px)' }}
          />

          {/* View Details CTA */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: imgHovered ? 1 : 0 }}
          >
            <motion.span
              animate={{ scale: imgHovered ? 1 : 0.78, y: imgHovered ? 0 : 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-zinc-900 rounded-full font-bold text-sm shadow-2xl"
            >
              <i className="bx bx-expand-alt text-sm" />
              View Details
            </motion.span>
          </motion.div>

          {/* Project index badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md bg-black/55 border border-white/10 backdrop-blur-md pointer-events-none">
            <span className="text-accent text-[11px] font-black leading-none">{String(project.id).padStart(2, '0')}</span>
            <span className="text-white/25 text-[9px] mx-0.5">/</span>
            <span className="text-white/40 text-[10px] leading-none">{String(projects.length).padStart(2, '0')}</span>
          </div>

          {/* Tech chips */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-black/60 text-white/85 border border-white/10 rounded-full font-medium backdrop-blur-sm">
                {t}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 bg-accent/85 text-white rounded-full font-semibold backdrop-blur-sm">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

          {/* Subtitle row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 animate-pulse" />
            <p className="text-xs text-accent font-bold uppercase tracking-widest truncate">
              {project.subtitle}
            </p>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          {/* Animated accent rule */}
          <div className="relative h-px bg-zinc-100 dark:bg-zinc-800 mb-3 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-dark rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '35%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 line-clamp-2 mb-5">
            {project.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <motion.button
              onClick={() => onOpen(project)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 relative overflow-hidden py-2.5 rounded-xl text-sm font-semibold border border-accent/25 text-accent hover:text-white transition-colors duration-300 text-center group/btn"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative">Explore →</span>
            </motion.button>

            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              title="Live Site"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200"
            >
              <i className="bx bx-link-external text-[15px]" />
            </motion.a>

            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <i className="bx bxl-github text-[15px]" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">Projects</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Explore my works</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {ALL_TAGS.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTag === tag
                  ? 'text-white'
                  : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:text-accent'
              }`}
            >
              {activeTag === tag && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 gap-6"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-500 dark:text-zinc-400 mt-12 text-sm"
          >
            No projects match this filter yet.
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {selected && <Modal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
