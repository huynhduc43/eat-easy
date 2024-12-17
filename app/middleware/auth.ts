import { NextRequest, NextResponse } from 'next/server';

import { verifyToken, refreshAccessToken } from '@/app/lib/actions/auth';
import { timeToSeconds } from '@/app/lib/utils';
import { isPublicRoute } from '@/constants/routes';
import { routing } from '@/i18n/routing';

const accessTokenExpirationTime =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m';
const accessTokenExpirationSeconds = timeToSeconds(accessTokenExpirationTime);

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split('/');

  if (!isPublicRoute(pathname)) {
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
}
