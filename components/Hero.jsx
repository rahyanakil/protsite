'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const socialLinks = [
  { href: 'https://github.com/rahyanakil',            icon: 'uil-github-alt', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rahyanshamsi/', icon: 'uil-linkedin',   label: 'LinkedIn' },
  { href: 'https://www.instagram.com/rahyan_akil/',    icon: 'uil-instagram',  label: 'Instagram' },
]

const stats = [
  { value: 3,  suffix: '+', label: 'Years' },
  { value: 30, suffix: '+', label: 'Projects' },
  { value: 3,  suffix: '',  label: 'Companies' },
  { value: 10, suffix: 'K+', label: 'Commits' },
]

const stack = ['Next.js', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'Tailwind']

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const step = Math.ceil(target / 40)
          const id = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(id) }
            else setCount(start)
          }, 30)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

function ProfileCard() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), { stiffness: 80, damping: 20 })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 90 }}
      className="relative flex justify-center"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">

        {/* Glow behind image */}
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark rounded-3xl blur-3xl scale-90"
        />

        {/* Main image container */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <Image src="/profile2.jpg" alt="Rahyan Shamsi Akil" fill className="object-cover" priority />
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* Floating status badge */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute -top-4 -right-6 bg-white dark:bg-zinc-900 rounded-2xl px-3.5 py-2.5 shadow-xl border border-zinc-100 dark:border-zinc-700 flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-bold text-zinc-900 dark:text-white whitespace-nowrap">Open to Work</span>
        </motion.div>

        {/* Floating current project card */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute -bottom-5 -left-8 bg-white dark:bg-zinc-900 rounded-2xl px-4 py-3 shadow-xl border border-zinc-100 dark:border-zinc-700 max-w-[160px]"
        >
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Latest Build</p>
          <p className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">SmartRetail AI</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">Next.js · Gemini AI</p>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/12 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 22, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 -right-24 w-80 h-80 bg-accent-dark/12 rounded-full blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="container-custom w-full section-padding">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="order-2 md:order-1"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-bold text-xs tracking-[0.2em] uppercase">Full-Stack Developer</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-5"
            >
              <span className="text-zinc-900 dark:text-white">I build products</span>
              <br />
              <span className="gradient-text-animated">people actually use.</span>
            </motion.h1>

            {/* Bio */}
            <motion.p variants={fadeUp} className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mb-8 text-[15px]">
              Hey, I&apos;m <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">Rahyan Shamsi Akil</strong> — based in Dhaka.
              Three years building production apps with Next.js, TypeScript, and the MERN stack.
              I care about performance, clean architecture, and UI that feels fast.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-4 gap-3 mb-8 max-w-sm">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-extrabold text-zinc-900 dark:text-white leading-none">
                    <CountUp target={value} suffix={suffix} />
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-1 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Stack pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 mb-8">
              {stack.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-zinc-200 dark:border-zinc-700">
                  {s}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-semibold shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all text-sm"
              >
                View My Work
                <i className="bx bx-right-arrow-alt text-lg" />
              </motion.a>
              <motion.a
                href="/rahyan-akil-resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-2xl font-semibold hover:border-accent hover:text-accent dark:hover:text-accent transition-all text-sm"
              >
                <i className="bx bx-download text-lg" />
                Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              {socialLinks.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all duration-200 text-base border border-zinc-200 dark:border-zinc-700 hover:border-accent"
                >
                  <i className={`uil ${icon}`} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Image ── */}
          <div className="order-1 md:order-2 flex justify-center">
            <ProfileCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-accent transition-colors group"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
            <div className="w-5 h-9 border-2 border-current rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
