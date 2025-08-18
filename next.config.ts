import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "komikcast.li",
        port: "",
        pathname: "/**", // semua path image diizinkan
      },
    ],
  },
};

export default nextConfig;
