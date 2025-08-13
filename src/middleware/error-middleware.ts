import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../application/data-state";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    // const fieldErrors = JSON.stringify(error);
    const fieldErrors = JSON.parse(error.message);
    res.status(400).json(errorResponse("Validation Error", fieldErrors));
  } else if (error instanceof ResponseError) {
    res.status(error.status).json(errorResponse(error.message));
  } else {
    res.status(500).json(errorResponse(error.message));
  }
};
