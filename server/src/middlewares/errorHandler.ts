import mongoose from "mongoose";



import z, { ZodError } from "zod";
import { CustomError } from "@/utils/errors";
import { ErrorRequestHandler } from "express";
import { extractZodCodeParams } from "@shared/utils";




export const errorHandler: ErrorRequestHandler = async (error, _req, res, _next) => {

  if (error instanceof ZodError) {
    const { code, params } = extractZodCodeParams(error);
    return res.status(400).json({
      success: false,
      code,
      params
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      success: false,
      code: error.code,
      params: error.params
    });
  }

  return res.status(500).json({
    success: false,
    code: 'error.internal',
  });
};
