import { Product } from "src/app/types/product";
import { FilterCategory } from "./filter-category";
import { RangeFilter } from "./range-filter";

export interface RangeFilterCategory extends FilterCategory {
  items: RangeFilter[];
}

