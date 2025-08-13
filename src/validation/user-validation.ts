import z, { ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(3).max(100),
    name: z.string().min(3).max(150),
    password: z.string().min(3).max(150),
    email: z.string().email().min(3).max(100).optional(),
    avatar: z.string().min(3).max(150).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  });
}
