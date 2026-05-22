import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/creative',
        destination: 'https://portfolio-leo-wuhacohen.my.canva.site/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
