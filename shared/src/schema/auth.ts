import z from "zod";

import {  applyLimits, getRemainingCooldown, toDate } from "../utils";
import { UPDATE_USERNAME_COOLDOWN } from "../constants";
import { formatDuration, intervalToDuration } from "date-fns";
import { CREDENTIAL_LIMITS, USER_LIMITS } from "../limits";

const { username } = USER_LIMITS;
const { password } = CREDENTIAL_LIMITS;  

export const usernameFormSchema = z.object({
  oldUsername: applyLimits(username),
  newUsername: applyLimits(username),
  lastUsernameUpdate: z.preprocess(toDate(), z.date()).nullable().optional(),
}).superRefine((data, ctx) => {
  const remaining = getRemainingCooldown(data.lastUsernameUpdate, UPDATE_USERNAME_COOLDOWN);
  const duration = intervalToDuration({
  start: 0,
  end: remaining,
});

  if(remaining > 0){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      remainingTime: duration,
      message: 'auth.error.update_username_on_cooldown',
      path: ['lastUsernameUpdate']
    })
  }
})

export const nicknameFormSchema = z.object({
  
})


export const credentialsSchema = z
  .object({
    oldPassword: applyLimits(password),
    newPassword: applyLimits(password),
    confirmNewPassword: applyLimits(password),
  })
  .refine((pass) => pass.newPassword === pass.confirmNewPassword, {
    message: "auth.error.passwords_do_not_match",
    path: ["newPassword"],
  }).refine((pass) => pass.newPassword !== pass.oldPassword, {
    message: 'auth.error.password_unchanged',
    path: ['newPassword']
  });

 export const signInFormSchema = z.object({
    username: applyLimits(username),
    password: applyLimits(password)
  })

  export const signUpFormSchema = z.object({
    username: applyLimits(username),
    password: applyLimits(password),
    confirmPassword: applyLimits(password),
  }).refine(credentials => credentials.password === credentials.confirmPassword, {
    message: 'auth.error.passwords_do_not_match',
    path: ['password', 'confirmPassword']
  })