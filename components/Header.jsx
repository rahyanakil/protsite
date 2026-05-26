'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './Providers'
import CommandPalette from './CommandPalette'

const sectionLinks = [
  { id: 'home',          label: 'Home' },
  { id: 'about',         label: 'About' },
  { id: 'skills',        label: 'Skills' },
  { id: 'projects',      label: 'Projects' },
  { id: 'qualification', label: 'Qualification' },
  { id: 'contact',       label: 'Contact' },
]

const pageLinks = [
  { href: '/blog',  label: 'Blog' },
  { href: '/uses',  label: 'Uses' },
]

// Desktop nav omits "Home" — the logo serves that purpose
const desktopSection = sectionLinks.filter(l => l.id !== 'home')

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [cmdOpen, setCmdOpen]     = useState(false)
  const { theme, toggleTheme }    = useTheme()
  const pathname = usePathname()
  const isHome   = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = sectionLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveNav(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const pillBase =
    'pointer-events-auto flex items-center gap-0.5 px-2.5 py-2 rounded-2xl transition-all duration-500'
  const pillScrolled =
    'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl shadow-black/[0.08] dark:shadow-black/30'
  const pillIdle =
    'bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-800/30 shadow-lg shadow-black/5'

  return (
    <>
      {/* ── Floating pill ─────────────────────────────── */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`${pillBase} ${scrolled ? pillScrolled : pillIdle}`}
        >
          {/* Logo */}
          <a
            href={isHome ? '#home' : '/'}
            className="px-3 py-1 mr-1 text-sm font-bold gradient-text select-none whitespace-nowrap"
          >
            Rahyan Akil
          </a>

          <span className="hidden lg:block"><Sep /></span>

          {/* Section links — desktop */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {desktopSection.map(({ id, label }) => {
              const active = isHome && activeNav === id
              return (
                <li key={id}>
                  <a
                    href={isHome ? `#${id}` : `/#${id}`}
                    className={`relative inline-flex px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200 ${
                      active
                        ? 'text-white'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {active && <ActivePill />}
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Page links — desktop */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {pageLinks.map(({ href, label }) => {
              const active = pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative inline-flex px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200 ${
                      active
                        ? 'text-white'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {active && <ActivePill />}
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <span className="hidden lg:block"><Sep /></span>

          {/* ⌘K */}
          <button
            onClick={() => setCmdOpen(true)}
            aria-label="Open command palette"
            className="hidden lg:flex items-center px-2.5 py-1.5 rounded-xl text-[11px] font-mono text-zinc-400 dark:text-zinc-500 hover:text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer"
          >
            ⌘K
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-accent hover:bg-accent/10 transition-all duration-200"
          >
            <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'} text-base`} />
          </button>

          {/* Resume — desktop */}
          <a
            href="/rahyan-akil-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 ml-1 px-3.5 py-1.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/85 transition-all duration-200 shadow-md shadow-accent/30"
          >
            Resume
            <i className="bx bx-link-external text-[10px]" />
          </a>

          {/* Hamburger — mobile/tablet */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-accent hover:bg-accent/10 transition-all"
          >
            <i className="bx bx-menu text-lg" />
          </button>
        </motion.nav>
      </header>

      {/* ── Mobile overlay ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/96 dark:bg-zinc-950/96 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:text-accent transition-colors"
            >
              <i className="bx bx-x text-xl" />
            </motion.button>

            {/* Links */}
            <ul className="flex flex-col items-stretch gap-1.5 w-full max-w-xs px-6">
              {sectionLinks.map(({ id, label }, i) => {
                const active = isHome && activeNav === id
                return (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                  >
                    <a
                      href={isHome ? `#${id}` : `/#${id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        active
                          ? 'bg-accent/10 text-accent'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {label}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                    </a>
                  </motion.li>
                )
              })}
              {pageLinks.map(({ href, label }, i) => {
                const active = pathname.startsWith(href)
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + (sectionLinks.length + i) * 0.04 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        active
                          ? 'bg-accent/10 text-accent'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {label}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* Resume */}
            <motion.a
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              href="/rahyan-akil-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-accent text-white font-semibold text-sm shadow-xl shadow-accent/30 hover:bg-accent/85 transition-all"
            >
              Download Resume
              <i className="bx bx-link-external text-sm" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Command Palette ───────────────────────────── */}
      <AnimatePresence>
        {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function Sep() {
  return <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700/80 mx-1.5 flex-shrink-0" />
}

function ActivePill() {
  return (
    <motion.span
      layoutId="activeNavPill"
      className="absolute inset-0 bg-accent rounded-xl"
      style={{ zIndex: -1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
    />
  )
}
