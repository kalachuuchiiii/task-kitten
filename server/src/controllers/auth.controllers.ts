
import { RequestHandler } from "express";
import { AuthService } from "../services/auth.services";
import { UnauthorizedError } from "../utils/errors/customErrors";
import { cookieOptions } from "../constants";
import z from "zod";
import { credentialsSchema, signInFormSchema, signUpFormSchema, usernameSchema } from "@shared/schema";


const authService = new AuthService();

export class AuthController {

  updateUsername: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const newUsername = usernameSchema.parse(req.body.newUsername);
    const update = await authService.updateUsername({ newUsername, userId });
    return res.status(200).json({
      success: true,
      message: 'Username updated successfully!'
    })
  }


  updatePassword: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const { newPassword } = credentialsSchema.parse(req.body.credentials); 
    
    const update = await authService.updatePassword({ newPassword, userId });

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
    })

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
    const { username, password } = signInFormSchema.strip().parse(req.body.signInForm);
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
    const { username, password } = signUpFormSchema.strip().parse(req.body.signUpForm);
    await authService.register({ username, password });

    return res.status(200).json({
      success: true,
      message: "Registered Successfully!",
    });
  };
}

