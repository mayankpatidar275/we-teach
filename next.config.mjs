/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // Allows all hostnames
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/auth/session",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allows all origins
          },
        ],
      },
    ];
  },
};


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["utfs.io"],
//   },
//   experimental: {
//     missingSuspenseWithCSRBailout: false,
//   },
//   output: "standalone",
// };

// export default nextConfig;
