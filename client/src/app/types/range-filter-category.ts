import { FilterCategory } from "./filter-category";

export interface RangeFilterCategory extends FilterCategory {
  items: Range[];
}
