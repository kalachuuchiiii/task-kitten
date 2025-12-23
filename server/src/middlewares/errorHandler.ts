import mongoose from "mongoose";



import { ZodError } from "zod";
import { CustomError } from "@/utils/errors";
import { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = async (error, _req, res, _next) => {
  console.log(error);


  if (error instanceof ZodError) {
    const message = JSON.parse(error.message)[0].message ?? 'Validation Error.';
    return res.status(400).json({
      success: false,
      message,
      code: message
    });
  }
  

  if (error instanceof mongoose.Error.ValidationError) {
     const message = Object.values(error.errors)[0]?.message ?? 'Validation Error.';
    return res.status(400).json({
      success: false,
      message,
      code: message
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      message: error.message,
      success: false,
      code: error.code
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
    code: 'server.error.internal'
  });
};
