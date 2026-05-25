'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HireMeBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > window.innerHeight * 0.85) setVisible(true)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-4 sm:px-5 py-3 bg-zinc-900/95 dark:bg-zinc-800/95 border border-zinc-700/80 rounded-full shadow-2xl shadow-black/50 backdrop-blur-xl whitespace-nowrap"
        >
          {/* Pulse dot */}
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>

          <p className="text-sm text-zinc-300 font-medium hidden sm:block">
            Available for full-time roles
          </p>
          <p className="text-sm text-zinc-300 font-medium sm:hidden">Open to work</p>

          <a
            href="#contact"
            onClick={() => setDismissed(true)}
            className="px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full hover:bg-accent/90 transition-colors shadow-md shadow-accent/30"
          >
            Let&apos;s Talk →
          </a>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0"
          >
            <i className="bx bx-x text-xl" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
