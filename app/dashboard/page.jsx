'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const MODULES = [
  { href: '/dashboard/projects', label: 'PROJECTS', desc: 'Add, edit, and reorder case studies', color: '#f91460', num: '02' },
  { href: '/dashboard/profile', label: 'PROFILE', desc: 'Update bio, stats, active processes', color: '#00d4ff', num: '01' },
  { href: '/dashboard/skills', label: 'SKILLS MATRIX', desc: 'Manage stack layers and expertise domains', color: '#00e56b', num: '03' },
  { href: '/dashboard/career', label: 'CAREER LOG', desc: 'Edit git-log career timeline entries', color: '#a06bff', num: '04' },
]

export default function DashboardPage() {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/api/v1/projects').then((r) => r.data),
    staleTime: 60_000,
  })

  return (
    <div>
      <div className="mb-10">
        <div className="section-id mb-2">00 / CMS OVERVIEW</div>
        <h1 className="font-grotesk text-3xl font-bold text-os-text">Control Panel</h1>
        <p className="font-mono text-[12px] text-os-text-muted mt-1">RAHYAN-OS · Content Management System</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: 'PROJECTS', val: projects?.length ?? '—' },
          { label: 'SECTIONS', val: '6' },
          { label: 'STACK ITEMS', val: '20+' },
          { label: 'STATUS', val: 'LIVE' },
        ].map((s) => (
          <div key={s.label} className="os-panel px-4 py-3.5 text-center">
            <div className="font-grotesk text-2xl font-bold text-os-text mb-0.5">{s.val}</div>
            <div className="font-mono text-[10px] text-os-text-muted tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="label-mono mb-4">AVAILABLE MODULES</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {MODULES.map((m) => (
          <Link key={m.href} href={m.href} className="os-panel-hover p-5 group block">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px]" style={{ color: m.color }}>{m.num}</span>
              <span className="font-grotesk text-sm font-semibold text-os-text group-hover:text-accent transition-colors">{m.label}</span>
              <span className="ml-auto text-os-text-dim group-hover:text-accent transition-colors text-sm">→</span>
            </div>
            <p className="font-mono text-[11px] text-os-text-muted">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
