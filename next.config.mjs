/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',  // ou mais, conforme necessidade
    },
  },
};

export default nextConfig;
