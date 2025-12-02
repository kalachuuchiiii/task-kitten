import mongoose from "mongoose";
import { CustomError } from "./customError";

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof mongoose.Error.ValidationError) {
        const firstError = Object.values(error.errors)[0];
        return firstError?.message || "Validation error";
    }
    
    if (error instanceof Error || error instanceof CustomError) {
        return error.message;
    }
    
    return "Internal Server Error";
};