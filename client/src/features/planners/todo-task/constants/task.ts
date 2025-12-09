import type {  TaskFormFieldTypes } from "@shared/types";

export const initialVal:  TaskFormFieldTypes = {
    description: '',
    keywords: [],
    note: '',
    status: 'pending',
    priority: 'low',
    startedAt: new Date(),
    due: new Date()
}