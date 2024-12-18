import { NextResponse, NextRequest } from 'next/server';

type MiddlewareFactory = (
  request: NextRequest
) => Promise<NextResponse | undefined | void>;

export function composeMiddleware(middlewares: MiddlewareFactory[]) {
  return async function (request: NextRequest) {
    for (const middleware of middlewares) {
      const result = await middleware(request);
      if (result) {
        return result;
      }
    }
  };
}
