import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import mainRouter from '../router/main.router';
import { errorHandler } from '../middlewares/errorHandler';



export const createServer = () => {
    const origin = process.env.WEB_ORIGIN;
    const app = express();
    
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({
        origin,
        credentials: true
    }))
    app.use(mainRouter);
    app.use(errorHandler);

    return app;

}