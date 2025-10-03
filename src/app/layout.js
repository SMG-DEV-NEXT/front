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
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-input">
        {children}
      </body>
    </html>
  ); // Just pass children through
}
