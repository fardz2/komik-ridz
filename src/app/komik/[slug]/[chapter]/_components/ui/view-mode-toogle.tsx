"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ViewModeToggle() {
  const [viewMode, setViewMode] = useState<"scroll" | "single">("scroll");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const onChange = (mode: "scroll" | "single") => {
    const params = new URLSearchParams(searchParams);
    if (mode) {
      params.set("mode", mode);
    } else {
      params.delete("mode");
    }
    replace(`${pathname}?${params.toString()}`);
    setViewMode(mode);
  };

  return (
    <Button
      onClick={() => onChange(viewMode === "scroll" ? "single" : "scroll")}
      className="flex items-center gap-2"
      variant="outline"
    >
      {viewMode === "scroll" ? (
        <LayoutGrid className="w-4 h-4" />
      ) : (
        <LayoutList className="w-4 h-4" />
      )}
    </Button>
  );
}
