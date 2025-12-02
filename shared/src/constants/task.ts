import { Priority, TaskStatus } from "../types";

export const statusEnum: TaskStatus[] = ['pending', 'cancelled', 'completed', 'in_progress'];
export const priorityEnum: Priority[] = ['low', 'moderate', 'high']