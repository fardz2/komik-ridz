import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function KomikDetailSkeleton() {
  return (
    <>
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cover Image */}
        <div className="lg:col-span-1">
          <Skeleton className="w-full aspect-[3/4] rounded-lg" />
        </div>

        {/* Info Section */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-8 w-3/4 mb-2 rounded" /> {/* Title */}
          <Skeleton className="h-6 w-1/2 mb-4 rounded" /> {/* Native Title */}
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-10 rounded" />
          </div>
          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded" />
            ))}
          </div>
          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            ))}
          </div>
          {/* Synopsis */}
          <div>
            <Skeleton className="h-6 w-1/3 mb-3 rounded" />{" "}
            {/* Synopsis Title */}
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Chapters Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-1/4 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-32 rounded" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-transparent"
                >
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
