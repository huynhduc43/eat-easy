import { NextRequest, NextResponse } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export async function i18nMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split('/');

  if (locale === '') {
    return NextResponse.redirect(
      new URL(
        `/${request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale}/home`,
        request.url
      )
    );
  }

  const handleI18nRouting = createIntlMiddleware(routing);
  return handleI18nRouting(request);
}
