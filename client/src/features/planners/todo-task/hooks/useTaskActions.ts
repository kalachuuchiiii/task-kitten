import { useApi } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useTaskForm } from "./useTaskForm";
import type { TaskFormFieldTypes } from "@shared/types";
import { initialVal } from "../constants";
import type { FormEvent } from "react";
import { taskRecordSchema, taskSchema } from "@shared/schema";
import {  extractErrorCodeKeys, renderErrorToast } from "@/utils/error";
import { extractSuccessMessage } from "@/utils";
import { useTranslation } from "react-i18next";

export const useTaskActions = (initialTaskForm: TaskFormFieldTypes = initialVal) => {

  const queryClient = useQueryClient();
  const formControl = useTaskForm(initialTaskForm);
  const { taskForm } = formControl;
  const { t } = useTranslation();


  const api = useApi();
  const { id } = useParams();
  const nav = useNavigate();
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: async () => {
      const p = api.delete(`/task/delete/${id}`);
      toast.promise(p, {
        loading: t('task.delete.loading'),
        error:  extractErrorCodeKeys,
        success: t("task.delete.success")
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
      const parsedTaskForm = taskSchema.strip().parse(taskForm);

      const p = api.post("/task/create", { taskForm: parsedTaskForm });
      await toast.promise(p, {
        loading: t('task.create.loading'),
        success: t('task.create.success')
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
      const parsed = taskRecordSchema.strip().parse(taskForm);
      const p = api.patch(`/task/update/${id}`, { ...parsed });
      await toast.promise(p, {
        loading: t('task.update.loading'),
        success: t('task.update.success'),
      });
      return await p;
    },
    onError: renderErrorToast
  })

  const { mutate: revertTask, isPending: isRevertingTask } = useMutation({
    mutationFn: async (historyId: string) => {
      const p = api.patch(`/task/revert/${id}/${historyId}`);
      toast.promise(p, {
        loading: t('task.revert.loading'),
        success: t('task.revert.success'),
        error: extractErrorCodeKeys
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
