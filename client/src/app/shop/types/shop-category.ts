import { BooleanFilter } from "src/app/product-filter/types/boolean-filter";
import { FilterCategory } from "src/app/product-filter/types/filter-category";

export interface ShopCategory extends FilterCategory{
  items: BooleanFilter[];
}
