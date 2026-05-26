'use client'
import { motion } from 'framer-motion'

const domains = [
  {
    num: '01',
    icon: 'bx-layer',
    title: 'Full-Stack Development',
    description:
      'End-to-end web applications from database schema to deployed UI — architected for scale, not just demos.',
    delivers: [
      'Next.js App Router with SSR, SSG & API Routes',
      'Role-based systems with parallel route dashboards',
      'Stripe-gated flows and payment integrations',
      'Production Vercel deployments with CI/CD',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'TypeScript'],
  },
  {
    num: '02',
    icon: 'bx-palette',
    title: 'UI Engineering',
    description:
      'Interfaces that feel physical, not just functional — spring physics, scroll-driven effects, and pixel-perfect Tailwind.',
    delivers: [
      'Framer Motion: 3D tilt, cursor spotlight, spring animations',
      'Lenis smooth scroll synced with Framer useScroll',
      'Responsive layouts that work on every device',
      'Dark/light mode with zero flash on load',
    ],
    tags: ['Framer Motion', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    num: '03',
    icon: 'bx-transfer',
    title: 'API Design & Integration',
    description:
      'Clean RESTful services and reliable third-party integrations — built to handle edge cases, not just the happy path.',
    delivers: [
      'RESTful APIs with consistent error contracts',
      'Stripe PaymentIntent & webhook verification',
      'Gemini & Groq AI integrations with SSE streaming',
      'Axios interceptors for token refresh & retry',
    ],
    tags: ['Express.js', 'Stripe', 'Gemini AI', 'Groq'],
  },
  {
    num: '04',
    icon: 'bx-shield-quarter',
    title: 'Auth & Security',
    description:
      'Authentication that runs before React hydrates — no flash of protected content, no cookie policy surprises.',
    delivers: [
      'JWT + refresh token rotation with secure storage',
      'Next.js Edge Middleware RBAC guards',
      'OAuth (Google & GitHub) via Route Handlers',
      'Dual-auth for cross-origin Vercel deployments',
    ],
    tags: ['JWT', 'RBAC', 'OAuth', 'Edge Middleware'],
  },
  {
    num: '05',
    icon: 'bx-data',
    title: 'Database Architecture',
    description:
      'Schema design that supports the business logic — not just CRUD, but audit trails, atomic transactions, and query efficiency.',
    delivers: [
      'MongoDB: flexible schemas with Mongoose validation',
      'PostgreSQL + Prisma: relational models & migrations',
      'Atomic transactions for financial operations',
      'StockLog-style audit trails for state changes',
    ],
    tags: ['MongoDB', 'PostgreSQL', 'Prisma', 'Firebase'],
  },
  {
    num: '06',
    icon: 'bx-tachometer',
    title: 'Performance & Optimization',
    description:
      'Fast by default — the right rendering strategy per page, smart caching, and no wasted client-side work.',
    delivers: [
      'Static generation for content, SSR for dynamic data',
      'TanStack Query staleTime tuned per endpoint',
      'Next.js Image with lazy loading & blur placeholder',
      'Bundle analysis and code-split by route',
    ],
    tags: ['Next.js', 'TanStack Query', 'Vercel Edge'],
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ExpertiseCard({ domain, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* Gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accent-dark/15 dark:from-accent/20 dark:to-accent-dark/15 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative h-full rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col">

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-[80px] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(249,20,96,0.035), transparent)' }}
          animate={{ top: ['-80px', 'calc(100% + 80px)'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: index * 0.8, repeatDelay: 5 }}
        />

        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-accent via-accent-dark to-transparent" />

        <div className="flex flex-col flex-1 p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <i className={`bx ${domain.icon} text-xl text-accent`} />
            </div>
            <span className="text-3xl font-black text-zinc-100 dark:text-zinc-800 select-none leading-none mt-0.5">
              {domain.num}
            </span>
          </div>

          {/* Title + description */}
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
            {domain.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
            {domain.description}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">What I deliver</span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Delivery points */}
          <ul className="flex flex-col gap-2 mb-5 flex-1">
            {domain.delivers.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
            {domain.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold
                  bg-zinc-50 dark:bg-zinc-800
                  border border-zinc-200 dark:border-zinc-700
                  text-zinc-500 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Expertise() {
  return (
    <section id="expertise" className="section-padding relative overflow-hidden bg-white dark:bg-zinc-950">

      {/* Subtle grid lines background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,20,96,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,20,96,1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-dark/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            What I specialise in
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-tight mb-3">
            Areas of <span className="gradient-text-animated">Expertise</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Six domains where I go beyond syntax — each backed by production projects
            with real users, real bugs, and real deadlines.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {domains.map((domain, i) => (
            <ExpertiseCard key={domain.num} domain={domain} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 relative p-[1px] rounded-2xl"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-accent-dark/10 to-accent/20" />
          <div className="relative rounded-2xl bg-zinc-50 dark:bg-zinc-900 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white text-sm">
                See all six domains in action
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Every expertise above maps to at least one shipped project below.
              </p>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all whitespace-nowrap flex-shrink-0"
            >
              View Projects
              <i className="bx bx-right-arrow-alt text-base" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
