import express from "express";
// import { authMiddleware } from "../middleware/auth-middleware";
import { AuthenticationController } from "../controller/auth-controller";
import { CategoryController } from "../controller/category-controller";
import { validatedParamNumber } from "../middleware/valid-param-middleware";
import { TransactionController } from "../controller/transaction-controller";
import { authenticateJwtToken } from "../middleware/authjwt-middleware";

export const apiRouter = express.Router();
// apiRouter.use(authMiddleware);
apiRouter.use(authenticateJwtToken);

//authentication profile
apiRouter.get("/api/auth/profile", AuthenticationController.profile);
apiRouter.patch("/api/auth/profile", AuthenticationController.update);
// apiRouter.delete("/api/auth/logout", AuthenticationController.logout); //tidak perlu accesToken karena yang dipakai refresh token
// apiRouter.post("/api/auth/refresh", AuthenticationController.refresh); //tidak perlu accessToken karena yang dipakai refresh token

//category
apiRouter.post("/api/categories", CategoryController.create);
apiRouter.get(
  "/api/categories/:categoryId",
  validatedParamNumber("categoryId"),
  CategoryController.get
);
apiRouter.get("/api/categories", CategoryController.search);
apiRouter.put(
  "/api/categories/:categoryId",
  validatedParamNumber("categoryId"),
  CategoryController.update
);
apiRouter.delete(
  "/api/categories/:categoryId",
  validatedParamNumber("categoryId"),
  CategoryController.delete
);

//transaction
apiRouter.post("/api/transactions", TransactionController.create);
apiRouter.get(
  "/api/transactions/:transactionId",
  validatedParamNumber("transactionId"),
  TransactionController.get
);
apiRouter.get("/api/transactions", TransactionController.search);
apiRouter.put(
  "/api/transactions/:transactionId",
  validatedParamNumber("transactionId"),
  TransactionController.update
);
apiRouter.delete(
  "/api/transactions/:transactionId",
  validatedParamNumber("transactionId"),
  TransactionController.delete
);
