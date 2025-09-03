import type { Metadata } from "next";
import Container from "@/components/layouts/container";
import { getDaftarKomik } from "@/services/komik.service";
import { ComicFilters } from "./_components/ui/daftar-komik-filter";
import { Suspense } from "react";
import { PaginationControls } from "@/components/ui/pagination-control";
import CardKomikSkeleton from "./_components/ui/card-komik-skeleton";
import { ComicList } from "./_components/layouts/komik-list";
import { DaftarKomikPageProps } from "@/types/komik.type";

export async function generateMetadata({
  searchParams,
}: DaftarKomikPageProps): Promise<Metadata> {
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

  // Construct dynamic title and description
  const baseTitle = "Daftar Komik - KomikRidz";
  const genrePart =
    filters.genre.length > 0 ? `Genre ${filters.genre.join(", ")}` : "";
  const statusPart = filters.status !== "All" ? `${filters.status}` : "";
  const typePart = filters.type !== "All" ? `${filters.type}` : "";
  const pagePart = filters.page > 1 ? ` - Halaman ${filters.page}` : "";
  const title = [baseTitle, genrePart, statusPart, typePart, pagePart]
    .filter(Boolean)
    .join(" | ");

  const baseDescription =
    "Temukan daftar manga, manhwa, dan manhua terlengkap dalam bahasa Indonesia di KomikRidz. Update harian gratis dengan filter genre, status, dan tipe.";
  const dynamicDescription = [
    baseDescription,
    filters.genre.length > 0
      ? `Filter genre: ${filters.genre.join(", ")}. `
      : "",
    filters.status !== "All" ? `Status: ${filters.status}. ` : "",
    filters.type !== "All" ? `Tipe: ${filters.type}. ` : "",
    filters.page > 1 ? `Halaman: ${filters.page}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    description: dynamicDescription,
    keywords: [
      "daftar komik",
      "baca manga online",
      "manga bahasa indonesia",
      "baca manhwa gratis",
      "manhwa bahasa indonesia",
      "baca manhua online",
      "manhua bahasa indonesia",
      "komik online gratis",
      "komik bahasa indonesia",
      ...(filters.genre.length > 0
        ? filters.genre.map((g) => `komik ${g}`)
        : []),
      ...(filters.status !== "All" ? [`komik ${filters.status}`] : []),
      ...(filters.type !== "All" ? [`komik ${filters.type}`] : []),
      "manga terbaru",
      "manhwa terupdate",
      "manhua terbaru",
      "komik terjemahan indonesia",
    ],
    authors: [{ name: "KomikRidz", url: "https://komik-ridz.vercel.app/" }],
    openGraph: {
      title,
      description: dynamicDescription,
      url: `https://komik-ridz.vercel.app/daftar-komik?${(() => {
        const params = new URLSearchParams();
        params.set("page", filters.page.toString());
        if (filters.genre.length > 0) {
          filters.genre.forEach((g) => params.append("genre[]", g));
        }
        if (filters.status !== "All") {
          params.set("status", filters.status);
        }
        if (filters.type !== "All") {
          params.set("type", filters.type);
        }
        if (filters.orderby !== "All") {
          params.set("orderby", filters.orderby);
        }
        return params.toString();
      })()}`,
      siteName: "KomikRidz",
      locale: "id_ID",
      type: "website",
    },
    alternates: {
      canonical: `https://komik-ridz.vercel.app/daftar-komik?${(() => {
        const params = new URLSearchParams();
        params.set("page", filters.page.toString());
        if (filters.genre.length > 0) {
          filters.genre.forEach((g: string) => params.append("genre[]", g));
        }
        if (filters.status !== "All") {
          params.set("status", filters.status);
        }
        if (filters.type !== "All") {
          params.set("type", filters.type);
        }
        if (filters.orderby !== "All") {
          params.set("orderby", filters.orderby);
        }
        return params.toString();
      })()}`,
    },
  };
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
