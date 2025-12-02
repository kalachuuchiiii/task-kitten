import { EntityHelper } from "@/helpers";
import { Task } from "@/models";
import { TaskFields, TaskListOptions, TaskSchema } from "@shared/types";



const taskHelper = new EntityHelper<TaskSchema>(Task);

export class TaskServices {
  getTask = async (taskId: string, userId: string) => {
    const task = (await taskHelper.getResource({ _id: taskId })).verifyOwner(userId);
    return task;
  };

  createTask = async (taskForm: TaskFields) => {
    const createdTask = new Task({
      ...taskForm,
    });
    return await createdTask.save();
  };

  deleteById = async(taskId: string, userId: string) => {
    const data = ((await taskHelper.getResource({ _id: taskId })).verifyOwner(userId)).deleteOne();
    return data;
  }
 
  getTaskList = async (options: TaskListOptions) => {
    const { userId, page, limit } = options;
    return await taskHelper.getListOfResource({ userId }, page, limit);
  };
}
