'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/Providers'

const SECTIONS = [
  { id: 'mission-control', num: '01', label: 'MISSION CONTROL' },
  { id: 'system-overview', num: '02', label: 'SYSTEM OVERVIEW' },
  { id: 'skills-matrix',   num: '03', label: 'SKILLS MATRIX' },
  { id: 'project-lab',     num: '04', label: 'PROJECT LAB' },
  { id: 'career-log',      num: '05', label: 'CAREER LOG' },
  { id: 'open-channel',    num: '06', label: 'OPEN CHANNEL' },
]

export default function SystemNav() {
  const [active, setActive] = useState('mission-control')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        const intersecting = entries.filter(e => e.isIntersecting)
        if (intersecting.length > 0) {
          const topmost = intersecting.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActive(topmost.target.id)
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-52 z-40 flex-col border-r border-os-border os-glass-nav">
        {/* Identity header */}
        <div className="px-5 py-5 border-b border-os-border">
          <button
            onClick={() => scrollTo('mission-control')}
            className="block w-full text-left group"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="green-dot animate-glow" />
              <span className="font-mono text-[11px] text-accent font-bold tracking-[0.2em]">
                RAHYAN-OS
              </span>
            </div>
            <div className="font-mono text-[10px] text-os-text-muted tracking-wider">
              v3.0.0 · ACTIVE
            </div>
          </button>
        </div>

        {/* Process list */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="label-mono mb-3 px-2">PROCESSES</div>
          {SECTIONS.map(s => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-left
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-accent/10 border border-accent/25'
                    : 'border border-transparent hover:bg-os-panel hover:border-os-border'}
                `}
              >
                <span className={`font-mono text-[10px] shrink-0 ${isActive ? 'text-accent' : 'text-os-text-dim'}`}>
                  {s.num}
                </span>
                <span className={`font-mono text-[11px] tracking-wide leading-tight ${
                  isActive ? 'text-accent' : 'text-os-text-muted group-hover:text-os-text'
                }`}>
                  {s.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                )}
              </button>
            )
          })}
        </nav>

        {/* System stats */}
        <div className="px-5 py-4 border-t border-os-border space-y-3">
          <div className="label-mono">SYSTEM</div>
          <div className="space-y-1">
            {[['UPTIME', '3+ YRS'], ['PROJECTS', '30+'], ['COMMITS', '10K+']].map(([k, v]) => (
              <div key={k} className="flex justify-between font-mono text-[10px]">
                <span className="text-os-text-dim">{k}</span>
                <span className="text-os-text-muted">{v}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-1">
            <a
              href="https://github.com/rahyanakil"
              target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 border border-os-border rounded font-mono text-[10px] text-os-text-muted hover:border-accent hover:text-accent transition-colors"
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/rahyanshamsi/"
              target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 border border-os-border rounded font-mono text-[10px] text-os-text-muted hover:border-accent hover:text-accent transition-colors"
            >
              LI
            </a>
            <button
              onClick={toggleTheme}
              className="flex-1 py-1.5 border border-os-border rounded font-mono text-[10px] text-os-text-muted hover:border-accent hover:text-accent transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '◑'}
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE TOP BAR ─── */}
      <header className={`xl:hidden fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-4 transition-all duration-300 ${
        scrolled ? 'os-glass-nav border-b border-os-border' : 'bg-transparent'
      }`}>
        <button
          onClick={() => scrollTo('mission-control')}
          className="flex items-center gap-2"
        >
          <span className="green-dot animate-glow" />
          <span className="font-mono text-xs text-accent font-bold tracking-[0.2em]">RAHYAN-OS</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="font-mono text-[11px] text-os-text-muted hover:text-accent transition-colors"
          >
            {theme === 'dark' ? '☀' : '◑'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-7 h-7 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-os-text transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-os-text transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-os-text transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="xl:hidden fixed inset-0 z-30 os-glass-overlay"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="xl:hidden fixed top-0 right-0 bottom-0 z-50 w-72 os-glass-drawer border-l border-os-border flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-os-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="green-dot animate-glow" />
                    <span className="font-mono text-[11px] text-accent font-bold tracking-widest">RAHYAN-OS</span>
                  </div>
                  <div className="font-mono text-[10px] text-os-text-muted mt-0.5">v3.0.0 · ACTIVE</div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-os-text-muted hover:text-accent transition-colors text-xl">✕</button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="label-mono mb-3 px-1">PROCESSES</div>
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left border transition-all ${
                      active === s.id
                        ? 'bg-accent/10 border-accent/25 text-accent'
                        : 'border-os-border hover:border-os-border-bright hover:bg-os-panel text-os-text-muted hover:text-os-text'
                    }`}
                  >
                    <span className="font-mono text-[11px] shrink-0 opacity-60">{s.num}</span>
                    <span className="font-mono text-xs tracking-wider">{s.label}</span>
                  </button>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-os-border">
                <div className="grid grid-cols-3 gap-2">
                  <a href="https://github.com/rahyanakil" target="_blank" rel="noopener noreferrer"
                    className="py-2.5 border border-os-border rounded font-mono text-[11px] text-center text-os-text-muted hover:border-accent hover:text-accent transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/rahyanshamsi/" target="_blank" rel="noopener noreferrer"
                    className="py-2.5 border border-os-border rounded font-mono text-[11px] text-center text-os-text-muted hover:border-accent hover:text-accent transition-colors">
                    LinkedIn
                  </a>
                  <a href="/rahyan-akil-resume.pdf" target="_blank" rel="noopener noreferrer"
                    className="py-2.5 border border-accent/50 rounded font-mono text-[11px] text-center text-accent hover:bg-accent hover:text-white transition-colors">
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
