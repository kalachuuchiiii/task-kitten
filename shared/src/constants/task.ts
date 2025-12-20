import {  TaskPriority, TaskStatus } from "../types";

export const taskStatus: TaskStatus[] = ['pending', 'cancelled', 'completed', 'in_progress'] as const;
export const taskPriority: TaskPriority[] = ['low', 'moderate', 'high'] as const;
export const taskRecordAllowedFields = ['description', 'keywords', 'due', 'startedAt', 'priority', 'status'] as const;
export const KEYWORD_CONFLICT_MSG = 'Keyword already exists.' as const;
export const COMPARISON_OPERATORS = ['greater_than', 'greater_than_or_equal', 'less_than', 'less_than_or_equal', 'equal_to'] as const; 
