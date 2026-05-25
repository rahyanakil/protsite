'use client'
import { motion } from 'framer-motion'

const items = [
  {
    icon: 'bx-briefcase',
    title: 'Full-Time Roles',
    desc: 'Mid/senior full-stack or backend positions where I can own features end-to-end and make architectural decisions.',
  },
  {
    icon: 'bx-globe',
    title: 'Remote-First Culture',
    desc: 'Async-friendly teams that trust engineers to deliver without micromanagement. Timezone-flexible.',
  },
  {
    icon: 'bx-code-block',
    title: 'Modern Tech Stack',
    desc: 'Next.js, TypeScript, Node.js, PostgreSQL/MongoDB. Excited by Rust, Go, or cutting-edge tooling.',
  },
  {
    icon: 'bx-group',
    title: 'Collaborative Teams',
    desc: 'Code reviews, pair programming, knowledge-sharing — not working in silos. Good engineering culture matters.',
  },
  {
    icon: 'bx-book-open',
    title: 'Learning Culture',
    desc: 'Engineering blogs, internal talks, conference budgets. Teams that invest in growing their engineers.',
  },
  {
    icon: 'bx-trending-up',
    title: 'Growth Trajectory',
    desc: 'A clear path from IC → Tech Lead. I want to grow into architecture and mentorship over the next few years.',
  },
]

const CODE = `// Who you're hiring
const rahyan = {
  role:       "Full-Stack Developer",
  experience: "3+ years",
  stack:      ["Next.js", "Node.js",
               "TypeScript", "PostgreSQL"],
  traits:     ["Fast learner", "Clean code",
               "Ownership mindset"],
  available:  true, // ready to start!
}

export default rahyan`

const codeTokens = CODE.split('\n').map((line) => line)

export default function LookingFor() {
  return (
    <section id="looking-for" className="section-padding bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">
            What I&apos;m Looking For
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">My ideal next opportunity</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4, borderColor: 'rgba(249,20,96,0.4)', boxShadow: '0 12px 32px rgba(249,20,96,0.07)' }}
                className="card p-5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <i className={`bx ${icon} text-xl text-accent`} />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Code showcase card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="card overflow-hidden"
          >
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-500 dark:text-zinc-500 font-mono tracking-wide">
                rahyan.ts
              </span>
            </div>

            {/* Code body */}
            <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80">
              <pre className="text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto">
                {codeTokens.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-zinc-400 dark:text-zinc-600 w-6 text-right mr-4 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span
                      className="text-zinc-700 dark:text-zinc-300"
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;')
                          .replace(/(\/\/.*$)/g, '<span style="color:#71717a">$1</span>')
                          .replace(/\b(const|export|default|true)\b/g, '<span style="color:#a78bfa">$1</span>')
                          .replace(/"([^"]*)"/g, '<span style="color:#34d399">"$1"</span>')
                          .replace(/\b(role|experience|stack|traits|available)\b(?=:)/g, '<span style="color:#60a5fa">$1</span>'),
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>

            <div className="p-5 pt-0">
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
              >
                <i className="bx bx-send text-base" />
                Let&apos;s build something great
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
