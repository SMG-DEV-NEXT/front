import { Suspense } from "react";
import Loading from "./loading";

// app/layout.js
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
      <body className="min-h-screen flex flex-col justify-between ">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  ); // Just pass children through
}
