import { verifyOwnerPlugin } from "@/plugins";
import { ForbiddenError } from "@/utils/errors";
import {  KEYWORD_CONFLICT_MSG, taskPriority, taskStatus } from "@shared/constants";
import { TASK_LIMIT } from "@shared/limits";
import { TaskStatus, TaskSchema, TaskPriority } from "@shared/types";

import mongoose, { Types } from "mongoose";
const { keywordString, keywordArray, description } = TASK_LIMIT;

const taskSchema = new mongoose.Schema<TaskSchema>(
  {
    keywords: {
      type: [{ type: String, index: true, unique: false, maxlength: [keywordString.MAX, keywordString.MESSAGE] }],
     validate: {
      validator: (keywordArr: string[]) => {
       return keywordArr.length <= keywordArray.MAX
      },
      message: keywordArray.MESSAGE
     }
    },
    startedAt: {
      type: Date,
      index: true,
      default: () => new Date(),
    },
    description: {
      type: String,
      index: true,
      minlength: [description.MIN, description.MESSAGE],
      maxlength: [description.MAX, description.MESSAGE],
      required: true
    },
    status: {
      type: String,
      index: true,
      enum: taskStatus,
      default: taskStatus[0] as TaskStatus,
    },
    userId: {
      type: Types.ObjectId,
      index: true,
      ref: "User",
      required: true,
    },
    due: {
      type: Date,
      index: true,
      default: null,
    },
    priority: {
      type: String,
      index: true,
      enum: taskPriority,
      default: taskPriority[0] as TaskPriority,
    },
  },

  {
    timestamps: true,
  }
);


taskSchema.plugin(verifyOwnerPlugin<TaskSchema>('userId'));

export const taskFields = Object.keys(taskSchema.paths);
export const Task = mongoose.model("Task", taskSchema);


