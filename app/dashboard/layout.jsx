'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { href: '/dashboard', label: 'OVERVIEW', num: '00' },
  { href: '/dashboard/profile', label: 'PROFILE', num: '01' },
  { href: '/dashboard/projects', label: 'PROJECTS', num: '02' },
  { href: '/dashboard/skills', label: 'SKILLS', num: '03' },
  { href: '/dashboard/career', label: 'CAREER LOG', num: '04' },
]

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  function logout() {
    document.cookie = 'rahyan-os-token=; path=/; max-age=0'
    localStorage.removeItem('rahyan-os-token')
    router.push('/dashboard/login')
  }

  return (
    <div className="min-h-screen bg-os-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-52 z-40 flex-col border-r border-os-border os-glass-nav">
        <div className="px-5 py-5 border-b border-os-border">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-mono text-[11px] text-accent font-bold tracking-[0.2em]">CMS PANEL</span>
          </div>
          <div className="font-mono text-[10px] text-os-text-muted tracking-wider">RAHYAN-OS · ADMIN</div>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="label-mono mb-3 px-2">MODULES</div>
          {NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/10 border border-accent/25'
                    : 'border border-transparent hover:bg-os-panel hover:border-os-border'
                }`}
              >
                <span className={`font-mono text-[10px] shrink-0 ${isActive ? 'text-accent' : 'text-os-text-dim'}`}>{item.num}</span>
                <span className={`font-mono text-[11px] tracking-wide ${isActive ? 'text-accent' : 'text-os-text-muted'}`}>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
              </Link>
            )
          })}
        </nav>

        <div className="px-5 py-4 border-t border-os-border">
          <button
            onClick={logout}
            className="w-full py-2 border border-os-border rounded font-mono text-[11px] text-os-text-muted hover:border-accent hover:text-accent transition-colors"
          >
            LOGOUT ↗
          </button>
          <Link
            href="/"
            className="block mt-2 text-center font-mono text-[10px] text-os-text-dim hover:text-accent transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="xl:hidden fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-4 os-glass-nav border-b border-os-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-accent font-bold tracking-[0.2em]">CMS PANEL</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="font-mono text-[11px] text-os-text-muted hover:text-accent">
          {mobileOpen ? '✕ CLOSE' : '☰ MENU'}
        </button>
      </header>

      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-30 bg-os-bg/95 pt-12 flex flex-col">
          <nav className="flex-1 p-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-lg border border-os-border hover:border-os-border-bright hover:bg-os-panel text-os-text-muted hover:text-os-text font-mono text-sm transition-all"
              >
                <span className="text-os-text-dim text-[11px]">{item.num}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-os-border">
            <button onClick={logout} className="w-full py-2.5 border border-os-border rounded font-mono text-sm text-os-text-muted hover:text-accent transition-colors">
              LOGOUT
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="xl:ml-52 pt-12 xl:pt-0 flex-1 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
