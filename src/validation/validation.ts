import { ZodType } from "zod";
import { logger } from "../application/logging";

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }
}
