import createNextIntlPlugin from 'next-intl/plugin';

const locales = ['en', 'vi'];

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.themealdb.com' }],
  },
  async redirects() {
    return [
      ...locales.map((locale) => ({
        source: `/${locale}`,
        destination: `/${locale}/home`,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
