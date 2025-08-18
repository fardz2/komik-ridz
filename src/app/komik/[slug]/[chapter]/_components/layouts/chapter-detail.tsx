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
import { Card } from "@/components/ui/card";
import Container from "@/components/layouts/container";

interface ChapterDetailProps {
  chapterData: ChapterDetail;
}

export function ChapterDetailComponent({ chapterData }: ChapterDetailProps) {
  return (
    <>
      <Container className="hidden md:block">
        <div className="min-h-screen">
          {chapterData.images.map((image, index) => (
            <img
              src={image || "/placeholder.svg"}
              alt={`Page ${index + 1}`}
              className="w-full h-auto object-contain"
              key={index}
            />
          ))}
        </div>
      </Container>
      <div className="min-h-screen block md:hidden">
        {chapterData.images.map((image, index) => (
          <img
            src={image || "/placeholder.svg"}
            alt={`Page ${index + 1}`}
            className="w-full h-auto object-contain"
            key={index}
          />
        ))}
      </div>
    </>
  );
}
