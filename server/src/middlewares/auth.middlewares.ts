
import { verifyToken } from "@/helpers";
import { AuthService } from "@/services";
import { ExpiredSessionError, UnauthorizedError } from "@/utils/errors";
import { RequestHandler } from "express";

const authService = new AuthService();

export class AuthMiddleware {
     authenticateOrRefresh: RequestHandler = async(req, res, next) => {
      const header = req.headers.authorization ?? '';
 
      if(!header.startsWith('Bearer ')){
        throw new UnauthorizedError('Invalid Token.');
      }
      const accessToken = header.split(' ')[1];
      const decodedToken = await verifyToken(accessToken);

    
      if(decodedToken?.user){
        req.user = decodedToken.user;
        return next();
      }   

      const { accessToken: newAccessToken } = await authService.refresh(req.cookies?.['refresh-token']);
      throw new ExpiredSessionError(newAccessToken);  //frontend will replace in-memory token and retry
    }
}