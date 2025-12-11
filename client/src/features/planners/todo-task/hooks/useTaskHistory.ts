import { useSession } from "@/features/auth";
import { useApi } from "@/hooks";
import type { TaskHistory } from "@shared/types";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";


export const useTaskHistory = () => {
    const api = useApi();
    const { id } = useParams();
    const { accessToken } = useSession();



    const { data: taskHistory, isPending: isFetchingTaskHistory, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['task-history'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await api.get(`/api/task-history/${id}/?page=${pageParam}&limit=5`);
            return res.data;
        },
        getNextPageParam: (nextPage) => nextPage.nextPage,
        initialPageParam: 1,
        enabled: !!id && !!accessToken
    })


    const history = useMemo(() => {
        const pages: TaskHistory[] = taskHistory?.pages ? taskHistory.pages.flatMap((history) => history.updateHistory) : [];
        return pages;
    }, [taskHistory]);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!hasNextPage || isFetchingTaskHistory || !inView) return;
        fetchNextPage();
    }, [inView])

    return {
        history,
        isFetchingTaskHistory,
        hasNextPage,
        ref
    }



}