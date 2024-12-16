import { NextRequest, NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { verifyToken, refreshAccessToken } from '@/app/lib/actions/auth';
import { timeToSeconds } from '@/app/lib/utils';
import { routing } from '@/i18n/routing';

const accessTokenExpirationTime =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m';
const accessTokenExpirationSeconds = timeToSeconds(accessTokenExpirationTime);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split('/');

  // Skip auth check for login page
  if (!pathname.startsWith(`/${locale}/login`)) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!accessToken) {
      if (!refreshToken) {
        return NextResponse.redirect(
          new URL(`/${locale || routing.defaultLocale}/login`, request.url)
        );
      }

      // Try to refresh the token
      const { accessToken: newAccessToken, error } =
        await refreshAccessToken(refreshToken);
      if (error || !newAccessToken) {
        return NextResponse.redirect(
          new URL(`/${locale || routing.defaultLocale}/login`, request.url)
        );
      }

      // Create response with new access token
      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: accessTokenExpirationSeconds,
      });
      return response;
    }

    try {
      // Verify access token with type check
      const payload = await verifyToken(accessToken, 'access');
      if (!payload) {
        throw new Error('Invalid token');
      }
    } catch (error) {
      // Handle expired or invalid token
      if (error instanceof Error && error.name === 'JWTExpired') {
        // Token is expired, try to refresh
        if (!refreshToken) {
          return NextResponse.redirect(
            new URL(`/${locale || routing.defaultLocale}/login`, request.url)
          );
        }

        const { accessToken: newAccessToken, error: refreshError } =
          await refreshAccessToken(refreshToken);

        if (refreshError || !newAccessToken) {
          return NextResponse.redirect(
            new URL(`/${locale || routing.defaultLocale}/login`, request.url)
          );
        }

        const response = NextResponse.next();
        response.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: accessTokenExpirationSeconds,
        });
        return response;
      }

      // For other errors, redirect to login
      const response = NextResponse.redirect(
        new URL(`/${locale || routing.defaultLocale}/login`, request.url)
      );
      response.cookies.delete('accessToken');
      return response;
    }
  }

  // Handle default locale redirect
  if (locale === '') {
    return NextResponse.redirect(
      new URL(
        `/${request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale}/home`,
        request.url
      )
    );
  }

  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
