import { getChapterDetail } from "@/services/detail-komik.service";
import BottomNavBarChapter from "../_components/layouts/bottom-navbar";
import { ChapterDetail } from "@/types/detail-komik.type";

interface ChapterLayoutProps {
  children: React.ReactNode;
}

export default async function ChapterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<ChapterDetail>;
}) {
  const { slug, chapter } = await params;
  const chapterData = await getChapterDetail(slug, chapter);

  return (
    <>
      {children}
      <BottomNavBarChapter chapterDetail={chapterData.data} />
    </>
  );
}
