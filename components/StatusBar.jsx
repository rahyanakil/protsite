'use client'
import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'mission-control', label: 'Mission Control' },
  { id: 'system-overview', label: 'System Overview' },
  { id: 'skills-matrix',   label: 'Skills Matrix' },
  { id: 'project-lab',     label: 'Project Lab' },
  { id: 'career-log',      label: 'Career Log' },
  { id: 'open-channel',    label: 'Open Channel' },
]

export default function StatusBar() {
  const [active, setActive] = useState(SECTIONS[0])
  const [time, setTime] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          const found = SECTIONS.find(s => s.id === topmost.target.id)
          if (found) setActive(found)
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-7 border-t border-os-border os-glass-bar flex items-center px-3 xl:pl-[220px] gap-4 overflow-hidden">
      {/* Left — status */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="green-dot" />
        <span className="font-mono text-[10px] text-os-green tracking-wider hidden sm:inline">ACTIVE</span>
        <span className="font-mono text-[10px] text-os-text-dim hidden md:inline">·</span>
        <span className="font-mono text-[10px] text-os-text-dim hidden md:inline">Dhaka, Bangladesh</span>
        <span className="font-mono text-[10px] text-os-text-dim hidden lg:inline">·</span>
        <span className="font-mono text-[10px] text-os-text-dim hidden lg:inline">Open to Work</span>
      </div>

      {/* Center — current section */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-os-text-muted">
          <span className="text-os-text-dim hidden sm:inline">rahyan-os</span>
          <span className="text-os-text-dim hidden sm:inline">/</span>
          <span className="text-accent">{active.label}</span>
        </div>
      </div>

      {/* Right — time + hint */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-[10px] text-os-text-dim hidden sm:inline">
          ↑↓ scroll to navigate
        </span>
        <span className="font-mono text-[10px] text-os-text-muted">{time}</span>
      </div>
    </div>
  )
}
