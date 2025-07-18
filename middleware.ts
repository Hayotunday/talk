import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Routes that are part of the (root) group and should be protected
  const protectedRootRoutes = ["/history", "/meeting", "/profile"];

  // Auth pages that should not be accessible to logged-in users
  const authRoutes = ["/sign-in", "/sign-up"];

  const isProtectedRoute = protectedRootRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If the user is not authenticated
  if (!session) {
    // and tries to access a protected page, redirect them to the sign-in page.
    if (isProtectedRoute) {
      const redirectUrl = new URL("/sign-in", request.url);
      const destination = `${pathname}${request.nextUrl.search}`;
      redirectUrl.searchParams.set("redirect", destination);
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    // If the user is authenticated and tries to access an auth page,
    // redirect them to the home page.
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets in public folder (e.g. .svg, .png)
     */
    "/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|ico)$).*)",
  ],
};
