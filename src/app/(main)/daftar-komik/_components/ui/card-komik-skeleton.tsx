import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CardKomikSkeleton() {
  return (
    <>
      {/* Render multiple skeleton cards to match the grid layout */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          key={index}
          className={cn(
            "overflow-hidden pt-0 gap-2 justify-start h-80 pb-0 w-full max-w-52"
          )}
        >
          <div className="relative">
            <Skeleton className="w-full h-52" /> {/* Image placeholder */}
            <Skeleton className="absolute top-2 left-2 w-12 h-6" />{" "}
            {/* Badge placeholder */}
          </div>
          <div className="px-2 flex flex-col">
            <Skeleton className="h-6 w-3/4 mt-2" />{" "}
            {/* Title placeholder (2 lines) */}
            <Skeleton className="h-4 w-1/2 mt-1" /> {/* Second line of title */}
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-4 w-16" /> {/* Chapter placeholder */}
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4" /> {/* Star icon placeholder */}
                <Skeleton className="h-4 w-8" /> {/* Rating placeholder */}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
