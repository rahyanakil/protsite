'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Contact() {
  const form = useRef()
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm('service_5597sd8', 'template_z41agyl', form.current, 'kkhB4tPMlADsGDhrb')
      .then(() => {
        setStatus('success')
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
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-2">
            Get In Touch
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Contact Me</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Talk to me</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactCards.map(({ icon, title, value, href, cta }) => (
                <div
                  key={title}
                  className="card p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <i className={`bx ${icon} text-xl text-accent`}></i>
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">{title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 break-all">{value}</p>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    {cta}
                    <i className="bx bx-right-arrow-alt text-sm"></i>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
              Write me your project details
            </h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Project Details
                </label>
                <textarea
                  name="project"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </div>

              {/* Status message */}
              {status === 'success' && (
                <p className="text-sm text-green-500 flex items-center gap-2">
                  <i className="bx bx-check-circle text-lg"></i>
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-500 flex items-start gap-2">
                  <i className="bx bx-error-circle text-lg flex-shrink-0 mt-0.5"></i>
                  <span>Failed to send. {errorMsg && <span className="font-mono text-xs">({errorMsg})</span>} Check browser console for details.</span>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-accent/25"
              >
                {status === 'sending' ? (
                  <>
                    <i className="bx bx-loader-alt animate-spin text-lg"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bx bx-send text-lg"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
