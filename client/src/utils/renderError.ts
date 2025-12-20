
import { toast } from "sonner";
import { extractErrorMessage } from "./error";

export const renderError = (error: unknown) => {
    const errorMessage = extractErrorMessage(error);
    toast.error(errorMessage);
}