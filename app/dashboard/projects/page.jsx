'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, getSignedUploadUrl, uploadToCloudinary } from '@/lib/api'
import { AnimatePresence, motion } from 'framer-motion'

const EMPTY_FORM = {
  pid: '', title: '', subtitle: '', status: 'DEPLOYED', statusColor: '',
  problem: '', solution: '', outcome: '', stack: '', tags: '',
  live: '', github: '', order: 0, published: true,
}

function statusColorMap(status) {
  const map = {
    BUILDING: 'text-[#00e56b] border-[rgba(0,229,107,0.3)] bg-[rgba(0,229,107,0.08)]',
    DEPLOYED: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]',
    LIVE: 'text-[#f59e0b] border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)]',
    ARCHIVED: 'text-os-text-muted border-os-border bg-os-panel',
  }
  return map[status] || map.DEPLOYED
}

export default function ProjectsPage() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null) // null | 'new' | project._id
  const [form, setForm] = useState(EMPTY_FORM)
  const [uploading, setUploading] = useState(false)
  const [saveState, setSaveState] = useState('idle')

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects-admin'],
    queryFn: () => api.get('/api/v1/projects').then((r) => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/api/v1/projects/admin', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-admin'] })
      qc.invalidateQueries({ queryKey: ['projects'] })
      closeForm()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/v1/projects/admin/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-admin'] })
      qc.invalidateQueries({ queryKey: ['projects'] })
      closeForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/v1/projects/admin/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects-admin'] })
      qc.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  function openNew() {
    setForm({ ...EMPTY_FORM, pid: `PRJ-00${projects.length + 1}` })
    setEditing('new')
    setSaveState('idle')
  }

  function openEdit(p) {
    setForm({
      ...p,
      stack: Array.isArray(p.stack) ? p.stack.join(', ') : p.stack,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags,
    })
    setEditing(p._id)
    setSaveState('idle')
  }

  function closeForm() { setEditing(null); setSaveState('idle') }

  function f(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { data: signedData } = await getSignedUploadUrl('rahyan-os/projects')
      const { url } = await uploadToCloudinary({ file, signedData })
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), url] }))
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setUploading(false)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaveState('saving')
    const payload = {
      ...form,
      stack: form.stack ? form.stack.split(',').map((s) => s.trim()).filter(Boolean) : [],
      tags: form.tags ? form.tags.split(',').map((s) => s.trim()).filter(Boolean) : [],
      statusColor: statusColorMap(form.status),
    }
    try {
      if (editing === 'new') {
        await createMutation.mutateAsync(payload)
      } else {
        await updateMutation.mutateAsync({ id: editing, data: payload })
      }
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
          <div className="section-id mb-1">02 / PROJECTS</div>
          <h1 className="font-grotesk text-2xl font-bold text-os-text">Project Lab Manager</h1>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-accent text-white font-grotesk font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors">
          + NEW PROJECT
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="os-panel p-4 animate-pulse">
              <div className="h-4 bg-os-border rounded w-1/4 mb-2" />
              <div className="h-3 bg-os-border rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 mb-8">
          {projects.map((p) => (
            <div key={p._id} className="os-panel p-4 flex items-center gap-4 group">
              <span className="font-mono text-[10px] text-os-text-dim w-16 shrink-0">{p.pid}</span>
              <div className="flex-1 min-w-0">
                <div className="font-grotesk text-sm font-semibold text-os-text truncate">{p.title}</div>
                <div className="font-mono text-[10px] text-os-text-muted">{p.subtitle}</div>
              </div>
              <span className={`font-mono text-[9px] px-2 py-0.5 rounded border shrink-0 ${statusColorMap(p.status)}`}>{p.status}</span>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="font-mono text-[11px] text-os-text-muted hover:text-accent transition-colors px-2 py-1 border border-os-border hover:border-accent rounded">
                  EDIT
                </button>
                <button
                  onClick={() => { if (confirm(`Delete ${p.title}?`)) deleteMutation.mutate(p._id) }}
                  className="font-mono text-[11px] text-os-text-dim hover:text-red-400 transition-colors px-2 py-1 border border-os-border hover:border-red-400/50 rounded"
                >
                  DEL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              className="w-full max-w-2xl"
            >
              <div className="terminal">
                <div className="terminal-titlebar">
                  <div className="t-dot bg-red-400/70" />
                  <div className="t-dot bg-yellow-400/70" />
                  <div className="t-dot bg-green-400/70" />
                  <span className="ml-2 font-mono text-[11px] text-os-text-muted">
                    {editing === 'new' ? '$ projects --create' : `$ projects --edit ${form.pid}`}
                  </span>
                  <button onClick={closeForm} className="ml-auto font-mono text-[11px] text-os-text-muted hover:text-accent">✕</button>
                </div>

                <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>› PID:</label>
                      <input value={form.pid} onChange={f('pid')} required className={inputCls} placeholder="PRJ-001" />
                    </div>
                    <div>
                      <label className={labelCls}>› STATUS:</label>
                      <select value={form.status} onChange={f('status')} className={inputCls}>
                        {['BUILDING', 'DEPLOYED', 'LIVE', 'ARCHIVED'].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>› title:</label>
                    <input value={form.title} onChange={f('title')} required className={inputCls} placeholder="Project Title" />
                  </div>
                  <div>
                    <label className={labelCls}>› subtitle:</label>
                    <input value={form.subtitle} onChange={f('subtitle')} className={inputCls} placeholder="One-line description" />
                  </div>
                  <div>
                    <label className={labelCls}>› problem:</label>
                    <textarea value={form.problem} onChange={f('problem')} rows={3} className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>› solution:</label>
                    <textarea value={form.solution} onChange={f('solution')} rows={3} className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>› outcome:</label>
                    <textarea value={form.outcome} onChange={f('outcome')} rows={2} className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>› stack (comma-separated):</label>
                    <input value={form.stack} onChange={f('stack')} className={inputCls} placeholder="Next.js, TypeScript, MongoDB" />
                  </div>
                  <div>
                    <label className={labelCls}>› tags (comma-separated):</label>
                    <input value={form.tags} onChange={f('tags')} className={inputCls} placeholder="Next.js, TypeScript" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>› live URL:</label>
                      <input value={form.live} onChange={f('live')} className={inputCls} placeholder="https://..." />
                    </div>
                    <div>
                      <label className={labelCls}>› github URL:</label>
                      <input value={form.github} onChange={f('github')} className={inputCls} placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>› display order:</label>
                    <input type="number" value={form.order} onChange={f('order')} className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>› screenshots:</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(form.images || []).map((url, i) => (
                        <div key={i} className="relative group">
                          <img src={url} alt="" className="w-16 h-10 object-cover rounded border border-os-border" />
                          <button
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full hidden group-hover:flex items-center justify-center"
                          >✕</button>
                        </div>
                      ))}
                    </div>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border border-os-border rounded font-mono text-[11px] text-os-text-muted hover:border-accent hover:text-accent transition-colors">
                      {uploading ? 'Uploading...' : '+ Upload Image'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>

                  {saveState === 'error' && (
                    <div className="py-2 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">⚠ Save failed. Check console.</div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saveState === 'saving'}
                      className="flex-1 py-2.5 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60"
                    >
                      {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? '✓ Saved' : '› SAVE PROJECT'}
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
