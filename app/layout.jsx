import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Providers from '@/components/Providers'
import { Analytics } from '@vercel/analytics/react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const BASE_URL = 'https://rahyanakil.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rahyan Akil | Full-Stack Developer",
    template: "%s | Rahyan Akil",
  },
  description:
    'Portfolio of Rahyan Shamsi Akil — Full-Stack Developer specialising in Next.js, React, Node.js, TypeScript, and modern web technologies. Open to work.',
  keywords: [
    'Rahyan Akil', 'Full Stack Developer', 'MERN Stack', 'Next.js Developer',
    'React Developer', 'Node.js', 'TypeScript', 'Bangladesh Developer',
    'Web Developer Portfolio', 'Hire Developer',
  ],
  authors: [{ name: 'Rahyan Shamsi Akil', url: BASE_URL }],
  creator: 'Rahyan Shamsi Akil',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Rahyan Akil — Portfolio',
    title: 'Rahyan Akil | Full-Stack Developer',
    description:
      'Full-Stack Developer specialising in Next.js, React, Node.js & TypeScript. Building fast, beautiful web applications. Open to work.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rahyan Akil — Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahyan Akil | Full-Stack Developer',
    description: 'Full-Stack Developer — Next.js, React, Node.js, TypeScript. Open to work.',
    creator: '@Rahyan_Akil4',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
        {/* Prevent flash of wrong theme */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');})()`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
