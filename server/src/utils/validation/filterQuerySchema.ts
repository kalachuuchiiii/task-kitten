import z from "zod";

import { taskPriority, taskStatus } from "@shared/constants";

import { paramSchema } from "./paramSchema";
import { adjustCurrentYear } from "@shared/utils";

export const processDate = (val: string) => {
  return new Date(val);
}


export const filterQuerySchema = () => {
     const schema = z.object({
          description: z.string().default(''),
          priority: z.array(z.enum(taskPriority)).default(taskPriority),
          status: z.array(z.enum(taskStatus)).default(taskStatus),
          keywords: z.array(z.string()).default([]),
          dueRange: z.array(z.preprocess(processDate, z.date())).max(2).default([adjustCurrentYear(-1), adjustCurrentYear(1)]),
          startedAtRange: z.array(z.preprocess(processDate, z.date())).max(2).default([adjustCurrentYear(-1), adjustCurrentYear(1)])
        }).merge(paramSchema).strip();

        return schema;
}

export type FilterTaskType = z.infer<ReturnType<typeof filterQuerySchema> >;