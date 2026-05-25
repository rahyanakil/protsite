'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'qualification', label: 'Experience' },
  { id: 'looking-for', label: 'Looking For' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-50% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <nav className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3.5">
      {sections.map(({ id, label }) => (
        <motion.a
          key={id}
          href={`#${id}`}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className="relative flex items-center justify-end"
        >
          <AnimatePresence>
            {hovered === id && (
              <motion.span
                initial={{ opacity: 0, x: -6, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute right-full mr-3 px-2.5 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg border border-zinc-700/50 pointer-events-none"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span
            animate={{
              width: active === id ? 24 : hovered === id ? 14 : 8,
              backgroundColor: active === id ? '#f91460' : hovered === id ? '#a1a1aa' : '#52525b',
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="h-2 rounded-full block"
          />
        </motion.a>
      ))}
    </nav>
  )
}
