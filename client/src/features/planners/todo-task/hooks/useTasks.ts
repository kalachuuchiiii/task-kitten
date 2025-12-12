import { useApi } from "@/hooks/useApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import type { TaskFilter } from "@shared/types";
import { useSession } from "@/features/auth";
import { adjustCurrentYear, normalize } from "@shared/utils";
import { DESCRIPTION_LIMIT, KEYWORD_LIMIT } from "@shared/constants";
import { toast } from "sonner";
import { isValidKeyword, isValidLength } from "@/utils/validation";
import type { TextChangeEvent } from "./useTaskForm";

export const useTasks = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const { accessToken } = useSession();
  const [filter, setFilter] = useState<TaskFilter>({
    description: searchQuery.get("q") ?? "",
    status: ["pending", "in_progress", "completed", "cancelled"],
    priority: ["low", "moderate", "high"],
    dueRange: {
      from: adjustCurrentYear(-1),
      to: adjustCurrentYear(1),
    },
    startedAtRange: {
      from: adjustCurrentYear(-1),
      to: adjustCurrentYear(1),
    },
    keywords: [],
  });
  const API = useApi();
  const {
    data,
    fetchNextPage: fetchNextTask,
    hasNextPage,
    refetch,
    isPending: isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    initialPageParam: 1,
    enabled: !!accessToken,
    queryFn: async ({ pageParam }) => {
      const res = await API.get(
        `/api/tasks?page=${pageParam}&limit=5&sort=-1`,
        {
          params: {
            filters: JSON.stringify(filter),
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

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!ref || !hasNextPage || !inView || isFetchingNextPage || !accessToken)
      return;
    fetchNextTask();
  }, [inView]);

  const handleAddKeyword = (kw: string) => {
    if (!isValidKeyword(kw, filter.keywords)) return;
    setFilter((prev) => ({
      ...prev,
      keywords: [...prev.keywords, kw],
    }));
  };

  const handleRemoveKeyword = (val: string) => {
    const remainingKeywords = filter.keywords.filter(
      (keyword) => normalize(keyword) !== normalize(val)
    );
    setFilter((prev) => ({
      ...prev,
      keywords: remainingKeywords,
    }));
  };

  const handleChangeDescription = (e: TextChangeEvent) => {
    const { value } = e.target;
    if (!isValidLength(value, DESCRIPTION_LIMIT)) return;
    setFilter((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleChangeDateRange = useCallback(
    (
      value: Date | undefined,
      name: "dueRange" | "startedAtRange",
    ) => {
      
     
    },
    []
  );

  const handleSelect = (value: string, name: "status" | "priority") => {
    const isAlreadySelected = filter[name].some((k) => k === value);
    if (isAlreadySelected) {
      const remainingItems = filter[name].filter((k) => k !== value);
      setFilter((prev) => ({
        ...prev,
        [name]: remainingItems,
      }));
      return;
    }

    setFilter((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  return {
    tasks,
    ref,
    filterControl: {
      refetchTasks: refetch,
      handleSelect,
      handleChangeDescription,
      handleAddKeyword,
      handleChangeDateRange,
      handleRemoveKeyword,
      filter,
    },
    setFilter,
    setSearchQuery,
    hasNextPage,
  };
};
