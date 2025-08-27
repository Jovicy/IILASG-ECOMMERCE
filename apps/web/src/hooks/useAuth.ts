import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { Credentials } from "@/type";

export const useSignUp = (endpoint: string) => {
  return useMutation<AxiosResponse<any>, Error, Credentials>({
    mutationFn: (credentials: Credentials) =>
      fetchWrapper({
        url: endpoint,
        method: "POST",
        data: credentials,
      }),
  });
};
