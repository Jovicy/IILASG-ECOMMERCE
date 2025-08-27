import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { CredentialsPayload, SigninPayload, UserResponsePayload } from "@/types";

export const useSignUp = () => {
  return useMutation<AxiosResponse<UserResponsePayload>, Error, CredentialsPayload>({
    mutationFn: (credentials: CredentialsPayload) =>
      fetchWrapper({
        url: "/auth/signup",
        method: "POST",
        data: credentials,
      }),
  });
};

export const useSignIn = () => {
  return useMutation<AxiosResponse<UserResponsePayload>, Error, SigninPayload>({
    mutationFn: (credentials: SigninPayload) =>
      fetchWrapper({
        url: "/auth/signin",
        method: "POST",
        data: credentials,
      }),
  });
};
