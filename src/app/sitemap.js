import CatalogService from "@/services/Catalog";

export default async function sitemap() {
  const baseUrl = "https://smg-back.ru";

  let slugs = [];
  try {
    const data = await CatalogService.getCatalogs({ limit: 100, page: 1 });
    slugs = data?.data?.data?.map((cat) => cat.link) || [];
  } catch (e) {
    console.error("Failed to load slugs for sitemap:", e);
  }

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
