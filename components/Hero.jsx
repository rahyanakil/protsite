'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ROLES = [
  'Full-Stack Developer',
  'Next.js Engineer',
  'MERN Stack Expert',
  'UI/UX Focused Dev',
]

function useTypewriter(words) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const word = words[wordIdx % words.length]
    let timeout

    if (deleting) {
      if (display.length === 0) {
        setDeleting(false)
        setWordIdx(i => i + 1)
        timeout = setTimeout(() => {}, 400)
      } else {
        timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), 45)
      }
    } else {
      if (display === word) {
        timeout = setTimeout(() => setDeleting(true), 1800)
      } else {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 80)
      }
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, words])

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(id)
  }, [])

  return { display, blink }
}

const socialLinks = [
  { href: 'https://github.com/rahyanakil', icon: 'uil-github-alt', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rahyanshamsi/', icon: 'uil-linkedin', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/rahyan_akil/', icon: 'uil-instagram', label: 'Instagram' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const socialContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
}

const socialItem = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
}

function FloatingImage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 80, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 100 }}
      className="flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {/* Outer glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-full border-2 border-dashed border-accent/30"
        />
        {/* Second ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-6 rounded-full border border-accent/10"
        />
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark rounded-full blur-2xl opacity-30 scale-110"
        />
        {/* Image */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 overflow-hidden border-4 border-accent/30 rounded-full"
        >
          <Image src="/profile2.jpg" alt="Rahyan Shamsi Akil" fill className="object-cover" priority />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const { display, blink } = useTypewriter(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-dark/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-10 right-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom w-full section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={container} initial="hidden" animate="visible" className="order-2 md:order-1">

            {/* Open to Work badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Open to Work
            </motion.div>

            {/* Social links */}
            <motion.div variants={socialContainer} initial="hidden" animate="visible" className="flex gap-3 mb-6">
              {socialLinks.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  variants={socialItem}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 10, backgroundColor: '#f91460', color: '#fff' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors duration-200 text-lg"
                >
                  <i className={`uil ${icon}`}></i>
                </motion.a>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              Hello, I&apos;m
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="gradient-text-animated">Rahyan Shamsi</span>
              <br />
              <span className="text-zinc-900 dark:text-white">Akil</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl font-semibold text-zinc-600 dark:text-zinc-400 mb-5 min-h-[2rem]">
              {display}
              <span
                className={`inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle transition-opacity duration-100 ${blink ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.h2>

            <motion.p variants={fadeUp} className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-8">
              Enthusiastic full-stack web developer with{' '}
              <strong className="text-accent">3+ years</strong> of hands-on experience building
              responsive, user-focused applications using the MERN stack, Next.js, TypeScript,
              and modern JavaScript technologies.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.a
                href="/rahyan-akil-resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/25"
              >
                <i className="bx bx-download text-lg"></i>
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-200"
              >
                <i className="uil uil-message text-lg"></i>
                Say Hello
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <div className="order-1 md:order-2">
            <FloatingImage />
          </div>
        </div>

        {/* Scroll down */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-500 hover:text-accent transition-colors group"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2.5 bg-current rounded-full animate-bounce" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
