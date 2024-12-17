'use server';

import { cookies } from 'next/headers';

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

import { getUserById } from '@/app/lib/actions/users/users';
import { timeToSeconds } from '@/app/lib/utils';
import { Role } from '@/common/enums';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'YOUR_VERY_STRONG_SECRET'
);
const accessTokenExpirationTime =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m';
const refreshTokenExpirationTime =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '7d';
const accessTokenExpirationSeconds = timeToSeconds(accessTokenExpirationTime);
const refreshTokenExpirationSeconds = timeToSeconds(refreshTokenExpirationTime);

const generateAccessToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(accessTokenExpirationTime)
    .sign(secret);
};

const generateRefreshToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(refreshTokenExpirationTime)
    .sign(secret);
};

export const verifyToken = async (
  token: string,
  expectedType: 'access' | 'refresh'
): Promise<JWTPayload> => {
  try {
    const { payload } = await jwtVerify(token, secret, {
      maxTokenAge:
        expectedType === 'access'
          ? accessTokenExpirationSeconds
          : refreshTokenExpirationSeconds,
    });

    if (payload.type !== expectedType) {
      throw new Error(
        `Invalid token type. Expected ${expectedType} but got ${payload.type}`
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof Error && error.name === 'JWTExpired') {
      console.error(`Token expired: ${expectedType}`);
      throw error;
    }
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
};

export async function generateTokens(userId: string, role: Role) {
  const payload = { userId, role }; // 'sub' is standard for user ID

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  // Store access token in HttpOnly cookie
  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only in production
    sameSite: 'strict', // Important for security
    path: '/', // Accessible to all routes
    maxAge: accessTokenExpirationSeconds,
  });

  // Store refresh token in HttpOnly cookie
  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only in production
    sameSite: 'strict', // Important for security
    path: '/', // Accessible to all routes
    maxAge: refreshTokenExpirationSeconds,
  });

  return { accessToken };
}

export async function refreshAccessToken(refreshToken?: string) {
  console.log('Refreshing access token');
  // If refreshToken is not provided, try to get it from cookies
  const token = refreshToken ?? cookies().get('refreshToken')?.value;

  if (!token) {
    return { error: 'No refresh token found' };
  }

  try {
    await verifyToken(token, 'refresh');
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return { error: 'Invalid refresh token' };
  }

  const user = await getUserById(token);

  if (!user.success || !user.data) {
    return { error: 'User not found' };
  }

  const newAccessToken = await generateAccessToken({
    userId: user.data.Id,
    role: user.data.role,
  });

  if (!refreshToken) {
    // Only set cookie if we're running on the client side
    cookies().set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: accessTokenExpirationSeconds,
    });
  }

  console.log('Access token refreshed');
  return { accessToken: newAccessToken };
}
