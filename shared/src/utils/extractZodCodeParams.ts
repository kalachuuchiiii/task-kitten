import { ZodError } from "zod";

export const extractZodCodeParams = (err: ZodError) => {
  const issue = err.issues[0];

  if (issue?.code === "custom") {
    return {
      code: issue.message,
      params: issue.params ?? {},
    };
  }

  return {
    code: issue?.message
  };
};
