import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

export default async function middleware(request: NextRequest) {
  const [, locale] = request.nextUrl.pathname.split('/');

  if (locale === '') {
    return NextResponse.redirect(
      new URL(
        `/${request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale}/home`,
        request.url
      )
    );
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
