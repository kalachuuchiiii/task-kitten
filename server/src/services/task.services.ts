import { EntityHelper } from "@/helpers";
import { Task } from "@/models";
import { TaskRecord } from "@/models/task/taskRecord";
import { Params } from "@/types";
import { runWithSession } from "@/utils";
import { ConflictError, NotFoundError } from "@/utils/errors";
import {  FilterTaskType } from "@/utils/validation/filterQuerySchema";
import { taskRecordAllowedFields } from "@shared/constants";
import {
  TaskFields,
  TaskFormFieldTypes,
  TaskRecordFields,
  TaskHistorySchema,
  TaskSchema,
  TaskHistory,
} from "@shared/types";
import _, { filter } from "lodash";
import { QueryFilter } from "mongoose";
import z from "zod";

const taskHelper = new EntityHelper<TaskSchema>(Task);
const taskRecordHelper = new EntityHelper<TaskHistorySchema>(TaskRecord);
type IDS<T extends object = {}> = { taskId: string; userId: string } & T;

export class TaskServices {

  revertTask = async ({ taskId, userId, recordId }: IDS<{ recordId: string }>) => {
    const task = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    const taskRecord = await TaskRecord.findOne({ taskId, _id: recordId }).orFail(new NotFoundError('History Record not found.')).lean();

    const changes = taskRecord.updatedFields.reduce<Record<string, TaskHistory>>((acc, prev) => {
      acc[prev.field] = prev.newValue;
      return acc;
    }, {})

    const updated = await task.updateOne({ ...changes }, { runValidators: true });
    return updated;

  }



  updateTask = async ({ taskForm, userId, taskId }: IDS<{ taskForm: TaskFormFieldTypes }>) => {
    const currentTask = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    const changes: TaskRecordFields[] = [];
    let hasChanges = false;

    for (const field of taskRecordAllowedFields) {
      const oldValue = currentTask[field as keyof typeof currentTask];
      const newValue = taskForm[field as keyof typeof taskForm]
      if (!_.isEqual(newValue, oldValue)) {
        hasChanges = true;
      }
      changes.push({ field, oldValue, newValue })
    }

    if (!hasChanges) {
      throw new ConflictError('No changes found.');
    }

    return await runWithSession(async (session) => {
      const newRecord = await new TaskRecord({ updatedFields: changes, note: taskForm.note, taskId }).save({ session });
      const updatedTask = await Task.findByIdAndUpdate(taskId, { ...taskForm }, { new: true, session, runValidators: true });

      return [updatedTask, newRecord];
    })

  }
  getTask = async ({ taskId, userId }: IDS) => {
    const task = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    return task;
  };

  getTaskHistory = async ({ taskId, userId, options }: IDS<{ options: Params }>) => {
    const { page, limit, sort } = options;
    const task = (await Task.findById(taskId).select('userId').orFail(new NotFoundError('Task not found.'))).verifyOwner(userId);
    const { resourceList: updateHistory, totalResource: totalUpdates, nextPage } = await taskRecordHelper.getListOfResource(
      { taskId: taskId },
      page,
      limit,
      sort
    );
    return { updateHistory, totalUpdates, nextPage };
  };

  createTask = async (taskForm: TaskFields) => {
    return await runWithSession(async (session) => {
      const newValues = Object.entries(taskForm)
        .filter(([key, val]) => taskRecordAllowedFields.includes(key as typeof taskRecordAllowedFields[number]))
        .map(([key, value]) => ({
          field: key,
          newValue: value,
          oldValue: value
        }));
      const createdTask = await new Task({
        ...taskForm,
      }).save({ session });
      const history = await new TaskRecord({
        updatedFields: newValues,
        note: 'Created',
        taskId: String(createdTask._id),
      }).save({ session });

      return [createdTask, history];
    });
  };

  deleteById = async ({ taskId, userId }: IDS) => {
    const data = (await Task.findById(taskId).orFail(new NotFoundError('Task not found.'))).verifyOwner(userId).deleteOne();
    return data;
  };

  getTaskList = async ({ userId, filters }: Omit<IDS<{ filters: FilterTaskType }>, 'taskId'>) => {
    const { page, limit, sort, priority, description, dueRange, startedAtRange, status, keywords } = filters;
    const filterQuery: QueryFilter<TaskSchema> = { userId, status, due: { $gt: dueRange[0], $lt: dueRange[1] }, startedAt: { $gt: startedAtRange[0], $lt: startedAtRange[1] }, priority } 
    if(description !== ''){
      filterQuery.description = { $regex: description, $options: 'i'}; 
    }
    if(keywords.length !== 0){
      filterQuery.keywords = { $in: keywords };
    }
    return await taskHelper.getListOfResource(filterQuery, page, limit, sort);
  };
}
