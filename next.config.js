/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Optimize for container deployments
  swcMinify: true,
  // Configure any other options as needed for your application
};

module.exports = nextConfig;
