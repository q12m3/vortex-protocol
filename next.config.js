/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // TODO: Add image domains when integrating token logos from CDN
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  // TODO: Add Content-Security-Policy headers when deploying to production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
