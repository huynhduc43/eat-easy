import { cookies } from 'next/headers';

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

import { Role } from '@/common/enums';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'YOUR_VERY_STRONG_SECRET'
);
const accessTokenExpirationTime =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m';
const refreshTokenExpirationTime =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '7d';

const generateAccessToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(accessTokenExpirationTime)
    .sign(secret);
};

const generateRefreshToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(refreshTokenExpirationTime)
    .sign(secret);
};

const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error); // Log the error for debugging
    return null;
  }
};

export async function generateTokens(userId: string, role: Role) {
  const payload = { userId, role }; // 'sub' is standard for user ID

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  // Store refresh token in HttpOnly cookie
  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only in production
    sameSite: 'strict', // Important for security
    path: '/', // Accessible to all routes
    maxAge: 60 * 60 * 24 * 7, // 7 days (same as token expiration)
  });

  return { accessToken };
}

export async function refreshAccessToken() {
  const refreshToken = cookies().get('refreshToken')?.value;

  if (!refreshToken) {
    return { error: 'No refresh token found' };
  }

  const payload = await verifyToken(refreshToken);

  if (!payload || !payload.sub) {
    cookies().delete('refreshToken');
    return { error: 'Invalid refresh token' };
  }

  const newAccessToken = await generateAccessToken({ sub: payload.sub });
  return { accessToken: newAccessToken };
}
