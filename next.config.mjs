/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'cdn.multiversx.com',
        }],
        unoptimized: true, // Disable image optimization to avoid 500 errors
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            '@react-native-async-storage/async-storage': false,
            'pino-pretty': false,
          };
        }
        return config;
      },
};

export default nextConfig;
