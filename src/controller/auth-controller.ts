import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateProfileRequest,
} from "../model/user-model";
import { AuthService } from "../service/auth-service";
import { successResponse } from "../application/data-state";
import { UserRequest } from "../type/user-request";

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
      const fullRequest = req;
      const response = await AuthService.login(request, fullRequest, res);

      res
        .status(200)
        .json(successResponse("User logged in successfully", response));
    } catch (e) {
      next(e);
    }
  }

  static async profile(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.profile(req.user!);
      res
        .status(200)
        .json(successResponse("Get User Profile Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateProfileRequest;
      const response = await AuthService.update(req.user!, request);

      res
        .status(200)
        .json(successResponse("Update User Profile Success", response));
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const fullRequest = req;
      await AuthService.logout(fullRequest, res);
      res.status(200).json(successResponse("Logout successful", null)); //data == null karena sudah logout tidak perlu tampil data lagi
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const fullRequest = req;
      const response = await AuthService.refresh(fullRequest, res);
      res
        .status(200)
        .json(successResponse("Refresh Token successful", response));
    } catch (e) {
      next(e);
    }
  }
}
