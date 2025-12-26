import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroupButton } from "@/components/ui/input-group";
import { Plus } from "lucide-react";
import { useTaskActions, useTaskForm } from "../hooks";

import { Button } from "@/components/ui/button";
import { TaskFormFields } from "./TaskFormFields";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import type { FormEvent } from "react";

export const CreateTaskSheet = () => {
  const { createTask, isCreatingTask } = useTaskActions();
  const taskFormControl = useTaskForm();
  const { t } = useTranslation();
  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTask(taskFormControl.taskForm);
  };

  return (
    <SheetContent className=" p-3 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{t("task_form.title")}</SheetTitle>
        <SheetDescription>{t("task_form.subtitle")}</SheetDescription>
      </SheetHeader>
      <TaskFormFields
        onSubmit={handleCreateTask}
        id="create-task"
        {...taskFormControl}
      />
      <Button
        disabled={isCreatingTask}
        className="button-bg w-full"
        type="submit"
        form="create-task"
      >
        Create task
      </Button>
    </SheetContent>
  );
};
