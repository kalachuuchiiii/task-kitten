
import { TaskController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/errors";
import { Router } from "express";


const taskRouter = Router();
const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();

taskRouter.use(catchErrors(authMiddleware.authenticateOrRefresh));
taskRouter.get('/details/:taskId', catchErrors(taskController.getTask));
taskRouter.post('/create',  catchErrors(taskController.createTask));
taskRouter.get('/list',  catchErrors(taskController.getTaskList));
taskRouter.delete('/delete/:taskId',  catchErrors(taskController.deleteTaskById));
taskRouter.get('/history/:taskId', catchErrors(taskController.getTaskHistory));
taskRouter.patch('/update/:taskId', catchErrors(taskController.updateTaskById));
taskRouter.patch('/revert/:taskId/:recordId', catchErrors(taskController.revertTask));



export default taskRouter;