import { useState, type ChangeEvent } from "react";
import type { TaskFormFieldTypes } from "@shared/types";
import { normalize } from "@shared/utils";

export type TextChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export const useTaskForm = (
  initialValue: TaskFormFieldTypes = {
    description: "",
    keywords: [],
    note: "",
    status: "pending",
    priority: "low",
    startedAt: new Date(),
    due: new Date(),
  }
) => {
  const [taskForm, setTaskForm] = useState<TaskFormFieldTypes>(initialValue);

  const handleChangeDescription = (e: TextChangeEvent) => {
    const { value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleChangeNote = (e: TextChangeEvent) => {
    const { value } = e.target;
    setTaskForm((prev) => ({
      ...prev,  
      note: value,
    }));
  };

  const handleAddKeyword = (keyword: string) => {
    setTaskForm((prev) => ({
      ...prev,
      keywords: [...prev.keywords, keyword],
    }));
  };

  const handleChangeDate = (
    value: Date | undefined,
    name: "due" | "startedAt"
  ) => {
    if (!value) return;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (value: string, name: "priority" | "status") => {
    if (!value) return;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveKeyword = (value: string) => {
    const remainingKeywords = taskForm.keywords.filter(
      (kw) => normalize(kw) !== normalize(value)
    );
    setTaskForm((prev) => ({
      ...prev,
      keywords: remainingKeywords,
    }));
  };

  return {
    taskForm,
    handleAddKeyword,
    handleChangeDate,
    handleChangeNote,
    handleRemoveKeyword,
    handleChangeDescription,
    handleSelect,
  };
};
