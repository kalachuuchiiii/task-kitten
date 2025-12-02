import { RequestHandler } from "express";
import z from "zod";

import { priorityEnum, statusEnum } from "@tasker/shared/src/constants/task";
import { TaskServices } from "@/services";

const taskService = new TaskServices();

const taskSchema = z.object({
  description: z.string(),
  status: z.enum(statusEnum),
  due: z.date(),
  priority: z.enum(priorityEnum),
});

const paramSchema = (fallback: number = 1) =>
  z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? fallback : num;
  }, z.number());

export class TaskController {
  //DELETE /task/:id
  deleteTaskById: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const taskId = z.string().parse(req.params.id);
    const data = await taskService.deleteById(taskId, userId);
    return res.status(200).json({
      success: true,
      data,
      message: "Task deleted successfully!",
    });
  };
  //GET /task/:id
  getTask: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.id);
    const userId = z.string().parse(req.user);

    const task = await taskService.getTask(taskId, userId);

    return res.status(200).json({
      success: true,
      task,
    });
  };

  //POST /task
  createTask: RequestHandler = async (req, res) => {
    const taskForm = taskSchema.parse(req.body.taskForm);

    const userId = z.string().parse(req.user);
    const createdTask = await taskService.createTask({
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
    const page = paramSchema(1).parse(req.query.page);
    const limit = paramSchema(6).parse(req.query.limit);
    const { resourceList, nextPage, totalResource } =
      await taskService.getTaskList({ userId, page, limit });

    return res.status(200).json({
      success: true,
      tasks: resourceList,
      nextPage,
      totalTasks: totalResource,
    });
  };
}
