import { verifyToken } from "@/helpers";
import { AuthService } from "@/services";
import { UnauthorizedError } from "@/utils/errors";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

const authService = new AuthService();

export class AuthMiddleware {
  authenticateOrRefresh: RequestHandler = async (req, res, next) => {
    const header = req.headers.authorization ?? "";

    if (!header.startsWith("Bearer ")) {
      throw new UnauthorizedError("auth.error.invalid_token");
    }
    const accessToken = header.split(" ")[1];
    const decodedToken = await verifyToken(accessToken);
    req.user = decodedToken.user;

    return next();
  };
}
