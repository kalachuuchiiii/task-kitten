import { toast } from "sonner";
import { extractErrorCodeKeys } from "./extractErrorCodeKeys";

export const renderErrorToast = (error: unknown) => {
  toast.error(extractErrorCodeKeys(error));
};
