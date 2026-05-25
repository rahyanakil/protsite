'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Tanvir Ahmed',
    role: 'Senior Backend Engineer',
    company: 'Prime Tech Solution Limited',
    text: 'Rahyan consistently delivers clean, well-structured backend code. His understanding of Clean Architecture and Node.js is exceptional. He integrates seamlessly into team workflows, takes full ownership of his tasks, and always delivers on time.',
    initials: 'TA',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Mehedi Hasan',
    role: 'Project Manager',
    company: 'Through ED Limited',
    text: 'Working with Rahyan on the ADA | Axiata Group project was outstanding. He picked up the codebase rapidly, asked exactly the right questions, and shipped features reliably. His full-stack perspective made him one of our most valuable contributors.',
    initials: 'MH',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Sarah Johnson',
    role: 'Product Lead',
    company: 'Freelance Collaboration',
    text: 'Rahyan built our platform frontend from scratch with Next.js and Tailwind CSS. His attention to UI detail, responsiveness, and performance optimisation exceeded our expectations. The final product looked and felt like a premium product.',
    initials: 'SJ',
    color: 'from-accent to-red-700',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => go((current + 1) % testimonials.length), [current, go])
  const prev = useCallback(() => go((current - 1 + testimonials.length) % testimonials.length), [current, go])

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  const t = testimonials[current]

  return (
    <section id="testimonials" className="section-padding bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">Kind Words</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">What colleagues say</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="card p-8 sm:p-10"
              >
                {/* Quote icon */}
                <i className="bx bxs-quote-alt-left text-4xl text-accent/30 mb-4 block" />

                {/* Text */}
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role} · {t.company}</p>
                  </div>
                  {/* Stars */}
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bx bxs-star text-accent text-base" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-accent hover:text-accent transition-colors"
            >
              <i className="bx bx-chevron-left text-xl" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-accent hover:text-accent transition-colors"
            >
              <i className="bx bx-chevron-right text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
