'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const education = [
  {
    degree: 'Bachelor of Science — Computer Science',
    institution: 'Bangladesh Army International University of Science & Technology (BAIUST)',
    location: 'Comilla Cantonment, Comilla',
    period: 'Mar 2021 – May 2024',
    extra: 'CGPA: 3.47 | Data Structures, Web Dev, Databases, Software Engineering',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Noakhali Government College',
    location: 'Noakhali',
    period: 'May 2019 – Jan 2021',
    extra: 'GPA: 4.83',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Noakhali Zilla School',
    location: 'Noakhali',
    period: 'Jan 2017 – Feb 2019',
    extra: 'GPA: 5.00',
  },
]

const experience = [
  {
    role: 'Executive / Backend Developer',
    company: 'Prime Tech Solution Limited — ICT Division EDGE Project',
    location: '13, T.K. Bhaban, Level 07, Kazi Nazrul Islam Avenue, Dhaka 1215',
    period: 'Jul 2024 – Jan 2025',
    points: [
      'Designed scalable RESTful APIs using Node.js, Express.js, and TypeScript',
      'Implemented Clean Architecture patterns for modular, testable codebases',
      'Built JWT + RBAC authentication and authorization systems',
      'Designed optimized MongoDB and PostgreSQL schemas',
      'Improved API response time by optimizing queries and reducing redundant calls',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Through ED Limited',
    location: 'Crystal Palace, House: SE (D) 22, Level 03, Gulshan 01, Dhaka',
    period: 'Dec 2023 – May 2024',
    points: [
      'Contributed to enterprise backend for ADA | Axiata Group Berhad',
      'Built RESTful APIs for prediction-based voting systems',
      'Developed real-time data-driven dashboards using MongoDB',
      'Implemented JWT + RBAC for secure authentication',
      'Structured reusable server-side modules with modular architecture',
    ],
  },
]

const certificates = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Ostad',
    period: 'Jul 2024',
    points: [
      'JavaScript, Node.js, React.js, Next.js, Prisma',
      'RESTful APIs and version control with Git',
      'Deployment on Vercel and Heroku',
    ],
  },
  {
    title: 'MERN Stack Development',
    issuer: 'Coders Trust',
    period: 'May 2023',
    points: [
      'MongoDB, Express.js, React, and Node.js',
      'Built full-stack web applications from scratch',
      'API development, routing, and state management',
    ],
  },
]

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0
  const title = item.degree || item.role
  const subtitle = item.institution || item.company

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-start gap-4 ${isLeft ? '' : 'flex-row-reverse'} mb-6`}
    >
      <div className={`flex-1 card p-4 hover:border-accent/40 transition-colors ${isLeft ? '' : 'text-right'}`}>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-0.5">{title}</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">{subtitle}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-1">{item.location}</p>
        {item.extra && (
          <p className="text-xs text-accent font-medium">{item.extra}</p>
        )}
        {item.points && (
          <ul className={`mt-2 space-y-0.5 ${isLeft ? '' : 'text-left'}`}>
            {item.points.map((p) => (
              <li key={p} className="text-xs text-zinc-500 dark:text-zinc-500 flex items-start gap-1">
                <i className="bx bx-chevron-right text-accent flex-shrink-0 mt-0.5 text-xs"></i>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-center flex-shrink-0 pt-3">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-zinc-950 shadow-md" />
        <div className="w-0.5 flex-1 bg-zinc-200 dark:bg-zinc-700 mt-1" />
      </div>
      <div className={`flex-1 pt-2.5`}>
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <i className="uil uil-calendar-alt text-accent"></i>
          {item.period}
        </span>
      </div>
    </motion.div>
  )
}

export default function Qualification() {
  const [tab, setTab] = useState('education')

  const tabs = [
    { key: 'education', icon: 'uil-graduation-cap', label: 'Education' },
    { key: 'experience', icon: 'uil-briefcase-alt', label: 'Experience' },
    { key: 'certificates', icon: 'uil-award', label: 'Certificates' },
  ]

  return (
    <section id="qualification" className="section-padding bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">
            Qualification
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">My personal journey</p>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-zinc-200 dark:bg-zinc-800 rounded-full gap-1">
            {tabs.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  tab === key
                    ? 'bg-white dark:bg-zinc-900 text-accent shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                <i className={`uil ${icon} text-base`}></i>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {tab === 'certificates' ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {certificates.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <i className="uil uil-award text-xl text-accent"></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{cert.title}</h3>
                        <p className="text-xs text-accent font-medium">{cert.issuer}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{cert.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {cert.points.map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                          <i className="bx bx-check text-accent flex-shrink-0 mt-0.5"></i>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            ) : (
              (tab === 'education' ? education : experience).map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
