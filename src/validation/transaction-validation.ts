import { Decimal } from "@prisma/client/runtime/library";
import z, { ZodType } from "zod";
import { stringToDate } from "../helpers/date-helper";

export const decimalAsString = z
  .union([z.string(), z.number()])
  .transform((val) => val.toString())
  .refine(
    (val) => {
      try {
        new Decimal(val); // test kalau valid decimal
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid decimal" }
  );

export const dateFromString = z.preprocess((val) => {
  if (typeof val === "string") {
    return stringToDate(val, "yyyy-MM-dd");
  }
  return val;
}, z.date());

export class TransactionValidation {
  static readonly CREATE: ZodType = z.object({
    transaction_date: dateFromString,
    category_id: z.number(),
    description: z.string().min(1).max(255),
    month: z.number(),
    year: z.number(),
    amount: decimalAsString,
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    transaction_date: dateFromString,
    category_id: z.number(),
    description: z.string().min(1).max(255),
    month: z.number(),
    year: z.number(),
    amount: decimalAsString,
  });

  static readonly SEARCH: ZodType = z.object({
    transaction_date: dateFromString.optional(),
    // transaction_date: z.string().min(1).optional(),
    // category_id: z.number().optional(),
    description: z.string().min(1).max(255).optional(),
    month: z.number().optional(),
    year: z.number().optional(),
    amount: decimalAsString.optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  });
}
