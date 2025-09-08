import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "../helpers/env";
export const web = express();

web.use(
  cors({
    origin: ENV.FRONTEND_URL, // alamat FE
    credentials: true, // wajib kalau mau cookie dipakai
  })
);
web.use(express.json());
web.use(cookieParser());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
