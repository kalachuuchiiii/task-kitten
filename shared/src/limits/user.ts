import { createRestraints, regexSelelector } from "../utils";

export const USER_LIMITS = {
  username: {
    min: 6, 
    max: 26,
    code: 'user.error.username_exceeded_length_limit',
    pattern: {
      exp: regexSelelector('alphanumeric'),
      code: 'user.error.invalid_characters'
    }
  }
}
