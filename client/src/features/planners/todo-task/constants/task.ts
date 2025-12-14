import { COMPARISON_OPERATORS } from "@shared/constants";
import type { TaskFilter, TaskFormFieldTypes } from "@shared/types";

export const initialVal: TaskFormFieldTypes = {
  description: "",
  keywords: [],
  note: "",
  status: "pending",
  priority: "low",
  startedAt: new Date(),
  due: new Date(),
};

export const initialFilterValues: TaskFilter = {
  description: "",
  status: ["pending", "in_progress", "completed", "cancelled"],
  priority: ["low", "moderate", "high"],
  due: {
    range: {
      from: undefined,
      to: undefined,
    },
    specific: {
      date: undefined,
      operator: COMPARISON_OPERATORS[0],
    },
  },
  startedAt: {
    range: {
      from: undefined,
      to: undefined,
    },
    specific: {
      date: undefined,
      operator: COMPARISON_OPERATORS[0],
    },
  },
  keywords: [],
} as const;
