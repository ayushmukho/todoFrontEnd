import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import API from "./taskAPI";

export const usseGetAlltasks = () => {
  const [toDotask, pendingTask, completedTask] = useQueries({
    queries: [
      {
        queryKey: ["toDotask"],
        queryFn: async () => {
          const api = new API();
          const res = await api.getTodoTask();
          return res.data;
        },
      },
      {
        queryKey: ["pendingTask"],
        queryFn: async () => {
          const api = new API();
          const res = await api.getPendingTask();
          return res.data;
        },
      },
      {
        queryKey: ["completeTask"],
        queryFn: async () => {
          const api = new API();
          const res = await api.getCompleteTask();
          return res.data;
        },
      },
    ],
  });
  return [toDotask, pendingTask, completedTask];
};
export const useAddTodoTask = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, error } = useMutation({
    mutationFn: async (values) => {
      console.log("values", values);
      const api = new API();
      const res = await api.todoTask(values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDotask"] });
    },
  });
  return { mutate, isLoading, isSuccess, error };
};
export const useDeleteTodoTask = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, error } = useMutation({
    mutationFn: async (values) => {
      console.log("values", values);
      const api = new API();
      const res = await api.deleteTodoTask(values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDotask"] });
    },
  });
  return { mutate, isLoading, isSuccess, error };
};
export const useMoveToPending = () => {
  const queryClient = useQueryClient();
  const { mutate: movetoPendingMutate, isLoading: isPendingMutateLoading } =
    useMutation({
      mutationFn: async (values) => {
        console.log("values", values);
        const api = new API();
        const res = await api.pendingTask(values);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["toDotask"] });
        queryClient.invalidateQueries({ queryKey: ["pendingTask"] });
      },
    });
  return { movetoPendingMutate, isPendingMutateLoading };
};
export const useMoveToComplete = () => {
  const queryClient = useQueryClient();
  const { mutate: movetoCompleteMutate, isLoading: isCompleteMutateLoading } =
    useMutation({
      mutationFn: async (values) => {
        console.log("values", values);
        const api = new API();
        const res = await api.completeTask(values);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["toDotask"] });
        queryClient.invalidateQueries({ queryKey: ["pendingTask"] });
        queryClient.invalidateQueries({ queryKey: ["completeTask"] });
      },
    });
  return { movetoCompleteMutate, isCompleteMutateLoading };
};
