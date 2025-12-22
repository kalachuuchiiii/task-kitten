import { useApi } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useTaskForm } from "./useTaskForm";
import type { TaskFormFieldTypes } from "@shared/types";
import { initialVal } from "../constants";
import type { FormEvent } from "react";
import { historyRecordSchema, taskSchema } from "@shared/schema";
import { extractErrorMessage, renderErrorToast } from "@/utils/error";
import { extractSuccessMessage } from "@/utils";

export const useTaskActions = (initialTaskForm: TaskFormFieldTypes = initialVal) => {

  const queryClient = useQueryClient();
  const formControl = useTaskForm(initialTaskForm);
  const { taskForm } = formControl;


  const api = useApi();
  const { id } = useParams();
  const nav = useNavigate();
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: async () => {
      const p = api.delete(`/task/delete/${id}`);
      toast.promise(p, {
        loading: "Deleting task...",
        error: (err) => extractErrorMessage(err),
        success: extractSuccessMessage
      });
      return await p;
    },
    onSuccess: () => {
      nav(-1);
    },
  });

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const parsed = taskSchema.parse(taskForm);
      const p = api.post("/task/create", { taskForm: parsed });
      await toast.promise(p, {
        loading: "Creating task...",
        success: extractSuccessMessage
      });
      return await p;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: renderErrorToast
  });

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ['task', id],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(taskForm);
      const parsed = historyRecordSchema.strip().parse(taskForm);
      const p = api.patch(`/task/update/${id}`, { ...parsed });
      await toast.promise(p, {
        loading: "Updating task...",
        success: extractSuccessMessage,
      });
      return await p;
    },
    onError: renderErrorToast
  })

  const { mutate: revertTask, isPending: isRevertingTask } = useMutation({
    mutationFn: async (historyId: string) => {
      const p = api.patch(`/task/revert/${id}/${historyId}`);
      toast.promise(p, {
        loading: 'Reverting...',
        success: extractSuccessMessage,
        error: extractErrorMessage
      })
      return p;
    }
  })

  return {
    deleteTask,
    revertTask,
    createTask,
    updateTask,
    isRevertingTask,
    isUpdatingTask,
    formControl,
    isCreatingTask,
    isDeletingTask,
  };
};
