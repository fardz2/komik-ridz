import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { KomikDetail } from "@/types/detail-komik.type";
import { Star, Calendar, User, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import { formatDate } from "@/lib/format-date";

interface KomikDetailProps {
  komik: KomikDetail;
}

export function KomikDetailComponent({ komik }: KomikDetailProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
            <CustomImage
              src={komik.image || "/placeholder.svg"}
              alt={komik.title}
              className="w-full h-full rounded-lg"
            />
            <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">
              {komik.type}
            </Badge>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{komik.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {komik.nativeTitle}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{komik.rating}</span>
              <span className="text-muted-foreground">/ 10</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {komik.genres.map((genre, index) => (
                <Badge key={index} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Author:</span>
                <span className="font-medium">{komik.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Released:</span>
                <span className="font-medium">{komik.released}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge
                  variant={komik.status === "Ongoing" ? "default" : "secondary"}
                >
                  {komik.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="font-medium">
                  {formatDate(komik.updatedOn)}
                </span>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
            <p className="text-muted-foreground leading-relaxed">
              {komik.sinopsis}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Chapters Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Chapters ({komik.totalChapter})
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chapter List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full h-72">
              <div className="space-y-2">
                {komik.chapters.map((chapter, index) => (
                  <Link
                    key={index}
                    href={`/komik/${komik.slug}/${chapter.url}`}
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                      <div className="flex-1">
                        <h4 className="font-medium">{chapter.title}</h4>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chapter.updatedAt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
