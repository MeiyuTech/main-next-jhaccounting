import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n.config";
export default createMiddleware({
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
// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};