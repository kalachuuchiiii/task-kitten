import { LimitsDict } from "../types";
import {  regexSelector } from "../utils";

export const USER_LIMITS: LimitsDict<'username' | 'nickname'> = {
  username: {
    min: 6, 
    max: 26,
    code: 'user.error.username_exceeded_length_limit',
    pattern: {
      exp: regexSelector('alphanumeric'),
      code: 'user.error.username_invalid_characters'
    }
  },
  nickname: {
    min: 3, 
    max: 36,
    code: 'user.error.nickname_exceeded_length_limit',
    pattern: {
      exp: regexSelector('alphanumeric'),
      code: 'user.error.nickname_invalid_characters'
    }
  }
} as const;
