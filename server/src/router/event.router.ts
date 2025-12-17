import { EventController } from "@/controllers/event.controllers";
import { AuthMiddleware } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/errors";
import { Router } from "express";



const eventRouter = Router();
const eventController = new EventController();
const authMiddleware = new AuthMiddleware();

eventRouter.use(catchErrors(authMiddleware.authenticateOrRefresh));
eventRouter.post('/create', catchErrors(eventController.createEvent));
eventRouter.get('/month-events', catchErrors(eventController.getMonthEvents));

export default eventRouter;

