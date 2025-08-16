import z, { size, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(25),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(25),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(50).optional(),
    type: z.string().min(1).max(25).optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  });
}
