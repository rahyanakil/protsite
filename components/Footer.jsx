'use client'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Qualification', href: '#qualification' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { href: 'https://github.com/rahyanakil', icon: 'bxl-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rahyanshamsi/', icon: 'bxl-linkedin', label: 'LinkedIn' },
  { href: 'https://twitter.com/Rahyan_Akil4', icon: 'bxl-twitter', label: 'Twitter' },
  { href: 'https://www.instagram.com/rahyan_akil/', icon: 'bxl-instagram', label: 'Instagram' },
  { href: 'https://www.facebook.com/rahyan.shamsiakil.1', icon: 'bxl-facebook', label: 'Facebook' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">

        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#home" className="text-xl font-bold gradient-text inline-block mb-3">
              Rahyan Akil
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Full-stack developer passionate about building beautiful, fast, and user-friendly web applications.
            </p>
            {/* Status */}
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-green-500 text-xs font-semibold">Open to opportunities</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-zinc-500 hover:text-accent transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Get in Touch</p>
            <div className="space-y-2">
              <a href="mailto:rahyanakil89@gmail.com" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors">
                <i className="bx bx-envelope text-base" />
                rahyanakil89@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/rahyanshamsi/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors">
                <i className="bxl bxl-linkedin text-base" />
                linkedin.com/in/rahyanshamsi
              </a>
              <a href="/rahyan-akil-resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-zinc-700 text-sm text-zinc-400 hover:border-accent hover:text-accent transition-colors">
                <i className="bx bx-download text-base" />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-accent hover:text-white transition-all duration-200 text-sm"
              >
                <i className={`bx ${icon}`} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600 text-center">
            &copy; {year} Rahyan Shamsi Akil. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
