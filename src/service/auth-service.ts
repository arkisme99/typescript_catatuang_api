import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateProfileRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/jwt-helper";
import { Request, Response } from "express";
import { ENV } from "../helpers/env";

export class AuthService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(
    request: LoginUserRequest,
    fullRequest: Request,
    res: Response
  ): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    /* user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    }); */

    const response = toUserResponse(user);
    // response.token = user.token!;

    const accessToken = await generateAccessToken(user);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // expire 7 hari
    const refreshToken = await generateRefreshToken(
      user.id,
      user.username,
      expiresAt,
      fullRequest.headers["user-agent"],
      fullRequest.ip
    );

    response.token = accessToken!;

    // simpan refreshToken di cookie httpOnly
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // aktifkan true kalau pakai https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    return response;
  }

  static async profile(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateProfileRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.email) {
      user.email = updateRequest.email;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    if (updateRequest.avatar) {
      user.avatar = updateRequest.avatar;
    }

    const updateUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(updateUser);
  }

  static async logout(fullRequest: Request, res: Response): Promise<null> {
    /* const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    }); */

    // console.debug(`cookies: ${fullRequest.cookies}`);
    const refreshToken = fullRequest.cookies.refreshToken;
    if (!refreshToken) throw new ResponseError(404, "Refresh token not found");

    //cek refresh-token ada ga di db
    const tokenRecord = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new ResponseError(403, "Refresh token is invalid");
    }

    //revoke token
    await prismaClient.refreshToken.update({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return null;
  }

  static async refresh(
    fullRequest: Request,
    res: Response
  ): Promise<{ token: string }> {
    const refreshToken = fullRequest.cookies.refreshToken;
    if (!refreshToken) throw new ResponseError(401, "Refresh token not found");

    // cek token ada di DB
    const tokenRecord = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new ResponseError(403, "Refresh token is invalid");
    }

    // verifikasi JWT
    let accessToken = "";
    jwt.verify(
      refreshToken,
      ENV.JWT_REFRESH_SECRET,
      async (err: any, user: any) => {
        if (err) throw new ResponseError(403, "Refresh token is invalid");
        accessToken = await generateAccessToken(user);
      }
    );

    // const response = toUserResponse(user);
    // response.token = accessToken!;
    const result = {
      token: accessToken!,
    };
    return result;
  }
}
