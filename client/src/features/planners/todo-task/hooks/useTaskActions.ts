import { useApi } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { TaskFormFieldTypes } from "@shared/types";
import { taskRecordSchema, taskSchema } from "@shared/schema";
import { extractErrorCodeKeys, renderErrorToast } from "@/utils/error";
import { useTranslation } from "react-i18next";

export const useTaskActions = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const api = useApi();
  const { id } = useParams();
  const nav = useNavigate();

  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: async () => {
      const p = api.delete(`/task/delete/${id}`).then(() => { nav(-1) });
      await toast.promise(p, {
        loading: t("task.delete.loading"),
        error: extractErrorCodeKeys,
        success: t("task.delete.success"),
      });
      return await p;
    }
  });

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (taskForm: TaskFormFieldTypes) => {
      const promise = new Promise((resolve, reject) => {
        try {
          const parsedTaskForm = taskSchema.strip().parse(taskForm);
          const p = api.post("/task/create", { taskForm: parsedTaskForm });
          resolve(p);
        } catch (e) {
          reject(e);
        }
      });

      await toast.promise(promise, {
        loading: t("task.create.loading"),
        success: t("task.create.success"),
        error: extractErrorCodeKeys,
      });
      return await promise;
    },
  });

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ["task", id],
    mutationFn: async (taskForm: TaskFormFieldTypes) => {
      const promise = new Promise((resolve, reject) => {
        try {
          const parsed = taskRecordSchema.strip().parse(taskForm);
      const p = api.patch(`/task/update/${id}`, { updatedTaskRecord: parsed });
      resolve(p);
        }catch(e){ reject(e) }
      })
    
      await toast.promise(promise, {
        loading: t("task.update.loading"),
        success: t("task.update.success"),
        error: extractErrorCodeKeys,
      });
      return await promise;
    },
  });

  const { mutate: revertTask, isPending: isRevertingTask } = useMutation({
    mutationFn: async (historyId: string) => {
      const p = api.patch(`/task/revert/${id}/${historyId}`);
      toast.promise(p, {
        loading: t("task.revert.loading"),
        success: t("task.revert.success"),
        error: extractErrorCodeKeys,
      });
      return p;
    },
  });

  return {
    deleteTask,
    revertTask,
    createTask,
    updateTask,
    isRevertingTask,
    isUpdatingTask,
    isCreatingTask,
    isDeletingTask,
  };
};
