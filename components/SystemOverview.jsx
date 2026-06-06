'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FACTS = [
  { k: 'entity',   v: 'Rahyan Shamsi Akil' },
  { k: 'type',     v: 'Full-Stack Developer',        accent: true },
  { k: 'language', v: 'JavaScript · TypeScript' },
  { k: 'runtime',  v: 'Node.js · Next.js · React' },
  { k: 'data',     v: 'MongoDB · PostgreSQL · Prisma' },
  { k: 'build',    v: 'Vercel · Docker · GitHub Actions' },
  { k: 'design',   v: 'Figma · Tailwind · Framer Motion' },
]

const STACK_LAYERS = [
  { label: 'INTERFACE',    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], color: '#f91460' },
  { label: 'ANIMATION',   items: ['Framer Motion', 'shadcn/ui', 'Redux'],           color: '#a06bff' },
  { label: 'API / LOGIC', items: ['Node.js', 'Express.js', 'NestJS', 'REST'],       color: '#00d4ff' },
  { label: 'DATA',        items: ['MongoDB', 'PostgreSQL', 'Prisma', 'Firebase'],   color: '#00e56b' },
  { label: 'INFRA',       items: ['Vercel', 'Docker', 'GitHub Actions', 'Stripe'],  color: '#f59e0b' },
]

const VALUES = [
  { icon: '⌁', title: 'Problem First', desc: 'I read the problem statement before touching a keyboard. Architecture follows understanding.' },
  { icon: '⊕', title: 'Ownership Mindset', desc: 'I ship features end-to-end — design decisions, implementation, deployment, and post-launch bugs.' },
  { icon: '◈', title: 'Continuous Iteration', desc: 'A working prototype beats a perfect plan. Refine in production with real feedback.' },
  { icon: '⟳', title: 'Deep Debugging', desc: 'I enjoy the detective work. Root cause over workaround, always.' },
]

const fd = (delay) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-10% 0px' }, transition: { delay, duration: 0.5, ease: 'easeOut' } })

export default function SystemOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="system-overview" ref={ref} className="xl:pl-52 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 pb-7">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fd(0)} className="mb-14">
          <div className="section-id mb-3">02 / SYSTEM OVERVIEW</div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-os-text">
            The machine behind the work
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16">

          {/* ─── LEFT: Bio + Values ─── */}
          <div className="space-y-10">

            {/* Bio terminal */}
            <motion.div {...fd(0.1)}>
              <div className="terminal">
                <div className="terminal-titlebar">
                  <div className="t-dot bg-red-400/70" />
                  <div className="t-dot bg-yellow-400/70" />
                  <div className="t-dot bg-green-400/70" />
                  <span className="ml-2 font-mono text-[11px] text-os-text-muted">$ cat /proc/rahyan/identity</span>
                </div>
                <div className="p-5 space-y-1.5">
                  {FACTS.map((f, i) => (
                    <motion.div
                      key={f.k}
                      initial={{ opacity: 0, x: -6 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex gap-3 font-mono text-xs sm:text-sm"
                    >
                      <span className="text-os-text-dim w-16 sm:w-20 shrink-0 text-right">{f.k}:</span>
                      <span className={f.accent ? 'text-accent font-semibold' : 'text-os-text'}>{f.v}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div {...fd(0.2)} className="space-y-4">
              <p className="font-grotesk text-os-text-muted leading-relaxed text-[15px]">
                I'm a full-stack developer based in Dhaka who spent three years building production
                applications at{' '}
                <span className="text-os-text font-medium">Prime Tech Solution Limited</span>
                {' '}(EDGE Project) and{' '}
                <span className="text-os-text font-medium">ED Limited</span>
                {' '}(ADA · Axiata Group).
              </p>
              <p className="font-grotesk text-os-text-muted leading-relaxed text-[15px]">
                My background in Computer Science from{' '}
                <span className="text-os-text font-medium">BAIUST</span>{' '}
                gave me the foundations; real projects gave me the instincts.
                I care about performance, clean architecture, and building things that feel fast.
              </p>
              <p className="font-grotesk text-os-text-muted leading-relaxed text-[15px]">
                Right now I'm building <span className="text-accent font-medium">SkillBridge</span> —
                an AI-powered tutoring platform with role-based parallel routes, Stripe payments,
                and a Groq-powered AI tutor. Ship first, refine always.
              </p>
            </motion.div>

            {/* Values grid */}
            <motion.div {...fd(0.3)}>
              <div className="label-mono mb-4">OPERATING PRINCIPLES</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {VALUES.map(v => (
                  <div key={v.title} className="os-panel-hover p-4 group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent font-mono text-lg">{v.icon}</span>
                      <span className="font-grotesk text-sm font-semibold text-os-text">{v.title}</span>
                    </div>
                    <p className="font-grotesk text-xs text-os-text-muted leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: Stack Layers ─── */}
          <motion.div {...fd(0.15)}>
            <div className="label-mono mb-4">TECHNOLOGY STACK</div>
            <div className="space-y-2">
              {STACK_LAYERS.map((layer, li) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + li * 0.1, duration: 0.5 }}
                  className="os-panel overflow-hidden"
                >
                  <div
                    className="px-4 py-2 flex items-center gap-3 border-b border-os-border"
                    style={{ borderLeftColor: layer.color, borderLeftWidth: 3 }}
                  >
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: layer.color }}>
                      {layer.label}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex flex-wrap gap-2">
                    {layer.items.map(item => (
                      <span
                        key={item}
                        className="font-mono text-[11px] px-2.5 py-1 rounded border border-os-border text-os-text-muted hover:text-os-text hover:border-os-border-bright transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Currently building */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-4 os-panel p-4 border-l-2 border-l-accent"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="green-dot animate-glow" />
                <span className="label-mono">CURRENTLY BUILDING</span>
              </div>
              <div className="font-grotesk text-sm font-semibold text-os-text mb-1">SkillBridge</div>
              <p className="font-mono text-[11px] text-os-text-muted leading-relaxed">
                AI tutoring · Groq Llama 3.3 · Stripe · Role dashboards · Next.js 16
              </p>
              <a
                href="https://skillbridge-frontend-ruby.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-mono text-[11px] text-accent hover:underline"
              >
                View live →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
