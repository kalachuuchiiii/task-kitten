import { useApi } from "@/hooks/useApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import {  useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "@/features/auth";
import { useFilterTask } from "./useFilterTasks";

export const useTasks = () => {
  const { accessToken } = useSession();
 const filterControl = useFilterTask();
 const { filter, resetFilter } = filterControl; 
  const API = useApi();
  const {
    data,
    fetchNextPage: fetchNextTask,
    hasNextPage,
    refetch,
    isPending: isFetchingTasks,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    initialPageParam: 1,
    enabled: !!accessToken,
    queryFn: async ({ pageParam }) => {
      const res = await API.get(
        `/api/tasks?limit=5&sort=-1`,
        {
          params: {
            filters: JSON.stringify({...filter, page: pageParam, limit: 5, sort: -1}),
          },
        }
      );
      return res.data;
    },
    getNextPageParam: (nextPage) => nextPage?.nextPage ?? null,
  });

  const tasks = useMemo(() => {
    const pages = data?.pages ? data.pages.flatMap((task) => task.tasks) : [];
    return pages;
  }, [data]);

  const resetFilterAndRefetch = async() => {
    resetFilter();
    await refetch();
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!ref || !hasNextPage || !inView || isFetchingTasks || !accessToken)
      return;
    fetchNextTask();
  }, [inView]);

 
  return {
    tasks,
    ref,
    filterControl: {
      ...filterControl,
      isFetchingTasks,
      refetchTasks: refetch,
      resetFilterAndRefetch
    },
    hasNextPage,
  };
};
