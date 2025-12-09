import { useState, type ChangeEvent } from "react";
import type { TaskForm } from "../types/task";
import { DESCRIPTION_LIMIT, KEYWORD_LIMIT, NOTE_LIMIT } from "@shared/constants";
import { toast } from "sonner";
import type { TaskFormFieldTypes } from "@shared/types";

type TextChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useTaskForm = (initialValue: TaskFormFieldTypes= {
    description: '',
    keywords: [],
    note: '',
    status: 'pending',
    priority: 'low',
    startedAt: new Date(),
    due: new Date()
}) => {
    const [taskForm, setTaskForm] = useState<TaskFormFieldTypes>(initialValue);

    const handleChangeDescription = (e: TextChangeEvent) => {
        const { value } = e.target;
        if (value.length > DESCRIPTION_LIMIT.LENGTH) {
            toast.error(DESCRIPTION_LIMIT.MESSAGE);
            return;
        }

        setTaskForm((prev) => ({
            ...prev,
            description: value
        }))
    }

    const handleChangeNote = (e: TextChangeEvent) => {
        const { value } = e.target;
        if (value.length > NOTE_LIMIT.LENGTH) {
            toast.error(NOTE_LIMIT.MESSAGE);
            return;
        }

        setTaskForm((prev) => ({
            ...prev,
            note: value
        }))
    }


    const handleAddKeyword = (keyword: string) => {
        if (!keyword) return;
        if (keyword.length > KEYWORD_LIMIT.LENGTH) {
            toast.error(KEYWORD_LIMIT.MESSAGE);
            return;
        }
        if (taskForm.keywords.includes(keyword.trim().toLowerCase())) {
            toast.error('Keyword already exists.');
            return;
        }

        setTaskForm((prev) => ({
            ...prev,
            keywords: [...prev.keywords, keyword]
        }))

    }

    const handleChangeDate = (value: Date | undefined, name: 'due' | 'startedAt') => {
        if (!value) return;
        setTaskForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSelect = (value: string, name: 'priority' | 'status') => {
        if (!value) return;
        setTaskForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRemoveKeyword = (value: string) => {
        const remainingKeywords = taskForm.keywords.filter((kw) => kw.trim().toLowerCase() !== value.trim().toLowerCase());
        setTaskForm((prev) => ({
            ...prev,
            keywords: remainingKeywords
        })) 
    }

    return {
        taskForm,
        handleAddKeyword,
        handleChangeDate,
        handleChangeNote,
        handleRemoveKeyword,
        handleChangeDescription,
        handleSelect,
    }

}