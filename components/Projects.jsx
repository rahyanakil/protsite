'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from './Providers'

const ALL_TAGS = ['All', 'Next.js', 'React.js', 'Node.js', 'TypeScript']

const projects = [
  {
    id: 1,
    tags: ['Next.js', 'React.js', 'TypeScript'],
    title: 'SkillBridge Frontend',
    subtitle: 'Modern Tutoring Platform',
    coverImage: '/project1/1.png',
    description:
      'SkillBridge is a modern tutoring platform UI built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. It connects students, tutors, and admins through role-based dashboards, real-time booking, Stripe payments, and an AI-powered chatbot backed by Groq Llama 3.3.',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Framer Motion', 'Stripe.js', 'Groq SDK'],
    features: [
      'Role-based parallel routes for Student, Tutor, and Admin dashboards',
      'Stripe payment flow: PaymentIntent → CheckoutPage → server-side confirmation',
      'Google & GitHub OAuth via Next.js Route Handlers with httpOnly JWT cookies',
      'AI Tutor chatbot (Groq Llama 3.3-70b) with typing indicator and cooldown',
      'Course listing with search, price filter, and client-side pagination',
      'Admin dashboard: ban/unban users, manage categories, view platform stats',
    ],
    challenges: [
      'Implementing role-based parallel routes (@student, @tutor, @admin) so the correct dashboard renders on the server without any client-side role checks.',
      'Integrating the Stripe PaymentIntent flow end-to-end — creating the intent server-side, rendering <PaymentElement>, and verifying the result before marking a booking as PAID.',
      'Managing the AI Tutor rate limit with a 5-second send cooldown and differentiating authenticated vs. guest UI states without exposing the Groq API key to the client.',
    ],
    futureImprovements: [
      'Replace polling-based notifications with WebSocket push for real-time booking status updates.',
      'Add a React Native mobile app so students can join Jitsi classrooms from their phones.',
      'Introduce async video lesson uploads so tutors can offer pre-recorded sessions alongside live bookings.',
    ],
    liveLink: 'https://skillbridge-frontend-ruby.vercel.app',
    githubLink: 'https://github.com/rahyanakil/skillbridge-frontend',
    snapshots: [
      '/project1/1.png',
      '/project1/2.png',
      '/project1/3.png',
      '/project1/4.png',
      '/project1/5.png',
      '/project1/6.png',
      '/project1/7.png',
      '/project1/8.png',
      '/project1/9.png',
      '/project1/10.png',
      '/project1/11.png',
    ],
  },
  {
    id: 2,
    tags: ['Node.js', 'React.js'],
    title: 'Cambrian School & College',
    subtitle: 'Educational Platform',
    coverImage: '/project2/1.jpg',
    description:
      'A comprehensive educational platform for Cambrian School & College, featuring appointment booking, service categorization, database-driven workflows, and email notification systems for efficient institution management.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Tailwind CSS', 'Nodemailer'],
    features: [
      'Appointment booking and service categorization system',
      'Database-driven workflows for bookings and notifications',
      'Email notification functionality for appointment tracking',
      'Scalable data models for content management',
      'Service categorization and scheduling logic',
    ],
    challenges: [
      'Designing database workflows that handle appointment conflicts reliably.',
      'Implementing email notification triggers across different booking states.',
      'Building a flexible content management structure for different service categories.',
    ],
    futureImprovements: [
      'Add a student portal with online fee payment integration.',
      'Implement SMS notifications alongside email alerts.',
      'Build a real-time appointment analytics dashboard for administrators.',
    ],
    liveLink: 'https://www.cambrian.edu.bd/',
    githubLink: 'https://github.com/rahyanakil',
    snapshots: [
      'https://i.ibb.co/d59TFgr/1.jpg',
      'https://i.ibb.co/6vXyMj4/2.jpg',
      'https://i.ibb.co/hDKnSmw/3.jpg',
      'https://i.ibb.co/d65Y6L7/4.jpg',
    ],
  },
  {
    id: 3,
    tags: ['Node.js', 'React.js'],
    title: 'Hexing Electrical BD',
    subtitle: 'Company Corporate Platform',
    coverImage: '/project3/1.jpg',
    description:
      'A corporate platform for Hexing Electrical Company Limited featuring RESTful APIs for product and user management, Stripe payment integration, secure JWT authentication with RBAC, and a comprehensive admin dashboard.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Stripe API', 'Firebase Auth', 'JWT', 'Tailwind CSS'],
    features: [
      'RESTful APIs for product, booking & payment management',
      'Stripe payment gateway with server-side validation',
      'JWT authentication and Role-Based Access Control (RBAC)',
      'MongoDB schema for user registrations and order management',
      'Admin APIs for full product lifecycle management',
      'Modular architecture for scalable backend services',
    ],
    challenges: [
      'Building admin role permissions that restrict access at the API level, not just the UI.',
      'Designing MongoDB schemas to support complex product hierarchies and order relationships.',
      'Integrating Stripe while maintaining idempotent transactions to prevent duplicate charges.',
    ],
    futureImprovements: [
      'Add a real-time inventory management system with low-stock alerts.',
      'Integrate a B2B client portal with custom pricing tiers.',
      'Add multi-language support for international business partners.',
    ],
    liveLink: 'https://hexingbd.com/',
    githubLink: 'https://github.com/rahyanakil',
    snapshots: [
      'https://i.ibb.co/LY6QkdH/1.jpg',
      'https://i.ibb.co/dgTpdmW/2.jpg',
      'https://i.ibb.co/rbHfVMj/3.jpg',
    ],
  },
  {
    id: 4,
    tags: ['React.js', 'Node.js'],
    title: 'MixxStore',
    subtitle: 'E-Commerce Baby Sports Shop',
    coverImage: 'https://i.ibb.co/F61wyX5/1.jpg',
    description:
      'MixxStore is a full-stack e-commerce platform specializing in baby sports toys. Features a complete product catalog, shopping cart, user reviews, and robust filtering — built as a personal MERN stack project.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Tailwind CSS'],
    features: [
      'Full product catalog with search and category filters',
      'Shopping cart with session persistence',
      'Product reviews and ratings system',
      'Firebase Authentication for secure user sessions',
      'Admin panel for product management',
    ],
    challenges: [
      'Implementing a real-time cart that syncs across sessions without a page reload.',
      'Building a flexible product filtering system for multiple simultaneous filter criteria.',
      'Optimizing product image loading to keep the catalog fast on slow connections.',
    ],
    futureImprovements: [
      'Integrate Stripe payment gateway for end-to-end checkout.',
      'Add a wishlist feature with price drop email alerts.',
      'Introduce an admin dashboard for inventory and order management.',
    ],
    liveLink: 'https://mixxstore-4a428.web.app',
    githubLink: 'https://github.com/rahyanakil/mixxstore-client',
    snapshots: [
      'https://i.ibb.co/F61wyX5/1.jpg',
      'https://i.ibb.co/Pmx5QRn/2.jpg',
      'https://i.ibb.co/0h2tVtm/3.jpg',
      'https://i.ibb.co/W3yBGxg/4.jpg',
    ],
  },
]

// ── Shared image with graceful fallback ──────────────────────────────────────
function ProjectImage({ src, alt, className = '', fill = false }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}>
        <i className="bx bx-image text-4xl text-zinc-400 dark:text-zinc-600" />
      </div>
    )
  }
  if (src.startsWith('http')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} onError={() => setErrored(true)} className={`w-full h-full object-cover ${className}`} />
    )
  }
  return <Image src={src} alt={alt} fill={fill} onError={() => setErrored(true)} className={`object-cover ${className}`} />
}

// ── Full-screen lightbox ─────────────────────────────────────────────────────
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
      >
        {src.startsWith('http') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Screenshot" className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl" />
        ) : (
          <div className="relative w-full h-[80vh]">
            <Image src={src} alt="Screenshot" fill className="object-contain rounded-2xl" />
          </div>
        )}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <i className="bx bx-x text-xl" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
        <i className={`bx ${icon} text-accent text-base`} />
      </div>
      <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-[0.18em]">{label}</h3>
      <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
    </div>
  )
}

// ── Animation variants ───────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  const [lightbox, setLightbox] = useState(null)
  const lenisRef = useLenis()

  // Stop Lenis so background page doesn't scroll behind the modal
  useEffect(() => {
    lenisRef?.current?.stop()
    return () => lenisRef?.current?.start()
  }, [lenisRef])

  // Escape to close (only when lightbox is not open)
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && !lightbox) onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lightbox])

  return (
    <>
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
        />

        {/* Panel — fixed bounds, flex column: sticky header + scrollable body */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, y: 64, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 64, scale: 0.95 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-50 inset-x-3 sm:inset-x-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl top-[4vh] bottom-[4vh] flex flex-col bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.4)] overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50"
        >
          {/* ── Sticky hero header ── */}
          <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden">
            <ProjectImage src={project.snapshots[0]} alt={project.title} fill className="brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 border border-white/15 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <i className="bx bx-x text-xl" />
            </motion.button>

            {/* Title block */}
            <div className="absolute bottom-5 left-5 right-16">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-accent text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5"
              >
                {project.subtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          {/* ── Scrollable body — data-lenis-prevent stops Lenis intercepting wheel events ── */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
            data-lenis-prevent
          >
            <div className="p-5 sm:p-7 space-y-8">

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm border-l-2 border-accent/50 pl-4 py-1"
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <div>
                <SectionHeader icon="bx-code-alt" label="Tech Stack" />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="flex flex-wrap gap-2"
                >
                  {project.techStack.map((t) => (
                    <motion.span
                      key={t}
                      variants={fadeUp}
                      className="px-3 py-1 bg-gradient-to-br from-accent/15 to-accent/5 text-accent border border-accent/25 rounded-full text-xs font-semibold hover:border-accent/60 transition-colors cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Key Features */}
              <div>
                <SectionHeader icon="bx-list-check" label="Key Features" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid sm:grid-cols-2 gap-2.5"
                >
                  {project.features.map((f) => (
                    <motion.li
                      key={f}
                      variants={fadeUp}
                      className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/40 hover:border-accent/30 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="bx bx-check text-accent text-xs" />
                      </span>
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Challenges */}
              <div>
                <SectionHeader icon="bx-target-lock" label="Challenges" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="space-y-3"
                >
                  {project.challenges.map((c, i) => (
                    <motion.li
                      key={c}
                      variants={fadeUp}
                      className="flex gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/40"
                    >
                      <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-accent/30">
                        {i + 1}
                      </span>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{c}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Future Improvements */}
              <div>
                <SectionHeader icon="bx-rocket" label="Future Improvements" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="space-y-2.5"
                >
                  {project.futureImprovements.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <i className="bx bx-right-arrow-alt text-accent text-lg flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-1">
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-2xl font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/45 transition-shadow"
                >
                  <i className="bx bx-link-external text-base" /> Live Site
                </motion.a>
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 dark:bg-zinc-700 text-white rounded-2xl font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors"
                >
                  <i className="bx bxl-github text-base" /> GitHub
                </motion.a>
              </div>

              {/* Screenshots */}
              <div>
                <SectionHeader icon="bx-images" label="Screenshots" />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {project.snapshots.map((src, i) => (
                    <motion.button
                      key={i}
                      variants={fadeUp}
                      onClick={() => setLightbox(src)}
                      className="relative h-28 sm:h-32 rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2"
                    >
                      <ProjectImage
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        fill
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <i className="bx bx-zoom-in text-white text-3xl drop-shadow-lg" />
                        </motion.span>
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] text-white/70 font-medium bg-black/30 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
                        {i + 1}/{project.snapshots.length}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox — above modal (z-60) */}
      <AnimatePresence>
        {lightbox && <Lightbox key="lightbox" src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  )
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const [imgHovered, setImgHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(249,20,96,0.12)] transition-all duration-500"
    >
      {/* ── Image with scroll-on-hover ── */}
      <div
        className="relative h-60 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 flex-shrink-0"
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        onClick={() => onOpen(project)}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <i className="bx bx-image text-5xl text-zinc-300 dark:text-zinc-700" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            src={project.coverImage}
            alt={project.title}
            onError={() => setImgError(true)}
            animate={{ y: imgHovered ? '-42%' : '0%' }}
            transition={{ duration: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '175%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        )}

        {/* Gradient always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: imgHovered ? 1 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ background: 'rgba(249,20,96,0.18)', backdropFilter: 'blur(3px)' }}
        >
          <motion.span
            animate={{ scale: imgHovered ? 1 : 0.8, opacity: imgHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-900 rounded-full font-bold text-sm shadow-2xl"
          >
            <i className="bx bx-zoom-in text-base" />
            View Details
          </motion.span>
        </motion.div>

        {/* Project number badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold text-white/90 leading-none">
            {String(project.id).padStart(2, '0')}
          </span>
        </div>

        {/* Tech badges bottom-left */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {project.techStack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 bg-accent/90 text-white rounded-full font-semibold backdrop-blur-sm shadow"
            >
              {t}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[11px] px-2.5 py-0.5 bg-black/50 text-white/80 rounded-full backdrop-blur-sm">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] text-accent font-bold uppercase tracking-[0.18em] mb-1.5">
          {project.subtitle}
        </p>
        <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Footer actions */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => onOpen(project)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white active:scale-95 transition-all duration-200 text-center"
          >
            Details →
          </button>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            title="Live Site"
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
          >
            <i className="bx bx-link-external text-[15px]" />
          </a>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <i className="bx bxl-github text-[15px]" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">Projects</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Explore my works</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {ALL_TAGS.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTag === tag
                  ? 'text-white'
                  : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:text-accent'
              }`}
            >
              {activeTag === tag && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 gap-6"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-500 dark:text-zinc-400 mt-12 text-sm"
          >
            No projects match this filter yet.
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {selected && <Modal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
