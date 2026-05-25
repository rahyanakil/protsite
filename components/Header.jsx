'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './Providers'
import CommandPalette from './CommandPalette'

const navLinks = [
  { id: 'home', label: 'Home', icon: 'uil-estate' },
  { id: 'about', label: 'About', icon: 'uil-user' },
  { id: 'skills', label: 'Skills', icon: 'uil-file-alt' },
  { id: 'projects', label: 'Projects', icon: 'uil-scenery' },
  { id: 'qualification', label: 'Qualification', icon: 'uil-graduation-cap' },
  { id: 'contact', label: 'Contact', icon: 'uil-message' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [cmdOpen, setCmdOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) setActiveNav(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold gradient-text select-none">
            Rahyan Akil
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, label, icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                    activeNav === id
                      ? 'text-accent'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <i className={`uil ${icon} text-base`}></i>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Command palette trigger */}
            <button
              onClick={() => setCmdOpen(true)}
              aria-label="Open command palette"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <i className="bx bx-command text-sm"></i>
              <span>⌘K</span>
            </button>

            {/* Resume button */}
            <a
              href="/rahyan-akil-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-accent text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-all duration-200"
            >
              Resume
              <span className="text-xs leading-none">↗</span>
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-accent dark:hover:text-accent transition-colors"
            >
              <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'} text-lg`}></i>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              <i className="uil uil-apps text-lg"></i>
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              <i className="uil uil-times text-xl"></i>
            </button>

            <ul className="flex flex-col items-center gap-8">
              {navLinks.map(({ id, label, icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 text-2xl font-medium transition-colors ${
                      activeNav === id
                        ? 'text-accent'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-accent'
                    }`}
                  >
                    <i className={`uil ${icon} text-2xl`}></i>
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile resume link */}
            <a
              href="/rahyan-akil-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-200"
            >
              Resume ↗
            </a>
          </div>
        )}
      </header>

      {/* Command Palette */}
      <AnimatePresence>
        {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
