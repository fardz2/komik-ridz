import Container from "@/components/layouts/container";
import { getDaftarKomik } from "@/services/komik.service";
import CardKomik from "../_components/ui/card-komik";
import { ComicFilters } from "./_components/ui/daftar-komik-filter";
import { Suspense } from "react";
import { PaginationControls } from "@/components/ui/pagination-control";
import CardKomikSkeleton from "./_components/ui/card-komik-skeleton";
import { ComicList } from "./_components/layouts/komik-list";

interface DaftarKomikPageProps {
  searchParams?: Promise<{
    page?: string;
    "genre[]"?: string | string[];
    status?: string;
    type?: string;
    orderby?: string;
  }>;
}

export default async function DaftarKomikPage({
  searchParams,
}: DaftarKomikPageProps) {
  const resolvedSearchParams = await searchParams;

  const filters = {
    page: resolvedSearchParams?.page
      ? parseInt(resolvedSearchParams.page, 10)
      : 1,
    genre: resolvedSearchParams?.["genre[]"]
      ? Array.isArray(resolvedSearchParams["genre[]"])
        ? resolvedSearchParams["genre[]"]
        : [resolvedSearchParams["genre[]"]]
      : [],
    status: resolvedSearchParams?.status || "All",
    type: resolvedSearchParams?.type || "All",
    orderby: resolvedSearchParams?.orderby || "All",
  };

  const daftarKomik = await getDaftarKomik(filters);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Komik</h1>
        <ComicFilters />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5">
        <Suspense
          key={
            filters.page +
            filters.genre.join(",") +
            filters.status +
            filters.type +
            filters.orderby
          }
          fallback={<CardKomikSkeleton />}
        >
          <ComicList comics={daftarKomik.data} />
        </Suspense>
      </div>
      {daftarKomik.data.length > 0 && (
        <div className="mt-5 mb-10">
          <PaginationControls
            currentPage={daftarKomik.pagination?.currentPage ?? 1}
            totalPages={daftarKomik.pagination?.totalPages ?? 1}
            hasNext={daftarKomik.pagination?.hasNext ?? false}
            hasPrev={daftarKomik.pagination?.hasPrev ?? false}
          />
        </div>
      )}
    </Container>
  );
}
