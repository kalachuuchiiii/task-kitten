
import { useApi } from "@/hooks/useApi";

import { getErrorMessage } from "@/utils/getErrorMessage";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import type {  TaskFields, TaskFilter, TaskStatus } from "@shared/types";
import { statusEnum } from "@shared/constants";

export const useTasks = () => {
  const [taskForm, setTaskForm] = useState<Omit<TaskFields, 'userId'>>({
    description: "",
    status: "pending",
    priority: 'low',
    due: new Date(),
  });
  const [searchQuery, setSearchQuery ] = useSearchParams();
  const [filter, setFilter] = useState<TaskFilter>({
    due: new Date(),
    createdAt: 1,
    q: searchQuery.get('q') ?? '',
    status: ['pending', 'in_progress', 'completed', 'cancelled'],
    priority: ['low', 'moderate', 'high']
    })
  const queryClient = useQueryClient()
  const API = useApi();
  const { data, fetchNextPage: fetchNextTask, hasNextPage } = useInfiniteQuery({
    queryKey: ["tasks"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await API.get(`/api/tasks?page=${pageParam}&limit=5`);
      return res.data;
    },
    getNextPageParam: (nextPage) => nextPage?.nextPage ?? null,
  });

  const handleChangeStatus = (value: string) => {
    if (!statusEnum.includes(value as TaskStatus)) return;
    setTaskForm((prev) => ({
      ...prev,
      status: value as TaskStatus,
    }));
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async () => {
      const p = API.post("/api/task", { taskForm });
      await toast.promise(p, {
        loading: "Creating task...",
        success: "Created successfully!",
        error: (err) => getErrorMessage(err),
      });
      return await p;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']})
    }
  });

  const tasks = useMemo(() => {
    const pages = data?.pages ? data.pages.flatMap((task) => task.tasks) : [];
    return pages;
  }, [data]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!ref || !hasNextPage) return;
    fetchNextTask();
  }, [ref, inView, hasNextPage, fetchNextTask]);

  return {
    taskForm,
    createTask,
    tasks,
    ref,
    filter,
    setFilter,
    setSearchQuery,
    handleChangeStatus,
    isCreatingTask,
    hasNextPage,
    handleChangeDescription,
  };
};
