import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "./authAPI";

export const useRegisterUser = () => {
  //const queryClient = useQueryClient();
  const { mutate, data: registeruserData, isPending: isLoading, isSuccess, error } = useMutation({
    mutationFn: async (values) => {
			console.log("values", values)
      const api = new API();
      const res = await api.register(values);
			return res.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["products"] });
    // },
  });
  return { mutate, isLoading, isSuccess, error, registeruserData };
};
export const useLoginUser = () => {
  //const queryClient = useQueryClient();
  const { mutate, data: logInUser, isPending: isLoading, isSuccess, error } = useMutation({
    mutationFn: async (values) => {
      const api = new API();
      const res = await api.login(values);
			return res.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["products"] });
    // },
  });
  return { mutate, isLoading, isSuccess, error, logInUser };
};
