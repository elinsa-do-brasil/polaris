import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/pt",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pt/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
