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
eventRouter.delete('/delete/:eventId', catchErrors(eventController.deleteEvent));
eventRouter.patch('/update/:eventId', catchErrors(eventController.updateEvent));

export default eventRouter;

