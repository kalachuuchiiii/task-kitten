import { useSession } from "@/features/auth";
import { useApi } from "@/hooks";
import type { TaskDocument, TaskHistory } from "@shared/types";
import {  useQuery } from "@tanstack/react-query";
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





    useEffect(() => {
      if(isFetchingTaskDetail)return;
        refetch();
    }, [id])

    return {
        taskDetail,
        isFetchingTaskDetail,
        isError,
        error
    }
}