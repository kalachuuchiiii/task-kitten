import { Router } from "express";
import { TaskController } from "../controllers/task.controllers";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { catchErrors } from "../utils/catchErrors";


const taskRouter = Router();
const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();

taskRouter.use(catchErrors(authMiddleware.authenticateOrRefresh));

taskRouter.get('/:id', catchErrors(taskController.createTask));
taskRouter.post('/', catchErrors(taskController.createTask));

export default taskRouter;