import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../helpers/env";
import { UserRequest } from "../type/user-request";
import { errorResponse } from "../application/data-state";
import { prismaClient } from "../application/database";

export function authenticateJwtToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not provided or invalid format" });
  }

  jwt.verify(token, ENV.JWT_SECRET as string, async (err, decoded) => {
    if (err) return res.status(401).json(errorResponse("Unauthorized")).end();

    // 👇 decoded akan berisi payload { id, username, name, iat, exp }
    const data = decoded as { id: number; username: string };

    const user = await prismaClient.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
    next();
  });
}
