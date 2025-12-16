import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";
import mainRouter from "@/router/main.router";
import { errorHandler } from "@/middlewares/errorHandler";


export const createServer = () => {
  const origin = config.WEB_ORIGIN;
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
  app.get("/", (req, res) => {
    res.json({
      message: "Healthy",
    });
  });
  app.use('/api', mainRouter);
  app.use(errorHandler);

  return app;
};
