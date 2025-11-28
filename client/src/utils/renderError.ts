import { toast } from "sonner";
import { getErrorMessage } from "./getErrorMessage"


export const renderError = (error: unknown) => {
    const errorMessage = getErrorMessage(error);
    
    toast.error(errorMessage);
}