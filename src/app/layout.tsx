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
    "Baca manga, manhwa, dan manhua terlengkap dalam bahasa Indonesia di KomikRidz. Nikmati update harian gratis, kualitas tinggi, dan akses mudah dari perangkat apa pun.",
  keywords: [
    "baca manga online",
    "manga bahasa indonesia",
    "baca manhwa gratis",
    "manhwa bahasa indonesia",
    "baca manhua online",
    "manhua bahasa indonesia",
    "komik online gratis",
    "komik bahasa indonesia",
    "manga terbaru",
    "manhwa terupdate",
    "manhua terbaru",
    "baca komik online",
    "komik indonesia gratis",
    "manga populer",
    "manhwa populer",
    "manhua populer",
    "komik terjemahan indonesia",
    "baca manga terbaru",
    "baca manhwa terbaru",
    "baca komik gratis",
    "komik online indonesia",
    "manga online indonesia",
    "manhwa online indonesia",
    "manhua online indonesia",
  ],
  authors: [{ name: "KomikRidz" }],
  openGraph: {
    title: "Baca Manga, Manhwa & Manhua Bahasa Indonesia",
    description:
      "Koleksi manga, manhwa, dan manhua bahasa Indonesia terlengkap. Gratis dan update setiap hari.",
    url: "https://komik-ridz.vercel.app/",
    siteName: "KomikRidz",
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
