"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

// --- Component ---
export function ComicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [activeFilters, setActiveFilters] = useState<ComicFilters>(() =>
    parseInitialFilters(searchParams)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized handlers
  const updateUrlAndFilters = useCallback(
    (newFilters: ComicFilters) => {
      setActiveFilters(newFilters);
      router.push(`?${createSearchString(newFilters)}`, { scroll: false });
    },
    [router]
  );

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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && <Badge variant="secondary">Active</Badge>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Comics</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 ">
          {/* Genre Filter */}
          <div className="flex-1">
            <h3 className="font-semibold mb-3">Genres</h3>
            <ScrollArea className="w-full h-72 pr-4">
              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`modal-${genre}`}
                      checked={activeFilters.genre.includes(genre)}
                      onCheckedChange={(checked) =>
                        handleModalGenreChange(genre, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`modal-${genre}`}
                      className="text-sm font-medium leading-none"
                    >
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>

          {/* Other Filters */}
          <div className="space-y-6 flex-1">
            {(
              [
                {
                  key: "status",
                  label: "Status",
                  options: filterOptions.status,
                },
                { key: "type", label: "Tipe", options: filterOptions.type },
                {
                  key: "orderby",
                  label: "Sort By",
                  options: filterOptions.orderby,
                },
              ] as const
            ).map(({ key, label, options }) => (
              <div key={key}>
                <h3 className="font-semibold mb-3">{label}</h3>
                <Select
                  value={activeFilters[key]}
                  onValueChange={(value) => handleModalFilterChange(key, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
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
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">Active:</span>
            {activeFilters.genre.map((genre) => (
              <Badge key={genre} variant="secondary" className="gap-1">
                Genre : {genre}
                <button
                  type="button"
                  onClick={() => removeGenre(genre)}
                  className="inline-flex"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            ))}
            {activeFilters.status !== defaultFilters.status && (
              <Badge variant="secondary" className="gap-1">
                Status : {activeFilters.status}
                <button
                  type="button"
                  onClick={() => removeFilter("status")}
                  className="inline-flex"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            )}
            {activeFilters.type !== defaultFilters.type && (
              <Badge variant="secondary" className="gap-1">
                Tipe : {activeFilters.type}
                <button
                  type="button"
                  onClick={() => removeFilter("type")}
                  className="inline-flex"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            )}
            {activeFilters.orderby !== defaultFilters.orderby && (
              <Badge variant="secondary" className="gap-1">
                Sort By : {activeFilters.orderby}
                <button
                  type="button"
                  onClick={() => removeFilter("orderby")}
                  className="inline-flex"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={clearAllActiveFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
