import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";

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
}
