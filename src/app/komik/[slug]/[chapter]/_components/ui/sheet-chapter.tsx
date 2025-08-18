"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChapterList } from "@/types/detail-komik.type";
import { List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SheetChapter({
  chapterList,
  slug,
}: {
  chapterList: ChapterList[];
  slug: string;
}) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <List />
          <p className="hidden md:block">Chapters</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>All Chapters</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="flex flex-col">
            {chapterList.map((chapter, index) => {
              const isSelected = pathname?.endsWith(chapter.url);
              return (
                <div key={index}>
                  <Link href={`/komik/${slug}/${chapter.url}`}>
                    <p
                      className={cn(
                        "p-3 font-medium cursor-pointer transition-colors",
                        "hover:bg-accent",
                        isSelected
                          ? "bg-accent/100 text-accent-foreground font-semibold"
                          : ""
                      )}
                    >
                      {chapter.title}
                    </p>
                  </Link>
                  {index !== chapterList.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
