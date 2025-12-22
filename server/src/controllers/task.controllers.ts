import { RequestHandler } from "express";
import z from "zod";
import { TaskServices } from "@/services";
import { filterQuerySchema } from "@/utils/validation/filterQuerySchema";
import { paramSchema } from "@/utils/validation";
import { historyRecordSchema, taskSchema } from "@shared/schema";

const taskService = new TaskServices();

export class TaskController {


  //PATCH /task/revert/:taskId/:recordId
  revertTask: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.taskId);
    const recordId = z.string().parse(req.params.recordId);
    const userId = z.string().parse(req.user);

    const update = await taskService.revertTask({ taskId, userId, recordId });
    return res.status(200).json({
      success: true,
      update,
      code: 'task.reverted'
    })
  }

  //GET /task/history/:taskId
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

  //PATCH /task/update/:taskId
  updateTaskById: RequestHandler = async (req, res) => {
    const taskForm =
      historyRecordSchema.parse(req.body);
    const taskId = z.string().parse(req.params.taskId);
    const userId = z.string().parse(req.user);

    const [updatedTask, newHistoryRecord] = await taskService.updateTask({ taskForm, taskId, userId });

    return res.status(200).json({
      success: true,
      code: 'task.updated',
      updatedTask,
      newHistoryRecord
    })
  };

  //DELETE /task/delet/:taskId
  deleteTaskById: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const taskId = z.string().parse(req.params.taskId);
    const data = await taskService.deleteById({ taskId, userId });
    return res.status(200).json({
      success: true,
      code: 'task.deleted',
      data,
      message: "Task deleted successfully!",
    });
  };
  //GET /task/details/:taskId
  getTask: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.taskId);
    const userId = z.string().parse(req.user);
    const task = await taskService.getTask({ taskId, userId });

    return res.status(200).json({
      success: true,

      task,
    });
  };

  //POST /task/create 
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
      code: 'task.created'
    });
  };

  //GET /task/list
  getTaskList: RequestHandler = async (req, res) => {
   
    const userId = z.string().parse(req.user);
    const filter: Record<string, any> = JSON.parse(String(req.query.filters ?? {}) ?? '{}') ?? {};
    const filters = filterQuerySchema().parse(filter);

    const { resourceList, nextPage, totalResource } =
      await taskService.getTaskList({ userId, filters });

    return res.status(200).json({
      success: true,
      tasks: resourceList,
      nextPage,
      totalTasks: totalResource,
    });
  };
}
