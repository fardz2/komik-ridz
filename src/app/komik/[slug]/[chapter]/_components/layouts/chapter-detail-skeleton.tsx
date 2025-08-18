import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ChapterDetailSkeleton() {
  const thumbnailCount = 6; // jumlah thumbnail skeleton

  return (
    <div className={cn("min-h-screen", "bg-background", "p-4")}>
      {/* Mode Toggle Skeleton */}
      <div className={cn("flex", "justify-between", "items-center", "mb-4")}>
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Main Image Skeleton */}
      <Skeleton className="w-full h-[500px] rounded-md mb-4" />

      {/* Thumbnails Skeleton */}
      <ScrollArea className="mt-2">
        <div className="flex gap-4 w-max py-3">
          {Array.from({ length: thumbnailCount }).map((_, index) => (
            <Skeleton key={index} className="w-16 h-20 rounded-md" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Scroll Mode Skeleton */}
      <ScrollArea className="max-h-[80vh] space-y-4 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[400px] rounded-md" />
        ))}
      </ScrollArea>
    </div>
  );
}
