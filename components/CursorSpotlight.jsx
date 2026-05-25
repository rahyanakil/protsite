'use client'
import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let raf
    let targetX = -400
    let targetY = -400
    let currentX = -400
    let currentY = -400

    const move = (e) => {
      targetX = e.clientX - 200
      targetY = e.clientY - 200
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      el.style.transform = `translate(${currentX}px, ${currentY}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] z-[1] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(249,20,96,0.12) 0%, transparent 70%)',
        willChange: 'transform',
        mixBlendMode: 'normal',
      }}
    />
  )
}
