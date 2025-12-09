import { ForbiddenError } from "@/utils/errors";
import { DESCRIPTION_LIMIT, KEYWORD_CONFLICT_MSG, KEYWORD_LIMIT, KEYWORDS_LIMIT, taskPriority, taskStatus } from "@shared/constants";
import { TaskStatus, TaskSchema, TaskPriority } from "@shared/types";

import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema<TaskSchema>(
  {
    keywords: {
      type: [{ type: String, index: true, unique: false, maxlength: [KEYWORD_LIMIT.LENGTH, KEYWORD_LIMIT.MESSAGE] }],
     validate: {
      validator: (keywordArr: string[]) => {
       return keywordArr.length <= KEYWORDS_LIMIT.LENGTH;
      },
      message: KEYWORDS_LIMIT.MESSAGE
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
      maxlength: [DESCRIPTION_LIMIT.LENGTH, DESCRIPTION_LIMIT.MESSAGE],
      required: [true, DESCRIPTION_LIMIT.MESSAGE],
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


taskSchema.methods.verifyOwner = function (userId: string) {
  if (String(this.userId) !== userId) {
    throw new ForbiddenError("You do not have access to this task");
  }
  return this;
};

export const taskFields = Object.keys(taskSchema.paths);
export const Task = mongoose.model("Task", taskSchema);


