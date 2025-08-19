import Container from "@/components/layouts/container";
import {
  getChapterDetail,
  getKomikDetail,
} from "@/services/detail-komik.service";

import { Suspense } from "react";
import NavBarChapter from "./_components/layouts/nav-bar-chapter";

interface ChapterLayoutProps {
  children: React.ReactNode;
}
interface Params {
  slug: string;
}

export default async function ChapterLayout({
  params,
  children,
}: ChapterLayoutProps & { params: Promise<Params> }) {
  const { slug } = await params;

  const chapterData = await getKomikDetail(slug);
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBarChapter
          slug={chapterData.data.slug}
          title={chapterData.data.title}
          chapters={chapterData.data.chapters}
        />
      </Suspense>
      <div className="mt-20">{children}</div>
    </Container>
  );
}
