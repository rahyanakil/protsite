'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const CONFETTI_COLORS = ['#f91460', '#80032d', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa']

function useConfetti() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  const fire = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 60,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      size: Math.random() * 8 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 7,
      gravity: 0.1,
    }))

    cancelAnimationFrame(rafRef.current)
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
      if (alive) rafRef.current = requestAnimationFrame(draw)
    }
    draw()
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return { canvasRef, fire }
}

const contactCards = [
  {
    icon: 'bx-mail-send',
    title: 'Email',
    value: 'rahyanakil89@gmail.com',
    href: 'mailto:rahyanakil89@gmail.com',
    cta: 'Write me',
  },
  {
    icon: 'bxl-whatsapp',
    title: 'WhatsApp',
    value: '+880 1811 380844',
    href: 'https://api.whatsapp.com/send?phone=8801811380844&text=Hello, more information!',
    cta: 'Write me',
  },
  {
    icon: 'bx-phone',
    title: 'Phone',
    value: '+880 1811 380844',
    href: 'tel:+8801811380844',
    cta: 'Call me',
  },
  {
    icon: 'bxl-messenger',
    title: 'Messenger',
    value: 'fb.user.rahyanshamsiakil',
    href: 'https://www.facebook.com/rahyan.shamsiakil.1',
    cta: 'Write me',
  },
]

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15 } },
}

const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Contact() {
  const form = useRef()
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const { canvasRef, fire } = useConfetti()

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm('service_5597sd8', 'template_z41agyl', form.current, 'kkhB4tPMlADsGDhrb')
      .then(() => {
        setStatus('success')
        fire()
        e.target.reset()
        setTimeout(() => setStatus(null), 5000)
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setErrorMsg(err?.text || err?.message || 'Unknown error')
        setStatus('error')
        setTimeout(() => setStatus(null), 6000)
      })
  }

  return (
    <>
    <canvas ref={canvasRef} className="fixed inset-0 z-[9996] pointer-events-none" />
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">Get In Touch</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-accent rounded-full mx-auto mt-2 mb-3"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Contact Me</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact cards */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-zinc-900 dark:text-white mb-6"
            >
              Talk to me
            </motion.h3>
            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {contactCards.map(({ icon, title, value, href, cta }) => (
                <motion.div
                  key={title}
                  variants={cardItem}
                  whileHover={{ y: -4, borderColor: 'rgba(249,20,96,0.5)', boxShadow: '0 10px 30px rgba(249,20,96,0.08)' }}
                  className="card p-5 transition-all duration-300 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-3"
                  >
                    <i className={`bx ${icon} text-xl text-accent`}></i>
                  </motion.div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">{title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 break-all">{value}</p>
                  {title === 'Email' && (
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText('rahyanakil89@gmail.com')
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="mt-1 mb-2 inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-accent transition-colors"
                    >
                      <i className={`bx ${copied ? 'bx-check text-green-500' : 'bx-copy'} text-sm`} />
                      <span className={copied ? 'text-green-500' : ''}>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  )}
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all"
                  >
                    {cta}
                    <i className="bx bx-right-arrow-alt text-sm"></i>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              Write me your project details
            </h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ label, name, type, placeholder }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{label}</label>
                  <input
                    type={type}
                    name={name}
                    required
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Project Details</label>
                <textarea
                  name="project"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </motion.div>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-green-500 flex items-center gap-2"
                  >
                    <i className="bx bx-check-circle text-lg"></i>
                    Message sent successfully!
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-500 flex items-start gap-2"
                  >
                    <i className="bx bx-error-circle text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Failed to send. {errorMsg && <span className="font-mono text-xs">({errorMsg})</span>}</span>
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm disabled:opacity-60 shadow-lg shadow-accent/25 transition-opacity"
              >
                {status === 'sending' ? (
                  <>
                    <motion.i
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="bx bx-loader-alt text-lg"
                    ></motion.i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bx bx-send text-lg"></i>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Booking card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <i className="bx bx-calendar-event text-2xl text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">
              Prefer a call? Schedule one.
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Book a free 30-minute intro call — no commitment, just a conversation about your project or role.
            </p>
          </div>
          <a
            href="mailto:rahyanakil89@gmail.com?subject=Let%27s%20schedule%20a%20call"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow whitespace-nowrap"
          >
            <i className="bx bx-calendar-check text-base" />
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
    </>
  )
}
