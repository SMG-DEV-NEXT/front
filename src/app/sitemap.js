import { getAllSlugs } from "@/lib/api"; // твой способ достать slug'и

export default async function sitemap() {
  const baseUrl = "https://smg-back.ru";
  const slugs = await getAllSlugs(); // ["slug1", "slug2", ...]

  const urls = [
    {
      url: `${baseUrl}/en`,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          ru: `${baseUrl}/ru/`,
          "x-default": `${baseUrl}/en/`,
        },
      },
    },
    {
      url: `${baseUrl}/ru`,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          ru: `${baseUrl}/ru/`,
          "x-default": `${baseUrl}/ru/`,
        },
      },
    },
    ...slugs.flatMap((slug) => [
      {
        url: `${baseUrl}/en/${slug}`,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${slug}/`,
            ru: `${baseUrl}/ru/${slug}/`,
            "x-default": `${baseUrl}/en/${slug}/`,
          },
        },
      },
      {
        url: `${baseUrl}/ru/${slug}`,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${slug}/`,
            ru: `${baseUrl}/ru/${slug}/`,
            "x-default": `${baseUrl}/ru/${slug}/`,
          },
        },
      },
    ]),
  ];

  return urls;
}
