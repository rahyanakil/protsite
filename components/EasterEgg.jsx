'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const COLORS = ['#f91460','#80032d','#fbbf24','#34d399','#60a5fa','#a78bfa','#fb923c']

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 7,
      vy: Math.random() * 5 + 2,
      size: Math.random() * 9 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.12,
    }))

    let rafId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        p.vy += p.gravity
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed
        if (p.y < canvas.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      })
      if (alive) rafId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-[9997] pointer-events-none" />
  )
}

export default function EasterEgg() {
  const [keysPressed, setKeysPressed] = useState([])
  const [found, setFound] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      setKeysPressed(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) setFound(true)
        return next
      })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const close = () => setFound(false)

  return (
    <>
      {found && <Confetti />}
      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-zinc-200 dark:border-zinc-700"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Easter Egg Unlocked!
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                You know the Konami Code — you&apos;re clearly a real developer.<br />
                I like you already. 😄
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-6 border-l-2 border-accent/40 pl-3 text-left">
                &ldquo;Any sufficiently advanced technology is indistinguishable from magic.&rdquo;<br />
                — Arthur C. Clarke
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="#contact"
                  onClick={close}
                  className="px-5 py-2 bg-accent text-white rounded-full text-sm font-bold shadow-lg shadow-accent/25"
                >
                  Hire this dev →
                </a>
                <button
                  onClick={close}
                  className="px-5 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 rounded-full text-sm font-medium"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
