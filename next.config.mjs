/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '80',
          pathname: '/**',
        },
      ],
      },
};

export default nextConfig;
