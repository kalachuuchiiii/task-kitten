import z from "zod";
import { taskPriority, taskStatus } from "../constants";
import { HISTORY_RECORD_LIMIT, TASK_LIMIT } from "../limits";
import { toDate } from "../utils";



const { keywordString, keywordArray, description } = TASK_LIMIT;
const { note } = HISTORY_RECORD_LIMIT; 

export const taskSchema = z
  .object({
    description: z.string().min(description.MIN, description.MESSAGE).max(description.MAX, description.MESSAGE),
    status: z.enum(taskStatus),
    keywords: z.array(z.string().max(keywordString.MAX, keywordString.MESSAGE)).max(keywordArray.MAX, keywordArray.MESSAGE),
    due: z.preprocess(toDate(), z.date()),
    startedAt: z.preprocess(toDate(), z.date()),
    priority: z.enum(taskPriority),
  })
  .refine((task) => task.startedAt <= task.due, {
    message: "task.error.due_must_be_ahead",
    path: ["due"],
  })

  export const historyRecordSchema = taskSchema.merge(
    z.object({
      note: z.string().max(note.MAX, note.MESSAGE).min(note.MIN, note.MESSAGE),
    }),
  ).refine((task) => task.startedAt <= task.due, {
    message: "task.error.due_must_be_ahead",
    path: ["due"],
  })
  
