import { LimitsDict } from "../types";
import { regexSelector } from "../utils";



export const CREDENTIAL_LIMITS: LimitsDict<"password"> = {
   password: {
  min: 8,
  max: 20,
  code: "credential.error.password_exceeded_length_limit",
  pattern: {
    exp: regexSelector("alphanumeric"),
    code: "credential.error.password_invalid_characters",
  },
}
} as const;
