'use client'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export default function ProfilePage() {
  const qc = useQueryClient()
  const [form, setForm] = useState(null)
  const [saveState, setSaveState] = useState('idle')

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/api/v1/profile').then(r => r.data),
  })

  useEffect(() => { if (data) setForm(data) }, [data])

  const mutation = useMutation({
    mutationFn: (body) => api.put('/api/v1/profile/admin', body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['profile'] }); setSaveState('saved') },
    onError: () => setSaveState('error'),
  })

  if (isLoading || !form) {
    return (
      <div className="space-y-4">
        <div className="section-id mb-2">01 / PROFILE</div>
        <div className="os-panel p-6 animate-pulse space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-4 bg-os-border rounded" />)}
        </div>
      </div>
    )
  }

  const inputCls = 'w-full bg-os-panel border border-os-border rounded px-3 py-2 font-mono text-sm text-os-text placeholder:text-os-text-dim focus:outline-none focus:border-accent transition-colors'
  const labelCls = 'block font-mono text-[10px] text-os-text-dim mb-1 tracking-wider'

  // ─── Array helpers ───
  function setArr(field, idx, key, value) {
    setForm(p => ({ ...p, [field]: (p[field] || []).map((item, i) => i === idx ? { ...item, [key]: value } : item) }))
  }
  function addRow(field, template) {
    setForm(p => ({ ...p, [field]: [...(p[field] || []), template] }))
  }
  function removeRow(field, idx) {
    setForm(p => ({ ...p, [field]: (p[field] || []).filter((_, i) => i !== idx) }))
  }
  function moveRow(field, idx, dir) {
    const arr = [...(form[field] || [])]
    const target = idx + dir
    if (target < 0 || target >= arr.length) return
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    setForm(p => ({ ...p, [field]: arr }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaveState('saving')
    mutation.mutate(form)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="section-id mb-1">01 / PROFILE</div>
        <h1 className="font-grotesk text-2xl font-bold text-os-text">Profile Editor</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* ─── HERO CONTENT ─── */}
        <div className="os-panel p-5 space-y-4">
          <div className="label-mono mb-2">HERO CONTENT</div>
          <div>
            <label className={labelCls}>› headline:</label>
            <input value={form.headline || ''} onChange={e => setForm(p => ({ ...p, headline: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>› subheadline:</label>
            <input value={form.subheadline || ''} onChange={e => setForm(p => ({ ...p, subheadline: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>› location:</label>
            <input value={form.location || ''} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className={inputCls} />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-mono text-[11px] text-os-text-muted">Open to Work:</label>
            <input type="checkbox" checked={form.openToWork || false} onChange={e => setForm(p => ({ ...p, openToWork: e.target.checked }))} className="w-4 h-4 accent-[#f91460]" />
          </div>
        </div>

        {/* ─── BIO PARAGRAPHS ─── */}
        <div className="os-panel p-5 space-y-3">
          <div className="label-mono mb-2">BIO PARAGRAPHS</div>
          {(form.bio || []).map((para, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={para}
                onChange={e => setForm(p => ({ ...p, bio: p.bio.map((b, j) => j === i ? e.target.value : b) }))}
                rows={3}
                className={`${inputCls} resize-none flex-1`}
              />
              <button type="button" onClick={() => removeRow('bio', i)} className="px-2 font-mono text-[11px] text-os-text-dim hover:text-red-400 border border-os-border hover:border-red-400/50 rounded transition-colors self-start py-2">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setForm(p => ({ ...p, bio: [...(p.bio || []), ''] }))} className="font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Paragraph
          </button>
        </div>

        {/* ─── IDENTITY TERMINAL (MissionControl $ identify --verbose) ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">IDENTITY ROWS — MissionControl terminal</div>
          <div className="space-y-2">
            {(form.identityRows || []).map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr_auto_auto_auto] gap-2 items-center">
                <input value={row.key || ''} onChange={e => setArr('identityRows', i, 'key', e.target.value)} placeholder="key" className={`${inputCls} text-[12px] py-1.5`} />
                <input value={row.val || ''} onChange={e => setArr('identityRows', i, 'val', e.target.value)} placeholder="value" className={`${inputCls} text-[12px] py-1.5`} />
                <label className="flex items-center gap-1 font-mono text-[10px] text-accent cursor-pointer whitespace-nowrap">
                  <input type="checkbox" checked={row.accent || false} onChange={e => setArr('identityRows', i, 'accent', e.target.checked)} className="accent-[#f91460]" /> A
                </label>
                <label className="flex items-center gap-1 font-mono text-[10px] text-os-green cursor-pointer whitespace-nowrap">
                  <input type="checkbox" checked={row.green || false} onChange={e => setArr('identityRows', i, 'green', e.target.checked)} className="accent-[#00e56b]" /> G
                </label>
                <button type="button" onClick={() => removeRow('identityRows', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('identityRows', { key: '', val: '', accent: false, green: false })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Row
          </button>
        </div>

        {/* ─── SYSTEM FACTS (SystemOverview $ cat /proc/rahyan/identity) ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">SYSTEM FACTS — SystemOverview terminal</div>
          <div className="space-y-2">
            {(form.systemFacts || []).map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr_auto_auto] gap-2 items-center">
                <input value={row.k || ''} onChange={e => setArr('systemFacts', i, 'k', e.target.value)} placeholder="k" className={`${inputCls} text-[12px] py-1.5`} />
                <input value={row.v || ''} onChange={e => setArr('systemFacts', i, 'v', e.target.value)} placeholder="v" className={`${inputCls} text-[12px] py-1.5`} />
                <label className="flex items-center gap-1 font-mono text-[10px] text-accent cursor-pointer whitespace-nowrap">
                  <input type="checkbox" checked={row.accent || false} onChange={e => setArr('systemFacts', i, 'accent', e.target.checked)} className="accent-[#f91460]" /> A
                </label>
                <button type="button" onClick={() => removeRow('systemFacts', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('systemFacts', { k: '', v: '', accent: false })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Fact
          </button>
        </div>

        {/* ─── STATS GRID ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">STATS GRID — hero stat cards</div>
          <div className="space-y-2">
            {(form.stats || []).map((stat, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr_auto] gap-2 items-center">
                <input value={stat.num || ''} onChange={e => setArr('stats', i, 'num', e.target.value)} placeholder="3+" className={`${inputCls} text-[12px] py-1.5`} />
                <input value={stat.label || ''} onChange={e => setArr('stats', i, 'label', e.target.value)} placeholder="Years" className={`${inputCls} text-[12px] py-1.5`} />
                <button type="button" onClick={() => removeRow('stats', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('stats', { num: '', label: '' })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Stat
          </button>
        </div>

        {/* ─── ACTIVE PROCESSES ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">ACTIVE PROCESSES — hero process cards</div>
          <div className="space-y-4">
            {(form.activeProcesses || []).map((proc, i) => (
              <div key={i} className="os-panel p-4 space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-os-text-dim">PROCESS {i + 1}</span>
                  <button type="button" onClick={() => removeRow('activeProcesses', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 transition-colors">✕ Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>pid:</label>
                    <input value={proc.pid || ''} onChange={e => setArr('activeProcesses', i, 'pid', e.target.value)} placeholder="PID-001" className={`${inputCls} text-[12px] py-1.5`} />
                  </div>
                  <div>
                    <label className={labelCls}>tag:</label>
                    <input value={proc.tag || ''} onChange={e => setArr('activeProcesses', i, 'tag', e.target.value)} placeholder="BUILDING" className={`${inputCls} text-[12px] py-1.5`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>name:</label>
                  <input value={proc.name || ''} onChange={e => setArr('activeProcesses', i, 'name', e.target.value)} placeholder="Project Name" className={`${inputCls} text-[12px] py-1.5`} />
                </div>
                <div>
                  <label className={labelCls}>link:</label>
                  <input value={proc.link || ''} onChange={e => setArr('activeProcesses', i, 'link', e.target.value)} placeholder="https://..." className={`${inputCls} text-[12px] py-1.5`} />
                </div>
                <div>
                  <label className={labelCls}>desc:</label>
                  <input value={proc.desc || ''} onChange={e => setArr('activeProcesses', i, 'desc', e.target.value)} placeholder="Short description" className={`${inputCls} text-[12px] py-1.5`} />
                </div>
                <div>
                  <label className={labelCls}>tagColor (Tailwind classes):</label>
                  <input value={proc.tagColor || ''} onChange={e => setArr('activeProcesses', i, 'tagColor', e.target.value)} placeholder="text-[#00e56b] border-[rgba(0,229,107,0.3)] bg-[rgba(0,229,107,0.08)]" className={`${inputCls} text-[11px] py-1.5`} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('activeProcesses', { pid: '', name: '', desc: '', tag: '', link: '', tagColor: '' })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Process
          </button>
        </div>

        {/* ─── OPERATING PRINCIPLES ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">OPERATING PRINCIPLES — about section values</div>
          <div className="space-y-3">
            {(form.operatingPrinciples || []).map((v, i) => (
              <div key={i} className="os-panel p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-os-text-dim">PRINCIPLE {i + 1}</span>
                  <button type="button" onClick={() => removeRow('operatingPrinciples', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 transition-colors">✕</button>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-2">
                  <input value={v.icon || ''} onChange={e => setArr('operatingPrinciples', i, 'icon', e.target.value)} placeholder="⌁" className={`${inputCls} text-[12px] py-1.5`} />
                  <input value={v.title || ''} onChange={e => setArr('operatingPrinciples', i, 'title', e.target.value)} placeholder="Title" className={`${inputCls} text-[12px] py-1.5`} />
                </div>
                <textarea value={v.desc || ''} onChange={e => setArr('operatingPrinciples', i, 'desc', e.target.value)} rows={2} placeholder="Description" className={`${inputCls} resize-none text-[12px] py-1.5`} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('operatingPrinciples', { icon: '', title: '', desc: '' })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Principle
          </button>
        </div>

        {/* ─── STACK LAYERS ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">STACK LAYERS — about section tech stack</div>
          <div className="space-y-3">
            {(form.stackLayers || []).map((layer, i) => (
              <div key={i} className="os-panel p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px]" style={{ color: layer.color || '#f91460' }}>{layer.label || 'LAYER'}</span>
                  <button type="button" onClick={() => removeRow('stackLayers', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 transition-colors">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input value={layer.label || ''} onChange={e => setArr('stackLayers', i, 'label', e.target.value)} placeholder="INTERFACE" className={`${inputCls} text-[12px] py-1.5`} />
                  <input value={layer.color || ''} onChange={e => setArr('stackLayers', i, 'color', e.target.value)} placeholder="#f91460" className={`${inputCls} text-[12px] py-1.5`} />
                </div>
                <div>
                  <label className={labelCls}>items (comma-separated):</label>
                  <input
                    value={Array.isArray(layer.items) ? layer.items.join(', ') : (layer.items || '')}
                    onChange={e => setArr('stackLayers', i, 'items', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}
                    placeholder="Next.js, React, TypeScript"
                    className={`${inputCls} text-[12px] py-1.5`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('stackLayers', { label: '', items: [], color: '#f91460' })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Layer
          </button>
        </div>

        {/* ─── CURRENTLY BUILDING ─── */}
        <div className="os-panel p-5 space-y-4">
          <div className="label-mono mb-2">CURRENTLY BUILDING — about section card</div>
          <div>
            <label className={labelCls}>› name:</label>
            <input value={form.currentlyBuilding?.name || ''} onChange={e => setForm(p => ({ ...p, currentlyBuilding: { ...(p.currentlyBuilding || {}), name: e.target.value } }))} className={inputCls} placeholder="SkillBridge" />
          </div>
          <div>
            <label className={labelCls}>› desc:</label>
            <input value={form.currentlyBuilding?.desc || ''} onChange={e => setForm(p => ({ ...p, currentlyBuilding: { ...(p.currentlyBuilding || {}), desc: e.target.value } }))} className={inputCls} placeholder="AI tutoring · Groq Llama 3.3 · Stripe" />
          </div>
          <div>
            <label className={labelCls}>› link:</label>
            <input value={form.currentlyBuilding?.link || ''} onChange={e => setForm(p => ({ ...p, currentlyBuilding: { ...(p.currentlyBuilding || {}), link: e.target.value } }))} className={inputCls} placeholder="https://..." />
          </div>
        </div>

        {/* ─── SOCIAL LINKS ─── */}
        <div className="os-panel p-5">
          <div className="label-mono mb-3">SOCIAL LINKS — hero command links</div>
          <div className="space-y-2">
            {(form.social || []).map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                <input value={s.label || ''} onChange={e => setArr('social', i, 'label', e.target.value)} placeholder="$ open github" className={`${inputCls} text-[12px] py-1.5`} />
                <input value={s.href || ''} onChange={e => setArr('social', i, 'href', e.target.value)} placeholder="https://..." className={`${inputCls} text-[12px] py-1.5`} />
                <button type="button" onClick={() => removeRow('social', i)} className="font-mono text-[11px] text-os-text-dim hover:text-red-400 px-2 py-1 border border-os-border hover:border-red-400/50 rounded transition-colors">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addRow('social', { label: '', href: '' })} className="mt-3 font-mono text-[11px] text-os-text-muted hover:text-accent border border-os-border hover:border-accent rounded px-3 py-1.5 transition-colors">
            + Add Link
          </button>
        </div>

        {saveState === 'error' && (
          <div className="py-2 px-3 font-mono text-xs text-os-amber border border-os-amber/30 rounded bg-os-amber/5">⚠ Save failed. Check API connection.</div>
        )}

        <button
          type="submit"
          disabled={saveState === 'saving'}
          className="px-8 py-3 bg-accent text-white font-grotesk font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-60"
        >
          {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? '✓ Saved' : '› SAVE PROFILE'}
        </button>
      </form>
    </div>
  )
}
