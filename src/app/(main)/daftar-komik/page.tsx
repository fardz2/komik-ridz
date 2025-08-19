// app/daftar-komik/page.tsx

import Container from "@/components/layouts/container";

import { ComicFilters } from "./_components/ui/daftar-komik-filter";
import { Suspense } from "react";
import { PaginationControls } from "@/components/ui/pagination-control";

import { getDaftarKomik } from "@/services/komik.service";
import { KomikList } from "./_components/layouts/daftar-komik";

// SOLUSI UTAMA: Paksa rendering dinamis
export const dynamic = "force-dynamic";

interface DaftarKomikPageProps {
  searchParams?: {
    page?: string;
    "genre[]"?: string | string[];
    status?: string;
    type?: string;
    orderby?: string;
  };
}

export default async function DaftarKomikPage({
  searchParams,
}: DaftarKomikPageProps) {
  const filters = {
    page: searchParams?.page ? parseInt(searchParams.page, 10) : 1,
    genre: searchParams?.["genre[]"]
      ? Array.isArray(searchParams["genre[]"])
        ? searchParams["genre[]"]
        : [searchParams["genre[]"]]
      : [],
    status: searchParams?.status || "All",
    type: searchParams?.type || "All",
    orderby: searchParams?.orderby || "All",
  };

  // Fetch pagination data di komponen utama agar bisa di-pass ke PaginationControls
  // Ini bisa dioptimalkan lebih lanjut, tapi untuk sekarang ini sudah cukup
  const { pagination } = await getDaftarKomik(filters);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Komik</h1>
        <ComicFilters />
      </div>
      <div className="flex flex-wrap gap-4 justify-center xl:justify-start">
        <Suspense
          fallback={
            <div className="w-full text-center p-8">Memuat komik...</div>
          }
        >
          {/* Panggil komponen async di dalam Suspense */}
          <KomikList filters={filters} />
        </Suspense>
      </div>
      <div className="mt-5 mb-10">
        <PaginationControls
          currentPage={pagination?.currentPage ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          hasNext={pagination?.hasNext ?? false}
          hasPrev={pagination?.hasPrev ?? false}
        />
      </div>
    </Container>
  );
}
