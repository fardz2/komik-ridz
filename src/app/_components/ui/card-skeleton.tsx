import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardKomikSkeletonProps {
  className?: string;
}

export default function CardKomikSkeleton({
  className,
}: CardKomikSkeletonProps) {
  return (
    <Card
      className={cn("w-44 overflow-hidden pt-0 gap-2 justify-start", className)}
    >
      <div className="relative">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-48" />
        {/* Badge Skeleton */}
        <Skeleton className="absolute top-2 left-2 w-16 h-5 rounded-md" />
      </div>

      <CardContent className="px-2">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-32 mb-2 rounded" />
        {/* Chapter & Rating Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
