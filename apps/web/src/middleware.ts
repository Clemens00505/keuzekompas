import { NextResponse, type NextRequest } from 'next/server';

// Protect selected routes by checking presence of our lightweight auth cookie
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const protectedPaths = ['/modules', '/profile', '/favorites'];
  const isProtected = protectedPaths.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasCookie = req.cookies.get('kk.at');
  if (!hasCookie) {
    const loginUrl = url.clone();
    loginUrl.pathname = '/login';
    // optional: keep original target to return after login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/modules/:path*', '/modules', '/profile/:path*', '/profile', '/favorites/:path*', '/favorites'],
};
