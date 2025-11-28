import mongoose from "mongoose";

import { ErrorRequestHandler } from "express";
import { CustomError } from "../utils/errors/CustomError";
import { getErrorMessage } from "../utils/getErrorMessage";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {

  if(error.name === 'ExpiredSession'){
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
