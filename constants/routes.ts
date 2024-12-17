export const PUBLIC_ROUTES = ['/login', '/home', '/'] as const;

export const PUBLIC_PATHS = [
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/images',
] as const;

export const isPublicRoute = (pathname: string): boolean => {
  // Check if the path starts with any public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return true;
  }

  // Remove locale prefix for route checking
  const routeWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  // Check if the route matches any public routes
  return PUBLIC_ROUTES.some(
    (route) =>
      routeWithoutLocale === route || routeWithoutLocale.startsWith(route + '/')
  );
};
