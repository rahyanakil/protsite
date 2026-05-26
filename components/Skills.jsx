'use client'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    sub: 'UI, frameworks & styling',
    icon: 'bx-code-alt',
    skills: [
      { name: 'Next.js',       expert: true  },
      { name: 'React.js',      expert: true  },
      { name: 'TypeScript',    expert: true  },
      { name: 'JavaScript',    expert: true  },
      { name: 'Tailwind CSS',  expert: true  },
      { name: 'HTML & CSS',    expert: true  },
      { name: 'Framer Motion', expert: false },
      { name: 'Redux',         expert: false },
      { name: 'shadcn/ui',     expert: false },
      { name: 'Bootstrap',     expert: false },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    sub: 'APIs, databases & auth',
    icon: 'bx-server',
    skills: [
      { name: 'Node.js',      expert: true  },
      { name: 'Express.js',   expert: true  },
      { name: 'MongoDB',      expert: true  },
      { name: 'REST APIs',    expert: true  },
      { name: 'JWT & RBAC',   expert: true  },
      { name: 'PostgreSQL',   expert: false },
      { name: 'Prisma',       expert: false },
      { name: 'NestJS',       expert: false },
      { name: 'Firebase',     expert: false },
      { name: 'MySQL',        expert: false },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    sub: 'Workflow, deployment & APIs',
    icon: 'bx-git-branch',
    skills: [
      { name: 'Git & GitHub',   expert: true  },
      { name: 'Stripe API',     expert: true  },
      { name: 'Vercel',         expert: true  },
      { name: 'TanStack Query', expert: false },
      { name: 'Docker',         expert: false },
      { name: 'Figma',          expert: false },
      { name: 'Zod',            expert: false },
      { name: 'Postman',        expert: false },
    ],
  },
]

const marqueeItems = [
  'Next.js', 'React.js', 'TypeScript', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Stripe',
  'Docker', 'Figma', 'Git', 'Vercel', 'Firebase', 'Prisma',
  'TanStack Query', 'Redux', 'JWT', 'REST APIs', 'NestJS', 'Zod',
]

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden py-1 mask-fade-x">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-3 w-max"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="px-4 py-1.5 text-xs font-semibold rounded-full border whitespace-nowrap
              bg-zinc-100/80 dark:bg-zinc-800/60
              border-zinc-200 dark:border-zinc-700/60
              text-zinc-500 dark:text-zinc-400"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function SkillCard({ category, index }) {
  const expertCount    = category.skills.filter(s => s.expert).length
  const proficientCount = category.skills.filter(s => !s.expert).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Gradient border wrapper */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent/30 via-zinc-300/10 to-accent-dark/20 dark:from-accent/25 dark:via-zinc-700/10 dark:to-accent-dark/20 opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Card */}
      <div className="relative rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden">

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-[60px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(249,20,96,0.04), transparent)',
          }}
          animate={{ top: ['-60px', 'calc(100% + 60px)'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 1.2,
            repeatDelay: 4,
          }}
        />

        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-accent via-accent-dark to-transparent" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <i className={`bx ${category.icon} text-xl text-accent`} />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base leading-tight">
                  {category.label}
                </h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{category.sub}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-lg font-black text-zinc-900 dark:text-white leading-none">
                {category.skills.length}
              </p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">skills</p>
            </div>
          </div>

          {/* Divider with glow dot */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(249,20,96,0.6)]" />
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Expert pills */}
          {expertCount > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.15em] mb-2.5">
                Expert
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.filter(s => s.expert).map(skill => (
                  <motion.span
                    key={skill.name}
                    whileHover={{ scale: 1.06, y: -1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                      bg-accent/10 dark:bg-accent/10
                      border border-accent/25 dark:border-accent/25
                      text-accent
                      shadow-[0_0_10px_rgba(249,20,96,0.12)]
                      hover:shadow-[0_0_16px_rgba(249,20,96,0.25)]
                      hover:bg-accent/18 hover:border-accent/45
                      transition-all duration-200 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Proficient pills */}
          {proficientCount > 0 && (
            <div>
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.15em] mb-2.5">
                Proficient
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.filter(s => !s.expert).map(skill => (
                  <motion.span
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium
                      bg-zinc-50 dark:bg-zinc-800/70
                      border border-zinc-200 dark:border-zinc-700/60
                      text-zinc-600 dark:text-zinc-400
                      hover:border-zinc-300 dark:hover:border-zinc-600
                      hover:text-zinc-800 dark:hover:text-zinc-300
                      transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(249,20,96,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent-dark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Technical Stack
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-tight mb-3">
            Skills &amp; <span className="gradient-text-animated">Expertise</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto">
            Technologies I build with every day —
            <span className="text-accent font-semibold"> expert</span> means production-ready,
            proficient means solid working knowledge.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {categories.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap">
              Also familiar with
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Fade edges */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
            <Marquee />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
