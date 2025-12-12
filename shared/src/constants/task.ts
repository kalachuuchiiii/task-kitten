import { TaskFields, TaskPriority, TaskStatus } from "../types";
export type Limiter = {
    LENGTH: number;
    MESSAGE: string;
}

export const taskStatus: TaskStatus[] = ['pending', 'cancelled', 'completed', 'in_progress'] as const;
export const taskPriority: TaskPriority[] = ['low', 'moderate', 'high'] as const;
export const taskRecordAllowedFields = ['description', 'keywords', 'due', 'startedAt', 'priority', 'status'] as const;
export const KEYWORD_LIMIT: Limiter = { LENGTH: 12, MESSAGE: "Keyword must be 1-12 characters." } as const;
export const KEYWORDS_LIMIT: Limiter = { LENGTH: 6, MESSAGE: 'You can only add up to 6 keywords. '} as const;
export const KEYWORD_CONFLICT_MSG = 'Keyword already exists.' as const;
export const DESCRIPTION_LIMIT: Limiter = { LENGTH: 5000, MESSAGE: "Description must be 1-5000 characters." } as const;
export const NOTE_LIMIT: Limiter = { LENGTH: 250, MESSAGE: 'Note must not exceed 250 characters'} as const;
