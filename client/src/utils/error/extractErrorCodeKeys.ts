

import type { LocaleKeys } from "@shared/types";
import { extractZodCodeParams } from "@shared/utils";
import { isAxiosError } from "axios";
import { t } from "i18next";
import { ZodError } from "zod";

export const extractErrorCodeKeys = (error: unknown) => {
  if(error instanceof ZodError){
    const { code, params } = extractZodCodeParams(error);
    return t(code, params) as string;
  }

  if(isAxiosError(error)){
    const code = error.response?.data.code;
    const params = error.response?.data.params;
    return t(code, params) as string;
  }

  if(error instanceof Error){
    return t(error.message) as string;
  }

  return t('error.internal')

};
