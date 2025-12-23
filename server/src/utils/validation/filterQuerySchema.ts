import z from "zod";

import {
  COMPARISON_OPERATORS,
  taskPriority,
  taskStatus,
} from "@shared/constants";

import { paramSchema } from "./paramSchema";
import { toDate } from "@shared/utils";

export const filterQuerySchema = () => {
  const dateFilterSchema = z
    .object({
      range: z.object({
        from: z.preprocess(toDate({ excludeTime: true }), z.date().optional()),
        to: z.preprocess(toDate({ excludeTime: true }), z.date().optional()),
      }),
      specific: z.object({
        date: z.preprocess(toDate({ excludeTime: true }), z.date().optional()),
        operator: z.enum(COMPARISON_OPERATORS),
      }),
    })
    .strip();
  const schema = z
    .object({
      description: z.string().default(""),
      priority: z.array(z.enum(taskPriority)).default(taskPriority),
      status: z.array(z.enum(taskStatus)).default(taskStatus),
      keywords: z.array(z.string()).default([]),
      due: dateFilterSchema,
      startedAt: dateFilterSchema,
    })
    .merge(paramSchema)
    .strip();

  return schema;
};

export type FilterTaskType = z.infer<ReturnType<typeof filterQuerySchema>>;
