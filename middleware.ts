import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n.config";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define redirect mappings
const redirects = new Map([
  ['/en-us/pages_43', '/en-us'],
  ['/en-us/en', '/en-us'],
  ['/en-us/en/aboutus', '/en-us'],
  ['/en-us/en/Services', '/en-us/services'],
  // Add more redirects here if needed
]);

// Create the middleware handler for i18n routing
const handleI18nRouting = createMiddleware({
  // Use this locale when we can't match
  // another with our user's preferred locales
  // and when no locale is explicitly set.
  defaultLocale: "en-us",
  // List all supported locales (en-us, ar-eg).
  locales,
  // Automatic locale detection is enabled by
  // default. We're disabling it to keep things
  // simple for now. We'll enable it later when
  // we cover locale detection.
  localeDetection: true,
  /**
   * For SEO or usability, some consider localizing their pathnames, 
   * such as translating /ar-eg/about to /ar-eg/نبذة-عنا.
   * For details on how to set this up and ensure proper navigation, 
   * check out the Localizing pathnames section in the next-intl documentation.
   */
  localePrefix: "always"
});

// Main middleware function to handle both redirects and i18n routing
export default async function middleware(request: NextRequest) {
  // Check if the current path needs to be redirected
  const pathname = request.nextUrl.pathname;
  const redirectTo = redirects.get(pathname);

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // Continue with i18n routing if no redirect is needed
  return handleI18nRouting(request);
}

// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Add specific redirect paths
    "/en-us/pages_43",
    "/en-us/en",
    "/en-us/en/aboutus",
    "/en-us/en/Services"
  ],
};