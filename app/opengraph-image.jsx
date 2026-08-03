import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rahyan Shamsi Akil — Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 55%, #0a0a0b 100%)',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(249,20,96,0.22) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(128,3,45,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Open to work badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '7px 18px',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 999,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span
            style={{
              color: '#22c55e',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Open to Work
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: '#f91460',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          Full-Stack Developer
        </p>

        {/* Name */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 28,
            letterSpacing: '-0.02em',
          }}
        >
          Rahyan Shamsi{' '}
          <span style={{ color: '#f91460' }}>Akil</span>
        </h1>

        {/* Bio */}
        <p
          style={{
            color: '#a1a1aa',
            fontSize: 20,
            maxWidth: 580,
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          Building scalable web applications with Next.js, Node.js, TypeScript &
          modern JavaScript technologies. 3+ years of hands-on experience.
        </p>

        {/* Tech badges bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          {['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'].map(
            (tech) => (
              <span
                key={tech}
                style={{
                  color: '#f91460',
                  background: 'rgba(249,20,96,0.1)',
                  border: '1px solid rgba(249,20,96,0.25)',
                  borderRadius: 999,
                  padding: '5px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* Domain bottom-right */}
        <p
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            color: '#3f3f46',
            fontSize: 15,
            letterSpacing: '0.05em',
          }}
        >
          rahyanshamsi.com
        </p>
      </div>
    ),
    { ...size }
  )
}
