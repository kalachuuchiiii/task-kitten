import { createRestraints, regexSelelector } from "../utils";

export const TASK_LIMITS = {
  description: {
    min: 1,
    max: 5000,
    code: "task.error.description.exceeded_length_limit",
  },
  keyword: {
    min: 1,
    max: 6,
    code: "task.error.keyword_exceeded_length_limit",
  },
  keywords: {
    min: 0,
    max: 12,
    code: "task.error.keywords_exceeded_length_limit",
  },
} as const;

export const TASK_RECORD_LIMITS = {
  note: {
    min: 0,
    max: 300,
    code: "task_record.error.note_exceeded_length_limit",
  },
};
