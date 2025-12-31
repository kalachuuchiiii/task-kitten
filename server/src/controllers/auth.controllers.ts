
import { RequestHandler } from "express";
import { AuthService } from "../services/auth.services";
import { UnauthorizedError } from "../utils/errors/customErrors";
import { cookieOptions } from "../constants";
import z from "zod";
import { passwordFormSchema, signInFormSchema, signUpFormSchema, usernameFormSchema } from "@shared/schema";


const authService = new AuthService();

export class AuthController {

  sendVerificationCod: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const email = z.string().email().parse(req.body.email);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const sentMail = await authService.sendVerificationCode({ userId, email, code });
    
    return res.status(200).json({
      success: true,
      sentMail,
      code: 'auth.send_verification_code.success'
    })
  }

  updateUsername: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const { newUsername } = usernameFormSchema.strip().parse(req.body.usernameForm);
    const update = await authService.updateUsername({ newUsername, userId })

    return res.status(200).json({
      success: true,
      code: 'username.updated'
    })
  }
  
  refresh: RequestHandler = async(req, res) => {
    const refreshToken = z.string().parse(req.cookies['refresh-token']);
    const { accessToken } = await authService.refresh(refreshToken);
    return res.status(200).json({
      success: true,
      accessToken
    })
  }

  updatePassword: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const { newPassword, oldPassword } = passwordFormSchema.parse(req.body.passwordForm); // confirm pass checking alr handled here so no additional check needed
    const update = await authService.updatePassword({ newPassword, userId, oldPassword });

    return res.status(200).json({
      success: true,
      code: 'auth.update_password.success'
    })
  }

  getSession: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies?.["refresh-token"];
    const sessionData = await authService.getSession(refreshToken);
    return res.status(200).json({
      success: true,
      ...sessionData,
      isAuthenticated: true
    }); 
  };

  signOut: RequestHandler = async (req, res) => {
    const tokenName = "refresh-token";
    const cookie = req.cookies[tokenName];
    if (!cookie) {
      throw new UnauthorizedError('auth.error.session_not_found');
    }
    res.clearCookie(tokenName, { ...cookieOptions });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully!",
      code: 'auth.signout.success'
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
      code: 'auth.signin.success'
    });
  };

  signUp: RequestHandler = async (req, res) => {
    const { username, password } = signUpFormSchema.strip().parse(req.body.signUpForm);
    await authService.register({ username, password });

    return res.status(200).json({
      success: true,
      message: "Registered Successfully!",
      code: 'auth.signup.success'
    });
  };
}

