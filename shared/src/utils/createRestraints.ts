type RegexMap = Record<
  "alpha_numeric" | "email",
  {
    exp: RegExp;
    message: string;
  }
>;

export const createRestraints = (
  min: number,
  max: number,
  field: string,
  options: {
    message?: string | undefined;
    pattern?: keyof RegexMap | undefined;
  } = { message: undefined, pattern: undefined }
) => {

  const { message, pattern } = options;

  const REGEX_MAP: RegexMap = {
    alpha_numeric: {
      exp: /^[a-zA-Z0-9]+$/,
      message: `${field} must not contain special characters.`,
    },
    email: {
      exp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email.",
    },
  };

  return {
    MESSAGE:
      message ?? `${field} must be between ${min} and ${max} characters.`,
    MIN: min,
    MAX: max,
    pattern: pattern ? REGEX_MAP[pattern] : null,
  };
};
