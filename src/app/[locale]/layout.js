import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import QueryProvider from "../../QueryProvider";
import MiddleComponent from "../../context/Middle";
import Providers from "../../components/Provider";
export async function generateMetadata({ params }) {
  const translations = {
    en: {
      title: "SMG – Private Cheats",
      description: "Buy undetectable cheats with secure payments.",
    },
    ru: {
      title: "SMG – Приватные читы",
      description: "Покупайте незаметные читы с безопасной оплатой.",
    },
  };

  const { locale, slug } = params; // slug если у тебя динамический путь
  const meta = translations[locale] || translations.en;

  // 👇 домен лучше через env, а пока напрямую
  const baseUrl = "https://smg-back.ru";

  // строим URLы
  const path = slug ? `/${slug}` : ""; // slug может быть undefined
  const urlEn = `${baseUrl}${path}`;
  const urlRu = `${baseUrl}/ru${path}`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: locale === "ru" ? urlRu : urlEn,
    },
    alternates: {
      canonical: locale === "ru" ? urlRu : urlEn,
      languages: {
        en: urlEn,
        ru: urlRu,
        "x-default": urlEn,
      },
    },
  };
}

export default async function RootLayout({ children, params: paramsPromise }) {
  // ✅ Await params (required in Next.js 15)
  const params = await paramsPromise;

  // ✅ Ensure locale has a default value
  const locale = params?.locale || "en";

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <QueryProvider>
          <MiddleComponent>{children}</MiddleComponent>
        </QueryProvider>
      </Providers>
    </NextIntlClientProvider>
  );
  // return (
  //   <html lang={locale}>
  //     <head>
  //       <title>SMG</title>
  //     </head>
  //     <body>
  //       <Providers>
  //         <QueryProvider>
  //           <NextIntlClientProvider messages={messages}>
  //             <MiddleComponent>{children}</MiddleComponent>
  //           </NextIntlClientProvider>
  //         </QueryProvider>
  //       </Providers>
  //     </body>
  //   </html>
  // );
}
