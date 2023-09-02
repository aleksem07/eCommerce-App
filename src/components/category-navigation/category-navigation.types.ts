import { Category } from "@Services/category/category.types";

export interface CategoryHierarchy {
  parent?: Category[];
  children?: Category[];
}
