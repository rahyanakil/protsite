'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, { stiffness: 500, damping: 40 })
  const dotY = useSpring(my, { stiffness: 500, damping: 40 })
  const ringX = useSpring(mx, { stiffness: 150, damping: 22 })
  const ringY = useSpring(my, { stiffness: 150, damping: 22 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const over = (e) => {
      setHovering(!!e.target.closest('a,button,[role="button"],input,textarea,select,[data-cursor-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
      document.documentElement.style.cursor = ''
    }
  }, [mx, my])

  if (!visible) return null

  return (
    <>
      <motion.div
        style={{ left: dotX, top: dotY }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent mix-blend-difference"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 1.8 : 1,
          opacity: hovering ? 0.5 : 0.4,
          borderColor: hovering ? '#f91460' : '#f91460',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-accent"
      />
    </>
  )
}
