import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import QueryProvider from "../../QueryProvider";
import MiddleComponent from "../../context/Middle";
import Providers from "../../components/Provider";

export default async function RootLayout({ children, params: paramsPromise }) {
  // ✅ Await params (required in Next.js 15)
  const params = await paramsPromise;

  // 🛠 Debugging: Log params
  console.log("🚀 Server Render - params:", params);

  // ✅ Ensure locale has a default value
  const locale = params?.locale || "en";

  // 🛠 Debugging: Log the final locale being used
  console.log("✅ Using locale:", locale);

  // Fetch translations
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
