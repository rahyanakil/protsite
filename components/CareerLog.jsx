'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const LOG_FB = [
  {
    hash: 'a3f2b1c',
    type: 'work',
    org: 'Prime Tech Solution Limited',
    role: 'Executive / Backend Developer',
    period: 'Jul 2024 – Jan 2025',
    location: 'Dhaka, Bangladesh',
    context: 'ICT Division · EDGE Project',
    color: '#f91460',
    icon: '⬡',
    commits: [
      'Designed scalable RESTful APIs — Node.js, Express.js, TypeScript, Clean Architecture',
      'Built JWT + RBAC authentication and authorization systems from scratch',
      'Designed optimized MongoDB and PostgreSQL schemas for production workloads',
      'Improved API response time by eliminating N+1 queries and redundant DB calls',
    ],
  },
  {
    hash: '9c4e12f',
    type: 'work',
    org: 'Through ED Limited',
    role: 'Full Stack Developer',
    period: 'Dec 2023 – May 2024',
    location: 'Dhaka, Bangladesh',
    context: 'Enterprise Backend · ADA | Axiata Group Berhad',
    color: '#00d4ff',
    icon: '◈',
    commits: [
      'Contributed to enterprise backend for ADA | Axiata Group Berhad',
      'Built RESTful APIs for prediction-based voting systems with real-time dashboards',
      'Implemented JWT + RBAC for secure multi-role authentication',
      'Structured reusable server-side modules with modular architecture patterns',
    ],
  },
  {
    hash: '4f7a09d',
    type: 'education',
    org: 'Bangladesh Army International University of Science & Technology',
    role: 'B.Sc Computer Science',
    period: 'Mar 2021 – May 2024',
    location: 'Comilla Cantonment',
    context: 'CGPA: 3.47 · Comilla, Bangladesh',
    color: '#a06bff',
    icon: '⌗',
    commits: [
      'Data Structures & Algorithms — foundations for system design',
      'Web Development · Databases · Software Engineering coursework',
      'Final year projects exploring full-stack application architecture',
    ],
  },
  {
    hash: 'd1b8e5a',
    type: 'cert',
    org: 'Ostad',
    role: 'Full Stack Web Development',
    period: 'Jul 2024',
    location: 'Online',
    context: 'Certificate of Completion',
    color: '#00e56b',
    icon: '⊕',
    commits: [
      'JavaScript · Node.js · React.js · Next.js · Prisma',
      'RESTful API design and version control with Git',
      'Deployment on Vercel and Heroku',
    ],
  },
  {
    hash: 'c7f3112',
    type: 'cert',
    org: 'Coders Trust',
    role: 'MERN Stack Development',
    period: 'May 2023',
    location: 'Online',
    context: 'Certificate of Completion',
    color: '#f59e0b',
    icon: '⟁',
    commits: [
      'MongoDB · Express.js · React · Node.js full-stack development',
      'Built full-stack applications from concept to deployment',
      'API development, routing, and state management patterns',
    ],
  },
]

const TYPE_LABEL = {
  work: 'WORK',
  education: 'EDUCATION',
  cert: 'CERTIFICATE',
}

const TYPE_BG = {
  work:      'text-accent border-accent/30 bg-accent/10',
  education: 'text-[#a06bff] border-[rgba(160,107,255,0.28)] bg-[rgba(160,107,255,0.08)]',
  cert:      'text-[#00e56b] border-[rgba(0,229,107,0.28)] bg-[rgba(0,229,107,0.08)]',
}

function normaliseEntry(e) {
  return {
    ...e,
    _key: e._id || e.hash,
    commits: Array.isArray(e.commits) ? e.commits : [],
  }
}

export default function CareerLog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { data: rawEntries } = useQuery({
    queryKey: ['career'],
    queryFn: () => api.get('/api/v1/career').then(r => r.data),
    initialData: LOG_FB,
    staleTime: 5 * 60 * 1000,
  })

  const entries = (rawEntries?.length ? rawEntries : LOG_FB).map(normaliseEntry)

  return (
    <section id="career-log" ref={ref} className="xl:pl-52 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 pb-7">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-id mb-3">05 / CAREER LOG</div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-os-text">
            Version history
          </h2>
        </motion.div>

        {/* Git log command */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="terminal mb-8 max-w-sm"
        >
          <div className="terminal-titlebar">
            <div className="t-dot bg-red-400/70" />
            <div className="t-dot bg-yellow-400/70" />
            <div className="t-dot bg-green-400/70" />
          </div>
          <div className="p-4 font-mono text-sm">
            <span className="text-os-green">rahyan@dev</span>
            <span className="text-os-text-dim">:</span>
            <span className="text-os-cyan">~</span>
            <span className="text-os-text-dim">$ </span>
            <span className="text-os-text">git log --career --format=oneline</span>
            <span className="inline-block w-[8px] h-[14px] bg-accent animate-blink ml-0.5 align-text-bottom" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-4 sm:pl-8">
          {/* Vertical line */}
          <div className="absolute left-0 sm:left-3.5 top-0 bottom-0 w-px bg-os-border" />

          <div className="space-y-0">
            {entries.map((entry, i) => (
              <LogEntry key={entry._key} entry={entry} idx={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LogEntry({ entry, idx, inView }) {
  const ref = useRef(null)
  const localInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={localInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
      className="relative pb-10 last:pb-0"
    >
      {/* Node dot */}
      <div
        className="absolute -left-4 sm:-left-[18px] top-1.5 w-3 h-3 rounded-full border-2 border-os-bg z-10"
        style={{ backgroundColor: entry.color }}
      />

      {/* Content */}
      <div className="os-panel-hover p-5 group">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-os-text-dim">commit</span>
            <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-os-void border border-os-border" style={{ color: entry.color }}>
              {entry.hash}
            </code>
          </div>
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border self-start tracking-wider ${TYPE_BG[entry.type] || TYPE_BG.work}`}>
            {TYPE_LABEL[entry.type] || entry.type?.toUpperCase()}
          </span>
          <span className="font-mono text-[11px] text-os-text-muted ml-auto hidden sm:block">{entry.period}</span>
        </div>

        {/* Role & Org */}
        <div className="mb-1">
          <span className="font-mono text-[10px] text-os-text-dim">Author: </span>
          <span className="font-grotesk text-sm font-semibold text-os-text">{entry.org}</span>
        </div>
        <div className="mb-1">
          <span className="font-mono text-[10px] text-os-text-dim">Subject: </span>
          <span className="font-grotesk text-sm text-os-text-muted">{entry.role}</span>
        </div>
        <div className="mb-3">
          <span className="font-mono text-[10px] text-os-text-dim">Context: </span>
          <span className="font-mono text-[11px] text-os-text-dim">{entry.context}</span>
        </div>
        <div className="sm:hidden mb-3">
          <span className="font-mono text-[11px] text-os-text-dim">{entry.period}</span>
        </div>

        {/* Commit log */}
        <div className="border-t border-os-border pt-3 space-y-1.5">
          {entry.commits.map((c, ci) => (
            <div key={ci} className="flex gap-3 font-mono text-xs">
              <span className="text-os-text-dim shrink-0">│</span>
              <span className="text-os-text-muted leading-relaxed">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
