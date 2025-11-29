import { Router } from "express";
import authRouter from "./auth.router";
import taskRouter from "./task.router";


const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use("/task", taskRouter);

export default mainRouter;