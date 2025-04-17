function getLanguage() {
  const params = window.location.pathname;
  const locale = params.split("/")[1];
  return locale === "ru" ? "Ru" : "En";
}

export default getLanguage;
