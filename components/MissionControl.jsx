'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const IDENTITY = [
  { key: 'name',       val: 'Rahyan Shamsi Akil' },
  { key: 'role',       val: 'Full-Stack Developer',     accent: true },
  { key: 'location',   val: 'Dhaka, Bangladesh · Remote OK' },
  { key: 'status',     val: 'AVAILABLE_FOR_WORK',       green: true },
  { key: 'stack',      val: 'Next.js · Node.js · TypeScript · MERN' },
  { key: 'experience', val: '3+ years | 30+ projects | 3 companies' },
]

const STATS = [
  { num: '3+',  label: 'Years' },
  { num: '30+', label: 'Projects' },
  { num: '3',   label: 'Companies' },
  { num: '10K+',label: 'Commits' },
]

const ACTIVE_PROCESSES = [
  {
    pid: 'PID-001',
    name: 'SkillBridge',
    desc: 'AI-powered tutoring platform. Groq Llama 3.3 · Stripe · Next.js 16',
    tag: 'BUILDING',
    link: 'https://skillbridge-frontend-ruby.vercel.app',
    tagColor: 'text-[#00e56b] border-[rgba(0,229,107,0.3)] bg-[rgba(0,229,107,0.08)]',
  },
  {
    pid: 'PID-002',
    name: 'SmartRetail AI',
    desc: 'Gemini-powered retail copilot. Real-time inventory · AI forecasting',
    tag: 'DEPLOYED',
    link: 'https://smart-retail-ai-snowy.vercel.app',
    tagColor: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]',
  },
]

const SOCIAL = [
  { label: '$ open github', href: 'https://github.com/rahyanakil' },
  { label: '$ open linkedin', href: 'https://www.linkedin.com/in/rahyanshamsi/' },
  { label: '$ view resume', href: '/rahyan-akil-resume.pdf' },
]

export default function MissionControl() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="mission-control"
      ref={ref}
      className="relative min-h-screen flex items-center xl:pl-52 pt-12 xl:pt-0 pb-7 os-grid overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(0,212,255,0.04)' }} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid xl:grid-cols-[1fr_400px] gap-10 xl:gap-16 items-start">

          {/* ─── LEFT: Identity Terminal ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="section-id mb-6">01 / MISSION CONTROL</div>

            {/* Terminal block */}
            <div className="terminal mb-8">
              <div className="terminal-titlebar">
                <div className="t-dot bg-red-400/70" />
                <div className="t-dot bg-yellow-400/70" />
                <div className="t-dot bg-green-400/70" />
                <span className="ml-2 font-mono text-[11px] text-os-text-muted">$ identify --verbose</span>
              </div>
              <div className="p-5 space-y-1.5">
                {IDENTITY.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 font-mono text-sm"
                  >
                    <span className="text-os-text-dim shrink-0 w-24 text-right">{item.key}:</span>
                    <span className={
                      item.accent ? 'text-accent font-semibold' :
                      item.green  ? 'text-os-green font-semibold' :
                      'text-os-text'
                    }>
                      {item.val}
                    </span>
                  </motion.div>
                ))}
                <div className="pt-1 flex items-center gap-1">
                  <span className="font-mono text-os-text-dim text-sm">›</span>
                  <span className="inline-block w-[9px] h-[15px] bg-accent animate-blink" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <h1 className="font-grotesk text-4xl sm:text-5xl font-bold text-os-text leading-tight mb-3">
                Building systems that{' '}
                <span className="gradient-text">think clearly.</span>
              </h1>
              <p className="text-os-text-muted font-grotesk text-lg max-w-xl leading-relaxed">
                Three years turning product ideas into production-grade full-stack applications —
                clean architecture, real performance, zero shortcuts.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#project-lab"
                onClick={e => { e.preventDefault(); document.getElementById('project-lab')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-grotesk font-semibold text-sm rounded-lg hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                Explore Projects ↓
              </a>
              <a
                href="/rahyan-akil-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-os-border text-os-text font-grotesk font-semibold text-sm rounded-lg hover:border-os-border-bright hover:bg-os-panel transition-all duration-300"
              >
                Resume ↗
              </a>
            </div>

            {/* Social links as commands */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] text-os-text-muted hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── RIGHT: Active Processes ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {STATS.map(s => (
                <div key={s.label} className="os-panel px-4 py-3.5 text-center">
                  <div className="font-grotesk text-2xl font-bold text-os-text mb-0.5">{s.num}</div>
                  <div className="font-mono text-[11px] text-os-text-muted tracking-wider">{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Active processes header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="green-dot animate-glow" />
              <span className="label-mono">ACTIVE PROCESSES</span>
            </div>

            {/* Process cards */}
            {ACTIVE_PROCESSES.map((p, i) => (
              <motion.a
                key={p.pid}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                className="block os-panel-hover p-4 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-os-text-dim">{p.pid}</span>
                    <span className="font-grotesk text-sm font-semibold text-os-text group-hover:text-accent transition-colors">
                      {p.name}
                    </span>
                  </div>
                  <span className={`font-mono text-[9px] px-2 py-0.5 rounded border tracking-wider ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-os-text-muted leading-relaxed">{p.desc}</p>
              </motion.a>
            ))}

            {/* Location card */}
            <div className="os-panel p-4 border-l-2 border-l-accent">
              <div className="font-mono text-[10px] text-os-text-dim mb-1">CURRENT LOCATION</div>
              <div className="font-grotesk text-sm text-os-text font-medium">Dhaka, Bangladesh</div>
              <div className="font-mono text-[11px] text-os-text-muted mt-0.5">
                Prime Tech Solution Limited · ICT Division
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
