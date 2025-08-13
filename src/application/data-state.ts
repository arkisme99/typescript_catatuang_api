export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]> | null; // nullable, bisa null atau undefined
};

export function successResponse<T>(
  message: string,
  data: T
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  errors: Record<string, string[]> | null = null
): ErrorResponse {
  return {
    success: false,
    message,
    errors,
  };
}
