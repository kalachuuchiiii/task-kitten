
import { Task } from "../models/task/task";
import { getOwnResource } from "../utils/getOwnResource";
import { Status, TaskSchema } from "../types/task";
import { Document } from "mongoose";
import z from "zod";

const taskSchema = z.object({
  description: z.string(),
  userId: z.string(),
  status: Object.keys(Status)
})

export class TaskServices {
  getTask = async (taskId: string, userId: string) => {
    const task = getOwnResource<TaskSchema>(Task, {
      queryFilter: { _id: taskId },
      userId,
      ownerField: "userId",
    });
    return task;
  };

  createTask = async (
    taskFields: Partial<Omit<TaskSchema, keyof Document>>,
  ) => {
    const verifiedTaskFields = taskSchema.parse(taskFields);
    const createdTask = new Task({
      ...verifiedTaskFields,
    });
    return createdTask.save();

  };
}