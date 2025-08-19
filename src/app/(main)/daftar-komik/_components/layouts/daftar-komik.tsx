"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Filter, Star } from "lucide-react";
import { KomikItem } from "@/types/komik.type";

export function ComicList({ KomikItems }: { KomikItems: KomikItem[] }) {
  const [filters, setFilters] = useState<ComicFilters>({
    genre: [],
    status: "All Status",
    type: "All Types",
    orderby: "update",
    page: 1,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Isekai",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Supernatural",
  ];

  const clearFilters = () => {
    setFilters({
      genre: [],
      status: "All Status",
      type: "All Types",
      orderby: "update",
      page: 1,
    });
  };

  const renderPagination = () => {
    const { currentPage, totalPages, hasNext, hasPrev } =
      sampleData.data.pagination;
    const pages = [];

    // Show first page, current page range, and last page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Comic Library</h1>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Genre Filter */}
              <div>
                <h3 className="font-semibold mb-3">Genres</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={filters.genre.includes(genre)}
                        onCheckedChange={(checked) =>
                          handleGenreChange(genre, checked as boolean)
                        }
                      />
                      <label htmlFor={genre} className="text-sm">
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="font-semibold mb-3">Status</h3>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Hiatus">Hiatus</SelectItem>
                    <SelectItem value="Dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-semibold mb-3">Type</h3>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Types">All Types</SelectItem>
                    <SelectItem value="Manga">Manga</SelectItem>
                    <SelectItem value="Manhwa">Manhwa</SelectItem>
                    <SelectItem value="Manhua">Manhua</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Order By Filter */}
              <div>
                <h3 className="font-semibold mb-3">Order By</h3>
                <Select
                  value={filters.orderby}
                  onValueChange={(value) =>
                    handleFilterChange("orderby", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">Latest Update</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters & Clear */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                {filters.genre.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleGenreChange(genre, false)}
                  >
                    {genre} ×
                  </Badge>
                ))}
                {filters.status && filters.status !== "All Status" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("status", "All Status")}
                  >
                    Status: {filters.status} ×
                  </Badge>
                )}
                {filters.type && filters.type !== "All Types" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleFilterChange("type", "All Types")}
                  >
                    Type: {filters.type} ×
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {sampleData.data.comics.length} of{" "}
          {sampleData.data.pagination.totalPages * 12} comics
        </p>
        <p className="text-muted-foreground">
          Page {sampleData.data.pagination.currentPage} of{" "}
          {sampleData.data.pagination.totalPages}
        </p>
      </div>

      {/* Comic Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {sampleData.data.comics.map((comic) => (
          <Card
            key={comic.slug}
            className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => onComicClick?.(comic.slug)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <img
                  src={comic.image || "/placeholder.svg"}
                  alt={comic.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {comic.type}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {comic.rating}
                </div>
                <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  {comic.chapter}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {comic.title}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
}
