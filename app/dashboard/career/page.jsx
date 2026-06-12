'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { AnimatePresence, motion } from 'framer-motion'

const TYPE_COLOR = {
  work: 'text-accent border-accent/30 bg-accent/10',
  education: 'text-[#a06bff] border-[rgba(160,107,255,0.28)] bg-[rgba(160,107,255,0.08)]',
  cert: 'text-[#00e56b] border-[rgba(0,229,107,0.28)] bg-[rgba(0,229,107,0.08)]',
}

const EMPTY = { hash: '', type: 'work', org: '', role: '', period: '', location: '', context: '', color: '#f91460', icon: '⬡', commits: '', order: 0 }

export default function CareerPage() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saveState, setSaveState] = useState('idle')

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['career-admin'],
    queryFn: () => api.get('/api/v1/career').then((r) => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (d) => api.post('/api/v1/career/admin', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['career-admin'] }); closeForm() },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/v1/career/admin/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['career-admin'] }); closeForm() },
  })
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/v1/career/admin/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['career-admin'] }),
  })

  function openNew() { setForm(EMPTY); setEditing('new'); setSaveState('idle') }
  function openEdit(e) {
    setForm({ ...e, commits: Array.isArray(e.commits) ? e.commits.join('\n') : e.commits })
    setEditing(e._id)
    setSaveState('idle')
  }
  function closeForm() { setEditing(null); setSaveState('idle') }
  const f = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  async function handleSave(e) {
    e.preventDefault()
    setSaveState('saving')
    const payload = { ...form, commits: form.commits ? form.commits.split('\n').map((s) => s.trim()).filter(Boolean) : [] }
    try {
      if (editing === 'new') await createMutation.mutateAsync(payload)
      else await updateMutation.mutateAsync({ id: editing, data: payload })
      setSaveState('saved')
    } catch {
      setSaveState('error')
    }
  }

  const inputCls = 'w-full bg-os-panel border border-os-border rounded px-3 py-2 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors'
  const labelCls = 'block font-mono text-[10px] text-os-text-dim mb-1 tracking-wider'

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="section-id mb-1">04 / CAREER LOG</div>
          <h1 className="font-grotesk text-2xl font-bold text-os-text">Career Log Manager</h1>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-accent text-white font-grotesk font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors">
          + NEW ENTRY
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {isLoading ? (
          [1, 2, 3].map((i) => <div key={i} className="os-panel p-4 animate-pulse h-16" />)
        ) : entries.map((entry) => (
          <div key={entry._id} className="os-panel p-4 flex items-center gap-4">
            <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-os-void border border-os-border text-os-text-muted shrink-0">{entry.hash}</code>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded border shrink-0 ${TYPE_COLOR[entry.type] || TYPE_COLOR.work}`}>{entry.type.toUpperCase()}</span>
            <div className="flex-1 min-w-0">
              <div className="font-grotesk text-sm font-semibold text-os-text truncate">{entry.org}</div>
              <div className="font-mono text-[10px] text-os-text-muted">{entry.role} · {entry.period}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openEdit(entry)}
                className="font-mono text-[11px] text-os-text-muted hover:text-accent px-2 py-1 border border-os-border hover:border-accent rounded transition-colors"
              >EDIT</button>
              <button
                onClick={() => { if (confirm(`Delete ${entry.org}?`)) deleteMutation.mutate(entry._id) }}
                className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors"
              >DEL</button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-os-bg/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeForm() }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-xl"
            >
              <div className="terminal">
                <div className="terminal-titlebar">
                  <div className="t-dot bg-red-400/70" />
                  <div className="t-dot bg-yellow-400/70" />
                  <div className="t-dot bg-green-400/70" />
                  <span className="ml-2 font-mono text-[11px] text-os-text-muted">
                    {editing === 'new' ? '$ career --create' : '$ career --edit'}
                  </span>
                  <button onClick={closeForm} className="ml-auto font-mono text-[11px] text-os-text-muted hover:text-accent">✕</button>
                </div>

                <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>› commit hash:</label>
                      <input value={form.hash} onChange={f('hash')} required className={inputCls} placeholder="a3f2b1c" />
                    </div>
                    <div>
                      <label className={labelCls}>› type:</label>
                      <select value={form.type} onChange={f('type')} className={inputCls}>
                        <option value="work">WORK</option>
                        <option value="education">EDUCATION</option>
                        <option value="cert">CERTIFICATE</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>› organization:</label>
                    <input value={form.org} onChange={f('org')} required className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>› role / title:</label>
                    <input value={form.role} onChange={f('role')} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>› period:</label>
                      <input value={form.period} onChange={f('period')} className={inputCls} placeholder="Jan 2024 – Dec 2024" />
                    </div>
                    <div>
                      <label className={labelCls}>› location:</label>
                      <input value={form.location} onChange={f('location')} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>› context:</label>
                    <input value={form.context} onChange={f('context')} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>› color:</label>
                      <input value={form.color} onChange={f('color')} className={inputCls} placeholder="#f91460" />
                    </div>
                    <div>
                      <label className={labelCls}>› icon:</label>
                      <input value={form.icon} onChange={f('icon')} className={inputCls} placeholder="⬡" />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>› commits (one per line):</label>
                    <textarea
                      value={form.commits}
                      onChange={f('commits')}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder={'Built REST API with Express\nImplemented JWT auth'}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>› order:</label>
                    <input type="number" value={form.order} onChange={f('order')} className={inputCls} />
                  </div>

                  {saveState === 'error' && (
                    <div className="py-2 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">⚠ Save failed.</div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saveState === 'saving'}
                      className="flex-1 py-2.5 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60"
                    >
                      {saveState === 'saving' ? 'Saving...' : '› SAVE ENTRY'}
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-6 py-2.5 border border-os-border text-os-text-muted font-grotesk text-sm rounded hover:border-os-border-bright transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
