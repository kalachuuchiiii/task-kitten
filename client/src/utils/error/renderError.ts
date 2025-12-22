import { toast } from "sonner";
import { extractErrorMessage } from "./extractErrorMessage";

export const renderErrorToast = (error: unknown) => {
  toast.error(extractErrorMessage(error));
};
