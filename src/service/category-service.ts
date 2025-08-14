import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";
import { ErrorResponse } from "../application/data-state";
import { ResponseError } from "../error/response-error";

export class CategoryService {
  static async create(
    user: User,
    request: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const categoryRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    );

    const newData = {
      ...categoryRequest,
      user_id: user.id,
    };

    const category = await prismaClient.category.create({
      data: newData,
    });

    return toCategoryResponse(category);
  }

  static async get(user: User, id: number): Promise<CategoryResponse> {
    const category = await prismaClient.category.findFirst({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (!category) throw new ResponseError(404, "Category not found");

    return toCategoryResponse(category);
  }
}
