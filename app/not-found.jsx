import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
        Oops!
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist.
      </p>
      <Image
        src="/john-travolta-lost.gif"
        alt="Lost"
        width={300}
        height={200}
        className="rounded-xl mb-8 opacity-80"
        unoptimized
      />
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        <i className="bx bx-home"></i>
        Go Back Home
      </Link>
    </div>
  )
}
