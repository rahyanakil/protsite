/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#f91460',
          dark:    '#80032d',
          muted:   '#17032c',
        },
        // OS design tokens — backed by CSS custom properties
        'os-void':         'var(--os-void)',
        'os-bg':           'var(--os-bg)',
        'os-panel':        'var(--os-panel)',
        'os-border':       'var(--os-border)',
        'os-border-bright':'var(--os-border-bright)',
        'os-text':         'var(--os-text)',
        'os-text-muted':   'var(--os-text-muted)',
        'os-text-dim':     'var(--os-text-dim)',
        'os-green':        'var(--os-green)',
        'os-cyan':         'var(--os-cyan)',
        'os-violet':       'var(--os-violet)',
        'os-amber':        'var(--os-amber)',
      },
      animation: {
        blob:         'blob 8s ease-in-out infinite',
        'spin-slow':  'spin 8s linear infinite',
        blink:        'blink 1.2s step-end infinite',
        float:        'float 4s ease-in-out infinite',
        shine:        'shine 4s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        scan:         'scan 6s linear infinite',
        marquee:      'marquee 28s linear infinite',
      },
      keyframes: {
        blob: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%':     { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%':     { borderRadius: '50% 50% 30% 70% / 30% 70% 50% 50%' },
          '75%':     { borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shine: { to: { backgroundPosition: '200% center' } },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
