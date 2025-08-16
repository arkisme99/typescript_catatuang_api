import { Paging } from "../model/page";

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  paging?: Paging;
};

export type ErrorResponse = {
  success: false;
  message: string;
  errors?: object | string | null; // nullable, bisa null atau undefined
};

export function successResponse<T>(
  message: string,
  data: T,
  paging?: Paging
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    ...(paging && { paging }),
  };
}

export function errorResponse(
  message: string,
  errors: object | string | null = null
): ErrorResponse {
  return {
    success: false,
    message,
    errors,
  };
}
