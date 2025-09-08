import express from "express";
import { AuthenticationController } from "../controller/auth-controller";
import {
  loginLimiter,
  refreshLimiter,
  registerLimiter,
} from "../middleware/limiter";

export const publicRouter = express.Router();
publicRouter.post(
  "/api/auth/register",
  registerLimiter,
  AuthenticationController.register
);
publicRouter.post(
  "/api/auth/login",
  loginLimiter,
  AuthenticationController.login
);

publicRouter.delete(
  "/api/auth/logout",
  refreshLimiter,
  AuthenticationController.logout
);
publicRouter.post(
  "/api/auth/refresh",
  refreshLimiter,
  AuthenticationController.refresh
);
