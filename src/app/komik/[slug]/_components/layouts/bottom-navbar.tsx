"use client";

import { Button } from "@/components/ui/button";
import { ChapterDetail } from "@/types/detail-komik.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layouts/container";
import { useScrollVisibility } from "@/hooks/use-scroll-visibilty";

interface ChapterDetailProps {
  prevChapter: ChapterDetail["prevChapter"];
  nextChapter: ChapterDetail["nextChapter"];
  slug: ChapterDetail["slug"];
}

export default function BottomNavBarChapter({
  prevChapter,
  nextChapter,
  slug,
}: ChapterDetailProps) {
  const isVisible = useScrollVisibility();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 shadow transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full" // 3. Gunakan hasilnya
      }`}
    >
      <Container className="flex items-center justify-between py-3">
        {prevChapter && (
          <Link href={`/komik/${slug}/${prevChapter}`}>
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="mr-2" />
              Previous
            </Button>
          </Link>
        )}
        {nextChapter && (
          <Link href={`/komik/${slug}/${nextChapter}`}>
            <Button variant="outline" className="flex items-center">
              <ChevronRight className="mr-2" />
              Next
            </Button>
          </Link>
        )}
      </Container>
    </div>
  );
}
