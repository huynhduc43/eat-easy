import { NextRequest, NextResponse } from 'next/server';

import { verifyToken, refreshAccessToken } from '@/app/lib/actions/auth';
import { timeToSeconds } from '@/app/lib/utils';
import { isPublicRoute } from '@/constants/routes';
import { routing } from '@/i18n/routing';

const accessTokenExpirationTime =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m';
const accessTokenExpirationSeconds = timeToSeconds(accessTokenExpirationTime);

const redirectToHome = (request: NextRequest, locale: string) =>
  NextResponse.redirect(
    new URL(`/${locale || routing.defaultLocale}`, request.url)
  );

const redirectToLogin = (request: NextRequest, locale: string) =>
  NextResponse.redirect(
    new URL(`/${locale || routing.defaultLocale}/login`, request.url)
  );

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split('/');

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const setAccessTokenCookie = (response: NextResponse, token: string) => {
    response.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: accessTokenExpirationSeconds,
    });
  };

  if (pathname === `/${locale || routing.defaultLocale}/login`) {
    if (accessToken) {
      try {
        const payload = await verifyToken(accessToken, 'access');

        if (payload) {
          return redirectToHome(request, locale);
        }
      } catch (error) {
        // Ignore errors and proceed with the rest of the middleware
      }
    }

    if (refreshToken) {
      const { accessToken: newAccessToken, error } =
        await refreshAccessToken(refreshToken);

      if (!error && newAccessToken) {
        const response = redirectToHome(request, locale);
        setAccessTokenCookie(response, newAccessToken);
        return response;
      }
    }

    return;
  }

  if (isPublicRoute(pathname)) return;

  if (!accessToken) {
    if (!refreshToken) {
      return redirectToLogin(request, locale);
    }

    const { accessToken: newAccessToken, error } =
      await refreshAccessToken(refreshToken);

    if (error || !newAccessToken) {
      return redirectToLogin(request, locale);
    }

    const response = NextResponse.next();
    setAccessTokenCookie(response, newAccessToken);
    return response;
  }

  try {
    const payload = await verifyToken(accessToken, 'access');

    if (!payload) {
      throw new Error('Invalid token');
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'JWTExpired') {
      if (!refreshToken) {
        return redirectToLogin(request, locale);
      }

      const { accessToken: newAccessToken, error: refreshError } =
        await refreshAccessToken(refreshToken);

      if (refreshError || !newAccessToken) {
        return redirectToLogin(request, locale);
      }

      const response = NextResponse.next();
      setAccessTokenCookie(response, newAccessToken);
      return response;
    }

    const response = redirectToLogin(request, locale);
    response.cookies.delete('accessToken');
    return response;
  }
}
