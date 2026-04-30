'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const stats = [
  { icon: 'bx-award', title: 'Experience', value: '3+', suffix: ' Yrs' },
  { icon: 'bx-briefcase-alt', title: 'Projects', value: '10', suffix: '+' },
  { icon: 'bx-buildings', title: 'Companies', value: '2', suffix: ' Jobs' },
]

const shortBio = `Enthusiastic and detail-oriented full-stack web developer with 3+ years of hands-on experience building responsive, user-focused applications using the MERN stack, React, Next.js, TypeScript, and modern JavaScript technologies. Passionate about problem-solving, learning new tools, and creating clean, efficient solutions.`

const fullBio = `Enthusiastic and detail-oriented full-stack web developer with 3+ years of hands-on experience building responsive, user-focused applications using the MERN stack, React, Next.js, TypeScript, and modern JavaScript technologies. Passionate about problem-solving, learning new tools, and creating clean, efficient solutions.

Experienced in contributing to real-world projects across both corporate and startup environments, delivering reliable front-end and back-end features. Skilled in turning UI/UX designs into high-quality interfaces, implementing secure authentication (JWT, RBAC), improving performance, and building real-time functionality.

I have worked as a Backend Developer at Prime Tech Solution Limited on the ICT Division EDGE Project, and as a Full Stack Developer at Through ED Limited on enterprise-level projects including ADA | Axiata Group Berhad. My expertise spans Node.js, Express.js, Nest.js, MongoDB, PostgreSQL, Prisma, Firebase, and more.

Outside of programming, I enjoy playing cricket and football with friends, which keeps me energetic and team-oriented. I also have a passion for travelling and exploring new places, which fuels my creativity and broadens my perspective. Let's connect and discuss how I can contribute to your next web development venture!`

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

const statContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const statItem = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15 } },
}

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
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">My introduction</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image with reveal effect */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex justify-center"
            style={{ perspective: 1000 }}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/about.jpg" alt="About Rahyan" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute bottom-4 left-4 bg-white dark:bg-zinc-900 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="text-lg">💻</span>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Full Stack Dev</p>
                  <p className="text-xs text-zinc-500">3+ Years Exp.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            {/* Stats with count-up */}
            <motion.div
              variants={statContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {stats.map(({ icon, title, value, suffix }) => {
                const numericValue = parseInt(value.replace('+', ''))
                return (
                  <motion.div
                    key={title}
                    variants={statItem}
                    whileHover={{ scale: 1.05, borderColor: '#f91460' }}
                    className="card p-4 text-center cursor-default transition-colors"
                  >
                    <motion.i
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                      className={`bx ${icon} text-2xl text-accent mb-2 block`}
                    ></motion.i>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                      <CountUp target={numericValue} />{suffix}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{title}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm mb-6 whitespace-pre-line"
            >
              {expanded ? fullBio : shortBio}
            </motion.div>

            {!expanded && (
              <motion.button
                onClick={() => setExpanded(true)}
                whileHover={{ x: 4 }}
                className="text-accent font-semibold text-sm hover:underline mb-6 block"
              >
                Read More →
              </motion.button>
            )}

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/25"
            >
              <i className="uil uil-message text-lg"></i>
              Say Hello
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
