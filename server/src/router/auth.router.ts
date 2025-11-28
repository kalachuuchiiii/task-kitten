
import { Router } from "express";
import { catchErrors } from "../utils/catchErrors";
import { AuthController } from "../controllers/auth.controllers";


const authRouter = Router();
const authController = new AuthController();

authRouter.post('/sign-in', catchErrors(authController.signIn));
authRouter.post('/sign-up', catchErrors(authController.signUp));
authRouter.post('/sign-out', catchErrors(authController.signOut));
authRouter.get('/session', catchErrors(authController.getSession));

export default authRouter;