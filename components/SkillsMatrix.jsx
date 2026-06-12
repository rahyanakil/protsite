'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const LAYERS_FB = [
  {
    id: 'ui',
    label: 'APPLICATION LAYER',
    desc: 'What users see and interact with',
    color: '#f91460',
    expert: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
    familiar: ['Framer Motion', 'Redux', 'shadcn/ui', 'Bootstrap'],
  },
  {
    id: 'api',
    label: 'SERVICE LAYER',
    desc: 'API design, business logic, authentication',
    color: '#00d4ff',
    expert: ['Node.js', 'Express.js', 'REST APIs', 'JWT & RBAC'],
    familiar: ['NestJS', 'Stripe API', 'Gemini AI', 'Groq SDK', 'Zod'],
  },
  {
    id: 'data',
    label: 'DATA LAYER',
    desc: 'Persistence, schemas, query optimization',
    color: '#00e56b',
    expert: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Prisma'],
    familiar: ['Firebase', 'MySQL', 'Redis (Upstash)', 'TanStack Query'],
  },
  {
    id: 'infra',
    label: 'INFRASTRUCTURE',
    desc: 'Deployment, CI/CD, dev tools',
    color: '#f59e0b',
    expert: ['Git & GitHub', 'Vercel', 'GitHub Actions'],
    familiar: ['Docker', 'Figma', 'Postman', 'Railway'],
  },
]

const DOMAINS_FB = [
  {
    num: '01',
    title: 'Full-Stack Development',
    icon: '⬡',
    color: '#f91460',
    desc: 'End-to-end web applications from database schema to deployed UI — architected for scale, not just demos.',
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
    title: 'UI Engineering',
    icon: '◈',
    color: '#a06bff',
    desc: 'Interfaces that feel physical — spring physics, scroll-driven effects, and pixel-perfect Tailwind.',
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
    title: 'API Design & Integration',
    icon: '⟁',
    color: '#00d4ff',
    desc: 'Clean RESTful services and reliable third-party integrations — built to handle edge cases, not just the happy path.',
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
    title: 'Auth & Security',
    icon: '⊕',
    color: '#f91460',
    desc: 'Authentication that runs before React hydrates — no flash of protected content, no cookie policy surprises.',
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
    title: 'Database Architecture',
    icon: '⌗',
    color: '#00e56b',
    desc: 'Schema design that supports the business logic — not just CRUD, but audit trails, atomic transactions, and query efficiency.',
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
    title: 'Performance & Optimization',
    icon: '⟳',
    color: '#f59e0b',
    desc: 'Fast by default — the right rendering strategy per page, smart caching, and no wasted client-side work.',
    delivers: [
      'Static generation for content, SSR for dynamic data',
      'TanStack Query staleTime tuned per endpoint',
      'Next.js Image with lazy loading & blur placeholder',
      'Bundle analysis and code-split by route',
    ],
    tags: ['Next.js', 'TanStack Query', 'Vercel Edge'],
  },
]

export default function SkillsMatrix() {
  const [activeLayer, setActiveLayer] = useState(LAYERS_FB[0].id)
  const [activeDomain, setActiveDomain] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { data: skills } = useQuery({
    queryKey: ['skills'],
    queryFn: () => api.get('/api/v1/skills').then(r => r.data),
    initialData: { layers: LAYERS_FB, domains: DOMAINS_FB },
    staleTime: 5 * 60 * 1000,
  })

  const layers  = skills?.layers?.length  ? skills.layers  : LAYERS_FB
  const domains = skills?.domains?.length ? skills.domains : DOMAINS_FB

  // Keep activeLayer valid when data changes
  useEffect(() => {
    if (layers.length && !layers.find(l => l.id === activeLayer)) {
      setActiveLayer(layers[0].id)
    }
  }, [layers])

  const currentLayer = layers.find(l => l.id === activeLayer) || layers[0]

  return (
    <section id="skills-matrix" ref={ref} className="xl:pl-52 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 pb-7">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-id mb-3">03 / SKILLS MATRIX</div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-os-text">
            Architecture of expertise
          </h2>
        </motion.div>

        {/* ─── Stack Layer Selector ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="label-mono mb-4">STACK LAYERS — select to inspect</div>

          {/* Layer tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded border font-mono text-[11px] tracking-wider transition-all duration-200 ${
                  activeLayer === layer.id
                    ? 'text-white border-transparent'
                    : 'border-os-border text-os-text-muted hover:border-os-border-bright hover:text-os-text'
                }`}
                style={activeLayer === layer.id ? { backgroundColor: layer.color, borderColor: layer.color } : {}}
              >
                {layer.label}
              </button>
            ))}
          </div>

          {/* Layer detail */}
          {currentLayer && (
            <motion.div
              key={currentLayer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="os-panel overflow-hidden"
              style={{ borderLeftColor: currentLayer.color, borderLeftWidth: 3 }}
            >
              <div className="px-5 py-4 border-b border-os-border">
                <div className="font-mono text-[10px] tracking-widest mb-0.5" style={{ color: currentLayer.color }}>
                  {currentLayer.label}
                </div>
                <div className="font-grotesk text-xs text-os-text-muted">{currentLayer.desc}</div>
              </div>

              <div className="px-5 py-4 grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="font-mono text-[10px] text-os-green tracking-wider mb-3">EXPERT</div>
                  <div className="flex flex-wrap gap-2">
                    {(currentLayer.expert || []).map(s => (
                      <span key={s} className="px-3 py-1.5 rounded font-mono text-xs text-os-text border border-os-border-bright bg-os-panel">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-os-text-muted tracking-wider mb-3">PROFICIENT</div>
                  <div className="flex flex-wrap gap-2">
                    {(currentLayer.familiar || []).map(s => (
                      <span key={s} className="px-3 py-1.5 rounded font-mono text-xs text-os-text-muted border border-os-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* ─── Expertise Domains ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          <div className="label-mono mb-4">EXPERTISE DOMAINS — click to expand</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {domains.map((d, i) => {
              const isOpen = activeDomain === d.num
              return (
                <motion.div
                  key={d.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className={`os-panel cursor-pointer transition-all duration-300 overflow-hidden ${
                    isOpen ? '' : 'hover:border-os-border-bright'
                  }`}
                  style={isOpen ? { boxShadow: `0 0 0 1px ${d.color}40, inset 0 0 0 1px ${d.color}40` } : {}}
                  onClick={() => setActiveDomain(isOpen ? null : d.num)}
                >
                  {/* Card header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px]" style={{ color: d.color }}>{d.num}</span>
                      <span className="text-os-text-dim text-xl leading-none">{isOpen ? '−' : '+'}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-base" style={{ color: d.color }}>{d.icon}</span>
                      <span className="font-grotesk text-sm font-semibold text-os-text">{d.title}</span>
                    </div>
                    <p className="font-grotesk text-xs text-os-text-muted leading-relaxed">{d.desc}</p>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-os-border px-4 pb-4 pt-3"
                    >
                      <div className="space-y-1.5 mb-3">
                        {(d.delivers || []).map(item => (
                          <div key={item} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5 shrink-0 text-xs">›</span>
                            <span className="font-mono text-[11px] text-os-text-muted leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(d.tags || []).map(t => (
                          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-os-border text-os-text-dim">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
