import express from "express";
import { AuthenticationController } from "../controller/auth-controller";
import { loginLimiter, registerLimiter } from "../middleware/limiter";

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
  loginLimiter,
  AuthenticationController.logout
);
publicRouter.post(
  "/api/auth/refresh",
  loginLimiter,
  AuthenticationController.refresh
);
