import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|fr)/:path*', '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)']
};
