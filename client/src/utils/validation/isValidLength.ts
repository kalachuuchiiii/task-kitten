
import { toast } from "sonner";

export const isValidLength = (val: string | any[], LIMIT: { MIN: number; MAX: number; MESSAGE: string;}) => {
  if(val.length < LIMIT.MIN || val.length > LIMIT.MAX){
    toast.error(LIMIT.MESSAGE);
    return false;
  }

  return true;
}