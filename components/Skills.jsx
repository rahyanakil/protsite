'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const frontendSkills = [
  { name: 'HTML & CSS', level: 'Advanced', percent: 92, logo: '/logo/html-5.png' },
  { name: 'JavaScript', level: 'Advanced', percent: 88, logo: '/logo/js.png' },
  { name: 'TypeScript', level: 'Intermediate', percent: 75, logo: '/logo/js.png' },
  { name: 'React.js', level: 'Advanced', percent: 85, logo: '/logo/physics.png' },
  { name: 'Next.js', level: 'Intermediate', percent: 78, logo: '/logo/physics.png' },
  { name: 'Redux', level: 'Intermediate', percent: 70, logo: '/logo/physics.png' },
  { name: 'Tailwind CSS', level: 'Advanced', percent: 88, logo: '/logo/bootstrap.png' },
  { name: 'Bootstrap', level: 'Intermediate', percent: 75, logo: '/logo/bootstrap.png' },
]

const backendSkills = [
  { name: 'Node.js', level: 'Advanced', percent: 85, logo: '/logo/nodejs.png' },
  { name: 'Express.js', level: 'Advanced', percent: 85, logo: '/logo/express.png' },
  { name: 'Nest.js', level: 'Intermediate', percent: 70, logo: '/logo/nodejs.png' },
  { name: 'MongoDB', level: 'Advanced', percent: 82, logo: '/logo/database-storage.png' },
  { name: 'PostgreSQL', level: 'Intermediate', percent: 72, logo: '/logo/database-storage.png' },
  { name: 'MySQL', level: 'Intermediate', percent: 68, logo: '/logo/database-storage.png' },
  { name: 'Prisma', level: 'Intermediate', percent: 70, logo: '/logo/database-storage.png' },
  { name: 'Firebase', level: 'Intermediate', percent: 75, logo: '/logo/firewall.png' },
]

const toolSkills = [
  { name: 'Git & GitHub', level: 'Advanced', percent: 88, logo: '/logo/vs.png' },
  { name: 'Figma', level: 'Intermediate', percent: 70, logo: '/logo/vs.png' },
  { name: 'WordPress', level: 'Intermediate', percent: 72, logo: '/logo/vs.png' },
  { name: 'Stripe API', level: 'Intermediate', percent: 74, logo: '/logo/express.png' },
  { name: 'JWT / RBAC', level: 'Advanced', percent: 84, logo: '/logo/firewall.png' },
  { name: 'RESTful APIs', level: 'Advanced', percent: 88, logo: '/logo/nodejs.png' },
]

const levelColor = {
  Basic: 'text-blue-400',
  Intermediate: 'text-yellow-400',
  Advanced: 'text-green-400',
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const barContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const barItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

function SkillBar({ name, level, percent, logo }) {
  return (
    <motion.div variants={barItem} className="flex items-center gap-4">
      <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1.5 flex items-center justify-center">
        <Image src={logo} alt={name} width={26} height={26} className="object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{name}</span>
          <span className={`text-xs font-medium ${levelColor[level] || 'text-zinc-400'}`}>{level}</span>
        </div>
        <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
          />
        </div>
      </div>
      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 w-9 text-right">{percent}%</span>
    </motion.div>
  )
}

function SkillCard({ title, icon, skills, delay = 0 }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(249,20,96,0.08)' }}
      className="card p-6 transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"
        >
          <i className={`bx ${icon} text-xl text-accent`}></i>
        </motion.div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
      </div>
      <motion.div
        variants={barContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-5"
      >
        {skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const badgeItem = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } },
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">Skills</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">My technical level</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkillCard title="Frontend Development" icon="bx-code-alt" skills={frontendSkills} delay={0} />
          <SkillCard title="Backend Development" icon="bx-server" skills={backendSkills} delay={0.1} />
          <SkillCard title="Tools & Other" icon="bx-wrench" skills={toolSkills} delay={0.2} />
        </div>

        {/* Extra skill badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Also familiar with</p>
          <motion.div
            variants={badgeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2"
          >
            {['C++', 'Adobe XD', 'Photoshop', 'Elementor', 'MVC Architecture', 'Clean Architecture', 'Microservices', 'Vercel', 'Heroku'].map((skill) => (
              <motion.span
                key={skill}
                variants={badgeItem}
                whileHover={{ scale: 1.1, backgroundColor: '#f91460', color: '#fff', borderColor: '#f91460' }}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700 cursor-default transition-colors duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
