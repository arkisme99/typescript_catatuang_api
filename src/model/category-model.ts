import { Category } from "@prisma/client";
import { dateToString } from "../helpers/date-helper";

export type CategoryResponse = {
  id: number;
  name: string;
  type: string;
  images: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreateCategoryRequest = {
  name: string;
  type: string;
  images?: string;
};

export type UpdateCategoryRequest = {
  id: number;
  name: string;
  type: string;
  images?: string;
};

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    images: category.images,
    created_at: category.created_at ? dateToString(category.created_at) : null,
    updated_at: category.updated_at ? dateToString(category.updated_at) : null,
  };
}
