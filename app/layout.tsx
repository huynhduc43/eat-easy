import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';

import { mulish } from '@/app/fonts';
import SplashScreen from '@/app/components';

import './globals.css';

export const metadata: Metadata = {
  title: 'EatEasy',
  description: 'Recipes management',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mulish.className}>
        <SplashScreen />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
