"use client";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import SheetChapter from "../ui/sheet-chapter";
import { KomikDetail } from "@/types/detail-komik.type";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBarChapter({
  KomikDetail,
}: {
  KomikDetail: KomikDetail;
}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Cek apakah ada chapter dengan format "chapter-<angka>"
  const chapterMatch = pathname?.match(/chapter-(\d+)/);
  const currentChapterNumber = chapterMatch ? chapterMatch[1] : null;

  // Scroll listener untuk hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false); // scroll ke bawah → hide
      } else {
        setIsVisible(true); // scroll ke atas → show
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container className="flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <Link href={`/komik/${KomikDetail.slug}`}>
            <Button variant="outline">
              <ChevronLeftIcon /> <p className="hidden md:block">Back</p>
            </Button>
          </Link>

          <div>
            <h3 className="md:text-xl text-md font-semibold truncate max-w-[120px] md:max-w-2xl">
              {KomikDetail.title}
            </h3>
            {currentChapterNumber && (
              <p className="text-sm">Chapter {currentChapterNumber}</p>
            )}
          </div>
        </div>

        <SheetChapter
          chapterList={KomikDetail.chapters}
          slug={KomikDetail.slug}
        />
      </Container>
    </nav>
  );
}
