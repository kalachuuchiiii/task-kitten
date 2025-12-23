

import z from "zod";

export const applyRestraints = (restraint: Restraint) => {
  return z.string().min(restraint.MIN, restraint.CODE).max(restraint.MAX, restraint.CODE).regex(restraint.PATTERN.EXP, restraint.PATTERN.CODE)
}

type RegexMap = Record<
  "alpha_numeric" | "email",
  {
    EXP: RegExp;
    CODE: string;
  }
>;

export type Restraint = {
  CODE: string;
  MIN: number;
  MAX: number;
  PATTERN: {
    EXP: RegExp;
    CODE: string;
  };
};

export const createRestraints = (
  min: number,
  max: number,
  field: string,
  options: {
    code?: string | undefined;
    pattern?: keyof RegexMap | undefined;
  } = { code: "", pattern: undefined }
): Restraint => {
  const { code, pattern } = options;

  const REGEX_MAP: RegexMap = {
    alpha_numeric: {
      EXP: /^[a-zA-Z0-9]+$/,
      CODE: ``,
    },
    email: {
      EXP: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      CODE: "Invalid email.",
    },
  };

  return {
    CODE:
      code ?? `${field} must be between ${min} and ${max} characters.`,
    MIN: min,
    MAX: max,
    PATTERN: pattern
      ? REGEX_MAP[pattern]
      : {
          EXP: /.*/,
          CODE: "WHAT DID YOU DO.",
        },
  };
};
