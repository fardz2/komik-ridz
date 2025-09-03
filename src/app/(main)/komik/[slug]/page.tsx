import Container from "@/components/layouts/container";
import { getKomikDetail } from "@/services/detail-komik.service";
import { Suspense } from "react";
import { KomikDetailComponent } from "./_components/layouts/detail-komik";
import { KomikDetailSkeleton } from "./_components/layouts/detail-komik-skeleton";
import type { Metadata } from "next";

interface KomikPageProps {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<KomikPageProps>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getKomikDetail(slug);

  const title = data.title || "Komik Indonesia";
  const description =
    data.sinopsis?.slice(0, 160) ||
    `Baca ${data.title} bahasa Indonesia (${
      data.type || "komik"
    }). Koleksi lengkap update terbaru hanya di Komikridz.`;
  const image = data.image || "/default-thumbnail.jpg";
  const url = `https://komik-ridz.vercel.app/komik/${slug}`;

  return {
    title: `${title} Bahasa Indonesia - Baca Online`,
    description,
    keywords: [
      title,
      data.nativeTitle,
      `${title} bahasa indonesia`,
      `baca ${data.type || "komik"}`,
      data.author,
      ...(data.genres ?? []),
      "manga indonesia",
      "manhwa indonesia",
      "manhua indonesia",
      "komik online",
      "komik bahasa indonesia",
    ],
    openGraph: {
      title: `${title} Bahasa Indonesia`,
      description,
      url,
      siteName: "Komikridz",
      locale: "id_ID",
      type: "article",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Book",
        name: data.title,
        alternativeHeadline: data.nativeTitle,
        author: {
          "@type": "Person",
          name: data.author || "Tidak diketahui",
        },
        genre: data.genres,
        image,
        description,
        datePublished: data.released || undefined,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: data.rating || "0",
          reviewCount: data.totalChapter !== "?" ? data.totalChapter : "0",
        },
      }),
    },
  };
}

export default async function KomikPage({
  params,
}: {
  params: Promise<KomikPageProps>;
}) {
  const { slug } = await params;
  const { data } = await getKomikDetail(slug);

  return (
    <Container>
      <Suspense fallback={<KomikDetailSkeleton />}>
        <KomikDetailComponent komik={data} />
      </Suspense>
    </Container>
  );
}
