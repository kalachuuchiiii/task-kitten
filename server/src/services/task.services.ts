import { EntityHelper } from "@/helpers";
import { Task } from "@/models";
import { TaskHistory } from "@/models/task/taskHistory";
import { Params } from "@/types";
import { getChangesInValue, runWithSession } from "@/utils";
import { ConflictError, NotFoundError, ValidationError } from "@/utils/errors";
import { taskHistoryAllowedFields } from "@shared/constants";
import {
  TaskFields,
  TaskFormFieldTypes,
  TaskHistoryFields,
  TaskHistorySchema,
  TaskListOptions,
  TaskSchema,
} from "@shared/types";
import _ from "lodash";

const taskHelper = new EntityHelper<TaskSchema>(Task);
const taskHistoryHelper = new EntityHelper<TaskHistorySchema>(TaskHistory);

export class TaskServices {

  updateTask = async (taskForm: TaskFormFieldTypes, taskId: string, userId: string) => {
    const currentTask = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    const changes: TaskHistoryFields[] = [];

    for (const field of taskHistoryAllowedFields) {
      const oldValue = currentTask[field as keyof typeof currentTask];
      const newValue = taskForm[field as keyof typeof taskForm]

      if (!_.isEqual(oldValue, newValue)) {
        changes.push({ field, oldValue, newValue })
      }
    }

    if (changes.length === 0) {
      throw new ConflictError('No changes found.');
    }

    return await runWithSession(async (session) => {
      const newRecord = await new TaskHistory({ updatedFields: changes, note: taskForm.note, taskId }).save({ session });
      const updatedTask = await Task.findByIdAndUpdate(taskId, { ...taskForm }, { new: true, session });

      return [updatedTask, newRecord];
    })

  }
  getTask = async (taskId: string, userId: string) => {
    const task = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    return task;
  };

  getTaskHistory = async (taskId: string, userId: string, options: Params) => {
    const { page, limit } = options;
    const { resourceList: updateHistory, totalResource: totalUpdates, nextPage } = await taskHistoryHelper.getListOfResource(
      { taskId: taskId },
      page,
      limit
    );
    return { updateHistory, totalUpdates, nextPage };
  };

  createTask = async (taskForm: TaskFields) => {
    return await runWithSession(async (session) => {
      const newValues = Object.entries(taskForm)
        .filter(([key, val]) => taskHistoryAllowedFields.includes(key as typeof taskHistoryAllowedFields[number]))
        .map(([key, value]) => ({
          field: key,
          newValue: value,
          oldValue: null
        }));
      const createdTask = await new Task({
        ...taskForm,
      }).save({ session });
      const history = await new TaskHistory({
        updatedFields: newValues,
        note: 'Created',
        taskId: String(createdTask._id),
      }).save({ session });

      return [createdTask, history];
    });
  };

  deleteById = async (taskId: string, userId: string) => {
    const data = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId).deleteOne();
    return data;
  };

  getTaskList = async (options: TaskListOptions) => {
    const { userId, page, limit } = options;
    return await taskHelper.getListOfResource({ userId }, page, limit);
  };
}
