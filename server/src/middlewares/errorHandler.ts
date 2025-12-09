import mongoose from "mongoose";



import { ZodError } from "zod";
import { CustomError, getErrorMessage } from "@/utils/errors";
import { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = async (error, _req, res, _next) => {
  console.log(error);


  if (error instanceof ZodError) {
    const msg = getErrorMessage(error);
    return res.status(400).json({
      success: false,
      message: msg,
    });
  }

  if (error.name === 'ExpiredSession') {
    return res.status(401).json({
      success: false,
      newAccessToken: error.accessToken
    })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      message: error.message,
      success: false,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
