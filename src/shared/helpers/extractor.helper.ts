import { Request } from 'express';

export function extractAccessTokenFromHeader(
  request: Request
): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export function extractRefreshTokenFromCookie(
  request: Request
): string | undefined {
  return request.cookies['RefreshToken'];
}
