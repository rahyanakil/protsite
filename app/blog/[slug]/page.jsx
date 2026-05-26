import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/blog'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

const TAG_COLORS = {
  'Next.js': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'React': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'TypeScript': 'bg-blue-600/10 text-blue-300 border-blue-600/20',
  'Stripe': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'AI': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Portfolio': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const { frontmatter, html } = post

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors mb-10 group"
        >
          <i className="bx bx-arrow-back text-base transition-transform group-hover:-translate-x-1" />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags?.map(tag => (
              <span
                key={tag}
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${TAG_COLORS[tag] || 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-snug mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
            {frontmatter.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-5">
            <span className="flex items-center gap-1.5">
              <i className="bx bx-user text-sm" />
              Rahyan Shamsi Akil
            </span>
            <span className="flex items-center gap-1.5">
              <i className="bx bx-calendar text-sm" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="bx bx-time text-sm" />
              {frontmatter.readTime}
            </span>
          </div>
        </header>

        {/* Rendered markdown */}
        <article
          className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-blockquote:border-l-accent prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Want to work together?</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">I&apos;m open to full-time roles and freelance projects.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow whitespace-nowrap"
          >
            <i className="bx bx-message text-base" />
            Get in touch
          </Link>
        </div>

      </div>
    </main>
  )
}
