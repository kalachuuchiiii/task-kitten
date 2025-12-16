import { EventController } from "@/controllers/event.controllers";
import { catchErrors } from "@/utils/errors";
import { Router } from "express";



const eventRouter = Router();
const eventController = new EventController();

eventRouter.post('/create', catchErrors(eventController.createEvent));
eventRouter.post('/month-events', catchErrors(eventController.getMonthEvents));

export default eventRouter;

