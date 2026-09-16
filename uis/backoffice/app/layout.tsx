import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brasaland Backoffice",
  description: "Panel interno de operaciones de Brasaland.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-stone-100 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}