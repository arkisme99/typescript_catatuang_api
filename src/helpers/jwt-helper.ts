import jwt from "jsonwebtoken";
import { JwtPayload } from "../model/user-model";
import { ENV } from "./env";
import { prismaClient } from "../application/database";

// buat Access Token
export async function generateAccessToken(user: JwtPayload) {
  return jwt.sign({ id: user.id, username: user.username }, ENV.JWT_SECRET, {
    expiresIn: "15m",
  });
}

// buat Refresh Token
export async function generateRefreshToken(
  user_id: number,
  username: string,
  expiresAt: Date,
  deviceInfo?: string,
  ipAddress?: string
) {
  const refreshToken = jwt.sign(
    { id: user_id, username },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  // refreshTokens.push(refreshToken); insert ke db
  await prismaClient.refreshToken.create({
    data: {
      token: refreshToken,
      user_id,
      expiresAt,
      deviceInfo,
      ipAddress,
    },
  });
  return refreshToken;
}
