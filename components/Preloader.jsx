'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => setDone(true), 350)
      }
      setProgress(Math.min(p, 100))
    }, 70)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center select-none"
        >
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Initials */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <span className="text-7xl font-black gradient-text leading-none">RA</span>
          </motion.div>

          {/* Name + role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-center mb-10"
          >
            <p className="text-zinc-300 text-sm font-semibold tracking-[0.25em] uppercase">
              Rahyan Shamsi Akil
            </p>
            <p className="text-zinc-600 text-xs tracking-[0.15em] mt-1 uppercase">
              Full-Stack Developer
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-52 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.07, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-600 text-xs mt-3 font-mono tabular-nums"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
