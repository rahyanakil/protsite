import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description: 'Writing about Next.js, React, TypeScript, and the craft of building web applications.',
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

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
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
            <span className="gradient-text-animated">Writing</span>
          </h1>
          <div className="h-1 w-16 bg-accent rounded-full mb-5" />
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Technical posts about Next.js, TypeScript, and building things. Not a tutorial blog — more like notes from the work.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block card p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <i className="bx bx-calendar text-sm" />
                  {formatDate(post.date)}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <i className="bx bx-time text-sm" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                    <span
                      key={tag}
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${TAG_COLORS[tag] || 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <i className="bx bx-right-arrow-alt" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <i className="bx bx-edit-alt text-4xl mb-3 block" />
            <p>No posts yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
