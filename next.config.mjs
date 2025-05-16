/** @type {import('next').NextConfig} */

const nextConfig = {

  experimental: {
    serverComponentsHmrCache: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:"suhvzqbalvavmnxxagwn.supabase.co",
      }
    ]
  },

  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://vahiqllist.created.app/;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;