import { LimitsDict } from "../types";
import { regexSelector } from "../utils";

export const TASK_LIMITS: LimitsDict<'description' | 'keyword' | 'keywords'> = {
  description: {
    min: 1,
    max: 3000,
    code: "task.error.description_exceeded_length_limit",
  },
  keyword: {
    min: 1,
    max: 6,
    code: "task.error.description_exceeded_length_limit",
  },
  keywords: {
    min: 0,
    max: 12,
    code: "task.error.keywords_exceeded_length_limit",
  },
} as const;

export const TASK_RECORD_LIMITS: LimitsDict<'note'> = {
  note: {
    min: 0,
    max: 300,
    code: "task_record.error.note_exceeded_length_limit",
  },
} as const;
