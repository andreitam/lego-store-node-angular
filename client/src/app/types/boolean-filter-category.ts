import { BooleanFilter } from "./boolean-filter";
import { FilterCategory } from "./filter-category";

export interface BooleanFilterCategory extends FilterCategory{
  items: BooleanFilter[];
}
