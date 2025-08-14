import { NextFunction, Request, Response } from "express";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../model/category-model";
import { CategoryService } from "../service/category-service";
import { UserRequest } from "../type/user-request";
import { successResponse } from "../application/data-state";

export class CategoryController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(req.user!, request);

      res.status(201).json(successResponse("Create Data Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params.categoryId);
      const response = await CategoryService.get(req.user!, categoryId);

      res.status(200).json(successResponse("Get Data Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      request.id = Number(req.params.categoryId);
      const response = await CategoryService.update(req.user!, request);

      res.status(200).json(successResponse("Update Data Success", response));
    } catch (e) {
      next(e);
    }
  }
}
