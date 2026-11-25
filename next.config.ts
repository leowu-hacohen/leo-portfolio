import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/creative',
        destination: 'https://portfolio-leo-wuhacohen.my.canva.site/',
        permanent: false,
      },
      // Clean shareable paths for the resume. The PDF itself lives at a
      // stable URL, so drop-in replacing public/Leo-Wu-Hacohen-Resume.pdf
      // never breaks links already shared.
      {
        source: '/resume',
        destination: '/Leo-Wu-Hacohen-Resume.pdf',
        permanent: false,
      },
      {
        source: '/cv',
        destination: '/Leo-Wu-Hacohen-Resume.pdf',
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        // Full-res originals always download (even if someone opens the
        // link directly), and re-runs of the import script show up within
        // the hour.
        source: '/photos/:slug/full/:file',
        headers: [
          { key: 'Content-Disposition', value: 'attachment' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/photos/:slug/:file.zip',
        headers: [
          { key: 'Content-Disposition', value: 'attachment' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/Leo-Wu-Hacohen-Resume.pdf',
        headers: [
          // Preview in the browser's PDF viewer instead of force-downloading.
          { key: 'Content-Disposition', value: 'inline; filename="Leo-Wu-Hacohen-Resume.pdf"' },
          // Always revalidate so a swapped-in PDF shows up immediately.
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },
};

export default nextConfig;
