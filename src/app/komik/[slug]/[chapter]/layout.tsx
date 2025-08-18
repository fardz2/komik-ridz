import Container from "@/components/layouts/container";
import { getKomikDetail } from "@/services/detail-komik.service";
import SheetChapter from "./_components/ui/sheet-chapter";
import NavBarChapter from "./_components/layouts/nav-bar-chapter";
interface ChapterLayoutProps {
  children: React.ReactNode;
}
interface params {
  slug: string;
}
export default async function ChapterLayout({
  params,
  children,
}: ChapterLayoutProps & { params: Promise<params> }) {
  const { slug } = await params;
  const chapterData = await getKomikDetail(slug);

  return (
    <Container>
      <NavBarChapter KomikDetail={chapterData.data} />
      {children}
    </Container>
  );
}
