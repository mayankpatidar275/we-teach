/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  output: "standalone",
};

export default nextConfig;
