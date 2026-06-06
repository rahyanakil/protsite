'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { id: 0, delay: 0,    type: 'header',  text: 'RAHYAN-OS v3.0.0 — Full-Stack Developer Operating System' },
  { id: 1, delay: 500,  type: 'divider' },
  { id: 2, delay: 700,  type: 'module',  text: 'Loading  ::  Problem Solving Engine',  status: 'OK' },
  { id: 3, delay: 950,  type: 'module',  text: 'Loading  ::  UI Engineering Systems',  status: 'OK' },
  { id: 4, delay: 1200, type: 'module',  text: 'Loading  ::  API Design & Integration', status: 'OK' },
  { id: 5, delay: 1450, type: 'module',  text: 'Loading  ::  Auth & Security Protocols', status: 'OK' },
  { id: 6, delay: 1700, type: 'module',  text: 'Loading  ::  Database Architecture',   status: 'OK' },
  { id: 7, delay: 1950, type: 'module',  text: 'Loading  ::  Performance Core',         status: 'OK' },
  { id: 8, delay: 2200, type: 'divider' },
  { id: 9, delay: 2400, type: 'stat',    text: 'Projects: 30+  ·  Commits: 10K+  ·  Companies: 3  ·  Uptime: 3+ years' },
  { id: 10, delay: 2700, type: 'divider' },
  { id: 11, delay: 2900, type: 'success', text: 'All systems nominal. Welcome, visitor.' },
]

export default function BootSequence({ onComplete }) {
  const [visible, setVisible] = useState(new Set())
  const [showCTA, setShowCTA] = useState(false)
  const [exiting, setExiting] = useState(false)

  const dismiss = useCallback(() => {
    setExiting(true)
    sessionStorage.setItem('rahyan-os-booted', '1')
    setTimeout(() => onComplete?.(), 550)
  }, [onComplete])

  useEffect(() => {
    if (sessionStorage.getItem('rahyan-os-booted')) {
      onComplete?.()
      return
    }

    const timers = LINES.map(line =>
      setTimeout(() => setVisible(prev => new Set([...prev, line.id])), line.delay)
    )
    const ctaTimer = setTimeout(() => setShowCTA(true), 3300)
    return () => { timers.forEach(clearTimeout); clearTimeout(ctaTimer) }
  }, [onComplete])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dismiss])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-os-void flex items-center justify-center os-grid"
        >
          {/* Skip */}
          <button
            onClick={dismiss}
            className="absolute top-5 right-5 font-mono text-xs text-os-text-muted hover:text-accent transition-colors tracking-widest"
          >
            SKIP ›
          </button>

          {/* Terminal window */}
          <div className="w-full max-w-xl mx-4">
            <div className="terminal shadow-2xl">
              {/* Titlebar */}
              <div className="terminal-titlebar">
                <div className="t-dot bg-red-400/70" />
                <div className="t-dot bg-yellow-400/70" />
                <div className="t-dot bg-green-400/70" />
                <span className="ml-2 font-mono text-[11px] text-os-text-muted tracking-wider">
                  rahyan@dev — bash
                </span>
              </div>

              {/* Body */}
              <div className="p-5 min-h-[300px] space-y-1">
                {LINES.map(line => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={visible.has(line.id) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <BootLine line={line} />
                  </motion.div>
                ))}

                {!showCTA && (
                  <span className="inline-block w-[9px] h-4 bg-accent animate-blink ml-0.5" />
                )}
              </div>
            </div>

            {/* CTA */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <button
                    onClick={dismiss}
                    className="group relative px-8 py-3 border border-accent text-accent font-mono text-sm rounded tracking-widest hover:bg-accent hover:text-white transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">› ENTER SYSTEM</span>
                  </button>
                  <span className="font-mono text-[11px] text-os-text-muted tracking-widest">
                    or press ENTER / ESC
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BootLine({ line }) {
  if (line.type === 'divider') {
    return <div className="border-t border-os-border my-2 opacity-50" />
  }
  if (line.type === 'header') {
    return (
      <p className="font-mono text-sm text-accent font-semibold tracking-wide">
        {line.text}
      </p>
    )
  }
  if (line.type === 'module') {
    const dots = '·'.repeat(Math.max(0, 52 - line.text.length))
    return (
      <div className="flex items-baseline font-mono text-xs">
        <span className="text-os-text-muted flex-1 truncate">{line.text}</span>
        <span className="ml-2 text-os-text-dim shrink-0 hidden sm:inline">{dots}</span>
        <span className="ml-2 text-os-green shrink-0 font-semibold">[{line.status}]</span>
      </div>
    )
  }
  if (line.type === 'stat') {
    return (
      <p className="font-mono text-[11px] text-os-cyan tracking-wider">{line.text}</p>
    )
  }
  if (line.type === 'success') {
    return (
      <p className="font-mono text-sm text-os-text tracking-wide">{line.text}</p>
    )
  }
  return null
}
