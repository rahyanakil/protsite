'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Through Travels',
    subtitle: 'Travel Management Platform',
    coverImage: '/project1/1.jpg',
    description:
      'Through Travels is a full-stack MERN travel management platform offering seamless tour booking, payment processing, and dedicated dashboards for both admins and travelers. Built with scalable RESTful APIs and secure authentication.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'Firebase Auth', 'Tailwind CSS', 'JWT'],
    features: [
      'Scalable RESTful APIs for tour, booking & payment management',
      'Stripe payment gateway with server-side validation',
      'JWT-based authentication with Role-Based Access Control (RBAC)',
      'MongoDB schema for user registrations, orders & reviews',
      'Admin APIs for product lifecycle (create, update, delete)',
      'Delivery tracking and modular backend architecture',
    ],
    challenges: [
      'Integrating Stripe payment gateway with secure server-side validation and transaction handling.',
      'Implementing JWT authentication and RBAC for both admin and user roles simultaneously.',
      'Designing MongoDB schemas optimized for booking workflows and query performance.',
    ],
    futureImprovements: [
      'Add a native mobile app using React Native.',
      'Introduce an AI-powered trip recommendation engine based on user history.',
      'Support multi-language and multi-currency for international travelers.',
    ],
    liveLink: 'https://throughtravels.web.app/',
    githubLink: 'https://github.com/rahyanakil',
    snapshots: [
      'https://i.ibb.co/qrM7GFH/banner-section.jpg',
      'https://i.ibb.co/HTNFJHT/category-section.jpg',
      'https://i.ibb.co/YctXV6d/Feedback-section.jpg',
      'https://i.ibb.co/tB2P70X/login.jpg',
      'https://i.ibb.co/GWfyXqF/user-dashboard-booked-place.jpg',
    ],
  },
  {
    id: 2,
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

function TiltCard({ children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 100, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.div variants={cardItem}>
      <TiltCard className="card overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 flex flex-col h-full" style={{ perspective: 1000 }}>
        {/* Cover image */}
        <div className="relative h-52 overflow-hidden">
          {project.coverImage.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          ) : (
            <Image src={project.coverImage} alt={project.title} fill className="object-cover transition-transform duration-700 hover:scale-110" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 bg-accent text-white rounded-full font-medium backdrop-blur-sm">
                {t}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-black/50 text-white rounded-full backdrop-blur-sm">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs text-accent font-medium uppercase tracking-wider mb-1">{project.subtitle}</p>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{project.title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>
          <motion.button
            onClick={() => onOpen(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 border-2 border-accent text-accent rounded-xl font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-200"
          >
            View Details
          </motion.button>
        </div>
      </TiltCard>
    </motion.div>
  )
}

function Modal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative h-56 flex-shrink-0">
            {project.snapshots[0].startsWith('http') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.snapshots[0]} alt={project.title} className="w-full h-full object-cover rounded-t-2xl" />
            ) : (
              <Image src={project.snapshots[0]} alt={project.title} fill className="object-cover rounded-t-2xl" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl" />
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <i className="bx bx-x text-xl"></i>
            </motion.button>
            <div className="absolute bottom-4 left-5">
              <p className="text-accent text-xs font-semibold uppercase tracking-wider">{project.subtitle}</p>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{project.description}</p>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="bx bx-code-alt text-accent text-lg"></i> Tech Stack
              </h3>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-wrap gap-2"
              >
                {project.techStack.map((t) => (
                  <motion.span
                    key={t}
                    variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                    className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-semibold"
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="bx bx-list-check text-accent text-lg"></i> Key Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <i className="bx bx-check text-accent text-base flex-shrink-0 mt-0.5"></i>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="bx bx-target-lock text-accent text-lg"></i> Challenges Faced
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <i className="bx bx-chevron-right text-accent text-base flex-shrink-0 mt-0.5"></i>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="bx bx-rocket text-accent text-lg"></i> Future Improvements
              </h3>
              <ul className="space-y-2">
                {project.futureImprovements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <i className="bx bx-right-arrow-alt text-accent text-base flex-shrink-0 mt-0.5"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl font-semibold text-sm"
              >
                <i className="bx bx-link-external text-base"></i> Live Site
              </motion.a>
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 dark:bg-zinc-700 text-white rounded-xl font-semibold text-sm"
              >
                <i className="bx bxl-github text-base"></i> GitHub (Client)
              </motion.a>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Screenshots</h3>
              <div className="grid grid-cols-2 gap-3">
                {project.snapshots.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative h-36 rounded-xl overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
          style={{ perspective: 1000 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
