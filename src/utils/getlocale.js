export const getLocale = () => {
  if (typeof window === "undefined") return "ru";
  const segments = window.location.pathname.split("/");
  const maybeLocale = segments[1];
  return maybeLocale === "en" ? "en" : "ru";
};
