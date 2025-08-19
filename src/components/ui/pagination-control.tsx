"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Asumsi tipe data Anda
type PaginationType = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function PaginationControls({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
}: PaginationType) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Tampilkan ellipsis awal jika perlu
    if (currentPage > 2) {
      pageNumbers.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Tampilkan halaman di sekitar halaman saat ini
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handleNavigation(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Tampilkan ellipsis akhir jika perlu
    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Tombol Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleNavigation(currentPage - 1)}
            aria-disabled={!hasPrev}
            tabIndex={!hasPrev ? -1 : undefined}
            className={
              !hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Tombol halaman pertama (FIXED) */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handleNavigation(1)}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Nomor halaman di tengah */}
        {renderPageNumbers()}

        {/* Tombol halaman terakhir (FIXED) */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handleNavigation(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Tombol Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleNavigation(currentPage + 1)}
            aria-disabled={!hasNext}
            tabIndex={!hasNext ? -1 : undefined}
            className={
              !hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
