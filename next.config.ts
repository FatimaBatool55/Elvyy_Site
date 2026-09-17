import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old tools that were deleted — redirect to tools listing
      {
        source: "/tools/age-calculator",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/word-counter",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/unit-converter",
        destination: "/tools",
        permanent: true,
      },

      // Old placeholder blog posts — redirect to blog listing
      {
        source: "/blog/better-sleep-without-gadgets",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/simple-budgeting-habits",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/start-a-small-garden",
        destination: "/blog",
        permanent: true,
      },

      // Sanity internal product URLs — redirect to homepage
      {
        source: "/products/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
