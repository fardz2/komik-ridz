import { ChapterDetail } from "@/types/detail-komik.type";

import Container from "@/components/layouts/container";
import ImageKomik from "../ui/image-komik";
import { Suspense } from "react";

interface ChapterDetailProps {
  images: ChapterDetail["images"];
}

export function ChapterDetailComponent({ images }: ChapterDetailProps) {
  if (!images || images.length === 0) {
    return <div>No images available for this chapter.</div>;
  }
  return (
    <>
      <Container className="hidden md:block">
        <div className="min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            {images.map((image, index) => (
              <ImageKomik
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Page ${index + 1}`}
              />
            ))}
          </Suspense>
        </div>
      </Container>
      <div className="min-h-screen block md:hidden">
        <Suspense fallback={<div>Loading...</div>}>
          {images.map((image, index) => (
            <ImageKomik
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Page ${index + 1}`}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
}
