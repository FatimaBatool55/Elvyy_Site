import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
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
      {
        source: "/products/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
