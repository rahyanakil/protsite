export default function OsFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="xl:pl-52 pb-7 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-os-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="green-dot" />
            <span className="font-mono text-[11px] text-os-text-muted">
              RAHYAN-OS v3.0.0 · {year}
            </span>
          </div>
          <div className="font-mono text-[11px] text-os-text-dim text-center sm:text-right">
            Built with Next.js · TypeScript · Tailwind · Framer Motion
          </div>
          <div className="flex gap-4">
            {[
              { label: 'GitHub', href: 'https://github.com/rahyanakil' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahyanshamsi/' },
              { label: 'Resume', href: '/rahyan-akil-resume.pdf' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-os-text-muted hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
