"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChapterDetail } from "@/types/detail-komik.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layouts/container";

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
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scroll ke bawah → sembunyikan
        setShow(false);
      } else {
        // scroll ke atas → tampilkan
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0  shadow transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
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
