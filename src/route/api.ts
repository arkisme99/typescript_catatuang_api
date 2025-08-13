import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthenticationController } from "../controller/auth-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//profile
apiRouter.get("/api/auth/profile", AuthenticationController.profile);
apiRouter.patch("/api/auth/profile", AuthenticationController.update);
