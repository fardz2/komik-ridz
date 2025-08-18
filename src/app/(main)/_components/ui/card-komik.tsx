import { KomikItem } from "@/types/komik.type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import CustomImage from "@/components/ui/custom-image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardKomikProps extends KomikItem {
  className?: string;
}

export default function CardKomik({
  title,
  image,
  slug,
  type,
  chapter,
  rating,
  className,
}: CardKomikProps) {
  return (
    <Link href={`/komik/${slug}`}>
      <Card
        className={cn(
          "w-44  overflow-hidden pt-0 gap-2 justify-start ",
          className
        )}
      >
        <div className="relative">
          <CustomImage src={image} alt={title} className="w-full h-48" />
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-black/70 text-white hover:bg-black/80"
          >
            {type}
          </Badge>
        </div>
        <CardContent className="px-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            {chapter && (
              <span className="text-sm text-muted-foreground">{chapter}</span>
            )}

            <div className="flex items-center gap-1 justify-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
