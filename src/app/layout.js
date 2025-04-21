import { Suspense } from "react";
import Loading from "./loading";

// app/layout.js
export const dynamic = "force-dynamic";
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>SMG</title>
      </head>
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  ); // Just pass children through
}
