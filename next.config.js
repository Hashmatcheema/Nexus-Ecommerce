/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Security Headers (exclude _next so dev chunk URLs are not affected)
  async headers() {
    return [
      {
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Content Security Policy - basic version
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://clerk.browser.v6.clerk.io https://*.clerk.accounts.dev https://js.stripe.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://clerk.browser.v6.clerk.io https://*.clerk.accounts.dev https://api.clerk.dev https://api.stripe.com https://clerk-telemetry.com; frame-src 'self' https://js.stripe.com;"
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
