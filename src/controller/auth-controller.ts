import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { AuthService } from "../service/auth-service";
import { successResponse } from "../application/data-state";

export class AuthenticationController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await AuthService.register(request);

      res
        .status(201)
        .json(successResponse("User registered successfully", response));
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as LoginUserRequest;
      const response = await AuthService.login(request);

      res
        .status(200)
        .json(successResponse("User logged in successfully", response));
    } catch (e) {
      next(e);
    }
  }
}
