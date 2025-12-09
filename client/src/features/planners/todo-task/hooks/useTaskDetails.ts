import { useSession } from "@/features/auth";
import { useApi } from "@/hooks";
import type { TaskDocument, TaskFormFieldTypes, TaskHistoryBatch } from "@shared/types";
import {  useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import {  useParams } from "react-router-dom";

export const useTaskDetails = () => {

    
    const { id } = useParams();
    const { accessToken } = useSession();
    const api = useApi();
    const {
      data: taskDetail,
      refetch,
      isPending: isFetchingTaskDetail,
      isError,
      error,
    } = useQuery({
      queryKey: ["task", id],
      queryFn: async () => {
        const res = await api.get(`/api/task/${id}`);
        return res.data.task as TaskDocument;
      },
      enabled: !!id && !!accessToken,
    });

    const { data: taskHistory, isPending: isFetchingTaskHistory, hasNextPage, fetchNextPage } = useInfiniteQuery({
      queryKey: ['task-history'],
      queryFn: async({ pageParam = 1}) => {
        const res = await api.get(`/api/task-history/${id}/?page=${pageParam}&limit=5`);
        return res.data;
      },
      getNextPageParam: (nextPage) => nextPage.nextPage,
      initialPageParam: 1,
      enabled: !!id && !!accessToken
    })

    const history = useMemo(() => {
        const pages: TaskHistoryBatch[] = taskHistory?.pages ? taskHistory.pages.flatMap((history) => history.updateHistory) : [];
        return pages;
      }, [taskHistory]);

          const { ref, inView } = useInView();


    useEffect(() => {
      if(isFetchingTaskDetail)return;
        refetch();
    }, [id])


    useEffect(() => {
      if(!hasNextPage || isFetchingTaskHistory || !inView)return;
     fetchNextPage();
    }, [inView])


    return {
        taskDetail,
        history,
        ref,
        isFetchingTaskHistory,
        isFetchingTaskDetail,
        isError,
        error
    }
}