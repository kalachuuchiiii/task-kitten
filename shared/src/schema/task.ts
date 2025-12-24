import z from "zod";
import { taskPriority, taskStatus } from "../constants";
import { applyLimits, toDate } from "../utils";
import { TASK_LIMITS, TASK_RECORD_LIMITS } from "../limits";



const { description, keyword, keywords } = TASK_LIMITS;


export const taskSchema = z
  .object({
    description: applyLimits(description),
    status: z.enum(taskStatus),
    keywords: z.array(z.string().max(keyword.max, keyword.code)).max(keywords.max, keywords.code),
    due: z.preprocess(toDate(), z.date()),
    startedAt: z.preprocess(toDate(), z.date()),
    priority: z.enum(taskPriority),
  })
  .refine((task) => task.startedAt <= task.due, {
    message: "task.error.due_must_be_ahead",
    path: ["due"],
  })

  export const taskRecordSchema = taskSchema.merge(
    z.object({
      note: applyLimits(TASK_RECORD_LIMITS.note),
    }),
  ).refine((task) => task.startedAt <= task.due, {
    message: "task.error.due_must_be_ahead",
    path: ["due"],
  })
  
