import { Poppins, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
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

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const BASE_URL = 'https://rahyanshamsi.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Rahyan Shamsi Akil',
      alternateName: 'Rahyan Akil',
      jobTitle: 'Full-Stack Developer',
      description: 'Full-Stack Developer specialising in Next.js, React, Node.js, and TypeScript. Based in Dhaka, Bangladesh.',
      url: BASE_URL,
      sameAs: [
        'https://github.com/rahyanakil',
        'https://www.linkedin.com/in/rahyanshamsi/',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      knowsAbout: [
        'Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB',
        'PostgreSQL', 'Express.js', 'Tailwind CSS', 'Framer Motion',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Bangladesh Army International University of Science and Technology',
        alternateName: 'BAIUST',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Prime Tech Solution Limited',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Rahyan Akil — Portfolio',
      description: 'Portfolio of Rahyan Shamsi Akil — Full-Stack Developer',
      author: { '@id': `${BASE_URL}/#person` },
    },
  ],
}

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Rahyan Akil | Full-Stack Developer',
    template: '%s | Rahyan Akil',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Rahyan Akil — Portfolio',
    title: 'Rahyan Akil | Full-Stack Developer',
    description:
      'Full-Stack Developer specialising in Next.js, React, Node.js & TypeScript. Building fast, beautiful web applications. Open to work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahyan Akil | Full-Stack Developer',
    description: 'Full-Stack Developer — Next.js, React, Node.js, TypeScript. Open to work.',
    creator: '@Rahyan_Akil4',
    images: ['/opengraph-image'],
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
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${grotesk.variable} ${jetbrainsMono.variable} font-grotesk bg-os-bg text-os-text antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
