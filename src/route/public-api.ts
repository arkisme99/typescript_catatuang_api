import express from "express";
import { AuthenticationController } from "../controller/auth-controller";

export const publicRouter = express.Router();
publicRouter.post("/auth/register", AuthenticationController.register);
