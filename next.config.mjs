/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      optimizeCss: true,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === "production", // Removes console logs in production
    },
  };
  
  export default nextConfig;
  