import createMiddleware from "next-intl/middleware";

export default createMiddleware.default({
  // A list of all locales that are supported
  locales: ["en", "ru", "zh"],

  // Used when no locale matches
  defaultLocale: "ru",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ru|en|zh)/:path*"],
};
