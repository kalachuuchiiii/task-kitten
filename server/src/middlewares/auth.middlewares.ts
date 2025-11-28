import { RequestHandler } from "express";
import { ExpiredSessionError, UnauthorizedError } from "../utils/errors/Errors";
import { verifyToken } from "../helpers/jwt";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export class AuthMiddlewares {
     authenticateAndRefresh: RequestHandler = async(req, res, next) => {
      const header = req.headers.authorization ?? '';
      if(!header.startsWith('Bearer ')){
        throw new UnauthorizedError('Invalid Token.');
      }
      const accessToken = header.split(' ')[1];
      const decodedToken = await verifyToken(accessToken);
      if(decodedToken){
        return next();
      }   

      const { accessToken: newAccessToken } = await authService.refresh(req.cookies?.['refresh-token']);
      throw new ExpiredSessionError(newAccessToken);  //frontend will renew the token and retry
    }
}