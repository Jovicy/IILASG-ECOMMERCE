import { useMutation } from "@tanstack/react-query";
import { fetchWrapper } from "../api/fetchWrapper";
import { Credentials } from "@/type";

export const useSignUp = (endpoint: string) =>
  useMutation<void, Error, Credentials>({
    mutationFn: (credentials: Credentials) =>
      fetchWrapper({
        url: endpoint,
        method: "POST",
        data: credentials,
      }),
    onSuccess: (data) => {
      console.log("Sign-up successful:", data);
    },
  });
