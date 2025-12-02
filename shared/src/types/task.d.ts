import { Types, Document } from 'mongoose';

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type Priority = 'low' | 'moderate' | 'high';

export type TaskFields = {
  description: string;
  status: TaskStatus;
  userId: string;
  due: Date;
  priority: Priority;
};

export type TaskDocument = TaskFields & {
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string; 
};

export type TaskFilter = {
  status: TaskStatus[];
  priority: Priority[],
  due: Date;
  q: string;
  createdAt: number;
};


export type TaskSchema = Omit<TaskFields, 'userId'> &
  Document & {
    userId: Types.ObjectId;
    verifyOwner: (ownerId: string) => TaskSchema;
  };

export type TaskFields = Omit<TaskSchema, keyof Document | 'verifyOwner'>

export type TaskListOptions = {
  userId: string;
  page: number;
  limit: number;
}
