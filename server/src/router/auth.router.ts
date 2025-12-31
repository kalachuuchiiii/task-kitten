


import { AuthController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/errors";

import { Router } from "express";


const authRouter = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

authRouter.post('/refresh', catchErrors(authController.refresh))
authRouter.post('/sign-in', catchErrors(authController.signIn));
authRouter.post('/sign-up', catchErrors(authController.signUp));
authRouter.post('/sign-out', catchErrors(authController.signOut));
authRouter.get('/session', catchErrors(authController.getSession));
authRouter.use(catchErrors(authMiddleware.authenticateOrRefresh));
authRouter.patch('/update-username', catchErrors(authController.updateUsername));
authRouter.patch('/update-password', catchErrors(authController.updatePassword));
authRouter.post('/send-verification-code', catchErrors(authController.sendVerificationCode));


export default authRouter;