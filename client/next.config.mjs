import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
