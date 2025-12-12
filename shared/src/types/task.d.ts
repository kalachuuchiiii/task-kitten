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
export type TaskRecordFields = {
  [K in keyof Omit<TaskFields, 'userId'>]: {
    field: K;
    oldValue: TaskFields[K]
    newValue: TaskFields[K];
  }
}[keyof Omit<TaskFields, 'userId'>];


export type TaskDocument = TaskFields & {
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string; 
};


export type TaskHistory = { note: string; taskId: string | Types.ObjectId; updatedFields: TaskRecordFields[]; createdAt: string; _id: string;};
export type TaskHistorySchema = Document & TaskHistory;

export type TaskFilter = {
  status: TaskStatus[];
  priority: TaskPriority[];
  startedAtRange: {
    from: Date;
    to: Date;
  };
  dueRange: {
    from: Date;
    to: Date;
  };
  description: string;
  keywords: string[],

};




export type TaskSchema = Omit<TaskFields, 'userId'> &
  Document & {
    userId: Types.ObjectId;
    historyId: Types.ObjectId;
    verifyOwner: (userId: string) => TaskSchema;
  };

export type TaskListOptions = {
  userId: string;
  page: number;
  limit: number;
}
