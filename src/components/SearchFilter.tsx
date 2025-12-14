import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, SweetCategory } from "@/types/sweet";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: SweetCategory | null;
  onCategoryChange: (category: SweetCategory | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const categories: SweetCategory[] = [
  "chocolate",
  "gummy",
  "lollipop",
  "caramel",
  "mint",
  "fruit",
  "other",
];

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sweets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-xl">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => onCategoryChange(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onCategoryChange(category)}
            >
              {CATEGORY_LABELS[category]}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
