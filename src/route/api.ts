import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthenticationController } from "../controller/auth-controller";
import { CategoryController } from "../controller/category-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//authentication profile
apiRouter.get("/api/auth/profile", AuthenticationController.profile);
apiRouter.patch("/api/auth/profile", AuthenticationController.update);
apiRouter.delete("/api/auth/logout", AuthenticationController.logout);

//category
apiRouter.post("/api/categories", CategoryController.create);
