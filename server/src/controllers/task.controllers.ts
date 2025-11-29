import { RequestHandler } from "express";
import z from "zod";
import { TaskServices } from "../services/task.services";
import { Types } from "mongoose";

const taskService = new TaskServices();
export class TaskController {


  //GET /task/:id
  getTask: RequestHandler = async (req, res) => {
    const taskId = z.string().parse(req.params.id);
    const userId = z.string().parse(req.locals?.["user"]);

    const task = await taskService.getTask(taskId, userId);

    return res.status(200).json({
        success: true,
        task
    })
  };

  //POST /task
  createTask: RequestHandler = async(req, res) => {
      const taskFields = req.body.taskFields;
      const userId = z.string().parse(req.locals.user);

    const createdTask = await taskService.createTask({ ...taskFields, userId: new Types.ObjectId(userId) });

    return res.status(201).json({
      success: true, 
      createdTask
    })
  }
  
}