import mongoose from "mongoose";
import { CustomError } from "./customError";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown): string => {

    if(error instanceof ZodError){
        return JSON.parse(error.message)[0].message;
    }
    if (error instanceof mongoose.Error.ValidationError) {
        const firstError = Object.values(error.errors)[0];
        return firstError?.message || "Validation error";
    }
    
    if (error instanceof Error || error instanceof CustomError) {
        return error.message;
    }
    
    return "Internal Server Error";
};