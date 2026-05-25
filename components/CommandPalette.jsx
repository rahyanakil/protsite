'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_COMMANDS = [
  { id: 'home', icon: 'bx-home', label: 'Go to Home', group: 'Navigate', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'about', icon: 'bx-user', label: 'Go to About', group: 'Navigate', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', icon: 'bx-code-alt', label: 'Go to Skills', group: 'Navigate', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', icon: 'bx-folder-open', label: 'Go to Projects', group: 'Navigate', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', icon: 'bx-envelope', label: 'Go to Contact', group: 'Navigate', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'resume', icon: 'bx-download', label: 'Download Resume', group: 'Actions', action: () => window.open('/rahyan-akil-resume.pdf', '_blank') },
  { id: 'copy-email', icon: 'bx-copy', label: 'Copy Email Address', group: 'Actions', action: () => navigator.clipboard?.writeText('rahyanakil89@gmail.com') },
  { id: 'github', icon: 'bxl-github', label: 'Open GitHub', group: 'Links', action: () => window.open('https://github.com/rahyanakil', '_blank') },
  { id: 'linkedin', icon: 'bxl-linkedin', label: 'Open LinkedIn', group: 'Links', action: () => window.open('https://www.linkedin.com/in/rahyanshamsi/', '_blank') },
]

export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = ALL_COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setActiveIdx(0) }, [query])

  const runCommand = useCallback((cmd) => {
    cmd.action()
    onClose()
  }, [onClose])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && filtered[activeIdx]) runCommand(filtered[activeIdx])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [filtered, activeIdx, onClose, runCommand])

  // Group commands
  const groups = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -16 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
      >
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
          <i className="bx bx-search text-xl text-zinc-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm outline-none"
          />
          <kbd className="hidden sm:block text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono border border-zinc-200 dark:border-zinc-700">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2 space-y-3">
          {Object.keys(groups).length === 0 ? (
            <p className="text-center text-sm text-zinc-400 py-10">No commands found</p>
          ) : (
            Object.entries(groups).map(([group, cmds]) => {
              const globalOffset = filtered.indexOf(cmds[0])
              return (
                <div key={group}>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 mb-1">{group}</p>
                  {cmds.map((cmd, localIdx) => {
                    const idx = globalOffset + localIdx
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setActiveIdx(idx)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                          activeIdx === idx
                            ? 'bg-accent/10 text-accent'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          activeIdx === idx ? 'bg-accent/15' : 'bg-zinc-100 dark:bg-zinc-800'
                        }`}>
                          <i className={`bx ${cmd.icon} text-sm`} />
                        </span>
                        <span className="flex-1">{cmd.label}</span>
                        {activeIdx === idx && (
                          <kbd className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded font-mono">↵</kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-[11px] text-zinc-400">
          {[['↑↓', 'Navigate'], ['↵', 'Select'], ['ESC', 'Close']].map(([key, hint]) => (
            <span key={key} className="flex items-center gap-1.5">
              <kbd className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded font-mono">{key}</kbd>
              {hint}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
