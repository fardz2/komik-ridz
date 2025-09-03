import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Baca Manga, Manhwa & Manhua Bahasa Indonesia",
  description:
    "Nikmati koleksi lengkap manga, manhwa, dan manhua bahasa Indonesia. Update terbaru, gratis, dan mudah diakses setiap hari.",
  keywords: [
    "baca manga",
    "manga indonesia",
    "baca manhwa",
    "manhwa indonesia",
    "baca manhua",
    "manhua indonesia",
    "komik online",
    "komik bahasa indonesia",
  ],
  authors: [{ name: "KomikRidz" }],
  openGraph: {
    title: "Baca Manga, Manhwa & Manhua Bahasa Indonesia",
    description:
      "Koleksi manga, manhwa, dan manhua bahasa Indonesia terlengkap. Gratis dan update setiap hari.",
    url: "https://komik-ridz.vercel.app/",
    siteName: "Komikindo",
    locale: "id_ID",
    type: "website",
  },
  metadataBase: new URL("https://komik-ridz.vercel.app/"),
  alternates: {
    canonical: "https://komik-ridz.vercel.app/",
    languages: {
      "id-ID": "https://komik-ridz.vercel.app/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
