import { RequestHandler } from "express";


export const catchErrors = (fn: RequestHandler): RequestHandler => {
   return async(req, res, next) => {
     try {
       await fn(req, res, next);
     }catch(e){
       return next(e);
     }
   }
}