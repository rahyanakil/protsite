'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function GitHubStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/rahyanakil')
      .then(r => r.json())
      .then(d => setStats({ repos: d.public_repos, followers: d.followers, following: d.following }))
      .catch(() => {})
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.14, duration: 0.5 }}
      className="card p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <i className="bx bxl-github text-xl text-zinc-900 dark:text-white" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">GitHub Live</p>
      </div>
      {stats ? (
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Repos', value: stats.repos },
            { label: 'Followers', value: stats.followers },
            { label: 'Following', value: stats.following },
          ].map(({ label, value }) => (
            <div key={label} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-14">
          <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      )}
      <a
        href="https://github.com/rahyanakil"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline"
      >
        View profile <i className="bx bx-link-external text-sm" />
      </a>
    </motion.div>
  )
}

function CountUp({ target }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration: 2, ease: 'easeOut' })
      return controls.stop
    }
  }, [isInView, count, target])

  useEffect(() => {
    return rounded.on('change', (v) => setDisplay(String(v)))
  }, [rounded])

  return <span ref={ref}>{display}</span>
}

const shortBio = `Enthusiastic and detail-oriented full-stack web developer with 3+ years of hands-on experience building responsive, user-focused applications using the MERN stack, React, Next.js, TypeScript, and modern JavaScript technologies.`

const fullBio = `Enthusiastic and detail-oriented full-stack web developer with 3+ years of hands-on experience building responsive, user-focused applications using the MERN stack, React, Next.js, TypeScript, and modern JavaScript technologies. Passionate about problem-solving, learning new tools, and creating clean, efficient solutions.

I have worked as a Backend Developer at Prime Tech Solution Limited on the ICT Division EDGE Project, and as a Full Stack Developer at Through ED Limited on enterprise-level projects including ADA | Axiata Group Berhad. My expertise spans Node.js, Express.js, Nest.js, MongoDB, PostgreSQL, Prisma, Firebase, and more.`

const stack = ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Node.js', 'TypeScript']

const cardAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">About Me</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">My introduction</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Profile Image Card */}
          <motion.div
            {...cardAnim(0)}
            className="card overflow-hidden relative sm:row-span-2 lg:row-span-2 min-h-[320px]"
          >
            <Image src="/about.jpg" alt="Rahyan Akil" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold text-lg leading-tight">Rahyan Shamsi Akil</p>
              <p className="text-white/70 text-xs mt-0.5">Full-Stack Developer · 3+ Years</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="absolute top-4 left-4 bg-white dark:bg-zinc-900 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2"
            >
              <span className="text-base">💻</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white">Full Stack Dev</span>
            </motion.div>
          </motion.div>

          {/* Open to Work Card */}
          <motion.div {...cardAnim(0.08)} className="card p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Open to Work</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
              Available for full-time roles, freelance projects, and exciting collaborations worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <i className="bx bx-map-pin text-accent" />
              Dhaka, Bangladesh · Remote OK
            </div>
          </motion.div>

          {/* Currently Building Card */}
          <motion.div {...cardAnim(0.12)} className="card p-5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Currently Building</p>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white text-sm">SkillBridge</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  AI-powered tutoring platform with Groq Llama 3.3, Stripe payments, and role-based dashboards.
                </p>
                <a
                  href="https://skillbridge-frontend-ruby.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent font-semibold mt-2 hover:underline"
                >
                  View live <i className="bx bx-link-external text-sm" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div {...cardAnim(0.16)} className="card p-5 sm:col-span-2 lg:col-span-2">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">By the Numbers</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: 'bx-award', value: 3, suffix: '+', label: 'Years Exp.' },
                { icon: 'bx-briefcase-alt', value: 30, suffix: '+', label: 'Projects' },
                { icon: 'bx-buildings', value: 3, suffix: '', label: 'Companies' },
              ].map(({ icon, value, suffix, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
                >
                  <i className={`bx ${icon} text-2xl text-accent mb-1 block`} />
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">
                    <CountUp target={value} />{suffix}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stack Card */}
          <motion.div {...cardAnim(0.2)} className="card p-5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Stack I Swear By</p>
            <div className="flex flex-wrap gap-2">
              {stack.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.05, type: 'spring', stiffness: 200 }}
                  className="px-2.5 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-semibold"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* GitHub Stats Card */}
          <GitHubStats />

          {/* Bio Card */}
          <motion.div {...cardAnim(0.24)} className="card p-6 sm:col-span-2 lg:col-span-3">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">About</p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm whitespace-pre-line mb-4">
              {expanded ? fullBio : shortBio}
            </p>
            <div className="flex items-center gap-4">
              {!expanded && (
                <motion.button
                  onClick={() => setExpanded(true)}
                  whileHover={{ x: 4 }}
                  className="text-accent font-semibold text-sm hover:underline"
                >
                  Read More →
                </motion.button>
              )}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/25 text-sm ml-auto"
              >
                <i className="uil uil-message text-base" />
                Say Hello
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
