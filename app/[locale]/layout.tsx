import { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import SplashScreen, { ScrollToTopButton } from '@/app/components';
import { mulish } from '@/app/fonts';
import { routing } from '@/i18n/routing';

import '../globals.css';

import { Toaster } from '../components/common/toaster';

export const metadata: Metadata = {
  title: 'EatEasy',
  description: 'Recipes management',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={mulish.className}>
        <NextIntlClientProvider messages={messages}>
          <SplashScreen />
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </NextIntlClientProvider>
        <ScrollToTopButton />
        <Toaster />
      </body>
    </html>
  );
}
