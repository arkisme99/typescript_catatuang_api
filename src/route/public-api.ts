import express from "express";
import { AuthenticationController } from "../controller/auth-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/auth/register", AuthenticationController.register);
publicRouter.post("/api/auth/login", AuthenticationController.login);
