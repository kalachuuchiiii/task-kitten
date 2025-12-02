import { useApi } from "@/hooks";
import { getErrorMessage } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";

export const useTaskDetails = () => {

    
    const { id } = useParams();
    const api = useApi();
    const nav = useNavigate();
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
        return res.data.task;
      },
      enabled: false,
    });

    const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
      mutationFn: async() => {
        const p = api.delete(`/api/task/${id}`);
        toast.promise(p, { 
          loading: 'Deleting task...',
          error: (err) => getErrorMessage(err),
          success: 'Task Deleted Successfully!'
        }) 
        return await p;
      },
      onSuccess: () => {
        nav(-1);
      }
    })  

    useEffect(() => {
        refetch();
    }, [id, refetch])

    return {
        taskDetail,
        deleteTask,
        isDeletingTask,
        isFetchingTaskDetail,
        isError,
        error
    }
}