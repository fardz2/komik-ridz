import { getChapterDetail } from "@/services/detail-komik.service";
import { Suspense } from "react";
import ChapterDetailSkeleton from "./_components/layouts/chapter-detail-skeleton";
import { ChapterDetailComponent } from "./_components/layouts/chapter-detail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ChapterParams {
  chapter: string;
  slug: string;
}

// ✅ Metadata dinamis untuk Chapter
export async function generateMetadata({
  params,
}: {
  params: Promise<ChapterParams>;
}): Promise<Metadata> {
  const { slug, chapter } = await params;
  const { data } = await getChapterDetail(slug, chapter);

  if (!data || !data.chapter) {
    return {
      title: "Chapter tidak ditemukan - KomikRidz",
      description: "Chapter yang kamu cari tidak tersedia.",
    };
  }

  const title = `Baca ${slug.replace(/-/g, " ")} Chapter ${
    data.chapter
  } Bahasa Indonesia`;
  const description = `Baca ${slug.replace(/-/g, " ")} Chapter ${
    data.chapter
  } bahasa Indonesia secara gratis dan lengkap hanya di KomikRidz.`;
  const url = `https://komik-ridz.vercel.app/komik/${slug}/${chapter}`;

  return {
    title,
    description,
    keywords: [
      slug.replace(/-/g, " "),
      `${slug.replace(/-/g, " ")} chapter ${data.chapter}`,
      `${slug.replace(/-/g, " ")} bahasa indonesia`,
      "baca manga",
      "baca manhwa",
      "baca manhua",
      "komik online",
      "komik bahasa indonesia",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "KomikRidz",
      locale: "id_ID",
      type: "article",
      images: [
        {
          url: data.images[0] || "/default-thumbnail.jpg", // ambil halaman pertama sebagai thumbnail
          width: 800,
          height: 600,
          alt: `${slug} Chapter ${data.chapter}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.images[0] || "/default-thumbnail.jpg"],
    },
    alternates: {
      canonical: url,
    },
    other: {
      // ✅ Structured data untuk Chapter (BookChapter)
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Chapter",
        name: title,
        url,
        isPartOf: {
          "@type": "Book",
          name: slug.replace(/-/g, " "),
        },
        position: data.chapter,
        potentialAction: {
          "@type": "ReadAction",
          target: url,
        },
      }),
    },
  };
}

export default async function Chapter({
  params,
}: {
  params: Promise<ChapterParams>;
}) {
  const { slug, chapter } = await params;
  const chapterData = await getChapterDetail(slug, chapter);

  if (!chapterData.data || !chapterData.data.images?.length) {
    return notFound();
  }

  return (
    <Suspense fallback={<ChapterDetailSkeleton />}>
      <ChapterDetailComponent images={chapterData.data.images} slug={slug} />
    </Suspense>
  );
}
