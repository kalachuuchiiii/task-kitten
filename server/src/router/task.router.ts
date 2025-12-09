
import { TaskController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/errors";
import { Router } from "express";


const taskRouter = Router();
const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();

taskRouter.use(catchErrors(authMiddleware.authenticateOrRefresh));

taskRouter.get('/task/:id', catchErrors(taskController.getTask));
taskRouter.post('/task',  catchErrors(taskController.createTask));
taskRouter.get('/tasks',  catchErrors(taskController.getTaskList));
taskRouter.delete('/task/:id',  catchErrors(taskController.deleteTaskById));
taskRouter.get('/task-history/:id', catchErrors(taskController.getTaskHistory));
taskRouter.patch('/task/:id', catchErrors(taskController.updateTaskById));




export default taskRouter;