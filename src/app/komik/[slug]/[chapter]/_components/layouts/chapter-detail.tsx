"use client";

import { ChapterDetail } from "@/types/detail-komik.type";
import { useMediaQuery } from "@/hooks/use-media-query";
import Container from "@/components/layouts/container";
import ImageKomik from "../ui/image-komik";

interface ChapterDetailProps {
  images: ChapterDetail["images"];
  slug: string;
}

export function ChapterDetailComponent({ images, slug }: ChapterDetailProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!images || images.length === 0) {
    return <Container>No images available for this chapter.</Container>;
  }

  const imageList = (
    <div className="min-h-screen">
      {images.map((image, index) => (
        <ImageKomik
          key={index}
          src={image || "/placeholder.svg"}
          alt={`${slug} - Page ${index + 1}`}
        />
      ))}
    </div>
  );

  if (isDesktop) {
    return <Container className=" lg:px-52">{imageList}</Container>;
  }

  return imageList;
}
