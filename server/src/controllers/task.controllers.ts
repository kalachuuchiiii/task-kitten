import { RequestHandler } from "express";
import z from "zod";
import { taskPriority, taskStatus } from "@tasker/shared/src/constants/task";
import { TaskServices } from "@/services";
import { paramSchema } from "@/utils/paramSchema";
const taskService = new TaskServices();

const taskSchema = z.object({
  description: z.string(),
  status: z.enum(taskStatus),
  keywords: z.array(z.string()),
  due: z.preprocess((val: string) => {
    return new Date(val);
  }, z.date()),
  startedAt: z.preprocess((val: string) => {
    return new Date(val);
  }, z.date()),
  priority: z.enum(taskPriority),
}).strip();

const taskRecordSchema = taskSchema.merge(
  z.object({
    note: z.string(),
  }),
).strip();

export class TaskController {

  
  
  revertTask: RequestHandler = async(req, res) => {
    const taskId = z.string().parse(req.params.taskId);
    const recordId = z.string().parse(req.params.recordId);
    const userId = z.string().parse(req.user);

    const update = await taskService.revertTask({ taskId, userId, recordId });
    return res.status(200).json({
      success: true,
      update
    })
  }

  //GET /task-history/:id (taskId)
  getTaskHistory: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.taskId);
    const userId = z.string().parse(req.user);
    const options = paramSchema.parse(req.query);
    const history = await taskService.getTaskHistory({ taskId, userId, options });

    return res.status(200).json({
      success: true,
      ...history,
    });
  };

  //PATCH /task/:id
  updateTaskById: RequestHandler = async(req, res) => {
    const taskForm =
      taskRecordSchema.parse(req.body);
      const taskId = z.string().parse(req.params.taskId);
      const userId = z.string().parse(req.user);

      const [ updatedTask, newHistoryRecord ] = await taskService.updateTask({ taskForm, taskId, userId });
      
      return res.status(200).json({
        success: true, 
        updatedTask,
        newHistoryRecord
      })
  };

  //DELETE /task/:id
  deleteTaskById: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const taskId = z.string().parse(req.params.taskId);
    const data = await taskService.deleteById({ taskId, userId });
    return res.status(200).json({
      success: true,
      data,
      message: "Task deleted successfully!",
    });
  };
  //GET /task/:id
  getTask: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.taskId);
    const userId = z.string().parse(req.user);
    const task = await taskService.getTask({ taskId, userId });

    return res.status(200).json({
      success: true,
      task,
    });
  };

  //POST /task
  createTask: RequestHandler = async (req, res) => {
    const taskForm = taskSchema.parse(req.body.taskForm);

    const userId = z.string().parse(req.user);
    const [createdTask] = await taskService.createTask({
      ...taskForm,
      userId,
    });

    return res.status(201).json({
      success: true,
      createdTask,
    });
  };

  //GET /tasks
  getTaskList: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const options = paramSchema.parse(req.query);
    const { resourceList, nextPage, totalResource } =
      await taskService.getTaskList({ userId, options });

    return res.status(200).json({
      success: true,
      tasks: resourceList,
      nextPage,
      totalTasks: totalResource,
    });
  };
}
