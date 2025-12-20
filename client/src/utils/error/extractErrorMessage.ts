

import { isAxiosError } from "axios";
import { ZodError } from "zod";

export const extractErrorMessage = (error: unknown) => {
  if (error instanceof ZodError) {
    return JSON.parse(error.message)[0].message;
  }
 
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }

  return "Something unexpected occurred while processing your request.";
};
