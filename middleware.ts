import { authMiddleware } from '@/app/middleware/auth';
import { i18nMiddleware } from '@/app/middleware/i18n';
import { composeMiddleware } from '@/app/middleware/middleware-composer';

export default composeMiddleware([authMiddleware, i18nMiddleware]);

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
