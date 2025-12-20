
import { RequestHandler } from "express";
import { AuthService } from "../services/auth.services";
import { UnauthorizedError } from "../utils/errors/customErrors";
import { cookieOptions } from "../constants";
import z from "zod";
import { USER_LIMIT } from "@shared/limits";


const authService = new AuthService();

export class AuthController {


  changePassword: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const { password } = credentialsSchema.parse(req.body.credentials);
    
    
  }

  getSession: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies?.["refresh-token"];
    const { user, accessToken } = await authService.getSession(refreshToken);
    return res.status(200).json({
      success: true,
      accessToken,
      user,
      isAuthenticated: !!accessToken && user !== null,
    });
  };

  signOut: RequestHandler = async (req, res) => {
    const tokenName = "refresh-token";
    const cookie = req.cookies[tokenName];
    if (!cookie) {
      throw new UnauthorizedError("No Session Found");
    }
    res.clearCookie(tokenName, { ...cookieOptions });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  };

  signIn: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      throw new UnauthorizedError("Invalid Credentials");
    const { refreshToken, user } = await authService.login({
      username,
      password,
    });

    res.cookie("refresh-token", refreshToken, { ...cookieOptions });

    return res.status(200).json({
      success: true,
      user,
      message: "Logged In Successful!",
    });
  };

  signUp: RequestHandler = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    await authService.register({ username, password, confirmPassword });

    return res.status(200).json({
      success: true,
      message: "Registered Successfully!",
    });
  };
}

