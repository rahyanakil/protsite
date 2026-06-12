'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { AnimatePresence, motion } from 'framer-motion'

function fromComma(s) { return String(s || '').split(',').map(x => x.trim()).filter(Boolean) }
function fromLines(s) { return String(s || '').split('\n').map(x => x.trim()).filter(Boolean) }
function joinComma(arr) { return Array.isArray(arr) ? arr.join(', ') : (arr || '') }
function joinLines(arr) { return Array.isArray(arr) ? arr.join('\n') : (arr || '') }

const EMPTY_LAYER  = { id: '', label: '', desc: '', color: '#f91460', expert: '', familiar: '' }
const EMPTY_DOMAIN = { num: '', title: '', icon: '⬡', color: '#f91460', desc: '', delivers: '', tags: '' }

export default function SkillsPage() {
  const qc = useQueryClient()
  const [tab, setTab] = useState('layers')
  const [modal, setModal] = useState(null)        // null | { type: 'layer'|'domain', idx: 'new'|number }
  const [layerForm, setLayerForm] = useState(EMPTY_LAYER)
  const [domainForm, setDomainForm] = useState(EMPTY_DOMAIN)
  const [saveState, setSaveState] = useState('idle')

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ['skills-admin'],
    queryFn: () => api.get('/api/v1/skills').then(r => r.data),
  })

  const layers  = skillsData?.layers  || []
  const domains = skillsData?.domains || []

  const mutation = useMutation({
    mutationFn: (body) => api.put('/api/v1/skills/admin', body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['skills-admin'] }); setSaveState('idle'); closeModal() },
    onError: () => setSaveState('error'),
  })

  function closeModal() { setModal(null); setSaveState('idle') }

  // ─── Layer actions ───
  function openNewLayer() { setLayerForm(EMPTY_LAYER); setModal({ type: 'layer', idx: 'new' }) }
  function openEditLayer(idx) {
    const l = layers[idx]
    setLayerForm({ ...l, expert: joinComma(l.expert), familiar: joinComma(l.familiar) })
    setModal({ type: 'layer', idx })
  }
  function handleDeleteLayer(idx) {
    if (!confirm(`Remove layer "${layers[idx].label}"?`)) return
    const updated = layers.filter((_, i) => i !== idx)
    mutation.mutate({ layers: updated, domains })
  }
  function handleSaveLayer(e) {
    e.preventDefault()
    setSaveState('saving')
    const parsed = { ...layerForm, expert: fromComma(layerForm.expert), familiar: fromComma(layerForm.familiar) }
    const updated = modal.idx === 'new'
      ? [...layers, parsed]
      : layers.map((l, i) => i === modal.idx ? parsed : l)
    mutation.mutate({ layers: updated, domains })
  }

  // ─── Domain actions ───
  function openNewDomain() { setDomainForm(EMPTY_DOMAIN); setModal({ type: 'domain', idx: 'new' }) }
  function openEditDomain(idx) {
    const d = domains[idx]
    setDomainForm({ ...d, delivers: joinLines(d.delivers), tags: joinComma(d.tags) })
    setModal({ type: 'domain', idx })
  }
  function handleDeleteDomain(idx) {
    if (!confirm(`Remove domain "${domains[idx].title}"?`)) return
    const updated = domains.filter((_, i) => i !== idx)
    mutation.mutate({ layers, domains: updated })
  }
  function handleSaveDomain(e) {
    e.preventDefault()
    setSaveState('saving')
    const parsed = { ...domainForm, delivers: fromLines(domainForm.delivers), tags: fromComma(domainForm.tags) }
    const updated = modal.idx === 'new'
      ? [...domains, parsed]
      : domains.map((d, i) => i === modal.idx ? parsed : d)
    mutation.mutate({ layers, domains: updated })
  }

  const inputCls = 'w-full bg-os-panel border border-os-border rounded px-3 py-2 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors'
  const labelCls = 'block font-mono text-[10px] text-os-text-dim mb-1 tracking-wider'
  const lf = (k) => (e) => setLayerForm(p => ({ ...p, [k]: e.target.value }))
  const df = (k) => (e) => setDomainForm(p => ({ ...p, [k]: e.target.value }))

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="section-id mb-2">03 / SKILLS MATRIX</div>
        <div className="os-panel p-6 animate-pulse space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-4 bg-os-border rounded" />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="section-id mb-1">03 / SKILLS MATRIX</div>
        <h1 className="font-grotesk text-2xl font-bold text-os-text">Skills Editor</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['layers', 'domains'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded border font-mono text-[11px] tracking-wider transition-all ${
              tab === t
                ? 'bg-accent/10 border-accent/30 text-accent'
                : 'border-os-border text-os-text-muted hover:border-os-border-bright hover:text-os-text'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ─── LAYERS ─── */}
      {tab === 'layers' && (
        <div className="space-y-2">
          {layers.map((layer, idx) => (
            <div key={idx} className="os-panel p-4 flex items-center gap-4" style={{ borderLeftWidth: 3, borderLeftColor: layer.color }}>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] tracking-wider mb-0.5" style={{ color: layer.color }}>{layer.label}</div>
                <div className="font-grotesk text-xs text-os-text-muted truncate">{layer.desc}</div>
                <div className="font-mono text-[10px] text-os-text-dim mt-1">
                  {(layer.expert || []).length} expert · {(layer.familiar || []).length} proficient
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEditLayer(idx)} className="font-mono text-[11px] text-os-text-muted hover:text-accent px-2 py-1 border border-os-border hover:border-accent rounded transition-colors">EDIT</button>
                <button onClick={() => handleDeleteLayer(idx)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">DEL</button>
              </div>
            </div>
          ))}
          <button
            onClick={openNewLayer}
            className="w-full py-3 border border-dashed border-os-border text-os-text-muted font-mono text-[11px] hover:border-accent hover:text-accent rounded-lg transition-colors"
          >
            + ADD LAYER
          </button>
        </div>
      )}

      {/* ─── DOMAINS ─── */}
      {tab === 'domains' && (
        <div className="space-y-2">
          {domains.map((domain, idx) => (
            <div key={idx} className="os-panel p-4 flex items-center gap-4" style={{ borderLeftWidth: 3, borderLeftColor: domain.color }}>
              <span className="font-mono text-xl shrink-0" style={{ color: domain.color }}>{domain.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-os-text-dim">{domain.num}</span>
                  <span className="font-grotesk text-sm font-semibold text-os-text truncate">{domain.title}</span>
                </div>
                <div className="font-grotesk text-xs text-os-text-muted truncate">{domain.desc}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEditDomain(idx)} className="font-mono text-[11px] text-os-text-muted hover:text-accent px-2 py-1 border border-os-border hover:border-accent rounded transition-colors">EDIT</button>
                <button onClick={() => handleDeleteDomain(idx)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">DEL</button>
              </div>
            </div>
          ))}
          <button
            onClick={openNewDomain}
            className="w-full py-3 border border-dashed border-os-border text-os-text-muted font-mono text-[11px] hover:border-accent hover:text-accent rounded-lg transition-colors"
          >
            + ADD DOMAIN
          </button>
        </div>
      )}

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-os-bg/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={e => { if (e.target === e.currentTarget) closeModal() }}
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
                    {modal.idx === 'new'
                      ? `$ skills --add-${modal.type}`
                      : `$ skills --edit-${modal.type}`}
                  </span>
                  <button onClick={closeModal} className="ml-auto font-mono text-[11px] text-os-text-muted hover:text-accent">✕</button>
                </div>

                {/* ─── Layer form ─── */}
                {modal.type === 'layer' && (
                  <form onSubmit={handleSaveLayer} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>› id:</label>
                        <input value={layerForm.id} onChange={lf('id')} required className={inputCls} placeholder="ui" />
                      </div>
                      <div>
                        <label className={labelCls}>› color:</label>
                        <input value={layerForm.color} onChange={lf('color')} className={inputCls} placeholder="#f91460" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>› label:</label>
                      <input value={layerForm.label} onChange={lf('label')} required className={inputCls} placeholder="APPLICATION LAYER" />
                    </div>
                    <div>
                      <label className={labelCls}>› desc:</label>
                      <input value={layerForm.desc} onChange={lf('desc')} className={inputCls} placeholder="What users see and interact with" />
                    </div>
                    <div>
                      <label className={labelCls}>› expert (comma-separated):</label>
                      <input value={layerForm.expert} onChange={lf('expert')} className={inputCls} placeholder="Next.js, React, TypeScript" />
                    </div>
                    <div>
                      <label className={labelCls}>› proficient (comma-separated):</label>
                      <input value={layerForm.familiar} onChange={lf('familiar')} className={inputCls} placeholder="Redux, shadcn/ui" />
                    </div>
                    {saveState === 'error' && (
                      <div className="py-2 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">⚠ Save failed.</div>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button type="submit" disabled={saveState === 'saving'} className="flex-1 py-2.5 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60">
                        {saveState === 'saving' ? 'Saving...' : modal.idx === 'new' ? '+ ADD LAYER' : '› SAVE LAYER'}
                      </button>
                      <button type="button" onClick={closeModal} className="px-6 py-2.5 border border-os-border text-os-text-muted font-grotesk text-sm rounded hover:border-os-border-bright transition-colors">Cancel</button>
                    </div>
                  </form>
                )}

                {/* ─── Domain form ─── */}
                {modal.type === 'domain' && (
                  <form onSubmit={handleSaveDomain} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>› num:</label>
                        <input value={domainForm.num} onChange={df('num')} className={inputCls} placeholder="01" />
                      </div>
                      <div>
                        <label className={labelCls}>› icon:</label>
                        <input value={domainForm.icon} onChange={df('icon')} className={inputCls} placeholder="⬡" />
                      </div>
                      <div>
                        <label className={labelCls}>› color:</label>
                        <input value={domainForm.color} onChange={df('color')} className={inputCls} placeholder="#f91460" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>› title:</label>
                      <input value={domainForm.title} onChange={df('title')} required className={inputCls} placeholder="Full-Stack Development" />
                    </div>
                    <div>
                      <label className={labelCls}>› desc:</label>
                      <textarea value={domainForm.desc} onChange={df('desc')} rows={2} className={`${inputCls} resize-none`} placeholder="Short description of this expertise area" />
                    </div>
                    <div>
                      <label className={labelCls}>› delivers (one per line):</label>
                      <textarea value={domainForm.delivers} onChange={df('delivers')} rows={4} className={`${inputCls} resize-none`} placeholder={'Next.js App Router with SSR\nStripe-gated flows\n...'} />
                    </div>
                    <div>
                      <label className={labelCls}>› tags (comma-separated):</label>
                      <input value={domainForm.tags} onChange={df('tags')} className={inputCls} placeholder="Next.js, React, Node.js" />
                    </div>
                    {saveState === 'error' && (
                      <div className="py-2 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">⚠ Save failed.</div>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button type="submit" disabled={saveState === 'saving'} className="flex-1 py-2.5 bg-accent text-white font-grotesk font-semibold text-sm rounded hover:bg-accent/90 transition-colors disabled:opacity-60">
                        {saveState === 'saving' ? 'Saving...' : modal.idx === 'new' ? '+ ADD DOMAIN' : '› SAVE DOMAIN'}
                      </button>
                      <button type="button" onClick={closeModal} className="px-6 py-2.5 border border-os-border text-os-text-muted font-grotesk text-sm rounded hover:border-os-border-bright transition-colors">Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
