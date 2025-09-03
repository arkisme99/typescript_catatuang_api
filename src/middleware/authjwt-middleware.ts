import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../helpers/env";
import { UserRequest } from "../type/user-request";
import { errorResponse } from "../application/data-state";

export function authenticateToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json(errorResponse("Unauthorized")).end();

  jwt.verify(token, ENV.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json(errorResponse("Token invalid")).end();
    (req as any).user = user;
    next();
  });
}
