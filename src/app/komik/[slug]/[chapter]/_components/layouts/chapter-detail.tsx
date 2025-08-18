"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChapterDetail } from "@/types/detail-komik.type";

import { cn } from "@/lib/utils";

interface ChapterDetailProps {
  chapterData: ChapterDetail;
}

export function ChapterDetailComponent({ chapterData }: ChapterDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"scroll" | "single">("scroll"); // default scroll mode

  const nextImage = () => {
    if (currentImageIndex < chapterData.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToImage = (index: number) => setCurrentImageIndex(index);

  return (
    <div className="min-h-screen bg-background">
      {/* Mode Toggle */}
      <div className=" py-4 flex justify-between items-center">
        <Button
          onClick={() =>
            setViewMode(viewMode === "scroll" ? "single" : "scroll")
          }
          className="flex items-center gap-2"
          variant={"outline"}
        >
          {viewMode === "scroll" ? (
            <>
              <LayoutGrid className="w-4 h-4" />
            </>
          ) : (
            <>
              <LayoutList className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {viewMode === "single" ? (
        // Single image mode
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={prevImage}
              disabled={currentImageIndex === 0}
              variant={"outline"}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={nextImage}
              disabled={currentImageIndex === chapterData.images.length - 1}
              variant={"outline"}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <img
            src={chapterData.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Page ${currentImageIndex + 1}`}
            className="w-full h-auto object-contain"
          />

          {/* Thumbnails */}
          <ScrollArea className="mt-4 ">
            <div className="flex gap-4 w-max py-3">
              {chapterData.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Page ${index + 1}`}
                  // className={"w-16 h-20 object-cover" }
                  className={cn(
                    "w-16 h-20 object-cover",
                    index === currentImageIndex
                      ? "ring-2 ring-primary"
                      : "hover:ring-1 ring-muted-foreground"
                  )}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        // Scroll mode
        <ScrollArea className="max-h-[80vh] space-y-4">
          {chapterData.images.map((image, index) => (
            <img
              src={image || "/placeholder.svg"}
              alt={`Page ${index + 1}`}
              className="w-full h-auto object-contain"
              key={index}
            />
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
