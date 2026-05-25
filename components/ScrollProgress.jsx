'use client'
import { useScroll, useSpring, useTransform, motion } from 'framer-motion'

const RADIUS = 18
const CIRC = 2 * Math.PI * RADIUS

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const strokeDashoffset = useTransform(progress, [0, 1], [CIRC, 0])
  const opacity = useTransform(progress, [0, 0.04], [0, 1])

  return (
    <>
      {/* Top bar */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-accent-dark z-[999] pointer-events-none"
      />

      {/* Ring indicator — bottom-right, above ScrollUp button */}
      <motion.div
        style={{ opacity }}
        className="fixed bottom-24 right-5 z-[80] pointer-events-none hidden sm:block"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" className="drop-shadow-md">
          <circle
            cx="22" cy="22" r={RADIUS}
            fill="none"
            stroke="rgba(249,20,96,0.15)"
            strokeWidth="3"
          />
          <motion.circle
            cx="22" cy="22" r={RADIUS}
            fill="none"
            stroke="#f91460"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset }}
            transform="rotate(-90 22 22)"
          />
        </svg>
      </motion.div>
    </>
  )
}
