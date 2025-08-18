import Container from "@/components/layouts/container";
import HotKomik from "./_components/layouts/hot-komik";
import { Suspense } from "react";
import KomikSkeleton from "./_components/layouts/komik-skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Komik() {
  return (
    <Container>
      <h1 className="text-2xl font-bold">Hot Komik</h1>

      <ScrollArea className="mt-2 w-full">
        <div className="flex gap-4 w-max">
          <Suspense fallback={<KomikSkeleton />}>
            <HotKomik />
          </Suspense>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Container>
  );
}
