import { useApi } from "@/hooks/useApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import type { TaskFilter } from "@shared/types";
import { useSession } from "@/features/auth";

export const useTasks = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const { accessToken } = useSession();
  const [filter, setFilter] = useState<TaskFilter>({
    due: new Date(),
    createdAt: 1,
    q: searchQuery.get("q") ?? "",
    status: ["pending", "in_progress", "completed", "cancelled"],
    priority: ["low", "moderate", "high"],
  });
  const API = useApi();
  const {
    data,
    fetchNextPage: fetchNextTask,
    hasNextPage,
    isPending: isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    initialPageParam: 1,
    enabled: !!accessToken,
    queryFn: async ({ pageParam }) => {
      const res = await API.get(`/api/tasks?page=${pageParam}&limit=5`);
      return res.data;
    },
    getNextPageParam: (nextPage) => nextPage?.nextPage ?? null,
  });

  const tasks = useMemo(() => {
    const pages = data?.pages ? data.pages.flatMap((task) => task.tasks) : [];
    return pages;
  }, [data]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!ref || !hasNextPage || !inView || isFetchingNextPage || !accessToken) return;
    fetchNextTask();
  }, [inView]);

  return {
    tasks,
    ref,
    filter,
    setFilter,
    setSearchQuery,
    hasNextPage,
  };
};
