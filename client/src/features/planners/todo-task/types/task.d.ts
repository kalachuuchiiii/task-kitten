import type { TaskFields } from "@shared/types";

export type TaskForm = Omit<TaskFields, "userId">;
