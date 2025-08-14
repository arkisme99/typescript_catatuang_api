import { NextFunction, Request, Response } from "express";
import { CreateCategoryRequest } from "../model/category-model";
import { CategoryService } from "../service/category-service";
import { UserRequest } from "../type/user-request";
import { successResponse } from "../application/data-state";

export class CategoryController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(req.user!, request);

      res.status(201).json(successResponse("Create Data Success", response));
    } catch (e) {
      next(e);
    }
  }
}
