const navLinks = ['About', 'Skills', 'Projects', 'Qualification', 'Contact']

const socialLinks = [
  { href: 'https://www.facebook.com/rahyan.shamsiakil.1', icon: 'bxl-facebook', label: 'Facebook' },
  { href: 'https://www.instagram.com/rahyan_akil/', icon: 'bxl-instagram', label: 'Instagram' },
  { href: 'https://twitter.com/Rahyan_Akil4', icon: 'bxl-twitter', label: 'Twitter' },
  { href: 'https://www.linkedin.com/in/rahyanshamsi/', icon: 'bxl-linkedin', label: 'LinkedIn' },
  { href: 'https://github.com/rahyanakil', icon: 'bxl-github', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="container-custom section-padding py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Brand */}
          <a href="#home" className="text-2xl font-bold gradient-text inline-block mb-6">
            Rahyan Akil
          </a>

          {/* Nav links */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm hover:text-accent transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Social links */}
          <div className="flex justify-center gap-3 mb-8">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-accent hover:text-white transition-all duration-200 text-sm"
              >
                <i className={`bx ${icon}`}></i>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Rahyan Shamsi Akil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
