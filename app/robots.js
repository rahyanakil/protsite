export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/dashboard/',
      },
    ],
    sitemap: 'https://rahyanshamsi.com/sitemap.xml',
  }
}
