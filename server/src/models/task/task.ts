
import { ForbiddenError } from "@/utils/errors";
import { priorityEnum, statusEnum } from "@shared/constants";
import { Priority, TaskStatus, TaskSchema } from "@shared/types";

import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema<TaskSchema>(
  {
    description: {
      type: String,
      minlength: [1, "Description cannot be empty."],
      maxlength: [500, "Description cannot exceed 500 characters."],
      required: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum[0] as TaskStatus,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    due: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: priorityEnum,
      default: priorityEnum[0] as Priority,
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

export const Task = mongoose.model("Task", taskSchema);
