import Container from "@/components/layouts/container";
import { getKomikDetail } from "@/services/detail-komik.service";
import { Suspense } from "react";
import { KomikDetailComponent } from "./_components/layouts/detail-komik";
import { KomikDetailSkeleton } from "./_components/layouts/detail-komik-skeleton";

interface KomikPageProps {
  slug: string;
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
