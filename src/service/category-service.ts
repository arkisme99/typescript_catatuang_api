import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
  UpdateCategoryRequest,
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

  static async mustCheckCategoryFirst(user: User, id: number) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (!category) throw new ResponseError(404, "Category not found");

    return category;
  }

  static async get(user: User, id: number): Promise<CategoryResponse> {
    const category = await this.mustCheckCategoryFirst(user, id);
    return toCategoryResponse(category);
  }

  static async update(
    user: User,
    request: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    const updateCategory = Validation.validate(
      CategoryValidation.UPDATE,
      request
    );
    await this.mustCheckCategoryFirst(user, updateCategory.id);

    const category = await prismaClient.category.update({
      where: {
        id: updateCategory.id,
        user_id: user.id,
      },
      data: {
        name: updateCategory.name,
        type: updateCategory.type,
      },
    });

    return toCategoryResponse(category);
  }

  static async delete(user: User, id: number): Promise<CategoryResponse> {
    await this.mustCheckCategoryFirst(user, id);

    const category = await prismaClient.category.delete({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    return toCategoryResponse(category);
  }
}
