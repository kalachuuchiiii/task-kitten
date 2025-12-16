import { useApi } from "@/hooks";
import { getErrorMessage } from "@/utils";
import { DESCRIPTION_LIMIT, KEYWORD_LIMIT, taskPriority, taskStatus } from "@shared/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useTaskForm } from "./useTaskForm";
import type { TaskFormFieldTypes } from "@shared/types";
import { initialVal } from "../constants";

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
        error: (err) => getErrorMessage(err),
        success: "Task Deleted Successfully!",
      });
      return await p;
    },
    onSuccess: () => {
      nav(-1);
    },
  });

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async () => {
      if (taskForm.description.length > DESCRIPTION_LIMIT.LENGTH) {
        return toast.error(DESCRIPTION_LIMIT.MESSAGE);
      }
      const p = api.post("/task/create", { taskForm });
      await toast.promise(p, {
        loading: "Creating task...",
        success: "Created successfully!",
        error: (err) => getErrorMessage(err),
      });
      return await p;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ['task', id],
    mutationFn: async () => {
      const p = api.patch(`/task/update/${id}`, { ...taskForm });
      await toast.promise(p, {
        loading: "Updating task...",
        success: "Updated successfully!",
        error: (err) => getErrorMessage(err),
      });
      return await p;
    }
  })

  const { mutate: revertTask, isPending: isRevertingTask } = useMutation({
    mutationFn: async (historyId: string) => {
      const p = api.patch(`/task/revert/${id}/${historyId}`);
      toast.promise(p, {
        loading: 'Reverting...',
        success: 'Reverted back successfully!',
        error: (err) => getErrorMessage(err)
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
