import { UpdatedFieldsSchema } from './task.d';

import { Types, Document } from 'mongoose';

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type TaskPriority = 'low' | 'moderate' | 'high';

export type TaskFields = {
  description: string;
  status: TaskStatus;
  userId: string;
  startedAt: Date;
  keywords: string[];
  due: Date;
  priority: Priority;
};

export type TaskFormFieldTypes = Omit<TaskFields, 'userId'> & { note: string };
export type TaskHistoryFields = {
  [K in keyof Omit<TaskFields, 'userId'>]: {
    field: K;
    oldValue: TaskFields[K]
    newValue: TaskFields[K];
  }
}[keyof Omit<TaskFields, 'userId'>];

export type TaskHistoryBatch  = Document & { 
  taskId: string;
  note: string;
  updatedFields: TaskHistoryFields[],
  createdAt: Date;
}

export type TaskDocument = TaskFields & {
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string; 
};



export type UpdatedFieldsSchema =  TaskHistoryFields;
export type TaskHistorySchema = Document & { note: string; taskId: string | Types.ObjectId; updatedFields: UpdatedFieldsSchema[]}

export type TaskFilter = {
  status: TaskStatus[];
  priority: TaskPriority[],
  due: Date;
  q: string;
  createdAt: number;
};


export type TaskSchema = Omit<TaskFields, 'userId'> &
  Document & {
    userId: Types.ObjectId;
    historyId: Types.ObjectId;
    verifyOwner: (ownerId: string) => TaskSchema;
  };

export type TaskListOptions = {
  userId: string;
  page: number;
  limit: number;
}
