import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { mulish } from '@/app/fonts';
import SplashScreen, { ScrollToTopButton } from '@/app/components';

import '../globals.css';

export const metadata: Metadata = {
  title: 'EatEasy',
  description: 'Recipes management',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
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
      </body>
    </html>
  );
}
