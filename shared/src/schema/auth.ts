import z from "zod";
import { USER_LIMIT } from "../limits";

const { password } = USER_LIMIT;

export const passwordSchema = z
  .string()
  .min(password.MIN, password.MESSAGE)
  .max(password.MAX, password.MESSAGE)
  .regex(password.pattern?.exp as RegExp, password.pattern?.message);
export const credentialsSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((pass) => pass.password === pass.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
