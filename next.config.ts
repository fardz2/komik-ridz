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
      {
        protocol: "https",
        hostname: "sv2.imgkc2.my.id",
        port: "",
        pathname: "/**", // semua path image diizinkan
      },
      {
        protocol: "https",
        hostname: "sv3.imgkc3.my.id",
        port: "",
        pathname: "/**", // semua path image diizinkan
      },
       {
        protocol: "https",
        hostname: "sv1.imgkc1.my.id",
        port: "",
        pathname: "/**", // semua path image diizinkan
      },
    ],
  },
};

export default nextConfig;
