import { Router } from "express";
import authRouter from "./auth.router";
import taskRouter from "./task.router";
import eventRouter from "./event.router";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/task", taskRouter);
mainRouter.use("/event", eventRouter);

export default mainRouter;
