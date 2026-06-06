'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

/* ─── What I'm looking for ─── */
const LOOKING_FOR = [
  { icon: '⬡', title: 'Full-Time Roles', desc: 'Mid/senior full-stack or backend positions where I can own features end-to-end and make architectural decisions.' },
  { icon: '◈', title: 'Remote-First Culture', desc: 'Async-friendly teams that trust engineers to deliver without micromanagement. Timezone-flexible.' },
  { icon: '⟁', title: 'Modern Stack', desc: 'Next.js, TypeScript, Node.js, PostgreSQL/MongoDB. Excited by Rust, Go, or cutting-edge tooling.' },
  { icon: '⊕', title: 'Learning Culture', desc: 'Engineering blogs, internal talks, conference budgets. Teams that invest in growing their engineers.' },
  { icon: '⌗', title: 'Growth Trajectory', desc: 'A clear path from IC → Tech Lead. I want to grow into architecture and mentorship over the next few years.' },
  { icon: '⟳', title: 'Collaborative Team', desc: 'Code reviews, pair programming, knowledge-sharing. Good engineering culture over perks.' },
]

/* ─── Testimonials ─── */
const FIELD_REPORTS = [
  {
    author: 'Tanvir Ahmed',
    role: 'Senior Backend Engineer',
    org: 'Prime Tech Solution Limited',
    report: '"Rahyan consistently delivers clean, well-structured backend code. His understanding of Clean Architecture and Node.js is exceptional. He integrates seamlessly into team workflows, takes full ownership of his tasks, and always delivers on time."',
    initials: 'TA',
    color: '#00d4ff',
  },
  {
    author: 'Mehedi Hasan',
    role: 'Project Manager',
    org: 'Through ED Limited',
    report: '"Working with Rahyan on the ADA | Axiata Group project was outstanding. He picked up the codebase rapidly, asked exactly the right questions, and shipped features reliably. His full-stack perspective made him one of our most valuable contributors."',
    initials: 'MH',
    color: '#a06bff',
  },
  {
    author: 'Sarah Johnson',
    role: 'Product Lead',
    org: 'Freelance Collaboration',
    report: '"Rahyan built our platform frontend from scratch with Next.js and Tailwind CSS. His attention to UI detail, responsiveness, and performance optimisation exceeded our expectations. The final product looked and felt like a premium product."',
    initials: 'SJ',
    color: '#f91460',
  },
]

/* ─── Contact protocols ─── */
const PROTOCOLS = [
  {
    name: 'EMAIL',
    value: 'rahyanakil89@gmail.com',
    href: 'mailto:rahyanakil89@gmail.com',
    icon: '✉',
    desc: 'Primary channel — best for project inquiries',
    color: '#f91460',
  },
  {
    name: 'WHATSAPP',
    value: '+880 1811 380844',
    href: 'https://api.whatsapp.com/send?phone=8801811380844&text=Hello%2C%20I%27d%20like%20to%20connect!',
    icon: '◉',
    desc: 'Instant messaging — quick questions welcome',
    color: '#00e56b',
  },
  {
    name: 'LINKEDIN',
    value: 'rahyanshamsi',
    href: 'https://www.linkedin.com/in/rahyanshamsi/',
    icon: '⬡',
    desc: 'Professional network — let\'s connect',
    color: '#00d4ff',
  },
  {
    name: 'SCHEDULE',
    value: '30-min intro call',
    href: 'mailto:rahyanakil89@gmail.com?subject=Let\'s%20schedule%20a%20call',
    icon: '⟁',
    desc: 'Book a free call — no commitment',
    color: '#a06bff',
  },
]

export default function OpenChannel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      setState('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const fd = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.5, ease: 'easeOut' },
  })

  return (
    <section id="open-channel" ref={ref} className="xl:pl-52 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 pb-7">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div {...fd(0)} className="mb-14">
          <div className="section-id mb-3">06 / OPEN CHANNEL</div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-os-text">
            Let's build something together
          </h2>
        </motion.div>

        {/* ─── What I'm Looking For ─── */}
        <motion.div {...fd(0.1)} className="mb-16">
          <div className="label-mono mb-6">WHAT I'M LOOKING FOR</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LOOKING_FOR.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="os-panel-hover p-4 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent font-mono text-lg">{item.icon}</span>
                  <span className="font-grotesk text-sm font-semibold text-os-text">{item.title}</span>
                </div>
                <p className="font-grotesk text-xs text-os-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Code snippet */}
          <motion.div {...fd(0.35)} className="mt-6">
            <div className="terminal max-w-xl">
              <div className="terminal-titlebar">
                <div className="t-dot bg-red-400/70" />
                <div className="t-dot bg-yellow-400/70" />
                <div className="t-dot bg-green-400/70" />
                <span className="ml-2 font-mono text-[11px] text-os-text-muted">rahyan.config.ts</span>
              </div>
              <div className="p-5 font-mono text-xs leading-relaxed">
                <div className="text-os-cyan">const</div>
                <div className="pl-0">
                  <span className="text-os-text"> rahyan </span>
                  <span className="text-os-text-dim">= </span>
                  <span className="text-accent">{'{'}</span>
                </div>
                {[
                  ['role', '"Full-Stack Developer"', '#f91460'],
                  ['experience', '"3+ years"', '#00d4ff'],
                  ['stack', '["Next.js", "Node.js", "TypeScript", "PostgreSQL"]', '#00e56b'],
                  ['traits', '["Fast learner", "Clean code", "Ownership mindset"]', '#a06bff'],
                  ['available', 'true', '#00e56b'],
                ].map(([k, v, c]) => (
                  <div key={k} className="pl-4 text-os-text-muted">
                    <span className="text-os-text">{k}</span>
                    <span className="text-os-text-dim">: </span>
                    <span style={{ color: c }}>{v}</span>
                    <span className="text-os-text-dim">,</span>
                  </div>
                ))}
                <div><span className="text-accent">{'}'}</span></div>
                <div className="mt-2 text-os-text-dim">
                  <span className="text-os-cyan">export default</span>
                  <span className="text-os-text"> rahyan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Field Reports (Testimonials) ─── */}
        <motion.div {...fd(0.2)} className="mb-16">
          <div className="label-mono mb-6">FIELD REPORTS — from collaborators</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FIELD_REPORTS.map((r, i) => (
              <motion.div
                key={r.author}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="os-panel p-5"
                style={{ borderTopColor: r.color, borderTopWidth: 2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-grotesk text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-grotesk text-sm font-semibold text-os-text">{r.author}</div>
                    <div className="font-mono text-[10px] text-os-text-dim">{r.role} · {r.org}</div>
                  </div>
                </div>
                <p className="font-grotesk text-xs text-os-text-muted leading-relaxed italic">{r.report}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Contact ─── */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-8">

          {/* Protocols */}
          <motion.div {...fd(0.25)}>
            <div className="label-mono mb-4">AVAILABLE PROTOCOLS</div>
            <div className="space-y-2">
              {PROTOCOLS.map(p => (
                <a
                  key={p.name}
                  href={p.href}
                  target={p.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="os-panel-hover flex items-start gap-4 p-4 group"
                >
                  <span className="text-xl font-mono mt-0.5 shrink-0" style={{ color: p.color }}>{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] tracking-wider" style={{ color: p.color }}>{p.name}</span>
                    </div>
                    <div className="font-grotesk text-sm text-os-text font-medium truncate group-hover:text-accent transition-colors">
                      {p.value}
                    </div>
                    <div className="font-mono text-[10px] text-os-text-dim mt-0.5">{p.desc}</div>
                  </div>
                  <span className="text-os-text-dim group-hover:text-accent transition-colors text-sm mt-1">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Message form */}
          <motion.div {...fd(0.3)}>
            <div className="label-mono mb-4">COMPOSE MESSAGE</div>
            <div className="terminal overflow-visible">
              <div className="terminal-titlebar">
                <div className="t-dot bg-red-400/70" />
                <div className="t-dot bg-yellow-400/70" />
                <div className="t-dot bg-green-400/70" />
                <span className="ml-2 font-mono text-[11px] text-os-text-muted">new-message.txt</span>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block font-mono text-[11px] text-os-text-dim mb-1.5 tracking-wider">
                    › identify_sender:
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                    placeholder="Your name"
                    className="w-full bg-os-panel border border-os-border rounded px-3 py-2.5 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-os-text-dim mb-1.5 tracking-wider">
                    › reply_address:
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-os-panel border border-os-border rounded px-3 py-2.5 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-os-text-dim mb-1.5 tracking-wider">
                    › message_body:
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-os-panel border border-os-border rounded px-3 py-2.5 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {state === 'sent' ? (
                  <div className="py-3 text-center font-mono text-sm text-os-green border border-os-green/30 rounded bg-os-green/5">
                    ✓ Message transmitted successfully.
                  </div>
                ) : state === 'error' ? (
                  <div className="py-3 text-center font-mono text-sm text-os-amber border border-os-amber/30 rounded bg-os-amber/5">
                    ⚠ Transmission failed. Email me directly.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="w-full py-3 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === 'sending' ? 'Transmitting...' : '› ESTABLISH CONNECTION'}
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
