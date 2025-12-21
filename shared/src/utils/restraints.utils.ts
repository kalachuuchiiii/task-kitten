

import z from "zod";

export const applyRestraints = (restraint: Restraint) => {
  return z.string().min(restraint.MIN, restraint.MESSAGE).max(restraint.MAX, restraint.MESSAGE).regex(restraint.PATTERN.EXP, restraint.PATTERN.MESSAGE)
}

type RegexMap = Record<
  "alpha_numeric" | "email",
  {
    EXP: RegExp;
    MESSAGE: string;
  }
>;

export type Restraint = {
  MESSAGE: string;
  MIN: number;
  MAX: number;
  PATTERN: {
    EXP: RegExp;
    MESSAGE: string;
  };
};

export const createRestraints = (
  min: number,
  max: number,
  field: string,
  options: {
    message?: string | undefined;
    pattern?: keyof RegexMap | undefined;
  } = { message: "", pattern: undefined }
): Restraint => {
  const { message, pattern } = options;

  const REGEX_MAP: RegexMap = {
    alpha_numeric: {
      EXP: /^[a-zA-Z0-9]+$/,
      MESSAGE: `${field} must not contain special characters.`,
    },
    email: {
      EXP: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      MESSAGE: "Invalid email.",
    },
  };

  return {
    MESSAGE:
      message ?? `${field} must be between ${min} and ${max} characters.`,
    MIN: min,
    MAX: max,
    PATTERN: pattern
      ? REGEX_MAP[pattern]
      : {
          EXP: /.*/,
          MESSAGE: "WHAT DID YOU DO.",
        },
  };
};
