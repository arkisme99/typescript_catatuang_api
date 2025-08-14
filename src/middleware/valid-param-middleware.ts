import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";

export function validatedParamNumber(paramName: string) {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    const num = Number(value);

    if (!Number.isInteger(num) || num <= 0) {
      throw new ResponseError(
        400,
        `Invalid parameter "${paramName}", must be a positive number`
      );
    }

    next();
  };
}
