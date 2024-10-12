import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.themealdb.com' }],
  },
  async redirects() {
    return [
      {
        source: '/:locale',
        destination: '/:locale/home',
        permanent: true,
        locale: false,
        has: [
          {
            type: 'host',
            value: '(?!.*\\.(ico|png|jpg|jpeg|svg|webp|gif))$',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
