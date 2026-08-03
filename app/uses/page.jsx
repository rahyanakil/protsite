import Link from 'next/link'

export const metadata = {
  title: 'Uses',
  description: 'The tools, software, and gear I use every day as a full-stack developer.',
  alternates: {
    canonical: '/uses',
  },
  openGraph: {
    type: 'website',
    title: 'Uses | Rahyan Akil',
    description: 'The tools, software, and gear I use every day as a full-stack developer.',
  },
}

const sections = [
  {
    title: 'Editor & Terminal',
    icon: 'bx-code-alt',
    items: [
      { name: 'VS Code', note: 'Primary editor. Extensions: ESLint, Prettier, Tailwind CSS IntelliSense, GitLens, Auto Rename Tag, Error Lens.' },
      { name: 'Windows Terminal', note: 'With PowerShell and a custom Oh My Posh prompt.' },
      { name: 'JetBrains Mono', note: 'Font with ligatures. Easier on the eyes for long sessions.' },
    ],
  },
  {
    title: 'Languages & Frameworks',
    icon: 'bx-layer',
    items: [
      { name: 'TypeScript', note: 'Strict mode on every new project. The type errors at compile time are cheaper than the bugs at runtime.' },
      { name: 'Next.js 14 (App Router)', note: 'My go-to for anything that ships to users. Server Components + Vercel deployment is a sharp combination.' },
      { name: 'React 18', note: 'The mental model is solid. I use it for complex UI whether I\'m on Next.js or a plain Vite project.' },
      { name: 'Node.js + Express', note: 'When I need a standalone API or can\'t use Next.js Route Handlers.' },
    ],
  },
  {
    title: 'Styling',
    icon: 'bx-palette',
    items: [
      { name: 'Tailwind CSS', note: 'I resisted it for a long time. Now I can\'t imagine maintaining a separate CSS file per component.' },
      { name: 'Framer Motion', note: 'For animations that need to feel physical. The spring physics system is excellent.' },
      { name: 'shadcn/ui', note: 'When I need accessible, complex components (dialogs, selects, toasts) without designing from scratch.' },
    ],
  },
  {
    title: 'Databases & Backend',
    icon: 'bx-data',
    items: [
      { name: 'MongoDB + Mongoose', note: 'My default for most projects. Flexible schema is useful early in a project\'s life.' },
      { name: 'PostgreSQL + Prisma', note: 'When the data has clear relational structure. Prisma\'s type generation is genuinely excellent.' },
      { name: 'Firebase', note: 'Auth + Firestore for projects where I need a backend in an afternoon.' },
      { name: 'Redis (Upstash)', note: 'For rate limiting and caching. Upstash\'s serverless pricing makes sense for portfolio-scale apps.' },
    ],
  },
  {
    title: 'Deployment & DevOps',
    icon: 'bx-server',
    items: [
      { name: 'Vercel', note: 'All my frontend work. Zero-config Next.js deployment with great preview URLs.' },
      { name: 'Railway', note: 'Node.js backends and PostgreSQL databases. Simpler than AWS for personal projects.' },
      { name: 'GitHub Actions', note: 'CI/CD pipelines. Lint + type check on every PR.' },
      { name: 'Cloudflare', note: 'DNS and the occasional Worker for edge-cached responses.' },
    ],
  },
  {
    title: 'Design & Productivity',
    icon: 'bx-brush',
    items: [
      { name: 'Figma', note: 'UI design and component prototyping. I usually design the key screens before writing a line of code.' },
      { name: 'Excalidraw', note: 'Quick architecture diagrams. The hand-drawn aesthetic signals "this is a draft", which is the right message for architecture sketches.' },
      { name: 'Notion', note: 'Notes, project tracking, and the occasional spec document.' },
      { name: 'Postman', note: 'API testing and documentation. I keep a collection for every project.' },
    ],
  },
  {
    title: 'AI Tools',
    icon: 'bx-brain',
    items: [
      { name: 'Claude (Anthropic)', note: 'For thinking through architecture, reviewing code, and writing documentation.' },
      { name: 'GitHub Copilot', note: 'Inline completions inside VS Code. Most useful for boilerplate and test cases.' },
    ],
  },
]

export default function UsesPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors mb-8 group"
          >
            <i className="bx bx-arrow-back text-base transition-transform group-hover:-translate-x-1" />
            Back home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text-animated">Uses</span>
          </h1>
          <div className="h-1 w-16 bg-accent rounded-full mb-5" />
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
            The tools, software, and setup I use day-to-day as a full-stack developer. Updated when things change.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map(section => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <i className={`bx ${section.icon} text-lg text-accent`} />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{section.title}</h2>
              </div>

              <div className="space-y-3 pl-1">
                {section.items.map(item => (
                  <div
                    key={item.name}
                    className="card px-5 py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                  >
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm min-w-[10rem] shrink-0">
                      {item.name}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-16 text-xs text-zinc-400 dark:text-zinc-600 text-center">
          Inspired by <a href="https://uses.tech" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors underline">uses.tech</a>
        </p>

      </div>
    </main>
  )
}
