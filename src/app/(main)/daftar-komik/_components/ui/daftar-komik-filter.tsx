"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

// --- Types and Constants ---
interface ComicFilters {
  genre: string[];
  status: string;
  type: string;
  orderby: string;
  page?: number;
}

const genres = [
  "4-Koma",
  "Action",
  "Adventure",
  "Comedy",
  "Cooking",
  "Demons",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Gender Bender",
  "Gore",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Josei",
  "Magic",
  "Martial Arts",
  "Mature",
  "Mecha",
] as const;

const filterOptions = {
  status: ["All", "Ongoing", "Completed"] as const,
  type: ["All", "Manga", "Manhwa", "Manhua"] as const,
  orderby: ["All", "A-Z", "Z-A", "Update", "Popular"] as const,
};

const defaultFilters: ComicFilters = {
  genre: [],
  status: filterOptions.status[0],
  type: filterOptions.type[0],
  orderby: filterOptions.orderby[0],
};

// --- Utility Functions ---
const createSearchString = (filters: ComicFilters): string => {
  const params = new URLSearchParams();
  filters.genre.forEach((genre) =>
    params.append("genre[]", genre.toLowerCase())
  );
  if (filters.status !== defaultFilters.status)
    params.set("status", filters.status);
  if (filters.type !== defaultFilters.type)
    params.set("type", filters.type.toLowerCase());
  if (filters.orderby !== defaultFilters.orderby) {
    const orderbyMap: { [key: string]: string } = {
      "A-Z": "titleasc",
      "Z-A": "titledsc",
      Update: "update",
      Popular: "popular",
      All: "all",
    };
    params.set("orderby", orderbyMap[filters.orderby].toLowerCase());
  }
  return params.toString();
};

const parseInitialFilters = (searchParams: URLSearchParams): ComicFilters => {
  const genreParams = searchParams.getAll("genre[]");
  const orderbyMap: { [key: string]: string } = {
    titleasc: "A-Z",
    titledsc: "Z-A",
    update: "Update",
    popular: "Popular",
    all: "All",
  };
  const mapValue = (value: string, options: readonly string[]) =>
    options.find((opt) => opt.toLowerCase() === value.toLowerCase()) || value;

  return {
    genre: genreParams.map(
      (genre) =>
        genres.find((g) => g.toLowerCase() === genre.toLowerCase()) || genre
    ),
    status: mapValue(
      searchParams.get("status") || defaultFilters.status,
      filterOptions.status
    ),
    type: mapValue(
      searchParams.get("type") || defaultFilters.type,
      filterOptions.type
    ),
    orderby:
      orderbyMap[searchParams.get("orderby")?.toLowerCase() || ""] ||
      defaultFilters.orderby,
    page: Number(searchParams.get("page")) || 1,
  };
};

// --- Main Component ---
export function ComicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State
  const [activeFilters, setActiveFilters] = useState(() =>
    parseInitialFilters(searchParams)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounced URL update
  const updateUrlAndFilters = useDebouncedCallback(
    (newFilters: ComicFilters) => {
      setActiveFilters(newFilters);
      router.push(`?${createSearchString(newFilters)}`, { scroll: false });
    },
    300 // 300ms debounce delay
  );

  // --- Handlers ---
  const handleModalGenreChange = useCallback(
    (genre: string, checked: boolean) => {
      const newFilters = {
        ...activeFilters,
        page: 1,
        genre: checked
          ? [...activeFilters.genre, genre]
          : activeFilters.genre.filter((g) => g !== genre),
      };
      updateUrlAndFilters(newFilters);
    },
    [activeFilters, updateUrlAndFilters]
  );

  const handleModalFilterChange = useCallback(
    <T extends keyof Omit<ComicFilters, "genre" | "page">>(
      key: T,
      value: ComicFilters[T]
    ) => {
      const newFilters = {
        ...activeFilters,
        page: 1,
        [key]: value,
      };
      updateUrlAndFilters(newFilters);
    },
    [activeFilters, updateUrlAndFilters]
  );

  const removeGenre = useCallback(
    (genreToRemove: string) => {
      const newFilters = {
        ...activeFilters,
        page: 1,
        genre: activeFilters.genre.filter((g) => g !== genreToRemove),
      };
      updateUrlAndFilters(newFilters);
    },
    [activeFilters, updateUrlAndFilters]
  );

  const removeFilter = useCallback(
    <T extends keyof Omit<ComicFilters, "genre" | "page">>(key: T) => {
      const newFilters = {
        ...activeFilters,
        page: 1,
        [key]: defaultFilters[key],
      };
      updateUrlAndFilters(newFilters);
    },
    [activeFilters, updateUrlAndFilters]
  );

  const clearAllActiveFilters = useCallback(() => {
    updateUrlAndFilters(defaultFilters);
  }, [updateUrlAndFilters]);

  const handleModalOpenChange = useCallback((open: boolean) => {
    setIsModalOpen(open);
  }, []);

  // Memoized computed values
  const hasActiveFilters = useMemo(
    () =>
      activeFilters.genre.length > 0 ||
      activeFilters.status !== defaultFilters.status ||
      activeFilters.type !== defaultFilters.type ||
      activeFilters.orderby !== defaultFilters.orderby,
    [activeFilters]
  );

  // --- Reusable JSX for Filter Content ---
  const FilterFormContent = (
    <>
      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Genres</h3>
        <ScrollArea className="h-60">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={genre}
                  checked={activeFilters.genre.includes(genre)}
                  onCheckedChange={(checked) =>
                    handleModalGenreChange(genre, checked as boolean)
                  }
                />
                <label
                  htmlFor={genre}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className=" flex gap-4 flex-row md:gap-6">
        {(
          [
            { key: "status", label: "Status", options: filterOptions.status },
            { key: "type", label: "Tipe", options: filterOptions.type },
            {
              key: "orderby",
              label: "Sort By",
              options: filterOptions.orderby,
            },
          ] as const
        ).map(({ key, label, options }) => (
          <div key={key} className="space-y-1">
            <label className=" font-semibold">{label}</label>
            <Select
              value={activeFilters[key] as string}
              onValueChange={(value) => handleModalFilterChange(key, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </>
  );

  const TriggerButton = (
    <Button variant="outline">
      <Filter className="mr-2 h-4 w-4" />
      Filters
      {hasActiveFilters && <span className="ml-2 font-bold">Active</span>}
    </Button>
  );

  // --- Render ---
  return (
    <div className="space-y-4">
      {isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
          <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Comics</DialogTitle>
            </DialogHeader>
            {FilterFormContent}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">Active:</span>
                {activeFilters.genre.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="inline-flex items-center gap-1"
                  >
                    Genre : {genre}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => removeGenre(genre)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {activeFilters.status !== defaultFilters.status && (
                  <Badge
                    variant="secondary"
                    className="inline-flex items-center gap-1"
                  >
                    Status : {activeFilters.status}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => removeFilter("status")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {activeFilters.type !== defaultFilters.type && (
                  <Badge
                    variant="secondary"
                    className="inline-flex items-center gap-1"
                  >
                    Tipe : {activeFilters.type}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => removeFilter("type")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {activeFilters.orderby !== defaultFilters.orderby && (
                  <Badge
                    variant="secondary"
                    className="inline-flex items-center gap-1"
                  >
                    Sort By : {activeFilters.orderby}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => removeFilter("orderby")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllActiveFilters}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear All
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={isModalOpen} onOpenChange={handleModalOpenChange}>
          <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
          <SheetContent side="bottom" className="rounded-xl">
            <SheetHeader className="flex-shrink-0">
              <SheetTitle>Filter Comics</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-5 pb-5">
              {FilterFormContent}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">Active:</span>
                  {activeFilters.genre.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="inline-flex items-center gap-1"
                    >
                      Genre : {genre}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => removeGenre(genre)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {activeFilters.status !== defaultFilters.status && (
                    <Badge
                      variant="secondary"
                      className="inline-flex items-center gap-1"
                    >
                      Status : {activeFilters.status}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => removeFilter("status")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  {activeFilters.type !== defaultFilters.type && (
                    <Badge
                      variant="secondary"
                      className="inline-flex items-center gap-1"
                    >
                      Tipe : {activeFilters.type}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => removeFilter("type")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  {activeFilters.orderby !== defaultFilters.orderby && (
                    <Badge
                      variant="secondary"
                      className="inline-flex items-center gap-1"
                    >
                      Sort By : {activeFilters.orderby}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => removeFilter("orderby")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllActiveFilters}
                    className="text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
