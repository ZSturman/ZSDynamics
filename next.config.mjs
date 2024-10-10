/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/randomuser",
          destination: "https://randomuser.me/api/", // Proxy to the external API
        },
      ];
    },
  };
  
  export default nextConfig;
  