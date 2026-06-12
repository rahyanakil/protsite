'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { api } from '@/lib/api'

// Hardcoded fallback — used as initialData so there is zero loading flash
const FALLBACK = [
  {
    id: 'skillbridge',
    pid: 'PRJ-001',
    title: 'SkillBridge',
    subtitle: 'AI-Powered Tutoring Platform',
    status: 'BUILDING',
    statusColor: 'text-[#00e56b] border-[rgba(0,229,107,0.3)] bg-[rgba(0,229,107,0.08)]',
    problem: 'Online tutoring had a coordination problem — students, tutors, and admins each needed a completely different interface, but most platforms serve everyone the same page.',
    solution: 'Next.js parallel routes per role (@student, @tutor, @admin) rendered server-side. Stripe-gated bookings, Groq AI tutor without exposing API keys client-side.',
    decisions: [
      'Role-based parallel routes so the correct dashboard renders on the server — zero client-side role checks',
      'Stripe PaymentIntent → CheckoutPage → server-side confirmation, not the simpler but less secure client redirect',
      'AI Tutor rate-limited with 5s cooldown, Groq key never touches the browser',
    ],
    challenges: [
      'Parallel routes (@student, @tutor, @admin) required careful layout nesting so each role gets exactly one shell',
      'Stripe webhook idempotency — replayed events must not double-book sessions',
      'SSE-streaming Groq response while keeping the typing indicator in sync with actual token arrival',
    ],
    outcome: 'Role-specific server-rendered dashboards with authenticated Stripe checkout and a live AI tutor.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Framer Motion', 'Stripe.js', 'Groq SDK'],
    live: 'https://skillbridge-frontend-ruby.vercel.app',
    github: 'https://github.com/rahyanakil/SkillBridge-FrontEnd-',
    images: Array.from({ length: 5 }, (_, i) => `/project1/${i + 1}.png`),
    tags: ['Next.js', 'TypeScript', 'AI'],
  },
  {
    id: 'smartretail',
    pid: 'PRJ-002',
    title: 'SmartRetail AI',
    subtitle: 'AI-Powered Retail Management Platform',
    status: 'DEPLOYED',
    statusColor: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]',
    problem: 'Most retail owners manage stock on spreadsheets and make restock decisions on instinct. No real-time data, no AI guidance, no audit trail.',
    solution: 'Gemini AI copilot grounded in live store data via 6 parallel DB queries — it physically cannot hallucinate inventory numbers.',
    decisions: [
      'Edge Middleware RBAC (Admin/Owner/Cashier) runs before React hydrates — eliminates flash of protected content',
      'Grounded the AI copilot with a real-time Prisma snapshot injected as system instruction',
      'useChartColors() hook reads resolvedTheme and returns explicit HSL values because Recharts SVG cannot consume CSS variables',
    ],
    challenges: [
      'Edge Runtime incompatibility: jsonwebtoken fails silently — switched to jose for JWT verification',
      'Recharts SVG ignores CSS custom properties — built a useChartColors() hook returning explicit HSL per theme',
      'Grounding AI in live data added latency: 6 parallel Prisma queries run before each copilot response',
    ],
    outcome: 'Business Health Score 0–100, 7-day revenue forecast with three probability bands, urgency-ranked restock recommendations.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'TanStack Query', 'Recharts', 'Gemini AI', 'Prisma'],
    live: 'https://smart-retail-ai-snowy.vercel.app',
    github: 'https://github.com/rahyanakil/Smart-Retail-AI',
    images: Array.from({ length: 5 }, (_, i) => `/project2/${i + 1}.png`),
    tags: ['Next.js', 'TypeScript', 'AI'],
  },
  {
    id: 'propertysmart',
    pid: 'PRJ-003',
    title: 'PropertySmart',
    subtitle: 'Real Estate Marketplace Frontend',
    status: 'DEPLOYED',
    statusColor: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]',
    problem: "Vercel silently drops session cookies when frontend and backend live on different domains — users log in, get redirected, then immediately hit 401.",
    solution: 'Dual-auth strategy: JWT in localStorage as the reliable path, cookie as fallback. Axios request interceptor attaches Authorization: Bearer on every call.',
    decisions: [
      'Dual-auth (Bearer token + cookie fallback) instead of BFF pattern — faster to ship, still secure at this scale',
      'LenisFramerSync dispatches synthetic native scroll events so Framer useScroll reads the correct virtual position',
      'Every page using useSearchParams() wrapped in <Suspense> so parents statically pre-render at build time',
    ],
    challenges: [
      'Vercel cross-origin cookie blocking: GET /auth/me silently dropped the session cookie on every request',
      'Framer Motion useScroll loses sync when Lenis hijacks native wheel events',
      'useSearchParams() caused prerender failures — discovered during build, not dev',
    ],
    outcome: 'Premium UI with mouse-parallax hero, 3D card tilt, Stripe checkout, and role dashboards. Zero auth flicker.',
    stack: ['Next.js 15', 'TypeScript 5', 'Tailwind CSS', 'Framer Motion', 'TanStack Query v5', 'Stripe', 'Lenis'],
    live: 'https://property-smart-frontend.vercel.app',
    github: 'https://github.com/rahyanakil/Property-Smart-Frontend',
    images: Array.from({ length: 5 }, (_, i) => `/project3/${i + 1}.png`),
    tags: ['Next.js', 'TypeScript'],
  },
  {
    id: 'cambrian',
    pid: 'PRJ-004',
    title: 'Cambrian School & College',
    subtitle: 'Educational Platform',
    status: 'LIVE',
    statusColor: 'text-[#f59e0b] border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)]',
    problem: 'Appointment bookings managed by phone and paper — no confirmation, no tracking, high no-show rate.',
    solution: 'Online booking with service categorization, MongoDB-backed workflows, and Nodemailer email confirmations triggered at each booking state change.',
    decisions: [
      'MongoDB for appointment data — flexible schema for different service categories without forced normalization',
      'State-machine approach for booking workflow (pending → confirmed → completed/cancelled)',
      'Nodemailer triggered on state changes rather than polling — event-driven, no cron job needed',
    ],
    challenges: [
      'Appointment conflict detection: concurrent requests could double-book the same slot',
      'Email trigger reliability: Nodemailer needs SMTP credentials that vary per environment',
      'Content categories varied significantly — required a flexible schema',
    ],
    outcome: 'Full appointment digitization for an active educational institution.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Nodemailer'],
    live: 'https://www.cambrian.edu.bd/',
    github: 'https://github.com/rahyanakil',
    images: Array.from({ length: 4 }, (_, i) => `/project4/${i + 1}.png`),
    tags: ['React.js', 'Node.js'],
  },
]

function normaliseProject(p) {
  return {
    id: p._id || p.id,
    pid: p.pid,
    title: p.title,
    subtitle: p.subtitle || '',
    status: p.status,
    statusColor: p.statusColor || 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]',
    problem: p.problem || '',
    solution: p.solution || '',
    decisions: p.decisions || [],
    challenges: p.challenges || [],
    outcome: p.outcome || '',
    stack: p.stack || [],
    tags: p.tags || [],
    images: p.images?.length ? p.images : Array.from({ length: 4 }, (_, i) => `/project1/${i + 1}.png`),
    live: p.live || '#',
    github: p.github || '#',
  }
}

export default function ProjectLab() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { data: rawProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/api/v1/projects')
      return res.data
    },
    initialData: FALLBACK,
    staleTime: 5 * 60 * 1000,
  })

  const projects = (rawProjects || FALLBACK).map(normaliseProject)

  const [active, setActive] = useState(projects[0]?.id)
  const [imgIdx, setImgIdx] = useState(0)

  const project = projects.find((p) => p.id === active) || projects[0]

  const handleSelect = (id) => { setActive(id); setImgIdx(0) }

  return (
    <section id="project-lab" ref={ref} className="xl:pl-52 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 pb-7">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-id mb-3">04 / PROJECT LABORATORY</div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-os-text">
            Case files — problem → decision → outcome
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded border font-mono text-[11px] tracking-wide transition-all ${
                active === p.id
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'border-os-border text-os-text-muted hover:border-os-border-bright hover:text-os-text'
              }`}
            >
              <span className="text-os-text-dim">{p.pid}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid lg:grid-cols-[1fr_360px] gap-6">

                <div className="space-y-5">
                  <div className="os-panel p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="font-mono text-[11px] text-os-text-dim mb-1">{project.pid}</div>
                        <h3 className="font-grotesk text-xl font-bold text-os-text">{project.title}</h3>
                        <div className="font-grotesk text-sm text-os-text-muted mt-0.5">{project.subtitle}</div>
                      </div>
                      <span className={`font-mono text-[10px] px-2.5 py-1 rounded border shrink-0 tracking-wider ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-os-border">
                      {project.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-os-border text-os-text-dim">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="os-panel p-4 border-l-2 border-l-os-amber">
                      <div className="label-mono text-os-amber mb-2">PROBLEM</div>
                      <p className="font-grotesk text-sm text-os-text-muted leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="os-panel p-4 border-l-2 border-l-os-green">
                      <div className="label-mono text-os-green mb-2">SOLUTION</div>
                      <p className="font-grotesk text-sm text-os-text-muted leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="os-panel p-5">
                    <div className="label-mono mb-4">KEY ARCHITECTURE DECISIONS</div>
                    <div className="space-y-3">
                      {project.decisions.map((d, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="font-mono text-[11px] text-accent mt-0.5 shrink-0">0{i + 1}</span>
                          <p className="font-grotesk text-sm text-os-text-muted leading-relaxed">{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="os-panel p-5">
                    <div className="label-mono mb-4">CHALLENGES DEBUGGED</div>
                    <div className="space-y-3">
                      {project.challenges.map((c, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="font-mono text-[11px] text-os-amber mt-0.5 shrink-0">⚠</span>
                          <p className="font-mono text-xs text-os-text-muted leading-relaxed">{c}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="os-panel p-4 border-l-2 border-l-accent">
                    <div className="label-mono text-accent mb-2">OUTCOME</div>
                    <p className="font-grotesk text-sm text-os-text-muted leading-relaxed">{project.outcome}</p>
                  </div>

                  <div className="os-panel p-4">
                    <div className="label-mono mb-3">FULL TECH STACK</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded border border-os-border text-os-text-muted">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-3 bg-accent text-white font-grotesk font-semibold text-sm rounded-lg text-center hover:bg-accent/90 transition-colors">
                      View Live ↗
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-3 border border-os-border text-os-text font-grotesk font-semibold text-sm rounded-lg text-center hover:border-os-border-bright hover:bg-os-panel transition-all">
                      GitHub ↗
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="os-panel overflow-hidden relative aspect-video bg-os-void">
                    <Image
                      src={project.images[imgIdx]}
                      alt={`${project.title} screenshot ${imgIdx + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setImgIdx((i) => (i - 1 + project.images.length) % project.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded os-glass-btn border border-os-border text-os-text-muted hover:text-accent transition-colors text-sm flex items-center justify-center"
                        >‹</button>
                        <button
                          onClick={() => setImgIdx((i) => (i + 1) % project.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded os-glass-btn border border-os-border text-os-text-muted hover:text-accent transition-colors text-sm flex items-center justify-center"
                        >›</button>
                      </>
                    )}
                    <div className="absolute bottom-2 right-2 font-mono text-[10px] text-os-text-muted os-glass-btn px-2 py-0.5 rounded border border-os-border">
                      {imgIdx + 1} / {project.images.length}
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {project.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`shrink-0 w-16 aspect-video rounded overflow-hidden border-2 transition-all ${
                          imgIdx === i ? 'border-accent' : 'border-os-border hover:border-os-border-bright'
                        }`}
                      >
                        <Image src={img} alt={`thumb ${i + 1}`} width={64} height={36} className="object-cover object-top w-full h-full" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
