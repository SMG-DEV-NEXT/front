// app/layout.js

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

  const meta = translations[params.lang] || translations.en;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: params.lang === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export const dynamic = "force-dynamic";
export default function RootLayout({ children }) {
  return (
    <html className="h-full">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>SMG</title>
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-input">
        {children}
      </body>
    </html>
  ); // Just pass children through
}
