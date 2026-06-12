'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [state, setState] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setState('loading')
    setError('')
    try {
      const res = await api.post('/api/v1/auth/login', form)
      // Save to localStorage (for API client Authorization header)
      localStorage.setItem('rahyan-os-token', res.token)
      // Save to cookie (for Next.js middleware protection)
      document.cookie = `rahyan-os-token=${res.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed.')
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-os-bg os-grid flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="terminal shadow-2xl">
          <div className="terminal-titlebar">
            <div className="t-dot bg-red-400/70" />
            <div className="t-dot bg-yellow-400/70" />
            <div className="t-dot bg-green-400/70" />
            <span className="ml-2 font-mono text-[11px] text-os-text-muted">$ sudo cms --authenticate</span>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="section-id mb-2">CMS / AUTHENTICATION</div>
              <h1 className="font-grotesk text-2xl font-bold text-os-text">Admin Access</h1>
              <p className="font-mono text-[11px] text-os-text-muted mt-1">RAHYAN-OS Control Panel · Restricted</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-os-text-dim mb-1.5 tracking-wider">› email_address:</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-os-panel border border-os-border rounded px-3 py-2.5 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-os-text-dim mb-1.5 tracking-wider">› password:</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full bg-os-panel border border-os-border rounded px-3 py-2.5 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {state === 'error' && (
                <div className="py-2.5 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full py-3 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === 'loading' ? '› Authenticating...' : '› AUTHENTICATE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
