import z from "zod";
import { USER_LIMIT } from "../limits";
import { applyRestraints, getRemainingCooldown, toDate } from "../utils";
import { UPDATE_USERNAME_COOLDOWN } from "../constants";
import { formatDuration, intervalToDuration } from "date-fns";

const { password, username } = USER_LIMIT;

export const usernameFormSchema = z.object({
  oldUsername: applyRestraints(username),
  newUsername: applyRestraints(username),
  lastUsernameUpdate: z.preprocess(toDate(), z.date()).nullable().optional(),
}).superRefine((data, ctx) => {
  const remaining = getRemainingCooldown(data.lastUsernameUpdate, UPDATE_USERNAME_COOLDOWN);
  const duration = intervalToDuration({ start: 0, end: remaining });
  const formattedRemainingTime = formatDuration(duration, { format: ['days', 'hours', 'minutes', 'seconds']});
  if(remaining > 0){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `You can change your username again after ${formattedRemainingTime}`,
      path: ['lastUsernameUpdate']
    })
  }
})

export const nicknameFormSchema = z.object({
  
})


export const credentialsSchema = z
  .object({
    oldPassword: applyRestraints(password),
    newPassword: applyRestraints(password),
    confirmNewPassword: applyRestraints(password),
  })
  .refine((pass) => pass.newPassword === pass.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["newPassword"],
  }).refine((pass) => pass.newPassword !== pass.oldPassword, {
    message: 'Please enter a new password.',
    path: ['newPassword']
  });

 export const signInFormSchema = z.object({
    username: applyRestraints(username),
    password: applyRestraints(password)
  })

  export const signUpFormSchema = z.object({
    username: applyRestraints(username),
    password: applyRestraints(password),
    confirmPassword: applyRestraints(password),
  }).refine(credentials => credentials.password === credentials.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['password', 'confirmPassword']
  })