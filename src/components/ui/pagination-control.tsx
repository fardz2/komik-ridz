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
import { useSearchParams, usePathname } from "next/navigation";
import { JSX } from "react";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to generate href for a given page number
  const createPageHref = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];

    // Skip rendering if totalPages is 1
    if (totalPages <= 1) return pageNumbers;

    // Show ellipsis at the start if currentPage > 2
    if (currentPage > 2 && totalPages > 3) {
      pageNumbers.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Render pages around the current page
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageHref(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis at the end if currentPage < totalPages - 1
    if (currentPage < totalPages - 1 && totalPages > 3) {
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
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageHref(currentPage - 1)}
            aria-disabled={!hasPrev}
            tabIndex={!hasPrev ? -1 : undefined}
          />
        </PaginationItem>

        {/* First Page */}
        {totalPages > 3 && currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={createPageHref(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Last Page */}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={createPageHref(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={createPageHref(currentPage + 1)}
            aria-disabled={!hasNext}
            tabIndex={!hasNext ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
