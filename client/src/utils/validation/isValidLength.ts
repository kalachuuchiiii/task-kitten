import type { Limiter } from "@shared/constants";
import { toast } from "sonner";

export const isValidLength = (val: string | any[], limiter: Limiter) => {
  if(val.length > limiter.LENGTH){
     toast.error(limiter.MESSAGE);
     return false;
  }

  return true;
}