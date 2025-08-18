import { getChapterDetail } from "@/services/detail-komik.service";

import { Suspense } from "react";
import ChapterDetailSkeleton from "./_components/layouts/chapter-detail-skeleton";
import { ChapterDetailComponent } from "./_components/layouts/chapter-detail";
import { notFound } from "next/navigation";

interface ChapterParams {
  chapter: string;
  slug: string;
}

export default async function Chapter({
  params,
}: {
  params: Promise<ChapterParams>;
}) {
  const { slug, chapter } = await params;
  const chapterData = await getChapterDetail(slug, chapter);
  if (!chapterData.data) {
    return notFound();
  }
  return (
    <Suspense fallback={<ChapterDetailSkeleton />}>
      <ChapterDetailComponent chapterData={chapterData.data} />
    </Suspense>
  );
}
