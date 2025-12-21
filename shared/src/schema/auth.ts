import z from "zod";
import { USER_LIMIT } from "../limits";
import { applyRestraints } from "../utils";

const { password, username } = USER_LIMIT;

export const passwordSchema = applyRestraints(password);
export const usernameSchema = applyRestraints(username);


export const credentialsSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((pass) => pass.newPassword === pass.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["newPassword"],
  }).refine((pass) => pass.newPassword !== pass.oldPassword, {
    message: 'Please enter a new password.',
    path: ['newPassword']
  });

 export const signInFormSchema = z.object({
    username: usernameSchema,
    password: passwordSchema
  })

  export const signUpFormSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  }).refine(credentials => credentials.password === credentials.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['password', 'confirmPassword']
  })